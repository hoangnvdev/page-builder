/**
 * Component Helper Utilities
 *
 * Shared helper functions used across template components
 * All helpers include error handling for safe usage
 */

/**
 * Convert drop shadow preset to CSS box-shadow value
 * @param {string} shadow - Shadow preset (none, light, medium, heavy)
 * @returns {string} CSS box-shadow value
 */
export const getDropShadow = (shadow) => {
  try {
    const shadows = {
      none: "none",
      light: "0 2px 4px rgba(0, 0, 0, 0.1)",
      medium: "0 4px 8px rgba(0, 0, 0, 0.15)",
      heavy: "0 8px 16px rgba(0, 0, 0, 0.2)",
    };
    return shadows[shadow] || shadows.light;
  } catch (error) {
    console.error("Error in getDropShadow:", error);
    return "0 2px 4px rgba(0, 0, 0, 0.1)";
  }
};

/**
 * Convert aspect ratio preset to CSS aspect-ratio value
 * @param {string} ratio - Aspect ratio preset (square, portrait, landscape)
 * @returns {string} CSS aspect-ratio value
 */
export const getAspectRatioValue = (ratio) => {
  try {
    const ratioMap = {
      square: "1 / 1",
      portrait: "3 / 4",
      landscape: "16 / 9",
    };
    return ratioMap[ratio] || ratio;
  } catch (error) {
    console.error("Error in getAspectRatioValue:", error);
    return "16 / 9";
  }
};

/**
 * Extract nested text property with backward compatibility
 * Handles both string and object formats { text: "..." }
 * @param {string|Object} value - Text value or object with text property
 * @returns {string} Text content
 */
export const extractText = (value) => {
  try {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") return value.text || "";
    return "";
  } catch (error) {
    console.error("Error in extractText:", error);
    return "";
  }
};

/**
 * Safely get nested property value with fallback
 * @param {Object} obj - Source object
 * @param {string} path - Dot-notation path (e.g., "card.title.size")
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} Value at path or default value
 */
export const getNestedValue = (obj, path, defaultValue = undefined) => {
  try {
    if (!obj || typeof obj !== "object") return defaultValue;

    const keys = path.split(".");
    let current = obj;

    for (const key of keys) {
      if (current[key] === undefined) return defaultValue;
      current = current[key];
    }

    return current !== undefined ? current : defaultValue;
  } catch (error) {
    console.error("Error in getNestedValue:", error);
    return defaultValue;
  }
};
