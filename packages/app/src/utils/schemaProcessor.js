/**
 * Schema Processor
 *
 * Converts template configSchema into editable field definitions for PropertyPanel.
 * Handles nested structures, field grouping, and conditional visibility.
 */

import { getNestedValue } from "./object.js";

/**
 * Resolve dynamic max value for sliders
 * Supports syntax like: { dynamic: "elements.features.items.length" }
 * @param {*} dynamicDef - The max value definition (can be number or dynamic object)
 * @param {Object} config - The current config to resolve against
 * @returns {number} The resolved max value
 */
export const resolveDynamicValue = (dynamicDef, config) => {
  // If it's a plain number, return it
  if (typeof dynamicDef === "number") {
    return dynamicDef;
  }

  // If it's not a dynamic definition, return default
  if (!dynamicDef || typeof dynamicDef !== "object" || !dynamicDef.dynamic) {
    return typeof dynamicDef === "number" ? dynamicDef : 1;
  }

  const path = dynamicDef.dynamic;

  // If path ends with .length, get array length
  if (path.endsWith(".length")) {
    const arrayPath = path.slice(0, -7); // remove '.length'
    const array = getNestedValue(config, arrayPath);
    return Array.isArray(array) ? Math.max(array.length, 1) : 1;
  }

  // Otherwise get the value directly
  const value = getNestedValue(config, path);
  return typeof value === "number" ? value : 1;
};

/**
 * Flatten a nested schema object into an array of field definitions with paths
 * @param {Object} schema - The schema object (or sub-object) to flatten
 * @param {string} basePath - The base path for nested fields (e.g., "elements.hero")
 * @param {Array} excludeTypes - Field types to exclude (e.g., "array")
 * @param {number} maxDepth - Maximum depth to recurse (1 = only direct fields, undefined = unlimited)
 * @param {string} parentKey - The parent key name for context
 * @param {Object} config - The current config for resolving dynamic values
 * @returns {Array} Array of field objects with { id, label, type, options, path }
 */
export const flattenSchema = (
  schema,
  basePath = "",
  excludeTypes = [],
  maxDepth = undefined,
  parentKey = "",
  config = undefined,
) => {
  const fields = [];

  const processObject = (
    obj,
    currentPath,
    currentDepth = 0,
    currentParentKey = "",
  ) => {
    Object.entries(obj).forEach(([key, value]) => {
      const fieldPath = currentPath ? `${currentPath}.${key}` : key;

      // Skip if no value or if it's excluded type
      if (!value || excludeTypes.includes(value.type)) {
        return;
      }

      // If it's a field definition (has a type property that's a string)
      if (value.type && typeof value.type === "string") {
        // Skip array type - we'll handle these separately
        if (value.type === "array") {
          return;
        }

        // Resolve dynamic max value for sliders
        let max = value.max;
        if (value.type === "slider" && max && config) {
          max = resolveDynamicValue(max, config);
        }

        fields.push({
          id: key,
          label: value.label || formatLabel(key),
          type: value.type,
          options: value.options,
          min: value.min,
          max, // resolved dynamic value
          step: value.step,
          labels: value.labels,
          path: fieldPath,
        });
      }
      // If value.type is an object (like logo.type which has {type: "select", options: [...]})
      else if (
        value.type &&
        typeof value.type === "object" &&
        value.type.type
      ) {
        // This is a nested field definition, recurse into it
        if (maxDepth === undefined || currentDepth < maxDepth) {
          processObject(value, fieldPath, currentDepth, key);
        }
      }
      // If it's a nested object without type, recurse only if within depth limit
      else if (typeof value === "object" && !Array.isArray(value)) {
        // Check if we should recurse based on maxDepth
        if (maxDepth === undefined || currentDepth < maxDepth) {
          processObject(value, fieldPath, currentDepth + 1, key);
        }
      }
    });
  };

  processObject(schema, basePath, 0, "");
  return fields;
};

/**
 * Get fields for a specific element from the schema
 * @param {Object} templateConfig - The template configuration
 * @param {string} elementId - The element ID (e.g., "hero", "hero.title")
 * @param {Object} currentConfig - The current config for resolving dynamic values
 * @returns {Object} { fields: Array, groups: Array, label: string, basePath: string }
 */
export const getFieldsForElement = (
  templateConfig,
  elementId,
  currentConfig = {},
) => {
  if (!templateConfig?.configSchema) {
    return { fields: [], groups: [], label: "Unknown", basePath: "" };
  }

  const { configSchema } = templateConfig;

  // Handle page-level settings
  if (elementId === "page") {
    const fields = flattenSchema(
      configSchema.page,
      "page",
      [],
      undefined,
      "",
      currentConfig,
    );
    return {
      fields,
      groups: [],
      label: "Page Settings",
      basePath: "page",
    };
  }

  // Handle element selections
  const parts = elementId.split(".");
  const sectionId = parts[0]; // e.g., "hero"
  const subPath = parts.slice(1).join("."); // e.g., "title" or "card.title"

  const sectionSchema = configSchema.elements?.[sectionId];
  if (!sectionSchema) {
    return { fields: [], groups: [], label: "Unknown", basePath: "" };
  }

  // If no sub-path, return section-level fields (no groups)
  if (!subPath) {
    // Only show direct section properties, exclude nested schema objects
    // Filter out properties that are nested schema objects (title, subtitle, button, etc.)
    const sectionOnlySchema = {};
    Object.entries(sectionSchema).forEach(([key, value]) => {
      // Include if it's a field definition (has type as string)
      if (value && value.type && typeof value.type === "string") {
        sectionOnlySchema[key] = value;
      }
      // Exclude if it's a nested object without a type (nested schema)
      // These will be accessible when user clicks on the specific element
    });

    const fields = flattenSchema(
      sectionOnlySchema,
      `elements.${sectionId}`,
      ["array"],
      undefined, // No depth limit for remaining fields
      sectionId, // Pass section name as parent key
      currentConfig, // Pass config for dynamic resolution
    );
    return {
      fields,
      groups: [],
      label: formatLabel(sectionId),
      basePath: `elements.${sectionId}`,
    };
  }

  // Handle nested sub-elements (e.g., hero.title, card.title)
  const subPathParts = subPath.split(".");

  // Handle array item paths (e.g., "panels.0", "panels.0.title")
  // Convert array index paths to singular template paths
  // "panels.0" -> "card", "panels.0.title" -> "card.title"
  let schemaPathParts = [];
  let dataPathParts = [];
  let isArrayItem = false; // Track if we're selecting an array item directly
  let i = 0;
  while (i < subPathParts.length) {
    const part = subPathParts[i];

    // Check if next part is a numeric index
    if (i + 1 < subPathParts.length && /^\d+$/.test(subPathParts[i + 1])) {
      // This is an array name followed by an index
      // Convert to singular template: "panels" -> "card", "items" -> "item"
      const singularName = getSingularTemplateName(part);
      schemaPathParts.push(singularName);
      dataPathParts.push(part, subPathParts[i + 1]); // Keep array path for data access

      // If this is the last part, we're selecting the array item itself
      if (i + 2 >= subPathParts.length) {
        isArrayItem = true;
      }

      i += 2; // Skip the index
    } else {
      schemaPathParts.push(part);
      dataPathParts.push(part);
      i++;
    }
  }

  let currentSchema = sectionSchema;
  let currentPath = `elements.${sectionId}`;

  for (const part of schemaPathParts) {
    currentSchema = currentSchema[part];
    currentPath += `.${part}`;
    if (!currentSchema) {
      return {
        fields: [],
        groups: [],
        label: "Unknown",
        basePath: currentPath,
      };
    }
  }

  // Build the actual data path for field values
  const dataPath = `elements.${sectionId}.${dataPathParts.join(".")}`;

  // If we found a nested object, flatten it
  if (typeof currentSchema === "object" && !currentSchema.type) {
    // If selecting an array item directly (e.g., panels.0), only show direct fields
    const maxDepth = isArrayItem ? 0 : undefined;
    const parentKey = schemaPathParts[schemaPathParts.length - 1];
    const fields = flattenSchema(
      currentSchema,
      dataPath,
      [],
      maxDepth,
      parentKey,
      currentConfig,
    );
    return {
      fields,
      groups: [],
      label: formatLabel(schemaPathParts.join(" ")),
      basePath: dataPath,
    };
  }

  // If it's a single field, return it
  if (currentSchema.type) {
    return {
      fields: [
        {
          id: schemaPathParts[schemaPathParts.length - 1],
          label: currentSchema.label || formatLabel(schemaPathParts.join(" ")),
          type: currentSchema.type,
          options: currentSchema.options,
          min: currentSchema.min,
          max: currentSchema.max,
          step: currentSchema.step,
          labels: currentSchema.labels,
          path: dataPath,
        },
      ],
      groups: [],
      label: formatLabel(schemaPathParts.join(" ")),
      basePath: dataPath,
    };
  }

  return { fields: [], groups: [], label: "Unknown", basePath: currentPath };
};

/**
 * Get array items from config for a section (e.g., comicPanels.panels)
 * @param {Object} config - The current config
 * @param {string} sectionId - The section ID (e.g., "comicPanels")
 * @param {Object} templateConfig - The template configuration
 * @returns {Object} { arrayPath: string, items: Array, arrayName: string }
 */
export const getArrayItems = (config, sectionId, templateConfig) => {
  const sectionSchema = templateConfig?.configSchema?.elements?.[sectionId];
  if (!sectionSchema) return null;

  // Find the array field in the schema
  const arrayField = Object.entries(sectionSchema).find(
    ([key, value]) => value.type === "array",
  );

  if (!arrayField) return null;

  const [arrayName, arrayDef] = arrayField;
  const arrayPath = `elements.${sectionId}.${arrayName}`;

  return {
    arrayPath,
    arrayName,
    items: config?.elements?.[sectionId]?.[arrayName] || [],
    label: arrayDef.label || formatLabel(arrayName),
  };
};

/**
 * Convert array name to singular template name
 * @param {string} arrayName - The array name (e.g., "panels", "items")
 * @returns {string} Singular template name (e.g., "card", "item")
 */
export const getSingularTemplateName = (arrayName) => {
  // Special cases for irregular plurals and template-specific mappings
  const singularMap = {
    // Template-specific arrays
    panels: "card", // comic panels use "card" as template
    items: "card", // features/projects use "card" as template
    quotes: "card", // testimonials use "card" as template
    images: "card", // image grid uses "card" as template (with nested image)
    testimonials: "testimonial",
    features: "card",
    projects: "card",
    // New additions for refactored templates
    links: "link", // Header navigation links
    commands: "command", // Terminal commands
    portfolio: "card", // Portfolio items
    stats: "card", // Stats items
  };

  if (singularMap[arrayName]) {
    return singularMap[arrayName];
  }

  // Default: remove trailing 's'
  return arrayName.endsWith("s") ? arrayName.slice(0, -1) : arrayName;
};

/**
 * Format a camelCase or snake_case string into a readable label
 * @param {string} str - The string to format
 * @returns {string} Formatted label
 */
const formatLabel = (str) => {
  return str
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/[_-]/g, " ") // Replace underscores and hyphens with spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
};

/**
 * Transform select options from schema format to component format
 * @param {Array} options - Options array from schema
 * @returns {Array} Transformed options
 */
export const transformSelectOptions = (options) => {
  if (!options || !Array.isArray(options)) return [];

  return options.map((opt) => {
    if (typeof opt === "object" && opt.value && opt.label) {
      return opt;
    }
    // If it's just a string, use it for both value and label
    return { value: opt, label: opt };
  });
};

/**
 * Get the schema definition for a specific field path
 * @param {Object} templateConfig - The template configuration
 * @param {string} fieldPath - The field path (e.g., "elements.hero.title")
 * @returns {Object|null} The field schema definition
 */
export const getFieldSchema = (templateConfig, fieldPath) => {
  if (!templateConfig?.configSchema) return null;

  const parts = fieldPath.split(".");
  let current = templateConfig.configSchema;

  for (const part of parts) {
    current = current[part];
    if (!current) return null;
  }

  return current;
};
