# Additional Implementation Examples

This document provides complete implementation examples for other standardization requirements beyond the Logo field.

---

## 1. Navigation System

### 1.1 useNavigation Hook

**File**: `packages/app/src/hooks/useNavigation.js`

```javascript
import { useCallback } from "react";

/**
 * Hook for handling navigation
 * Supports:
 * - Internal anchors (smooth scroll)
 * - External URLs (new tab)
 * - Relative URLs (same tab)
 */
export const useNavigation = () => {
  const navigate = useCallback((url) => {
    if (!url) return;

    // Internal anchor (e.g., #about, #features)
    if (url.startsWith("#")) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return;
    }

    // External URL (starts with http:// or https://)
    if (url.startsWith("http://") || url.startsWith("https://")) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // Relative URL (same tab)
    window.location.href = url;
  }, []);

  /**
   * Get props for anchor/button elements
   * Returns appropriate href and onClick handlers
   */
  const getNavigationProps = useCallback(
    (url) => {
      if (!url) return {};

      // For anchors
      if (url.startsWith("#")) {
        return {
          href: url,
          onClick: (e) => {
            e.preventDefault();
            navigate(url);
          },
        };
      }

      // For external links
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return {
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: (e) => {
            // Let default behavior handle it, but track if needed
          },
        };
      }

      // For relative URLs
      return {
        href: url,
        onClick: (e) => {
          // Can add client-side routing here if using React Router
        },
      };
    },
    [navigate],
  );

  return { navigate, getNavigationProps };
};
```

### 1.2 Button Component Update

**File**: `packages/ui/src/components/Button/index.jsx`

```javascript
import "./index.scss";
import { memo, useMemo } from "react";
import PropTypes from "prop-types";

export const Button = memo(
  ({
    text,
    url, // NEW: URL for navigation
    variant = "primary",
    size = "medium",
    backgroundColor,
    color,
    borderRadius,
    onClick,
    disabled = false,
    className = "",
    as = "button",
    dataElement,
    ...props
  }) => {
    // Determine component type based on URL
    const Component = url && !disabled ? "a" : as;

    // Button style
    const buttonStyle = useMemo(
      () => ({
        ...(backgroundColor && { backgroundColor }),
        ...(color && { color }),
        ...(borderRadius && { borderRadius }),
      }),
      [backgroundColor, color, borderRadius],
    );

    // Navigation props for anchor
    const navigationProps = useMemo(() => {
      if (!url || disabled) return {};

      // Internal anchor
      if (url.startsWith("#")) {
        return {
          href: url,
          onClick: (e) => {
            e.preventDefault();
            const element = document.querySelector(url);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
            onClick?.(e);
          },
        };
      }

      // External URL
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return {
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick,
        };
      }

      // Relative URL
      return {
        href: url,
        onClick,
      };
    }, [url, disabled, onClick]);

    return (
      <Component
        data-element={dataElement}
        className={`button button--${variant} button--${size} ${className}`}
        style={buttonStyle}
        disabled={disabled}
        onClick={!url ? onClick : undefined}
        {...navigationProps}
        {...props}
      >
        {text}
      </Component>
    );
  },
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string, // NEW
  variant: PropTypes.oneOf(["primary", "secondary", "ghost", "danger"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  borderRadius: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.string,
  dataElement: PropTypes.string,
};

Button.displayName = "Button";
```

### 1.3 Link Component Update

**File**: `packages/ui/src/components/Link/index.jsx`

```javascript
import "./index.scss";
import { memo, useMemo } from "react";
import PropTypes from "prop-types";

export const Link = memo(
  ({
    text,
    href,
    color,
    size,
    weight,
    underline = false,
    decoration, // NEW: textDecoration
    onClick,
    className = "",
    dataElement,
    ...props
  }) => {
    const linkStyle = useMemo(
      () => ({
        ...(color && { color }),
        ...(size && { fontSize: size }),
        ...(weight && { fontWeight: weight }),
        ...(decoration && { textDecoration: decoration }),
        ...(!decoration && !underline && { textDecoration: "none" }),
        ...(underline && !decoration && { textDecoration: "underline" }),
      }),
      [color, size, weight, decoration, underline],
    );

    const handleClick = (e) => {
      if (!href) {
        e.preventDefault();
        return;
      }

      // Internal anchor - smooth scroll
      if (href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      // Call custom onClick if provided
      onClick?.(e);
    };

    // External link props
    const externalProps = useMemo(() => {
      if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
        return {
          target: "_blank",
          rel: "noopener noreferrer",
        };
      }
      return {};
    }, [href]);

    return (
      <a
        data-element={dataElement}
        href={href || "#"}
        className={`link ${className}`}
        style={linkStyle}
        onClick={handleClick}
        {...externalProps}
        {...props}
      >
        {text}
      </a>
    );
  },
);

Link.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  underline: PropTypes.bool,
  decoration: PropTypes.oneOf([
    "none",
    "underline",
    "overline",
    "line-through",
  ]), // NEW
  onClick: PropTypes.func,
  className: PropTypes.string,
  dataElement: PropTypes.string,
};

Link.displayName = "Link";
```

---

## 2. Text Decoration Support

### 2.1 Schema Builder Update

**File**: `packages/templates/src/utils/genericSchemaBuilders.js`

```javascript
/**
 * Text decoration options
 */
export const textDecorationOptions = [
  { value: "none", label: "none" },
  { value: "underline", label: "underline" },
  { value: "overline", label: "overline" },
  { value: "line-through", label: "lineThrough" },
];

/**
 * Enhanced text props with decoration
 * For Footer, Link, and other components that need text styling
 */
export const textContentPropsEnhanced = (sizeType = "text") => ({
  text: textarea("content"),
  size: {
    type: "select",
    label: "fontSize",
    options: sizeType === "heading" ? headingSizeOptions : textSizeOptions,
  },
  weight: {
    type: "select",
    label: "fontWeight",
    options: weightOptions,
  },
  color: color("textColor"),
  decoration: {
    type: "select",
    label: "textDecoration",
    options: textDecorationOptions,
  },
});

/**
 * Link schema with full text props + URL + decoration
 */
export const linkSchema = () => ({
  text: text("linkText"),
  href: text("linkUrl"),
  ...textContentPropsEnhanced("text"),
});
```

### 2.2 Footer Component Update

**File**: `packages/templates/src/sections/Footer/index.jsx`

```javascript
export const Footer = ({
  text,
  textColor,
  textSize,
  textWeight,
  textDecoration, // NEW
  backgroundColor,
  padding = "40px 20px",
  align = "center",
  links = [],
  linkColor,
  linkDecoration, // NEW
  dataElement = "footer",
  className = "",
  ...props
}) => {
  // Text style with decoration
  const textStyle = useMemo(
    () => ({
      fontSize: textSize,
      fontWeight: textWeight,
      color: textColor,
      textDecoration: textDecoration || "none", // NEW
      margin: 0,
    }),
    [textSize, textWeight, textColor, textDecoration],
  );

  // Link style with decoration
  const linkStyle = {
    color: linkColor || textColor,
    textDecoration: linkDecoration || "none", // NEW
  };

  return (
    <Section
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
      className={`footer ${className}`}
    >
      <Container maxWidth="1200px">
        <Flex direction="column" align={align} gap="20px">
          {text && (
            <Text style={textStyle} data-element={`${dataElement}.text`}>
              {text}
            </Text>
          )}

          {links && links.length > 0 && (
            <Flex gap="24px" wrap="wrap" justify={align}>
              {links.map((link, index) => (
                <Link
                  key={index}
                  text={link.text}
                  href={link.href}
                  color={link.color || linkColor}
                  size={link.size}
                  weight={link.weight}
                  decoration={link.decoration || linkDecoration} // NEW
                  dataElement={`${dataElement}.links.${index}`}
                />
              ))}
            </Flex>
          )}
        </Flex>
      </Container>
    </Section>
  );
};
```

### 2.3 Footer Config Example

```javascript
footer: mergeSchemas(
  {
    backgroundColor: color("backgroundColor"),
    padding: { type: "select", options: footerPaddingOptions },
    align: { type: "select", options: alignOptions },
  },
  {
    text: {
      text: textarea("footerText"),
      size: {
        type: "select",
        label: "fontSize",
        options: textSizeOptions,
      },
      weight: {
        type: "select",
        label: "fontWeight",
        options: weightOptions,
      },
      color: color("textColor"),
      decoration: { // NEW
        type: "select",
        label: "textDecoration",
        options: textDecorationOptions,
      },
    },
    links: arrayField("links"),
  },
),
```

---

## 3. Object Fit for Images

### 3.1 Image Component Update

**File**: `packages/ui/src/components/Image/index.jsx`

```javascript
import "./index.scss";
import { memo, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const Image = memo(
  ({
    src,
    alt = "",
    width,
    height,
    objectFit = "cover", // NEW: default to cover
    borderRadius,
    dropShadow,
    className = "",
    dataElement,
    onLoad,
    onError,
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const imageStyle = useMemo(
      () => ({
        ...(width && { width }),
        ...(height && { height }),
        ...(objectFit && { objectFit }), // NEW
        ...(borderRadius && { borderRadius }),
        ...(dropShadow && { boxShadow: dropShadow }),
      }),
      [width, height, objectFit, borderRadius, dropShadow],
    );

    const handleLoad = (e) => {
      setIsLoaded(true);
      onLoad?.(e);
    };

    const handleError = (e) => {
      setHasError(true);
      onError?.(e);
    };

    if (hasError) {
      return (
        <div
          className={`image image--error ${className}`}
          style={{ width, height }}
          data-element={dataElement}
        >
          <span className="image__error-icon">🖼️</span>
          <span className="image__error-text">Failed to load image</span>
        </div>
      );
    }

    return (
      <img
        data-element={dataElement}
        src={src}
        alt={alt}
        className={`image ${!isLoaded ? "image--loading" : ""} ${className}`}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    );
  },
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  objectFit: PropTypes.oneOf([
    "cover",
    "contain",
    "fill",
    "none",
    "scale-down",
  ]), // NEW
  borderRadius: PropTypes.string,
  dropShadow: PropTypes.string,
  className: PropTypes.string,
  dataElement: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

Image.displayName = "Image";
```

### 3.2 Image SCSS Update

**File**: `packages/ui/src/components/Image/index.scss`

```scss
.image {
  display: block;
  max-width: 100%;
  height: auto;
  transition: opacity $transition-normal;

  &--loading {
    opacity: 0.5;
  }

  &--error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $color-bg-secondary;
    border: 1px dashed $color-border;
    border-radius: $border-radius-md;
    gap: $spacing-xs;
  }

  &__error-icon {
    font-size: 2rem;
    opacity: 0.5;
  }

  &__error-text {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
}
```

### 3.3 imageProps Schema Update

```javascript
/**
 * Complete image properties with objectFit
 */
export const imagePropsComplete = () => ({
  url: text("imageUrl"),
  alt: text("imageAlt"),
  width: text("width"),
  height: text("height"),
  objectFit: {
    // NEW
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
```

---

## 4. Marquee Animation Duration

### 4.1 Marquee Component Update

**File**: `packages/templates/src/sections/Marquee/index.jsx`

```javascript
export const Marquee = ({
  text,
  backgroundColor,
  textColor,
  textSize = "large",
  textWeight = "bold",
  padding = "20px",
  animationDuration = "20s", // NEW: renamed from speed
  repeat = 3,
  dataElement,
  className = "",
  ...props
}) => {
  const repeatedText = Array(repeat).fill(text).join(" • ");

  const textStyle = useMemo(
    () => ({
      color: textColor,
      fontSize: textSize,
      fontWeight: textWeight,
      animationDuration: animationDuration, // NEW
    }),
    [textColor, textSize, textWeight, animationDuration],
  );

  return (
    <Section
      className={`marquee ${className}`}
      backgroundColor={backgroundColor}
      dataElement={dataElement}
      padding={padding}
    >
      <div className="marquee__track">
        <Text
          className="marquee__content"
          style={textStyle}
          data-element={`${dataElement}.text`}
        >
          {repeatedText}
        </Text>
      </div>
    </Section>
  );
};
```

### 4.2 marqueeProps Schema

```javascript
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
```

---

## 5. Dynamic Max for Column Sliders

### 5.1 Schema Processor Update

**File**: `packages/app/src/utils/schemaProcessor.js`

Add function to resolve dynamic values:

```javascript
/**
 * Resolve dynamic max value for sliders
 * Supports syntax like: { dynamic: "elements.features.items.length" }
 */
export const resolveDynamicValue = (dynamicDef, config) => {
  if (!dynamicDef || typeof dynamicDef !== "object" || !dynamicDef.dynamic) {
    return dynamicDef;
  }

  const path = dynamicDef.dynamic;
  const value = getNestedValue(config, path);

  // If path ends with .length, get array length
  if (path.endsWith(".length")) {
    const arrayPath = path.slice(0, -7); // remove '.length'
    const array = getNestedValue(config, arrayPath);
    return Array.isArray(array) ? array.length : 1;
  }

  return value || 1;
};

/**
 * Enhanced flattenSchemaWithGroups to support dynamic values
 */
export const flattenSchemaWithGroups = (
  schema,
  basePath = "",
  excludeTypes = [],
  maxDepth = undefined,
  parentKey = "",
  config = {}, // NEW: pass config for dynamic resolution
) => {
  const fields = [];
  const groups = [];

  const processObject = (obj, currentPath, currentDepth = 0) => {
    Object.entries(obj).forEach(([key, value]) => {
      const fieldPath = currentPath ? `${currentPath}.${key}` : key;

      if (value.type && typeof value.type === "string") {
        if (value.type === "array") return;

        // Resolve dynamic max value for sliders
        let max = value.max;
        if (value.type === "slider" && max) {
          max = resolveDynamicValue(max, config);
        }

        const dependency = extractDependencies(value);

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
          dependency,
          groupKey: parentKey || null,
        });
      }
      // ... rest of the function
    });
  };

  processObject(schema, basePath, 0);
  return { fields, groups };
};
```

### 5.2 getFieldsForElement Update

```javascript
/**
 * Get fields for an element, with dynamic value resolution
 */
export const getFieldsForElement = (template, elementId, config) => {
  if (!template || !template.configSchema) {
    return { fields: [], groups: [] };
  }

  const schema = template.configSchema;

  // Page-level settings
  if (elementId === "page") {
    return flattenSchemaWithGroups(
      schema.page || {},
      "page",
      ["array"],
      undefined,
      "",
      config, // Pass config for dynamic resolution
    );
  }

  // Element fields
  const elementPath = `elements.${elementId}`;
  const elementSchema = schema.elements?.[elementId];

  if (!elementSchema) {
    return { fields: [], groups: [] };
  }

  return flattenSchemaWithGroups(
    elementSchema,
    elementPath,
    ["array"],
    undefined,
    "",
    config, // Pass config for dynamic resolution
  );
};
```

### 5.3 PropertyPanel Update

```javascript
// In PropertyPanel component, pass config to getFieldsForElement
const elementFields = getFieldsForElement(
  selectedTemplate,
  activeElementId,
  tempConfig, // Pass current config
);
```

### 5.4 Config Usage

```javascript
features: {
  backgroundColor: color("backgroundColor"),
  padding: { type: "select", ... },
  maxWidth: { type: "select", ... },

  // Dynamic column slider based on items array
  columns: {
    type: "slider",
    label: "columns",
    min: 1,
    max: { dynamic: "elements.features.items.length" }, // DYNAMIC
    step: 1,
  },

  gap: { type: "select", ... },

  heading: headingContentSchema(),
  card: cardSchema(),
  items: arrayField("items"),
}
```

---

## 6. Complete Mixed Component Example: CTA

### 6.1 CTA Component with Navigation

**File**: `packages/templates/src/sections/CallToAction/index.jsx`

```javascript
export const CallToAction = ({
  // Title
  title,
  titleSize,
  titleWeight,
  titleColor,

  // Subtitle
  subtitle,
  subtitleSize,
  subtitleWeight,
  subtitleColor,

  // Button (with navigation)
  buttonText,
  buttonUrl, // NEW
  buttonColor,
  buttonTextColor,
  buttonBorderRadius,
  buttonSize = "large",

  // Section container
  backgroundColor,
  padding = "80px 20px",
  align = "center",
  maxWidth = "800px",
  gap = "20px",

  dataElement = "cta",
  className = "",
  ...props
}) => {
  const titleStyle = useMemo(
    () => ({
      fontSize: titleSize,
      fontWeight: titleWeight,
      color: titleColor,
      margin: 0,
    }),
    [titleSize, titleWeight, titleColor],
  );

  const subtitleStyle = useMemo(
    () => ({
      fontSize: subtitleSize,
      fontWeight: subtitleWeight,
      color: subtitleColor,
      opacity: 0.9,
    }),
    [subtitleSize, subtitleWeight, subtitleColor],
  );

  const buttonStyle = useMemo(
    () => ({
      backgroundColor: buttonColor,
      color: buttonTextColor,
      ...(buttonBorderRadius && { borderRadius: buttonBorderRadius }),
    }),
    [buttonColor, buttonTextColor, buttonBorderRadius],
  );

  return (
    <Section
      data-element={dataElement}
      backgroundColor={backgroundColor}
      padding={padding}
      className={`call-to-action ${className}`}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" align={align} gap={gap}>
          {title && (
            <Title
              level={2}
              className="call-to-action__title"
              style={titleStyle}
              data-element={`${dataElement}.title`}
            >
              {title}
            </Title>
          )}

          {subtitle && (
            <SubTitle
              className="call-to-action__subtitle"
              style={subtitleStyle}
              data-element={`${dataElement}.subtitle`}
            >
              {subtitle}
            </SubTitle>
          )}

          {buttonText && (
            <Button
              text={buttonText}
              url={buttonUrl} // NEW: navigation support
              size={buttonSize}
              style={buttonStyle}
              className="call-to-action__button"
              data-element={`${dataElement}.button`}
            />
          )}
        </Flex>
      </Container>
    </Section>
  );
};
```

### 6.2 CTA Config Schema

```javascript
cta: mergeSchemas(
  // Section container props
  sectionSchema(),

  // Content field groups
  {
    title: titleContentSchema(),

    subtitle: textContentSchema("text", true),

    button: {
      text: text("buttonText"),
      url: text("buttonUrl"), // NEW: for navigation
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
    },
  },
),
```

---

## 7. Translation Keys for New Features

### 7.1 English Translations

**File**: `packages/app/src/locales/en-EN.json`

```json
{
  "fields": {
    "textDecoration": "Text Decoration",
    "objectFit": "Object Fit",
    "buttonUrl": "Button URL",
    "linkUrl": "Link URL",
    "animationDuration": "Animation Duration"
  },
  "options": {
    "none": "None",
    "underline": "Underline",
    "overline": "Overline",
    "lineThrough": "Line Through",
    "cover": "Cover",
    "contain": "Contain",
    "fill": "Fill",
    "scaleDown": "Scale Down",
    "fast": "Fast",
    "mediumFast": "Medium Fast",
    "normal": "Normal",
    "slow": "Slow",
    "verySlow": "Very Slow"
  }
}
```

### 7.2 Vietnamese Translations

**File**: `packages/app/src/locales/vn-VN.json`

```json
{
  "fields": {
    "textDecoration": "Trang Trí Văn Bản",
    "objectFit": "Chế Độ Hiển Thị",
    "buttonUrl": "URL Nút Bấm",
    "linkUrl": "URL Liên Kết",
    "animationDuration": "Thời Lượng Hiệu Ứng"
  },
  "options": {
    "none": "Không",
    "underline": "Gạch Dưới",
    "overline": "Gạch Trên",
    "lineThrough": "Gạch Ngang",
    "cover": "Phủ Kín",
    "contain": "Chứa",
    "fill": "Lấp Đầy",
    "scaleDown": "Thu Nhỏ",
    "fast": "Nhanh",
    "mediumFast": "Khá Nhanh",
    "normal": "Bình Thường",
    "slow": "Chậm",
    "verySlow": "Rất Chậm"
  }
}
```

---

## 8. Testing Checklist

### Navigation System

- [ ] Internal anchor (#about) → smooth scrolls
- [ ] External URL (https://...) → opens in new tab
- [ ] Relative URL (/page) → navigates same tab
- [ ] Button with URL → works correctly
- [ ] Link with URL → works correctly
- [ ] Navigation persists after export

### Text Decoration

- [ ] Footer text decoration → applies correctly
- [ ] Link text decoration → applies correctly
- [ ] None/underline/overline/line-through → all work
- [ ] Exports correctly to HTML

### Object Fit

- [ ] Cover → image covers container
- [ ] Contain → image fits within container
- [ ] Fill → image stretches to fill
- [ ] None → image natural size
- [ ] Scale-down → smaller of contain or none

### Marquee Animation

- [ ] Animation duration changes → affects speed
- [ ] Fast/normal/slow → visible difference
- [ ] Text repeats correctly
- [ ] Smooth animation on all browsers

### Dynamic Column Slider

- [ ] Max value = items.length
- [ ] Updates when items added/removed
- [ ] Min value = 1 always
- [ ] Only shows for grid containers

### CTA Button

- [ ] All text props work
- [ ] All container props work
- [ ] URL navigation works
- [ ] Style applies correctly

---

**Priority**: HIGH
**Estimated Effort**: 3-4 days (combined with Logo implementation)
**Dependencies**: Core FormField updates from Phase 1

_Implementation ready!_ 🚀
