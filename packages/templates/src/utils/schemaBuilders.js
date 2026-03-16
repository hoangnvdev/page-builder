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
} from "../constants/index.js";
import { color, text, textarea } from "./fieldBuilders.js";

/**
 * Create a standard section schema with common properties
 * @returns {Object} Section schema object
 */
export const sectionSchema = () => ({
  backgroundColor: color("backgroundColor"),
  padding: { type: "select", label: "padding", options: sectionPaddingOptions },
  maxWidth: { type: "select", label: "maxWidth", options: maxWidthOptions },
  align: { type: "select", label: "textAlign", options: alignOptions },
});

/**
 * Create a heading schema with text, size, weight, and color
 * @returns {Object} Heading schema object
 */
export const headingSchema = () => ({
  text: text("heading"),
  size: { type: "select", label: "fontSize", options: headingSizeOptions },
  weight: { type: "select", label: "fontWeight", options: weightOptions },
  color: color("textColor"),
});

/**
 * Create a card schema with common card properties
 * @returns {Object} Card schema object
 */
export const cardSchema = () => ({
  backgroundColor: color("backgroundColor"),
  padding: { type: "select", label: "padding", options: cardPaddingOptions },
  align: { type: "select", label: "textAlign", options: alignOptions },
  borderRadius: {
    type: "select",
    label: "borderRadius",
    options: borderRadiusOptions,
  },
  dropShadow: {
    type: "select",
    label: "shadowBlur",
    options: dropShadowOptions,
  },
});

/**
 * Create a card title schema
 * @returns {Object} Card title schema object
 */
export const cardTitleSchema = () => ({
  text: text("title"),
  size: { type: "select", label: "fontSize", options: titleSizeOptions },
  weight: { type: "select", label: "fontWeight", options: weightOptions },
  color: color("textColor"),
});

/**
 * Create a card content schema
 * @returns {Object} Card content schema object
 */
export const cardContentSchema = () => ({
  text: textarea("content"),
  size: { type: "select", label: "fontSize", options: textSizeOptions },
  weight: { type: "select", label: "fontWeight", options: weightOptions },
  color: color("textColor"),
});
