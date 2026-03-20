/**
 * PropertyPanel Utilities
 * Helper functions for field value resolution and initialization
 */

import { getNestedValue } from './object.js';

/**
 * Resolves field value with fallback logic for text fields
 * Handles cases where:
 * - defaultConfig has string but schema expects object with .text
 * - content property maps to description property in items
 * - content exists as partial object (e.g., {size: "1rem"}) without text
 *
 * @param {Object} tempConfig - Merged template config
 * @param {Object} field - Field definition with path
 * @returns {*} Resolved field value or undefined
 */
export const resolveTextFieldValue = (tempConfig, field) => {
  const fieldValue = getNestedValue(tempConfig, field.path);

  // If value exists or this isn't a text field, return as-is
  if (fieldValue !== undefined || !field.path.endsWith(".text")) {
    return fieldValue;
  }

  // Extract parent path (e.g., "items.0.title" from "items.0.title.text")
  const parentPath = field.path.substring(0, field.path.lastIndexOf(".text"));
  let parentValue = getNestedValue(tempConfig, parentPath);

  // Handle content/description mapping
  // Schema uses "content" but defaultConfig may use "description"
  if (parentPath.endsWith(".content")) {
    const isParentUndefinedOrIncomplete =
      parentValue === undefined ||
      (typeof parentValue === "object" && !("text" in parentValue));

    if (isParentUndefinedOrIncomplete) {
      const descriptionPath = parentPath.replace(/\.content$/, ".description");
      const descriptionValue = getNestedValue(tempConfig, descriptionPath);

      if (typeof descriptionValue === "string") {
        return descriptionValue;
      }
    }
  }

  // If parent is a plain string, use it as the text value
  if (typeof parentValue === "string") {
    return parentValue;
  }

  return undefined;
};

/**
 * Resolves styling property values (size, weight, color) from card defaults
 * When items have plain strings instead of objects with styling properties
 *
 * @param {Object} tempConfig - Merged template config
 * @param {Object} field - Field definition with path
 * @returns {*} Resolved field value from card defaults or undefined
 */
export const resolveStylingPropertyValue = (tempConfig, field) => {
  const fieldValue = getNestedValue(tempConfig, field.path);

  // If value exists, return it
  if (fieldValue !== undefined) {
    return fieldValue;
  }

  // Check if this is a styling property in an array item
  const isStylingProperty =
    field.path.includes(".title.") ||
    field.path.includes(".content.") ||
    field.path.includes(".description.");

  if (!isStylingProperty) {
    return undefined;
  }

  // Extract property name (e.g., "size", "weight", "color")
  const parts = field.path.split(".");
  const propertyName = parts[parts.length - 1];

  // Match pattern: elements.{section}.items.{index}.{contentType}.{property}
  const sectionMatch = field.path.match(
    /elements\.([^.]+)\.items\.\d+\.([^.]+)\./,
  );

  if (!sectionMatch) {
    return undefined;
  }

  const sectionName = sectionMatch[1];
  const contentType = sectionMatch[2]; // "title", "content", or "description"

  // Get parent path (e.g., "items.0.content")
  const parentPath = field.path.substring(
    0,
    field.path.lastIndexOf("." + propertyName),
  );
  let parentValue = getNestedValue(tempConfig, parentPath);

  // Handle content/description mapping for card defaults lookup
  if (parentValue === undefined && contentType === "content") {
    // Check if description exists instead
    const descriptionPath = parentPath.replace(/\.content$/, ".description");
    const descriptionValue = getNestedValue(tempConfig, descriptionPath);

    if (typeof descriptionValue === "string") {
      // Use card.content defaults (not card.description)
      const cardDefaultPath = `elements.${sectionName}.card.content.${propertyName}`;
      return getNestedValue(tempConfig, cardDefaultPath);
    }
  } else if (typeof parentValue === "string") {
    // Parent exists as plain string, use card defaults
    const cardDefaultPath = `elements.${sectionName}.card.${contentType}.${propertyName}`;
    return getNestedValue(tempConfig, cardDefaultPath);
  }

  return undefined;
};

/**
 * Resolves complete field value with all fallback logic
 * Combines text field resolution and styling property resolution
 *
 * @param {Object} tempConfig - Merged template config
 * @param {Object} field - Field definition with path
 * @returns {*} Resolved field value
 */
export const resolveFieldValue = (tempConfig, field) => {
  // Try direct value first
  let fieldValue = getNestedValue(tempConfig, field.path);

  if (fieldValue !== undefined) {
    return fieldValue;
  }

  // Try text field resolution (handles description fallback)
  fieldValue = resolveTextFieldValue(tempConfig, field);

  if (fieldValue !== undefined) {
    return fieldValue;
  }

  // Try styling property resolution (uses card defaults)
  fieldValue = resolveStylingPropertyValue(tempConfig, field);

  return fieldValue;
};

/**
 * Enhances select field options with template default value if not present
 * Allows users to reset to template default
 *
 * @param {Object} field - Field definition
 * @param {Object} selectedTemplate - Current template
 * @param {Function} t - Translation function
 * @param {Map} cache - Cache map for memoization
 * @returns {Object} Enhanced field with additional option if needed
 */
export const enhanceFieldOptions = (field, selectedTemplate, t, cache) => {
  // Check cache first
  if (cache.has(field.path)) {
    return cache.get(field.path);
  }

  // Only enhance select fields with options
  if (
    field.type !== "select" ||
    !field.options ||
    !Array.isArray(field.options)
  ) {
    cache.set(field.path, field);
    return field;
  }

  // Get the template default value for this field
  const templateDefaultValue = getNestedValue(
    selectedTemplate?.defaultConfig || {},
    field.path,
  );

  // If no template default or it's already in options, return as-is
  if (
    templateDefaultValue === undefined ||
    field.options.some((opt) => opt.value === templateDefaultValue)
  ) {
    cache.set(field.path, field);
    return field;
  }

  // Add template default to options with a user-friendly label
  const enhancedOptions = [
    ...field.options,
    {
      value: templateDefaultValue,
      label: t("propertyPanel.templateDefault"),
    },
  ];

  const enhancedField = {
    ...field,
    options: enhancedOptions,
  };

  cache.set(field.path, enhancedField);
  return enhancedField;
};

/**
 * Checks if a field should be visible based on its dependency rules
 *
 * @param {Object} field - Field definition with optional dependency
 * @param {Object} tempConfig - Merged template config
 * @returns {boolean} True if field should be visible
 */
export const shouldShowField = (field, tempConfig) => {
  if (!field.dependency) return true;

  const { dependsOn, showWhen, operator = "equals" } = field.dependency;

  // Get the value of the field this field depends on
  const dependencyValue = getNestedValue(tempConfig, dependsOn);

  // Check the operator
  switch (operator) {
    case "equals":
      return dependencyValue === showWhen;
    case "notEquals":
      return dependencyValue !== showWhen;
    case "includes":
      return (
        Array.isArray(dependencyValue) && dependencyValue.includes(showWhen)
      );
    case "exists":
      return (
        dependencyValue !== undefined &&
        dependencyValue !== null &&
        dependencyValue !== ""
      );
    default:
      return true;
  }
};

/**
 * Normalizes field value for form components
 * Converts numbers to strings for Select components
 *
 * @param {*} fieldValue - Raw field value
 * @param {string} fieldType - Field type (text, select, etc.)
 * @returns {*} Normalized field value
 */
export const normalizeFieldValue = (fieldValue, fieldType) => {
  // Convert numbers to strings for Select component
  if (fieldType === "select" && typeof fieldValue === "number") {
    return String(fieldValue);
  }

  // Ensure non-null value for form fields
  return fieldValue ?? "";
};
