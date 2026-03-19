# Migration Guide - Config Standardization

**Version**: 2.0
**Date**: March 19, 2026
**Breaking Changes**: Minimal (backward compatible)

---

## I. OVERVIEW

This guide helps you migrate from the old config system to the new standardized, config-driven architecture. Most changes are **backward compatible**, but new features require config updates.

---

## II. NEW FEATURES AVAILABLE

### 1. Logo Upload System ⭐ NEW

**Old Way** (still works):

```javascript
header: {
  logo: {
    type: "image",
    url: "https://example.com/logo.png",
    // or
    type: "text",
    text: "🚀 MyApp"
  }
}
```

**New Way** (recommended):

```javascript
import { logoFieldComplete } from '../utils/genericSchemaBuilders.js';

header: {
  logo: logoFieldComplete(),
  // ... other props
}
```

**Config Schema**:

```javascript
configSchema: {
  elements: {
    header: {
      logo: logoFieldComplete(), // Three options: upload, text, URL
    }
  }
}
```

**Supported Logo Types**:

1. **Upload** - User uploads image from computer (converts to base64)
2. **Text** - Text or emoji with typography controls
3. **URL** - Image URL from the internet

**Default Config**:

```javascript
defaultConfig: {
  elements: {
    header: {
      logo: {
        type: "upload", // or "text" or "url"
        file: "", // base64 data URL (for upload)
        text: "🚀", // text or emoji
        textSize: "32px",
        textWeight: "600",
        textColor: "#000",
        url: "https://...", // image URL
        width: "40px",
        height: "40px",
      }
    }
  }
}
```

### 2. Dynamic Column Sliders ⭐ NEW

**Old Way** (static max):

```javascript
import { gridLayoutProps } from "../utils/genericSchemaBuilders.js";

features: mergeSchemas(sectionSchema(), gridLayoutProps(4), {
  // Max always 4, even if more items
});
```

**New Way** (dynamic max):

```javascript
import { slider } from "../utils/fieldBuilders.js";

features: mergeSchemas(
  sectionSchema(),
  {
    columns: slider("columns", 1, {
      dynamic: "elements.features.items.length",
    }),
    gap: {
      /* ... */
    },
  },
  {
    // ... rest of schema
  },
);
```

**How It Works**:

- Max value automatically adjusts to array length
- User can't select more columns than items available
- Syntax: `{ dynamic: "path.to.array.length" }`

### 3. Text Decoration ⭐ ENHANCED

**Old Way** (manual):

```javascript
text: {
  ...textContentSchema("text"),
  decoration: {
    type: "select",
    label: "textDecoration",
    options: textDecorationOptions,
  },
}
```

**New Way** (built-in):

```javascript
import { textContentPropsEnhanced } from '../utils/genericSchemaBuilders.js';

footer: {
  text: textContentPropsEnhanced("text"),
}
```

**Supports**: underline, overline, line-through

### 4. Image Object Fit ⭐ NEW

**Old Way** (basic):

```javascript
import { imageProps } from '../utils/genericSchemaBuilders.js';

image: imageProps(),
```

**New Way** (with objectFit):

```javascript
import { imagePropsComplete } from '../utils/genericSchemaBuilders.js';

image: imagePropsComplete(), // Includes objectFit options
```

**Object Fit Options**:

- `cover` - Fill space, maintain aspect ratio (default)
- `contain` - Show full image, may have empty space
- `fill` - Stretch to fill space
- `none` - Original size
- `scale-down` - Smaller of none or contain

### 5. Button Navigation ⭐ SIMPLIFIED

**Old Way** (complex):

```javascript
// Required custom onClick handlers or complex navigation logic
```

**New Way** (simple anchor tags):

```javascript
// In component (Hero, CallToAction)
<a
  href={buttonUrl}
  target={isExternalUrl ? "_blank" : undefined}
  rel={isExternalUrl ? "noopener noreferrer" : undefined}
>
  <Button>{buttonText}</Button>
</a>
```

**Button URL Types**:

- `#section` - Internal anchor (smooth scroll in editor, native in HTML export)
- `https://example.com` - External URL (opens new tab)
- `/page` - Relative URL (same tab)

**Config**:

```javascript
button: buttonSchema(), // Already includes 'url' property
```

### 6. Marquee Animation Duration ⭐ NEW

**Old Way** (limited options):

```javascript
marquee: {
  speed: "fast", // Only preset speeds
}
```

**New Way** (flexible):

```javascript
import { marqueePropsComplete } from '../utils/genericSchemaBuilders.js';

marquee: marqueePropsComplete(),
```

**Animation Duration Options**:

- `10s` - Fast
- `15s` - Medium Fast
- `20s` - Normal
- `30s` - Slow
- `40s` - Very Slow

---

## III. MIGRATION STEPS

### Step 1: Update Imports

**Add new imports**:

```javascript
import {
  logoFieldComplete,
  imagePropsComplete,
  textContentPropsEnhanced,
  marqueePropsComplete,
  linkSchema, // For navigation links
} from "../utils/genericSchemaBuilders.js";

import { slider } from "../utils/fieldBuilders.js";
```

**Remove deprecated imports** (optional):

```javascript
// These still work but are deprecated
import { gridLayoutProps } from "../utils/genericSchemaBuilders.js"; // Use slider instead
```

### Step 2: Update Config Schema

#### Header Logo (if applicable):

```javascript
// BEFORE
header: {
  logo: {
    type: { type: "select", label: "logoType", options: [...] },
    text: text("logoText"),
    url: text("imageUrl"),
    width: { /* ... */ },
    height: { /* ... */ },
  }
}

// AFTER
header: {
  companyName: text("companyName"),
  logo: logoFieldComplete(), // Single line!
  // ... rest
}
```

#### Dynamic Columns:

```javascript
// BEFORE
features: mergeSchemas(sectionSchema(), gridLayoutProps(4), {
  // ...
});

// AFTER
features: mergeSchemas(
  sectionSchema(),
  {
    columns: slider("columns", 1, {
      dynamic: "elements.features.items.length",
    }),
    gap: {
      type: "select",
      label: "gap",
      options: [
        { value: "16px", label: "compact" },
        { value: "24px", label: "comfort" },
        { value: "32px", label: "spacious" },
      ],
    },
  },
  {
    // ... card schema
  },
);
```

#### Footer Text Decoration:

```javascript
// BEFORE
footer: {
  text: textContentSchema("text"),
}

// AFTER
footer: {
  text: textContentPropsEnhanced("text"), // Includes decoration
}
```

#### Image Object Fit:

```javascript
// BEFORE
image: imageProps(),

// AFTER
image: imagePropsComplete(), // Includes objectFit
```

#### Marquee:

```javascript
// BEFORE
marquee: {
  text: text("text"),
  backgroundColor: color("backgroundColor"),
  textColor: color("textColor"),
  speed: { /* ... */ },
}

// AFTER
marquee: marqueePropsComplete(), // All-in-one
```

### Step 3: Update Default Config

#### Logo:

```javascript
defaultConfig: {
  elements: {
    header: {
      logo: {
        type: "text", // or "upload" or "url"
        text: "🚀 MyApp",
        textSize: "32px",
        textWeight: "600",
        textColor: "#000",
        width: "40px",
        height: "40px",
      }
    }
  }
}
```

#### Button URLs:

```javascript
hero: {
  button: {
    text: "Get Started",
    url: "#features", // Add URL
    // ... colors, size
  }
}
```

---

## IV. BACKWARD COMPATIBILITY

### What Still Works:

✅ **Old logo system**:

```javascript
logo: {
  type: "image",
  url: "logo.png",
}
// Still works! But no upload option
```

✅ **Static column max**:

```javascript
columns: slider("columns", 1, 4), // Static max: 4
// Still works! But doesn't adjust dynamically
```

✅ **Basic text schema**:

```javascript
text: textContentSchema("text"),
// Still works! But no decoration option
```

✅ **Basic image schema**:

```javascript
image: imageProps(),
// Still works! But no objectFit option
```

### What Changed (Minimal Breaking):

⚠️ **buttonSchema export**:

```javascript
// Now an alias for buttonPropsWithNavigation
import { buttonSchema } from "..."; // Still works
```

⚠️ **Marquee speed mapping**:

```javascript
// Both work now
speed: "fast"; // Legacy (mapped to animationDuration)
animationDuration: "10s"; // New (preferred)
```

---

## V. EXAMPLE MIGRATION

### Before (Old businessPro.config.js):

```javascript
import {
  arrayField,
  buttonSchema,
  cardSchema,
  gridLayoutProps, // OLD
  headingContentSchema,
  mergeSchemas,
  sectionSchema,
  textContentSchema, // OLD
  titleContentSchema,
} from "../utils/genericSchemaBuilders.js";

export const businessProConfig = {
  configSchema: {
    elements: {
      header: {
        logo: {
          type: { type: "select" /* ... */ },
          text: text("logoText"),
          url: text("imageUrl"),
          // ... many lines
        },
      },

      features: mergeSchemas(sectionSchema(), gridLayoutProps(4), {
        // Static max: 4
      }),

      footer: {
        text: textContentSchema("text"), // No decoration
      },
    },
  },
};
```

### After (New businessPro.config.js):

```javascript
import {
  arrayField,
  buttonSchema,
  cardSchema,
  headingContentSchema,
  logoFieldComplete, // NEW
  mergeSchemas,
  sectionSchema,
  textContentPropsEnhanced, // NEW
  textContentSchema,
  titleContentSchema,
} from "../utils/genericSchemaBuilders.js";

import { slider } from "../utils/fieldBuilders.js"; // NEW

export const businessProConfig = {
  configSchema: {
    elements: {
      header: {
        logo: logoFieldComplete(), // One line!
      },

      features: mergeSchemas(
        sectionSchema(),
        {
          columns: slider("columns", 1, {
            dynamic: "elements.features.items.length",
          }), // Dynamic!
          gap: {
            /* ... */
          },
        },
        {
          // ... schema
        },
      ),

      footer: {
        text: textContentPropsEnhanced("text"), // With decoration!
      },
    },
  },
};
```

---

## VI. TESTING AFTER MIGRATION

### Checklist:

- [ ] Dev server starts without errors
- [ ] All templates load correctly
- [ ] Logo upload works (if added)
- [ ] Column sliders adjust dynamically (if added)
- [ ] Text decoration renders (if added)
- [ ] Button navigation works
- [ ] Export to HTML successful
- [ ] Exported HTML works without JavaScript

### Commands:

```bash
# Start dev server
pnpm start

# Run tests (if available)
pnpm test

# Check for errors
pnpm lint
```

---

## VII. TROUBLESHOOTING

### Issue: "buttonSchema is not exported"

**Solution**: Update import to use new alias:

```javascript
import { buttonSchema } from "..."; // This still works, it's aliased
```

### Issue: "Slider max doesn't adjust"

**Check**: Dynamic value path is correct:

```javascript
columns: slider("columns", 1, { dynamic: "elements.features.items.length" });
//                                         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                         Must match your config structure
```

### Issue: "Logo upload not visible"

**Check**: FormField supports 'imageUpload' type:

```javascript
// In FormField/index.jsx
case 'imageUpload':
  return <ImageUpload /* ... */ />;
```

### Issue: "Text decoration not working"

**Check**: Using `textContentPropsEnhanced` not `textContentSchema`:

```javascript
// WRONG
text: textContentSchema("text"),

// RIGHT
text: textContentPropsEnhanced("text"),
```

---

## VIII. GETTING HELP

### Resources:

- Full Documentation: `CONFIG_STANDARDIZATION_ANALYSIS.md`
- Testing Guide: `WEEK_4_TESTING_GUIDE.md`
- Schema Reference: `packages/templates/src/utils/genericSchemaBuilders.js`

### Common Questions:

**Q: Do I need to migrate immediately?**
A: No, old configs still work. Migrate when you need new features.

**Q: Will my existing templates break?**
A: No, all changes are backward compatible.

**Q: Can I mix old and new approaches?**
A: Yes! Use new builders where you want new features, keep old configs elsewhere.

**Q: How do I test dynamic columns?**
A: Add/remove items in the PropertyPanel and watch the slider max adjust.

---

## IX. SUMMARY

### What You Gain:

✅ **Logo Upload** - Users can upload images directly
✅ **Dynamic Sliders** - Columns auto-adjust to content
✅ **Text Decoration** - Underline, overline, strikethrough
✅ **Object Fit** - Better image sizing control
✅ **Simple Navigation** - Works in exported HTML
✅ **Flexible Animation** - Fine-tune marquee speed

### What You Keep:

✅ All existing configs work
✅ No breaking changes
✅ Same component API
✅ Same export functionality

### Estimated Migration Time:

- Small template (1-2 sections): **15 minutes**
- Medium template (5-10 sections): **30-45 minutes**
- Large template (10+ sections): **1-2 hours**

---

**Ready to migrate? Start with one template, test thoroughly, then proceed to others!** 🚀
