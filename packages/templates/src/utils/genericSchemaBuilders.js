/**
 * Generic Schema Builders
 *
 * Based on CSS architecture principles:
 * 1. Container-type properties (layout, spacing, border, background)
 * 2. Content-type properties (typography, color, text)
 * 3. Replaced element properties (images, video)
 */

import {
  alignOptions,
  borderRadiusOptions,
  borderWidthOptions,
  cardPaddingOptions,
  dropShadowOptions,
  gapOptions,
  headingSizeOptions,
  maxWidthOptions,
  sectionPaddingOptions,
  textSizeOptions,
  titleSizeOptions,
  weightOptions,
} from "../constants/index.js";
import { color, slider, text, textarea } from "./fieldBuilders.js";

// ============================================
// 1. CONTAINER PROPS (Layout & Box Model)
// ============================================

/**
 * Layout properties for container elements
 */
export const layoutProps = () => ({
  maxWidth: {
    type: "select",
    label: "maxWidth",
    options: maxWidthOptions,
  },
  align: {
    type: "select",
    label: "textAlign",
    options: alignOptions,
  },
});

/**
 * Spacing properties (margin & padding)
 */
export const spacingProps = (type = "section") => {
  const paddingOptions =
    type === "card" ? cardPaddingOptions : sectionPaddingOptions;

  return {
    padding: {
      type: "select",
      label: "padding",
      options: paddingOptions,
    },
    gap: {
      type: "select",
      label: "gap",
      options: gapOptions,
    },
  };
};

/**
 * Border & visual properties
 */
export const borderProps = () => ({
  borderRadius: {
    type: "select",
    label: "borderRadius",
    options: borderRadiusOptions,
  },
  borderWidth: {
    type: "select",
    label: "borderWidth",
    options: borderWidthOptions || [
      { value: "0", label: "none" },
      { value: "1px", label: "small" },
      { value: "2px", label: "medium" },
      { value: "4px", label: "large" },
    ],
  },
  borderColor: color("borderColor"),
});

/**
 * Background & shadow properties
 */
export const visualProps = () => ({
  backgroundColor: color("backgroundColor"),
  dropShadow: {
    type: "select",
    label: "shadowBlur",
    options: dropShadowOptions,
  },
});

/**
 * Grid/Flex layout helpers
 */
export const gridLayoutProps = (maxColumns = 6) => ({
  columns: slider("columns", 1, maxColumns),
  gap: {
    type: "select",
    label: "gap",
    options: gapOptions,
  },
});

// ============================================
// 2. CONTENT PROPS (Typography & Text)
// ============================================

/**
 * Typography properties for text content
 */
export const typographyProps = (sizeType = "text") => {
  const sizeOptions =
    {
      heading: headingSizeOptions,
      title: titleSizeOptions,
      text: textSizeOptions,
    }[sizeType] || textSizeOptions;

  return {
    size: {
      type: "select",
      label: "fontSize",
      options: sizeOptions,
    },
    weight: {
      type: "select",
      label: "fontWeight",
      options: weightOptions,
    },
    color: color("textColor"),
  };
};

/**
 * Text content with typography
 */
export const textContentSchema = (sizeType = "text", isMultiline = false) => ({
  text: isMultiline ? textarea("content") : text("text"),
  ...typographyProps(sizeType),
});

/**
 * Heading with full typography control
 */
export const headingContentSchema = () => ({
  text: text("heading"),
  ...typographyProps("heading"),
});

/**
 * Title with full typography control
 */
export const titleContentSchema = () => ({
  text: text("title"),
  ...typographyProps("title"),
});

// ============================================
// 3. REPLACED ELEMENT PROPS (Image, Video)
// ============================================

/**
 * Image properties
 */
export const imageProps = () => ({
  url: text("imageUrl"),
  alt: text("imageAlt"),
  objectFit: {
    type: "select",
    label: "objectFit",
    options: [
      { value: "cover", label: "cover" },
      { value: "contain", label: "contain" },
      { value: "fill", label: "fill" },
      { value: "none", label: "none" },
    ],
  },
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
 * Avatar/Icon properties (small images)
 */
export const avatarProps = () => ({
  url: text("imageUrl"),
  size: {
    type: "select",
    label: "fontSize",
    options: [
      { value: "small", label: "small" },
      { value: "medium", label: "medium" },
      { value: "large", label: "large" },
      { value: "xlarge", label: "xl" },
    ],
  },
  borderRadius: {
    type: "select",
    label: "borderRadius",
    options: borderRadiusOptions,
  },
  backgroundColor: color("backgroundColor"),
});

// ============================================
// 4. COMPOSITE SCHEMAS (Reusable Components)
// ============================================

/**
 * Complete section schema (container + layout + visual)
 */
export const sectionSchema = () => ({
  ...visualProps(),
  ...spacingProps("section"),
  ...layoutProps(),
});

/**
 * Complete card schema (container with border)
 */
export const cardSchema = () => ({
  ...visualProps(),
  ...spacingProps("card"),
  ...borderProps(),
  align: {
    type: "select",
    label: "textAlign",
    options: alignOptions,
  },
});

/**
 * Button schema (interactive element)
 */
export const buttonSchema = () => ({
  text: text("buttonText"),
  url: text("buttonUrl"),
  color: color("buttonBackground"),
  textColor: color("buttonTextColor"),
  size: {
    type: "select",
    label: "fontSize",
    options: [
      { value: "small", label: "small" },
      { value: "medium", label: "medium" },
      { value: "large", label: "large" },
    ],
  },
  borderRadius: {
    type: "select",
    label: "borderRadius",
    options: borderRadiusOptions,
  },
});

// ============================================
// 5. UTILITY FUNCTIONS
// ============================================

/**
 * Array field schema
 */
export const arrayField = (label = "items") => ({
  type: "array",
  label,
});

/**
 * Merge multiple schemas
 */
export const mergeSchemas = (...schemas) => {
  return schemas.reduce((acc, schema) => ({ ...acc, ...schema }), {});
};
