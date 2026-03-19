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
 * Enhanced text content with decoration
 * For Footer, Link, and other components that need text styling
 */
export const textContentPropsEnhanced = (
  sizeType = "text",
  isMultiline = false,
) => ({
  text: isMultiline ? textarea("content") : text("text"),
  ...typographyProps(sizeType),
  decoration: {
    type: "select",
    label: "textDecoration",
    options: [
      { value: "none", label: "none" },
      { value: "underline", label: "underline" },
      { value: "overline", label: "overline" },
      { value: "line-through", label: "lineThrough" },
    ],
  },
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
 * Complete image properties with all options
 */
export const imagePropsComplete = () => ({
  url: text("imageUrl"),
  alt: text("imageAlt"),
  width: text("width"),
  height: text("height"),
  objectFit: {
    type: "select",
    label: "objectFit",
    options: [
      { value: "cover", label: "cover" },
      { value: "contain", label: "contain" },
      { value: "fill", label: "fill" },
      { value: "none", label: "none" },
      { value: "scale-down", label: "scaleDown" },
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
  backgroundColor: color("backgroundColor"),
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
/**
 * Button schema with full navigation support
 */
export const buttonPropsWithNavigation = () => ({
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

/**
 * Button schema (legacy alias for backward compatibility)
 * @deprecated Use buttonPropsWithNavigation instead
 */
export const buttonSchema = buttonPropsWithNavigation;

/**
 * Link schema with full text props + URL + decoration
 */
export const linkSchema = () => ({
  text: text("linkText"),
  href: text("linkUrl"),
  ...textContentPropsEnhanced("text"),
});

/**
 * Logo field with full upload/text/URL support
 * Supports:
 * - Image upload from computer (converts to base64)
 * - Text/Emoji input with typography props
 * - Image URL input
 */
export const logoFieldComplete = () => ({
  type: {
    type: "radio",
    label: "logoType",
    options: [
      { value: "upload", label: "uploadImage" },
      { value: "text", label: "textOrEmoji" },
      { value: "url", label: "imageUrl" },
    ],
  },

  // Upload option
  file: {
    type: "imageUpload",
    label: "uploadImage",
    acceptedFormats: ["image/png", "image/jpeg", "image/svg+xml", "image/webp"],
    maxSize: 2048, // 2MB in KB
    condition: {
      field: "logo.type",
      value: "upload",
      operator: "equals",
    },
  },

  // Text/Emoji option
  text: {
    type: "text",
    label: "logoText",
    placeholder: "Enter text or emoji (e.g., 🚀)",
    condition: {
      field: "logo.type",
      value: "text",
      operator: "equals",
    },
  },

  // Typography for text logo
  textSize: {
    type: "select",
    label: "fontSize",
    options: [
      { value: "20px", label: "small" },
      { value: "24px", label: "medium" },
      { value: "32px", label: "large" },
      { value: "40px", label: "xl" },
    ],
    condition: {
      field: "logo.type",
      value: "text",
      operator: "equals",
    },
  },

  textWeight: {
    type: "select",
    label: "fontWeight",
    options: [
      { value: "400", label: "normal" },
      { value: "600", label: "semibold" },
      { value: "700", label: "bold" },
      { value: "900", label: "black" },
    ],
    condition: {
      field: "logo.type",
      value: "text",
      operator: "equals",
    },
  },

  textColor: {
    ...color("textColor"),
    condition: {
      field: "logo.type",
      value: "text",
      operator: "equals",
    },
  },

  // URL option
  url: {
    type: "text",
    label: "imageUrl",
    placeholder: "https://example.com/logo.png",
    condition: {
      field: "logo.type",
      value: "url",
      operator: "equals",
    },
  },

  // Common properties (always visible)
  width: {
    type: "select",
    label: "width",
    options: [
      { value: "30px", label: "small" },
      { value: "40px", label: "medium" },
      { value: "50px", label: "large" },
      { value: "60px", label: "xl" },
      { value: "80px", label: "xxl" },
    ],
  },

  height: {
    type: "select",
    label: "height",
    options: [
      { value: "30px", label: "small" },
      { value: "40px", label: "medium" },
      { value: "50px", label: "large" },
      { value: "60px", label: "xl" },
      { value: "80px", label: "xxl" },
    ],
  },
});

/**
 * Complete marquee properties
 * Mixed type: text + container + animation
 */
export const marqueePropsComplete = () => ({
  // Text content
  text: text("text"),
  textColor: color("textColor"),
  textSize: {
    type: "select",
    label: "fontSize",
    options: [
      { value: "1rem", label: "small" },
      { value: "1.5rem", label: "medium" },
      { value: "2rem", label: "large" },
      { value: "2.5rem", label: "xl" },
    ],
  },
  textWeight: {
    type: "select",
    label: "fontWeight",
    options: weightOptions,
  },

  // Container
  backgroundColor: color("backgroundColor"),
  padding: {
    type: "select",
    label: "padding",
    options: [
      { value: "10px 20px", label: "compact" },
      { value: "20px 20px", label: "comfort" },
      { value: "30px 20px", label: "spacious" },
    ],
  },

  // Animation
  animationDuration: {
    type: "select",
    label: "animationDuration",
    options: [
      { value: "10s", label: "fast" },
      { value: "15s", label: "mediumFast" },
      { value: "20s", label: "normal" },
      { value: "30s", label: "slow" },
      { value: "40s", label: "verySlow" },
    ],
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
