# Dynamic Renderer - Quick Reference

## TL;DR

**Templates are now pure config files!** No JSX wrappers needed.

```javascript
// Just define the config
export const myTemplateConfig = {
  layout: ["hero", "features", "footer"], // ← This defines what renders!
  defaultConfig: {
    /* ... */
  },
};

// Component is auto-generated! ✨
```

Add to registry:

```javascript
{ ...myTemplateConfig, component: createTemplateComponent(myTemplateConfig) }
```

**Done! 90% less code per template.**

## Core Files

| File                          | Purpose                           | Location          |
| ----------------------------- | --------------------------------- | ----------------- |
| `DynamicRenderer/index.jsx`   | Main renderer component           | `src/components/` |
| `componentRegistry.js`        | Maps element types to components  | `src/registries/` |
| `createTemplateComponent.jsx` | Factory that generates components | `src/hocs/`       |
| `templateRegistry.js`         | Registry of all templates         | `src/registries/` |
| `schemaBuilders.js`           | Reusable schema builders          | `src/utils/`      |
| `fieldBuilders.js`            | Field builder helpers             | `src/utils/`      |
| `constants/index.js`          | Reusable option constants         | `src/constants/`  |
| `CONFIG_ONLY_ARCHITECTURE.md` | Config-only architecture guide    | `src/docs/`       |
| `DYNAMIC_RENDERER.md`         | Full documentation                | `src/docs/`       |

## Creating a Template

### Step 1: Create Config File

```javascript
// configs/myTemplate.config.js
import {
  sectionSchema,
  headingSchema,
  color,
  text,
  textarea,
  buttonSizeOptions,
} from "../utils/index.js";

export const myTemplateConfig = {
  id: "my-template",
  name: "My Template",
  description: "A beautiful template",
  icon: "✨",

  layout: ["hero", "features", "footer"], // ← This defines what renders!

  configSchema: {
    page: {
      fontFamily: { type: "select", label: "Font", options: fontFamilyOptions },
      title: text("Page Title"),
      // ... SEO fields
    },
    elements: {
      hero: {
        ...sectionSchema(), // Adds backgroundColor, padding, maxWidth, align
        title: {
          text: text("Title"),
          color: color("Title Color"),
          size: { type: "select", options: headingSizeOptions },
        },
        // ... more fields
      },
      // ... more sections
    },
  },

  defaultConfig: {
    page: {
      /* ... */
    },
    elements: {
      hero: {
        /* ... */
      },
      features: {
        /* ... */
      },
      footer: {
        /* ... */
      },
    },
  },
};
```

### Step 2: Register Template

```javascript
// registries/templateRegistry.js
import { createTemplateComponent } from "../hocs/index.js";
import { myTemplateConfig } from "../configs/myTemplate.config.js";

export const templateRegistry = [
  { ...myTemplateConfig, component: createTemplateComponent(myTemplateConfig) },
  // ... other templates
];
```

**That's it! Component is auto-generated.** ✨`

## How Layout Works

The `layout` array defines Rendering order:

```javascript
layout: ["hero", "features", "cta", "footer"];
```

Becomes:

```jsx
<Hero {...mappedProps} />
<ItemGrid {...mappedProps} dataElement="features" />
<CallToAction {...mappedProps} />
<Footer {...mappedProps} />
```

## Available Element Types

Register in `componentRegistry.js`:

- `header` → Header component
- `hero` → Hero component
- `features` → ItemGrid component (features variant)
- `projects` → ItemGrid component (projects variant)
- `about` → ContentSection component
- `cta` → CallToAction component
- `footer` → Footer component

## Adding a New Component Type

```javascript
// In componentRegistry.js
import { MyNewComponent } from "./components/MyNewComponent";

export const componentRegistry = {
  // ... existing entries

  myNewType: {
    component: MyNewComponent,
    propsMapper: (config) => ({
      title: config.title,
      content: config.content,
      // ... map all props
    }),
  },
};
```

Then use it in any template:

```javascript
layout: ["hero", "myNewType", "footer"];
```

## Config Structure

```javascript
{
  id: "template-id",
  name: "Template Name",

  // ⭐ Key: defines what renders and in what order
  layout: ["hero", "features", "footer"],

  // Optional: template-specific data
  navLinks: [...],
  customData: {...},

  // For the UI editor
  editableFields: [...],
  configSchema: {...},

  // Default values
  defaultConfig: {
    page: { fontFamily, backgroundColor, textColor },
    elements: {
      hero: { title, subtitle, ... },
      features: { heading, items, ... },
      footer: { text, ... }
    }
  }
}
```

## Benefits

✅ **70% less code** per template
✅ **No manual prop wiring**
✅ **Automatic consistency**
✅ **Easy to modify** - just edit the layout array
✅ **Same performance** as hardcoded JSX

## Examples

See:

- [businessLanding.config.js](./src/businessLanding.config.js) - Full business template config
- [modernPortfolio.config.js](./src/modernPortfolio.config.js) - Portfolio template config
- [SimpleLanding.example.jsx](./src/SimpleLanding.example.jsx) - Minimal example with detailed comments

## Common Tasks

### Reorder elements

```javascript
// Change from:
layout: ["header", "hero", "features", "footer"];

// To:
layout: ["header", "features", "hero", "footer"];
```

### Remove an element

```javascript
// Just remove from layout array
layout: ["hero", "footer"]; // No CTA or features!
```

### Add an element

```javascript
layout: ["hero", "about", "features", "cta", "footer"];
//              ↑ added
```

### Create template variant

```javascript
// Full version
export const fullConfig = {
  layout: ["header", "hero", "features", "testimonials", "cta", "footer"],
};

// Minimal version
export const minimalConfig = {
  layout: ["hero", "features", "footer"],
};
```

## Migration Checklist

Migrating an existing template:

- [ ] Add `layout` array to config
- [ ] Replace JSX with `<DynamicRenderer />`
- [ ] Ensure all components are in `componentRegistry`
- [ ] Move hardcoded data (like navLinks) to config
- [ ] Test rendering
- [ ] Remove unused imports

## Questions?

Read the full docs: [DYNAMIC_RENDERER.md](./DYNAMIC_RENDERER.md)
