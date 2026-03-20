# Generic Schema Builders - Architecture Guide

## 🎯 Mục tiêu

Refactor template configs để:

1. **DRY (Don't Repeat Yourself)** - Loại bỏ code trùng lặp
2. **Separation of Concerns** - Tách biệt container props vs content props
3. **Maintainability** - Dễ maintain và extend
4. **Type Safety** - Nhất quán về structure

## 📐 Nguyên lý thiết kế (Based on CSS Architecture)

### 1. **Container Props** (Nhóm bao bọc)

Dành cho elements như `<div>`, `<section>`, `<card>`, `<article>`

**Layout & Positioning:**

- `maxWidth`, `align`, `padding`, `gap`

**Box Model & Border:**

- `borderRadius`, `borderWidth`, `borderColor`

**Background & Visual:**

- `backgroundColor`, `dropShadow`

**Grid/Flex:**

- `columns`, `gap` (for grid layouts)

### 2. **Content Props** (Nhóm hiển thị nội dung)

Dành cho elements như `<p>`, `<span>`, `<h1>`, `<textarea>`

**Typography:**

- `fontSize`, `fontWeight`, `color`
- `text`, `content` (actual content)

**Interaction:**

- hover states, focus styles (handled in components)

### 3. **Replaced Element Props** (Nhóm đặc biệt)

Dành cho `<img>`, `<video>`, `<iframe>`

**Sizing & Layout:**

- `width`, `height`, `objectFit`, `objectPosition`

**Visual:**

- `borderRadius`, `dropShadow`, `filter`

## 🏗️ Schema Builders Structure

### Container Builders

```javascript
// Layout properties
layoutProps();
// → maxWidth, align

// Spacing properties
spacingProps((type = "section"));
// → padding, gap

// Border properties
borderProps();
// → borderRadius, borderWidth, borderColor

// Background & visual
visualProps();
// → backgroundColor, dropShadow

// Grid layout
gridLayoutProps((maxColumns = 6));
// → columns, gap
```

### Content Builders

```javascript
// Typography control
typographyProps((sizeType = "text"));
// → size, weight, color

// Text content with typography
textContentSchema(sizeType, isMultiline);
// → text, size, weight, color

// Heading
headingContentSchema();
// → text (heading), size, weight, color

// Title
titleContentSchema();
// → text (title), size, weight, color
```

### Replaced Element Builders

```javascript
// Full image control
imageProps();
// → url, alt, objectFit, borderRadius, dropShadow

// Avatar/Icon
avatarProps();
// → url, size, borderRadius, backgroundColor
```

### Composite Builders

```javascript
// Complete section (most common)
sectionSchema();
// → Combines: visualProps + spacingProps + layoutProps

// Complete card
cardSchema();
// → Combines: visualProps + spacingProps + borderProps + align

// Button
buttonSchema();
// → text, url, colors, size, borderRadius
```

## ✅ Lợi ích của approach này

### 1. **Code Reusability**

**Before:**

```javascript
hero: {
  backgroundColor: color("Background Color"),
  padding: { type: "select", label: "Padding", options: sectionPaddingOptions },
  maxWidth: { type: "select", label: "Max Width", options: maxWidthOptions },
  align: { type: "select", label: "Alignment", options: alignOptions },
  title: {
    text: text("Title"),
    color: color("Title Color"),
    size: { type: "select", label: "Title Size", options: headingSizeOptions },
  },
  // ... repeated for every section
}
```

**After:**

```javascript
hero: mergeSchemas(sectionSchema(), {
  title: titleContentSchema(),
  subtitle: textContentSchema("text", true),
  button: buttonSchema(),
});
```

### 2. **Consistency**

Tất cả sections đều có cùng structure và naming:

- `backgroundColor` (không phải `bgColor` hay `background`)
- `textColor` (không phải `color` hay `fontColor`)
- `fontSize` (không phải `size` hay `textSize`)

### 3. **Easy to Extend**

Thêm property mới cho tất cả containers:

```javascript
export const visualProps = () => ({
  backgroundColor: color("backgroundColor"),
  dropShadow: { ... },
  // ✨ Add new property
  opacity: slider("opacity", 0, 100),
});
```

→ Tất cả sections sử dụng `sectionSchema()` sẽ tự động có `opacity`

### 4. **Type-Safe & Predictable**

Developer biết chính xác schema structure:

- Container có gì? → Check `sectionSchema()` or `cardSchema()`
- Content có gì? → Check `textContentSchema()` or `titleContentSchema()`
- Image có gì? → Check `imageProps()`

## 🎨 Example: Building a New Template

```javascript
import {
  sectionSchema,
  gridLayoutProps,
  headingContentSchema,
  cardSchema,
  titleContentSchema,
  textContentSchema,
  imageProps,
  buttonSchema,
  mergeSchemas,
  arrayField,
} from "../utils/genericSchemaBuilders.js";

export const myNewTemplate = {
  id: "my-template",
  name: "My Template",

  configSchema: {
    elements: {
      // Hero with title + button
      hero: mergeSchemas(sectionSchema(), {
        title: titleContentSchema(),
        button: buttonSchema(),
      }),

      // Feature grid with cards
      features: mergeSchemas(sectionSchema(), gridLayoutProps(3), {
        heading: headingContentSchema(),
        card: mergeSchemas(cardSchema(), {
          icon: imageProps(),
          title: titleContentSchema(),
          content: textContentSchema("text", true),
        }),
        items: arrayField("items"),
      }),
    },
  },
};
```

## 📊 Comparison Table

| Aspect           | Before (Manual)     | After (Generic Builders) |
| ---------------- | ------------------- | ------------------------ |
| Lines of code    | ~400-500 lines      | ~150-200 lines           |
| Duplicated props | High                | None                     |
| Consistency      | Manual effort       | Automatic                |
| Adding new props | Touch all files     | Update 1 builder         |
| Learning curve   | Every config unique | Learn builders once      |
| Maintenance      | Hard                | Easy                     |

## 🚀 Next Steps

1. **Refactor existing templates** sử dụng generic builders
2. **Add more builders** nếu cần (e.g., `videoProps()`, `formSchema()`)
3. **Type definitions** (TypeScript) để type-safe hơn
4. **Documentation** cho từng builder function
5. **Unit tests** cho builders

## 💡 Best Practices

1. **Always use builders** thay vì hardcode schema
2. **Use mergeSchemas()** để combine multiple schemas
3. **Keep builders small** và focused (single responsibility)
4. **Name consistently** với translation keys
5. **Document special cases** khi cần deviation

---

**Philosophy:** "Build once, use everywhere. Make the simple things simple, and the complex things possible."
