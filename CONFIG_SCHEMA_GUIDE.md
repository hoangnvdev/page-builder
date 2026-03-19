# Config Schema Guide

**Version**: 2.0
**Last Updated**: March 19, 2026
**Purpose**: Complete reference for template config schema builders

---

## TABLE OF CONTENTS

1. [Overview](#i-overview)
2. [Schema Structure](#ii-schema-structure)
3. [Field Builders](#iii-field-builders)
4. [Generic Schema Builders](#iv-generic-schema-builders)
5. [Advanced Patterns](#v-advanced-patterns)
6. [Best Practices](#vi-best-practices)
7. [Examples](#vii-examples)
8. [Troubleshooting](#viii-troubleshooting)

---

## I. OVERVIEW

### What are Schema Builders?

Schema builders are functions that generate standardized configuration schemas for template properties. They enforce consistency, reduce boilerplate, and provide type-safe property definitions.

### Why Use Schema Builders?

✅ **Consistency** - Same patterns across all templates
✅ **Less Code** - Reusable building blocks
✅ **Type Safety** - Validated at runtime
✅ **Automatic UI** - PropertyPanel generates form controls
✅ **Documentation** - Self-documenting configs

### Import Path:

```javascript
import {
  // Field builders
  text,
  slider,
  color,
  font,
  toggle,
  select,
  arrayField,

  // Generic schema builders
  buttonSchema,
  cardSchema,
  gridLayoutProps,
  headingContentSchema,
  imageProps,
  linkSchema,
  logoFieldComplete,
  imagePropsComplete,
  textContentPropsEnhanced,
  marqueePropsComplete,
  buttonPropsWithNavigation,
  mergeSchemas,
  sectionSchema,
  textContentSchema,
  titleContentSchema,
} from "../utils/genericSchemaBuilders.js";
```

---

## II. SCHEMA STRUCTURE

### Basic Schema Format

```javascript
{
  propertyName: {
    type: 'text' | 'slider' | 'color' | 'select' | 'toggle' | 'font' | 'imageUpload' | 'radio',
    label: 'translationKey', // Key from locales/en-EN.json
    defaultValue: any,
    min?: number, // For slider
    max?: number | { dynamic: "path" }, // For slider
    step?: number, // For slider
    options?: Array<{value: any, label: string}>, // For select, radio
    placeholder?: string, // For text
  }
}
```

### Example - Single Property:

```javascript
backgroundColor: {
  type: 'color',
  label: 'backgroundColor',
  defaultValue: '#ffffff',
}
```

### Example - Nested Properties:

```javascript
button: {
  text: {
    type: 'text',
    label: 'buttonText',
    placeholder: 'enterButtonText',
  },
  url: {
    type: 'text',
    label: 'buttonUrl',
    placeholder: 'enterUrl',
  },
  backgroundColor: {
    type: 'color',
    label: 'buttonBackground',
  },
}
```

---

## III. FIELD BUILDERS

Field builders are low-level functions that create individual form fields.

### 1. `text(label, placeholder)`

Creates a text input field.

**Parameters**:

- `label` (string) - Translation key
- `placeholder` (string, optional) - Translation key for placeholder

**Returns**: Schema object with type 'text'

**Example**:

```javascript
import { text } from "../utils/fieldBuilders.js";

title: text("title", "enterTitle");
// Output:
// {
//   type: 'text',
//   label: 'title',
//   placeholder: 'enterTitle',
// }
```

### 2. `slider(label, min, max, step)`

Creates a slider (range) input.

**Parameters**:

- `label` (string) - Translation key
- `min` (number) - Minimum value
- `max` (number | { dynamic: string }) - Maximum value (static or dynamic)
- `step` (number, default: 1) - Increment step

**Returns**: Schema object with type 'slider'

**Examples**:

```javascript
import { slider } from "../utils/fieldBuilders.js";

// Static max
fontSize: slider("fontSize", 12, 48, 2);

// Dynamic max (adjusts to array length)
columns: slider("columns", 1, { dynamic: "elements.features.items.length" });
```

### 3. `color(label)`

Creates a color picker.

**Parameters**:

- `label` (string) - Translation key

**Returns**: Schema object with type 'color'

**Example**:

```javascript
import { color } from "../utils/fieldBuilders.js";

textColor: color("textColor");
```

### 4. `font(label)`

Creates a font family selector.

**Parameters**:

- `label` (string) - Translation key

**Returns**: Schema object with type 'font'

**Example**:

```javascript
import { font } from "../utils/fieldBuilders.js";

fontFamily: font("fontFamily");
```

### 5. `toggle(label)`

Creates a checkbox/toggle switch.

**Parameters**:

- `label` (string) - Translation key

**Returns**: Schema object with type 'toggle'

**Example**:

```javascript
import { toggle } from "../utils/fieldBuilders.js";

enabled: toggle("enabled");
```

### 6. `select(label, options)`

Creates a dropdown selector.

**Parameters**:

- `label` (string) - Translation key
- `options` (Array) - Array of `{value, label}` objects

**Returns**: Schema object with type 'select'

**Example**:

```javascript
import { select } from "../utils/fieldBuilders.js";

alignment: select("alignment", [
  { value: "left", label: "left" },
  { value: "center", label: "center" },
  { value: "right", label: "right" },
]);
```

### 7. `arrayField(itemSchema, addLabel, removeLabel)`

Creates an array field for managing lists of items.

**Parameters**:

- `itemSchema` (object) - Schema for each array item
- `addLabel` (string) - Translation key for "Add" button
- `removeLabel` (string) - Translation key for "Remove" button

**Returns**: Schema object with type 'array'

**Example**:

```javascript
import { arrayField, cardSchema } from "../utils/genericSchemaBuilders.js";

items: arrayField(cardSchema(), "addFeature", "removeFeature");
```

---

## IV. GENERIC SCHEMA BUILDERS

Generic schema builders are higher-level functions that create common property patterns.

### 1. `sectionSchema()`

Creates common section properties (visibility, spacing, background, border).

**Parameters**: None

**Returns**: Schema object with common section properties

**Properties Included**:

- `visible` (toggle) - Show/hide section
- `paddingTop` (slider: 0-200px)
- `paddingBottom` (slider: 0-200px)
- `backgroundColor` (color)
- `backgroundImage` (text, URL)
- `backgroundSize` (select: cover, contain, auto)
- `backgroundPosition` (select: top, center, bottom)
- `borderTop` (slider: 0-10px)
- `borderBottom` (slider: 0-10px)
- `borderColor` (color)

**Example**:

```javascript
import { sectionSchema } from "../utils/genericSchemaBuilders.js";

hero: sectionSchema();
// Used as base for sections
```

### 2. `titleContentSchema(label)`

Creates schema for title text with typography controls.

**Parameters**:

- `label` (string) - Translation key prefix

**Returns**: Schema object with title properties

**Properties Included**:

- `text` (text)
- `fontSize` (slider: 16-72px)
- `fontWeight` (select: 300-900)
- `color` (color)
- `textAlign` (select: left, center, right)
- `lineHeight` (slider: 1-2)

**Example**:

```javascript
import { titleContentSchema } from "../utils/genericSchemaBuilders.js";

title: titleContentSchema("title");
```

### 3. `textContentSchema(label)`

Creates schema for paragraph text with typography controls.

**Parameters**:

- `label` (string) - Translation key prefix

**Returns**: Schema object with text properties

**Properties Included**:

- `text` (text)
- `fontSize` (slider: 12-32px)
- `color` (color)
- `textAlign` (select: left, center, right)
- `lineHeight` (slider: 1-2)

**Example**:

```javascript
import { textContentSchema } from "../utils/genericSchemaBuilders.js";

description: textContentSchema("description");
```

### 4. `textContentPropsEnhanced(label)` ⭐ NEW

Enhanced version of `textContentSchema` with text decoration support.

**Parameters**:

- `label` (string) - Translation key prefix

**Returns**: Schema object with text properties + decoration

**Additional Property**:

- `decoration` (select: none, underline, overline, line-through)

**Example**:

```javascript
import { textContentPropsEnhanced } from "../utils/genericSchemaBuilders.js";

footer: {
  text: textContentPropsEnhanced("text");
}
```

### 5. `headingContentSchema(label)`

Creates schema for heading text (between title and text).

**Parameters**:

- `label` (string) - Translation key prefix

**Returns**: Schema object with heading properties

**Properties Included**:

- `text` (text)
- `fontSize` (slider: 18-48px)
- `fontWeight` (select: 400-900)
- `color` (color)
- `textAlign` (select: left, center, right)

**Example**:

```javascript
import { headingContentSchema } from "../utils/genericSchemaBuilders.js";

subtitle: headingContentSchema("subtitle");
```

### 6. `buttonSchema()` / `buttonPropsWithNavigation()`

Creates schema for button with text, URL, and styling.

**Parameters**: None

**Returns**: Schema object with button properties

**Properties Included**:

- `text` (text)
- `url` (text) - Navigation URL ⭐ NEW
- `backgroundColor` (color)
- `textColor` (color)
- `fontSize` (slider: 12-24px)
- `paddingVertical` (slider: 8-24px)
- `paddingHorizontal` (slider: 16-48px)
- `borderRadius` (slider: 0-999px)

**Example**:

```javascript
import { buttonSchema } from "../utils/genericSchemaBuilders.js";

button: buttonSchema();
```

**Note**: `buttonSchema` is an alias for `buttonPropsWithNavigation` (backward compatible).

### 7. `linkSchema(label)`

Creates schema for clickable link with URL.

**Parameters**:

- `label` (string) - Translation key prefix

**Returns**: Schema object with link properties

**Properties Included**:

- `text` (text)
- `url` (text) - Navigation URL ⭐ NEW
- `color` (color)
- `fontSize` (slider: 12-24px)

**Example**:

```javascript
import { linkSchema } from "../utils/genericSchemaBuilders.js";

learnMore: linkSchema("learnMore");
```

### 8. `imageProps()`

Creates basic schema for image properties.

**Parameters**: None

**Returns**: Schema object with image properties

**Properties Included**:

- `url` (text)
- `alt` (text)
- `width` (slider: 50-1000px OR text for %)
- `height` (slider: 50-800px OR text for %)

**Example**:

```javascript
import { imageProps } from "../utils/genericSchemaBuilders.js";

image: imageProps();
```

### 9. `imagePropsComplete()` ⭐ NEW

Enhanced version of `imageProps` with object-fit support.

**Parameters**: None

**Returns**: Schema object with image properties + objectFit

**Additional Property**:

- `objectFit` (select: cover, contain, fill, none, scale-down)

**Example**:

```javascript
import { imagePropsComplete } from "../utils/genericSchemaBuilders.js";

gallery: {
  items: arrayField({
    image: imagePropsComplete(), // With objectFit!
  });
}
```

### 10. `logoFieldComplete()` ⭐ NEW

Creates complete logo configuration with upload, text, and URL options.

**Parameters**: None

**Returns**: Schema object with comprehensive logo properties

**Properties Included**:

- `type` (radio: upload, text, url)
- `file` (imageUpload) - For type="upload"
- `text` (text) - For type="text"
- `textSize` (slider: 16-64px)
- `textWeight` (select: 300-900)
- `textColor` (color)
- `url` (text) - For type="url"
- `width` (slider: 20-200px)
- `height` (slider: 20-200px)

**Example**:

```javascript
import { logoFieldComplete } from '../utils/genericSchemaBuilders.js';

header: {
  logo: logoFieldComplete(), // All-in-one logo system!
}
```

### 11. `marqueePropsComplete()` ⭐ NEW

Creates complete marquee/ticker configuration.

**Parameters**: None

**Returns**: Schema object with marquee properties

**Properties Included**:

- `text` (text)
- `backgroundColor` (color)
- `textColor` (color)
- `fontSize` (slider: 12-32px)
- `fontWeight` (select: 300-900)
- `animationDuration` (select: 10s, 15s, 20s, 30s, 40s) ⭐ NEW
- `paddingVertical` (slider: 8-32px)

**Example**:

```javascript
import { marqueePropsComplete } from "../utils/genericSchemaBuilders.js";

marquee: marqueePropsComplete();
```

### 12. `cardSchema()`

Creates schema for card with icon, title, and description.

**Parameters**: None

**Returns**: Schema object with card properties

**Properties Included**:

- `icon` (text) - Emoji or icon
- `title` (titleContentSchema)
- `description` (textContentSchema)

**Example**:

```javascript
import { cardSchema, arrayField } from "../utils/genericSchemaBuilders.js";

features: {
  items: arrayField(cardSchema(), "addFeature", "removeFeature");
}
```

### 13. `gridLayoutProps(maxColumns)`

Creates schema for grid layout controls (columns and gap).

**Parameters**:

- `maxColumns` (number) - Maximum number of columns

**Returns**: Schema object with grid layout properties

**Properties Included**:

- `columns` (slider: 1-maxColumns)
- `gap` (select: 16px, 24px, 32px)

**Example**:

```javascript
import { gridLayoutProps } from "../utils/genericSchemaBuilders.js";

features: mergeSchemas(
  sectionSchema(),
  gridLayoutProps(4), // Max 4 columns
  {
    items: arrayField(cardSchema()),
  },
);
```

**⚠️ Deprecated**: Use dynamic slider instead (see Advanced Patterns).

### 14. `mergeSchemas(...schemas)`

Merges multiple schema objects into one.

**Parameters**:

- `...schemas` (objects) - Variable number of schema objects

**Returns**: Merged schema object

**Example**:

```javascript
import {
  mergeSchemas,
  sectionSchema,
  titleContentSchema,
  buttonSchema,
} from "../utils/genericSchemaBuilders.js";

hero: mergeSchemas(
  sectionSchema(), // Base section properties
  {
    title: titleContentSchema("title"),
    button: buttonSchema(),
  },
);
```

---

## V. ADVANCED PATTERNS

### 1. Dynamic Slider Max ⭐ NEW

Make slider max value adjust to array length automatically.

**Use Case**: Column slider that adjusts to number of items

**Syntax**:

```javascript
columns: slider("columns", 1, { dynamic: "path.to.array.length" });
```

**Example**:

```javascript
import { slider, arrayField, cardSchema } from '../utils/genericSchemaBuilders.js';

features: {
  columns: slider("columns", 1, { dynamic: "elements.features.items.length" }),
  gap: select("gap", [
    { value: "16px", label: "compact" },
    { value: "24px", label: "comfort" },
    { value: "32px", label: "spacious" },
  ]),
  items: arrayField(cardSchema(), "addFeature", "removeFeature"),
}
```

**How It Works**:

1. User adds/removes items in array
2. schemaProcessor detects `{ dynamic: "..." }`
3. Resolves path to get array length
4. Updates slider max dynamically
5. UI re-renders with new max

### 2. Conditional Properties

Show/hide properties based on other values.

**Example**:

```javascript
logo: {
  type: select("logoType", [
    { value: "upload", label: "Upload Image" },
    { value: "text", label: "Text/Emoji" },
    { value: "url", label: "Image URL" },
  ]),

  // Shown only when type="upload"
  file: {
    type: 'imageUpload',
    label: 'uploadLogo',
    condition: (values) => values.type === 'upload',
  },

  // Shown only when type="text"
  text: {
    type: 'text',
    label: 'logoText',
    condition: (values) => values.type === 'text',
  },

  // Shown only when type="url"
  url: {
    type: 'text',
    label: 'imageUrl',
    condition: (values) => values.type === 'url',
  },
}
```

**Note**: Conditional properties are handled by PropertyPanel component.

### 3. Nested Arrays

Arrays of items, where each item has an array.

**Example**:

```javascript
sections: arrayField(
  {
    title: text("sectionTitle"),
    items: arrayField(
      {
        text: text("itemText"),
        icon: text("icon"),
      },
      "addItem",
      "removeItem",
    ),
  },
  "addSection",
  "removeSection",
);
```

### 4. Custom Validators

Add validation to fields (requires PropertyPanel enhancement).

**Example**:

```javascript
email: {
  type: 'text',
  label: 'email',
  validate: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || "Invalid email";
  },
}
```

---

## VI. BEST PRACTICES

### 1. Use Builders Over Manual Schemas

**❌ Don't**:

```javascript
title: {
  text: { type: 'text', label: 'titleText' },
  fontSize: { type: 'slider', label: 'fontSize', min: 16, max: 72 },
  fontWeight: { type: 'select', label: 'fontWeight', options: [...] },
  color: { type: 'color', label: 'titleColor' },
  // ... many lines
}
```

**✅ Do**:

```javascript
title: titleContentSchema("title");
```

### 2. Always Use Translation Keys

**❌ Don't**:

```javascript
title: text("Enter a title"); // Hardcoded English
```

**✅ Do**:

```javascript
title: text("title"); // Uses locales/en-EN.json
```

### 3. Start with Section Schema

**❌ Don't**:

```javascript
hero: {
  title: titleContentSchema("title"),
  // No padding, background, etc.
}
```

**✅ Do**:

```javascript
hero: mergeSchemas(
  sectionSchema(), // Base properties
  {
    title: titleContentSchema("title"),
  },
);
```

### 4. Use Dynamic Sliders for Arrays

**❌ Don't**:

```javascript
columns: slider("columns", 1, 4); // Static max
```

**✅ Do**:

```javascript
columns: slider("columns", 1, { dynamic: "elements.features.items.length" });
```

### 5. Group Related Properties

**❌ Don't**:

```javascript
titleText: text("titleText"),
titleSize: slider("titleSize", 24, 72),
titleColor: color("titleColor"),
descriptionText: text("descriptionText"),
descriptionSize: slider("descriptionSize", 14, 24),
```

**✅ Do**:

```javascript
title: titleContentSchema("title"),
description: textContentSchema("description"),
```

### 6. Provide Sensible Defaults

**❌ Don't**:

```javascript
fontSize: slider("fontSize", 1, 200); // Way too broad
```

**✅ Do**:

```javascript
fontSize: slider("fontSize", 12, 48, 2); // Reasonable range
```

### 7. Use Complete Builders for New Features

**❌ Don't**:

```javascript
image: imageProps(); // Missing objectFit
```

**✅ Do**:

```javascript
image: imagePropsComplete(); // Includes objectFit
```

---

## VII. EXAMPLES

### Example 1: Simple Hero Section

```javascript
import {
  buttonSchema,
  mergeSchemas,
  sectionSchema,
  textContentSchema,
  titleContentSchema,
} from "../utils/genericSchemaBuilders.js";

export const myTemplateConfig = {
  configSchema: {
    elements: {
      hero: mergeSchemas(sectionSchema(), {
        title: titleContentSchema("title"),
        description: textContentSchema("description"),
        button: buttonSchema(),
      }),
    },
  },

  defaultConfig: {
    elements: {
      hero: {
        visible: true,
        paddingTop: "80px",
        paddingBottom: "80px",
        backgroundColor: "#f5f5f5",
        title: {
          text: "Welcome to MyApp",
          fontSize: "48px",
          fontWeight: "700",
          color: "#000",
          textAlign: "center",
        },
        description: {
          text: "Build amazing websites without code",
          fontSize: "18px",
          color: "#666",
          textAlign: "center",
        },
        button: {
          text: "Get Started",
          url: "#features",
          backgroundColor: "#007bff",
          textColor: "#fff",
          fontSize: "16px",
          paddingVertical: "12px",
          paddingHorizontal: "32px",
          borderRadius: "8px",
        },
      },
    },
  },
};
```

### Example 2: Features Grid with Dynamic Columns

```javascript
import {
  arrayField,
  cardSchema,
  mergeSchemas,
  sectionSchema,
  titleContentSchema,
} from "../utils/genericSchemaBuilders.js";
import { slider, select } from "../utils/fieldBuilders.js";

export const myTemplateConfig = {
  configSchema: {
    elements: {
      features: mergeSchemas(sectionSchema(), {
        title: titleContentSchema("title"),
        columns: slider("columns", 1, {
          dynamic: "elements.features.items.length",
        }),
        gap: select("gap", [
          { value: "16px", label: "compact" },
          { value: "24px", label: "comfort" },
          { value: "32px", label: "spacious" },
        ]),
        items: arrayField(cardSchema(), "addFeature", "removeFeature"),
      }),
    },
  },

  defaultConfig: {
    elements: {
      features: {
        visible: true,
        paddingTop: "80px",
        paddingBottom: "80px",
        backgroundColor: "#fff",
        title: {
          text: "Features",
          fontSize: "42px",
          fontWeight: "700",
          color: "#000",
          textAlign: "center",
        },
        columns: 3,
        gap: "24px",
        items: [
          {
            icon: "⚡",
            title: {
              text: "Fast",
              fontSize: "24px",
              fontWeight: "600",
              color: "#000",
            },
            description: {
              text: "Lightning fast performance",
              fontSize: "16px",
              color: "#666",
            },
          },
          // ... more items
        ],
      },
    },
  },
};
```

### Example 3: Header with Logo Upload

```javascript
import {
  logoFieldComplete,
  mergeSchemas,
} from "../utils/genericSchemaBuilders.js";
import { text, color, slider } from "../utils/fieldBuilders.js";

export const myTemplateConfig = {
  configSchema: {
    elements: {
      header: {
        logo: logoFieldComplete(),
        companyName: text("companyName"),
        backgroundColor: color("backgroundColor"),
        height: slider("headerHeight", 60, 120),
      },
    },
  },

  defaultConfig: {
    elements: {
      header: {
        logo: {
          type: "text",
          text: "🚀",
          textSize: "32px",
          textWeight: "600",
          textColor: "#000",
          width: "40px",
          height: "40px",
        },
        companyName: "MyCompany",
        backgroundColor: "#fff",
        height: "80px",
      },
    },
  },
};
```

### Example 4: Footer with Text Decoration

```javascript
import {
  mergeSchemas,
  textContentPropsEnhanced,
} from "../utils/genericSchemaBuilders.js";
import { color, slider } from "../utils/fieldBuilders.js";

export const myTemplateConfig = {
  configSchema: {
    elements: {
      footer: {
        text: textContentPropsEnhanced("text"),
        backgroundColor: color("backgroundColor"),
        paddingVertical: slider("paddingVertical", 20, 80),
      },
    },
  },

  defaultConfig: {
    elements: {
      footer: {
        text: {
          text: "© 2024 MyCompany. All rights reserved.",
          fontSize: "14px",
          color: "#666",
          textAlign: "center",
          decoration: "none", // none, underline, overline, line-through
        },
        backgroundColor: "#f5f5f5",
        paddingVertical: "40px",
      },
    },
  },
};
```

---

## VIII. TROUBLESHOOTING

### Issue: "Schema builder not found"

**Symptom**: Import error for schema builder

**Solution**: Check import path and ensure builder exists:

```javascript
// Correct import
import { buttonSchema } from "../utils/genericSchemaBuilders.js";

// Common mistake
import { buttonSchema } from "./genericSchemaBuilders.js"; // Wrong path
```

### Issue: "Dynamic slider not adjusting"

**Symptom**: Slider max stays static even when items added/removed

**Solution**: Check dynamic path matches config structure:

```javascript
// Config structure
defaultConfig: {
  elements: {
    features: {
      items: [...]
    }
  }
}

// Schema must match
columns: slider("columns", 1, { dynamic: "elements.features.items.length" })
//                                       ^^^^^^^^^^^^^^^^^^^^^^^^
//                                       Must match exactly
```

### Issue: "Translation key not found"

**Symptom**: UI shows translation key instead of text

**Solution**: Add missing key to `locales/en-EN.json`:

```json
{
  "propertyPanel": {
    "myCustomLabel": "My Custom Label"
  }
}
```

### Issue: "Logo upload not working"

**Symptom**: Logo upload field not visible

**Solution**: Ensure FormField supports 'imageUpload' type:

```javascript
// In FormField/index.jsx
case 'imageUpload':
  return <ImageUpload {...props} />;
```

### Issue: "Button URL not navigating"

**Symptom**: Button click does nothing

**Solution**: Ensure component reads `url` property:

```javascript
// In CallToAction/index.jsx or Hero/index.jsx
const { buttonUrl } = section;
<a href={buttonUrl}>
  <Button>{buttonText}</Button>
</a>;
```

### Issue: "Object fit not applying"

**Symptom**: Images don't respect objectFit setting

**Solution**: Use `imagePropsComplete()` not `imageProps()`:

```javascript
// Wrong
image: imageProps(), // No objectFit

// Right
image: imagePropsComplete(), // Includes objectFit
```

---

## APPENDIX: Quick Reference

### Field Types

| Type        | Use For              | Builder        |
| ----------- | -------------------- | -------------- |
| text        | Short text input     | `text()`       |
| slider      | Numeric range        | `slider()`     |
| color       | Color picker         | `color()`      |
| font        | Font selector        | `font()`       |
| toggle      | Boolean on/off       | `toggle()`     |
| select      | Dropdown menu        | `select()`     |
| radio       | Visual option picker | N/A (manual)   |
| imageUpload | Image upload         | N/A (manual)   |
| array       | List of items        | `arrayField()` |

### Common Builders

| Builder                      | Purpose                    |
| ---------------------------- | -------------------------- |
| `sectionSchema()`            | Base section properties    |
| `titleContentSchema()`       | Large heading text         |
| `headingContentSchema()`     | Medium heading text        |
| `textContentSchema()`        | Paragraph text             |
| `textContentPropsEnhanced()` | Text with decoration       |
| `buttonSchema()`             | Call-to-action button      |
| `linkSchema()`               | Clickable link             |
| `imageProps()`               | Basic image                |
| `imagePropsComplete()`       | Image with objectFit       |
| `logoFieldComplete()`        | Complete logo system       |
| `marqueePropsComplete()`     | Scrolling text ticker      |
| `cardSchema()`               | Icon + title + description |
| `mergeSchemas()`             | Combine schemas            |

### Dynamic Values

```javascript
// Dynamic slider max
{
  dynamic: "path.to.array.length";
}

// Example paths
("elements.features.items.length");
("elements.header.navigation.items.length");
("elements.gallery.images.length");
```

---

**Need more help? Check:**

- Migration Guide: `MIGRATION_GUIDE.md`
- Testing Guide: `WEEK_4_TESTING_GUIDE.md`
- Implementation: `packages/templates/src/utils/genericSchemaBuilders.js`

---

**Happy building! 🚀**
