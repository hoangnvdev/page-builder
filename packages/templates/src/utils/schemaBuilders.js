/**
 * Schema Builder Utilities
 *
 * Composite functions for building common schema patterns
 */

import {
  alignOptions,
  borderRadiusOptions,
  cardPaddingOptions,
  dropShadowOptions,
  headingSizeOptions,
  maxWidthOptions,
  sectionPaddingOptions,
  textSizeOptions,
  titleSizeOptions,
  weightOptions,
} from '../constants/index.js';
import {
  color,
  text,
  textarea,
} from './fieldBuilders.js';

/**
 * Create a standard section schema with common properties
 * @returns {Object} Section schema object
 */
export const sectionSchema = () => ({
  backgroundColor: color("Background Color"),
  padding: { type: "select", label: "Padding", options: sectionPaddingOptions },
  maxWidth: { type: "select", label: "Max Width", options: maxWidthOptions },
  align: { type: "select", label: "Alignment", options: alignOptions },
});

/**
 * Create a heading schema with text, size, weight, and color
 * @returns {Object} Heading schema object
 */
export const headingSchema = () => ({
  text: text("Heading"),
  size: { type: "select", label: "Heading Size", options: headingSizeOptions },
  weight: { type: "select", label: "Heading Weight", options: weightOptions },
  color: color("Heading Color"),
});

/**
 * Create a card schema with common card properties
 * @returns {Object} Card schema object
 */
export const cardSchema = () => ({
  backgroundColor: color("Background Color"),
  padding: { type: "select", label: "Padding", options: cardPaddingOptions },
  align: { type: "select", label: "Text Alignment", options: alignOptions },
  borderRadius: {
    type: "select",
    label: "Border Radius",
    options: borderRadiusOptions,
  },
  dropShadow: {
    type: "select",
    label: "Drop Shadow",
    options: dropShadowOptions,
  },
});

/**
 * Create a card title schema
 * @returns {Object} Card title schema object
 */
export const cardTitleSchema = () => ({
  text: text("Title"),
  size: { type: "select", label: "Title Size", options: titleSizeOptions },
  weight: { type: "select", label: "Title Weight", options: weightOptions },
  color: color("Title Color"),
});

/**
 * Create a card content schema
 * @returns {Object} Card content schema object
 */
export const cardContentSchema = () => ({
  text: textarea("Content"),
  size: { type: "select", label: "Text Size", options: textSizeOptions },
  weight: { type: "select", label: "Text Weight", options: weightOptions },
  color: color("Text Color"),
});
