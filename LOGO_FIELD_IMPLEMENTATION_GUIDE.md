# Implementation Example: Logo Field System

## 📋 Complete Implementation Guide

Đây là implementation chi tiết cho Logo field system - một trong những thay đổi quan trọng nhất.

---

## 1. Schema Builder Update

### File: `packages/templates/src/utils/genericSchemaBuilders.js`

```javascript
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

  // Upload option - NEW
  file: {
    type: "imageUpload",
    label: "uploadImage",
    acceptedFormats: ["image/png", "image/jpeg", "image/svg+xml", "image/webp"],
    maxSize: 2048, // 2MB in KB
    condition: {
      field: "logo.type", // Relative path within logo object
      value: "upload",
      operator: "equals",
    },
  },

  // Text/Emoji option - with full typography
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

  // URL option - simple
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
```

---

## 2. ImageUpload Component

### File: `packages/app/src/components/form/ImageUpload/index.jsx`

```javascript
import "./index.scss";
import { memo, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const ImageUpload = memo(
  ({
    id,
    label,
    value, // base64 string or URL
    onChange,
    acceptedFormats = [
      "image/png",
      "image/jpeg",
      "image/svg+xml",
      "image/webp",
    ],
    maxSize = 2048, // KB
  }) => {
    const { t } = useTranslation();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setError("");
      setIsLoading(true);

      try {
        // Validate file type
        if (!acceptedFormats.includes(file.type)) {
          setError(
            t("imageUpload.error.invalidType", {
              types: acceptedFormats.map((f) => f.split("/")[1]).join(", "),
            }),
          );
          setIsLoading(false);
          return;
        }

        // Validate file size
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > maxSize) {
          setError(
            t("imageUpload.error.tooLarge", {
              maxSize: maxSize >= 1024 ? `${maxSize / 1024}MB` : `${maxSize}KB`,
            }),
          );
          setIsLoading(false);
          return;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          onChange(base64);
          setIsLoading(false);
        };
        reader.onerror = () => {
          setError(t("imageUpload.error.readFailed"));
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError(t("imageUpload.error.unknown"));
        setIsLoading(false);
      }
    };

    const handleRemove = () => {
      onChange("");
      setError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className="image-upload">
        <label className="image-upload__label">{label}</label>

        <div className="image-upload__container">
          {value ? (
            // Preview state
            <div className="image-upload__preview">
              <img
                src={value}
                alt={t("imageUpload.previewAlt")}
                className="image-upload__preview-image"
              />
              <div className="image-upload__preview-actions">
                <button
                  type="button"
                  className="image-upload__button image-upload__button--change"
                  onClick={handleClick}
                >
                  {t("imageUpload.change")}
                </button>
                <button
                  type="button"
                  className="image-upload__button image-upload__button--remove"
                  onClick={handleRemove}
                >
                  {t("imageUpload.remove")}
                </button>
              </div>
            </div>
          ) : (
            // Upload state
            <div className="image-upload__empty" onClick={handleClick}>
              <div className="image-upload__empty-icon">📁</div>
              <p className="image-upload__empty-text">
                {t("imageUpload.clickToUpload")}
              </p>
              <p className="image-upload__empty-hint">
                {t("imageUpload.acceptedFormats", {
                  formats: acceptedFormats
                    .map((f) => f.split("/")[1])
                    .join(", "),
                })}
              </p>
              <p className="image-upload__empty-hint">
                {t("imageUpload.maxSize", {
                  size:
                    maxSize >= 1024 ? `${maxSize / 1024}MB` : `${maxSize}KB`,
                })}
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            id={id}
            accept={acceptedFormats.join(",")}
            onChange={handleFileSelect}
            className="image-upload__input"
            style={{ display: "none" }}
          />
        </div>

        {error && <div className="image-upload__error">⚠️ {error}</div>}

        {isLoading && (
          <div className="image-upload__loading">
            {t("imageUpload.loading")}...
          </div>
        )}
      </div>
    );
  },
);

ImageUpload.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  acceptedFormats: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
};

ImageUpload.displayName = "ImageUpload";
```

### File: `packages/app/src/components/form/ImageUpload/index.scss`

```scss
@use "@page-builder/ui/variables" as *;

.image-upload {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
  }

  &__container {
    position: relative;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    padding: $spacing-xl;
    border: 2px dashed $color-border;
    border-radius: $border-radius-md;
    background-color: $color-bg-secondary;
    cursor: pointer;
    transition: all $transition-normal;

    &:hover {
      border-color: $color-primary;
      background-color: rgba($color-primary, 0.05);
    }
  }

  &__empty-icon {
    font-size: 3rem;
    opacity: 0.6;
  }

  &__empty-text {
    font-size: $font-size-md;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    margin: 0;
  }

  &__empty-hint {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    margin: 0;
  }

  &__preview {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    padding: $spacing-md;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    background-color: $color-white;
  }

  &__preview-image {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: $border-radius-sm;
  }

  &__preview-actions {
    display: flex;
    gap: $spacing-sm;
  }

  &__button {
    flex: 1;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    background-color: $color-white;
    color: $color-text-primary;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: all $transition-normal;

    &:hover {
      background-color: $color-bg-secondary;
    }

    &--remove {
      color: $color-danger;
      border-color: $color-danger;

      &:hover {
        background-color: rgba($color-danger, 0.1);
      }
    }

    &--change {
      color: $color-primary;
      border-color: $color-primary;

      &:hover {
        background-color: rgba($color-primary, 0.1);
      }
    }
  }

  &__error {
    padding: $spacing-sm;
    border-radius: $border-radius-sm;
    background-color: rgba($color-danger, 0.1);
    color: $color-danger;
    font-size: $font-size-sm;
  }

  &__loading {
    padding: $spacing-sm;
    text-align: center;
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }
}
```

---

## 3. FormField Integration

### File: `packages/app/src/components/form/FormField/index.jsx`

```javascript
// Add import
import { ImageUpload } from '../ImageUpload';

// Inside renderField() switch statement, add:
case 'imageUpload':
  return (
    <ImageUpload
      id={fieldId}
      label={translatedLabel}
      value={value || ''}
      onChange={onChange}
      acceptedFormats={options?.acceptedFormats}
      maxSize={options?.maxSize}
    />
  );
```

---

## 4. Header Component Update

### File: `packages/templates/src/sections/Header/index.jsx`

```javascript
export const Header = ({
  companyName,
  logo, // NEW: logo object { type, file, text, textSize, textWeight, textColor, url, width, height }
  backgroundColor,
  linkColor,
  links = [],
  padding = "20px 40px",
  shadow = "0 2px 4px rgba(0,0,0,0.1)",
  linkGap = 20,
  maxWidth,
  dataElement = "header",
  className = "",
  as = "header",
  ...props
}) => {
  const Component = as;

  // Memoize header style
  const headerStyle = useMemo(
    () => ({
      backgroundColor,
      padding,
      boxShadow: shadow,
    }),
    [backgroundColor, padding, shadow],
  );

  // Render logo based on type - UPDATED
  const renderLogo = () => {
    if (!logo || !logo.type) {
      // Fallback to company name
      return (
        <Title
          level={1}
          className="header__logo"
          style={{ margin: 0, color: linkColor }}
          data-element={`${dataElement}.companyName`}
        >
          {companyName}
        </Title>
      );
    }

    const {
      type,
      file,
      text,
      textSize,
      textWeight,
      textColor,
      url,
      width,
      height,
    } = logo;

    // Upload type - use base64 from file
    if (type === "upload" && file) {
      return (
        <div
          className="header__logo-wrapper"
          data-element={`${dataElement}.logo`}
        >
          <Image
            src={file} // base64 string
            alt={companyName || "Logo"}
            width={width || "40px"}
            height={height || "40px"}
            fit="contain"
            className="header__logo-image"
          />
        </div>
      );
    }

    // Text/Emoji type
    if (type === "text" && text) {
      return (
        <div
          className="header__logo-text"
          style={{
            fontSize: textSize || width || "40px",
            fontWeight: textWeight || "700",
            color: textColor || linkColor,
          }}
          data-element={`${dataElement}.logo.text`}
        >
          {text}
        </div>
      );
    }

    // URL type
    if (type === "url" && url) {
      return (
        <div
          className="header__logo-wrapper"
          data-element={`${dataElement}.logo`}
        >
          <Image
            src={url}
            alt={companyName || "Logo"}
            width={width || "40px"}
            height={height || "40px"}
            fit="contain"
            className="header__logo-image"
          />
        </div>
      );
    }

    // Fallback
    return (
      <Title
        level={1}
        className="header__logo"
        style={{ margin: 0, color: linkColor }}
        data-element={`${dataElement}.companyName`}
      >
        {companyName}
      </Title>
    );
  };

  return (
    <Component
      data-element={dataElement}
      className={`header ${className}`}
      style={headerStyle}
    >
      <Container maxWidth={maxWidth}>
        <Flex justify="space-between" align="center">
          {renderLogo()}
          {links.length > 0 && (
            <Flex gap={linkGap} as="nav" className="header__nav">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color={link.color || linkColor}
                  style={{
                    fontSize: link.size,
                    fontWeight: link.weight,
                  }}
                  data-element={`${dataElement}.links.${index}`}
                >
                  {link.text}
                </Link>
              ))}
            </Flex>
          )}
        </Flex>
      </Container>
    </Component>
  );
};
```

---

## 5. Config Usage Example

### File: `packages/templates/src/configs/businessPro.config.js`

```javascript
elements: {
  header: {
    companyName: "BusinessPro",

    // NEW: Logo object with full upload support
    logo: {
      type: "text", // "upload" | "text" | "url"
      file: "", // base64 string when type === "upload"
      text: "🚀", // text/emoji when type === "text"
      textSize: "40px",
      textWeight: "700",
      textColor: "#6366f1",
      url: "", // URL when type === "url"
      width: "40px",
      height: "40px",
    },

    backgroundColor: "#ffffff",
    linkColor: "#475569",
    // ... rest of config
  },
}
```

---

## 6. Translation Keys

### File: `packages/app/src/locales/en-EN.json`

```json
{
  "imageUpload": {
    "clickToUpload": "Click to upload an image",
    "acceptedFormats": "Accepted formats: {{formats}}",
    "maxSize": "Maximum size: {{size}}",
    "previewAlt": "Uploaded image preview",
    "change": "Change",
    "remove": "Remove",
    "loading": "Loading...",
    "error": {
      "invalidType": "Invalid file type. Accepted: {{types}}",
      "tooLarge": "File too large. Maximum: {{maxSize}}",
      "readFailed": "Failed to read file",
      "unknown": "An error occurred"
    }
  },
  "fields": {
    "logoType": "Logo Type",
    "uploadImage": "Upload Image",
    "textOrEmoji": "Text or Emoji",
    "imageUrl": "Image URL",
    "logoText": "Logo Text"
  },
  "options": {
    "uploadImage": "Upload from Computer",
    "textOrEmoji": "Text or Emoji",
    "imageUrl": "Image URL"
  }
}
```

---

## 7. Storage Optimization Hook

### File: `packages/app/src/hooks/useImageCompression.js`

```javascript
/**
 * Hook to compress images before storing
 * Reduces localStorage bloat from base64 images
 */

export const useImageCompression = () => {
  const compressImage = async (base64, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Resize if needed
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compressed base64
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.src = base64;
    });
  };

  return { compressImage };
};
```

### Usage in ImageUpload:

```javascript
import { useImageCompression } from '@/hooks/useImageCompression';

export const ImageUpload = ({ ... }) => {
  const { compressImage } = useImageCompression();

  const handleFileSelect = async (event) => {
    // ... validation code ...

    const reader = new FileReader();
    reader.onload = async (e) => {
      let base64 = e.target.result;

      // Compress if image is large
      if (fileSizeKB > 500) {
        base64 = await compressImage(base64, 800, 0.8);
      }

      onChange(base64);
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };
};
```

---

## 8. Testing Checklist

### Manual Testing Steps:

- [ ] **Upload Image**
  - [ ] Select PNG file → should preview and save
  - [ ] Select JPG file → should preview and save
  - [ ] Select SVG file → should preview and save
  - [ ] Select invalid format → should show error
  - [ ] Select file > 2MB → should show error
  - [ ] Remove uploaded image → should clear

- [ ] **Text/Emoji**
  - [ ] Enter text "Logo" → should display with typography
  - [ ] Paste emoji "🚀" → should display
  - [ ] Change text size → should update
  - [ ] Change text weight → should update
  - [ ] Change text color → should update

- [ ] **Image URL**
  - [ ] Enter valid URL → should display image
  - [ ] Enter invalid URL → should show broken image
  - [ ] Change URL → should update

- [ ] **Persistence**
  - [ ] Upload image → refresh page → should persist
  - [ ] Change to text → refresh → should persist
  - [ ] Undo/redo → should work correctly

- [ ] **Export**
  - [ ] Uploaded logo → export HTML → logo should be included
  - [ ] Text logo → export HTML → should render correctly
  - [ ] URL logo → export HTML → should link correctly

---

## 9. Performance Considerations

### Base64 Image Size Impact:

| Image Size | Base64 Size | Recommendation |
| ---------- | ----------- | -------------- |
| 50KB       | ~67KB       | ✅ OK          |
| 100KB      | ~133KB      | ✅ OK          |
| 500KB      | ~667KB      | ⚠️ Compress    |
| 1MB        | ~1.3MB      | ❌ Too large   |
| 2MB+       | ~2.6MB+     | ❌ Reject      |

### Optimization Strategies:

1. **Compression**: Automatically compress images > 500KB
2. **Format**: Convert to JPEG for photos, keep SVG for icons
3. **Limit**: Max 2MB file size enforced
4. **Warning**: Show storage usage warning in UI
5. **Cleanup**: Provide "clear all images" utility

---

## 10. Migration Guide

### For Existing Configs:

```javascript
// OLD (before)
header: {
  logo: {
    type: "text",
    text: "🚀",
    url: "",
  },
}

// NEW (after) - no breaking changes
header: {
  logo: {
    type: "text", // same
    file: "", // NEW - for upload
    text: "🚀", // same
    textSize: "40px", // NEW
    textWeight: "700", // NEW
    textColor: "#6366f1", // NEW
    url: "", // same
    width: "40px", // same (moved from top level)
    height: "40px", // same (moved from top level)
  },
}
```

### Automated Migration Script:

```javascript
// utils/migrateLogoConfig.js
export const migrateLogoConfig = (oldConfig) => {
  const logo = oldConfig.elements?.header?.logo;
  if (!logo) return oldConfig;

  return {
    ...oldConfig,
    elements: {
      ...oldConfig.elements,
      header: {
        ...oldConfig.elements.header,
        logo: {
          type: logo.type || "text",
          file: "",
          text: logo.text || "",
          textSize: logo.textSize || "40px",
          textWeight: logo.textWeight || "700",
          textColor:
            logo.textColor || oldConfig.elements.header.logoColor || "#000",
          url: logo.url || "",
          width: logo.width || oldConfig.elements.header.logoWidth || "40px",
          height: logo.height || oldConfig.elements.header.logoHeight || "40px",
        },
      },
    },
  };
};
```

---

**Implementation Priority**: HIGH
**Estimated Effort**: 2-3 days
**Dependencies**: None (standalone feature)
**Testing Required**: Extensive (file upload security)

_Ready for implementation!_
