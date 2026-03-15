/**
 * Field Builder Utilities
 *
 * Helper functions for creating field schema definitions
 */

/**
 * Create a color field schema
 * @param {string} label - The label for the color field
 * @returns {Object} Field schema object
 */
export const color = (label) => ({ type: "color", label });

/**
 * Create a text field schema
 * @param {string} label - The label for the text field
 * @returns {Object} Field schema object
 */
export const text = (label) => ({ type: "text", label });

/**
 * Create a textarea field schema
 * @param {string} label - The label for the textarea field
 * @returns {Object} Field schema object
 */
export const textarea = (label) => ({ type: "textarea", label });

/**
 * Create a slider field schema
 * @param {string} label - The label for the slider field
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} step - Step increment (default: 1)
 * @returns {Object} Field schema object
 */
export const slider = (label, min, max, step = 1) => ({
  type: "slider",
  label,
  min,
  max,
  step,
});
