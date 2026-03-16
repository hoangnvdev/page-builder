# Clean Directory Structure

## Current Organization

```
packages/templates/src/
├── index.js                     # Main entry point
├── styles.js                    # Global styles
│
├── hocs/                        # Higher-Order Components
│   ├── index.js
│   └── createTemplateComponent.jsx  # Component factory
│
├── registries/                  # Data registries
│   ├── index.js
│   ├── componentRegistry.js     # Element → Component mappings
│   └── templateRegistry.js      # Template registry
│
├── utils/                       # Utility functions & schema builders
│   ├── index.js
│   ├── componentHelpers.js      # Component utility functions
│   ├── fieldBuilders.js         # Field builder helpers (text, color, etc.)
│   └── schemaBuilders.js        # Schema builder functions (sectionSchema, headingSchema, etc.)
│
├── constants/                   # Reusable option constants
│   └── index.js                 # Shared options arrays (alignOptions, gapOptions, etc.)
│
├── configs/                     # Template configurations
│   ├── index.js                 # Barrel export
│   ├── comicSplash.config.js
│   ├── businessPro.config.js
│   ├── refinedClassic.config.js
│   └── futuristicTech.config.js
│
├── components/                  # Reusable UI components
│   ├── index.js
│   ├── DynamicRenderer/         # Main renderer component
│   ├── CallToAction/
│   ├── ComicPanels/
│   ├── ContentSection/
│   ├── DataStream/
│   ├── Footer/
│   ├── Header/
│   ├── Hero/
│   ├── ImageGrid/
│   ├── ItemCard/
│   ├── ItemGrid/
│   ├── Marquee/
│   ├── QuoteBlock/
│   ├── SpeechBubbleTestimonials/
│   ├── SplitScreen/
│   ├── StatsCounter/
│   ├── TechSpecs/
│   ├── Terminal/
│   ├── TestimonialCards/
│   └── Timeline/
│
└── docs/                        # Documentation
    ├── CONFIG_ONLY_ARCHITECTURE.md
    ├── DIRECTORY_STRUCTURE.md
    ├── DYNAMIC_RENDERER.md
    ├── IMPLEMENTATION_SUMMARY.md
    ├── QUICK_REFERENCE.md
    ├── REFACTORING_SUMMARY.md
    ├── TEMPLATE_COLLECTION.md
    └── TEMPLATE_CONFIG_REFERENCE.md
```

## Before vs After

### ❌ Before (Flat & Messy)

```
src/
├── index.js
├── DynamicRenderer.jsx
├── componentRegistry.js
├── createTemplateComponent.jsx
├── templateRegistry.js
├── businessLanding.config.js
├── modernPortfolio.config.js
├── styles.js
└── components/
    └── ...
```

**Problems:**

- 8+ files at root level
- No clear organization
- Hard to distinguish core from configs
- Difficult to navigate
- No separation of utilities and constants

### ✅ After (Clean & Organized)

```
src/
├── index.js                  # Entry point
├── styles.js                 # Styles
├── hocs/                     # Higher-order components
├── registries/               # Component & template registries
├── utils/                    # Utility functions & builders
├── constants/                # Reusable constants
├── configs/                  # Template configurations
├── components/               # UI components
└── docs/                     # Documentation
```

**Benefits:**

- Only 2 files + 7 folders at root
- Clear separation of concerns
- Easy to find what you need
- Scalable structure
- Utilities and constants organized
- Templates use reusable schema builders

## Directory Purposes

### 📁 `hocs/`

Contains **higher-order components** for wrapping and enhancing components:

- `createTemplateComponent.jsx` - Factory function for generating template components

**When to add here:** New HOC patterns for component enhancement

### 📁 `registries/`

Contains **component and template mappings**:

- `componentRegistry.js` - Maps element types to React components and props mappers
- `templateRegistry.js` - Registry of all available templates

**When to add here:** New element types or template registrations

### 📁 `utils/`

Contains **utility functions and schema builders**:

- `componentHelpers.js` - Component helper functions
- `fieldBuilders.js` - Field builders (text(), color(), textarea(), slider())
- `schemaBuilders.js` - Schema builders (sectionSchema(), headingSchema(), cardSchema(), etc.)

**When to add here:** New utility functions, field builders, or schema patterns

### 📁 `constants/`

Contains **reusable option arrays** used across templates:

- Alignment options, gap options, size options
- Font family choices, language options
- Padding, border radius, shadow options

**When to add here:** New reusable option arrays to share across templates

### 📁 `configs/`

Contains **pure template configurations** - no JSX, just data:

- `*.config.js` - Template configuration files
- Each config defines layout, schema, defaults

**When to add here:** New template configurations

### 📁 `components/`

Contains **reusable UI components** used by templates:

- `Header/`, `Hero/`, `Footer/`, etc.
- Each component is self-contained with styles

**When to add here:** New reusable UI components

## Import Patterns

### For App Developers

```javascript
// Import from main entry point
import {
  templateRegistry,
  ModernPortfolio,
  businessLandingConfig,
} from "@page-builder/templates";
```

### For Internal Development

**From configs:**

```javascript
// Use barrel export
import { businessLandingConfig } from "./configs/index.js";
```

**From core:**

```javascript
// Use barrel export
import { DynamicRenderer, createTemplateComponent } from "./core/index.js";
```

**From components:**

```javascript
// Direct import
import { Hero } from "../components/Hero";
```

## Adding New Templates

### 1. Create config file

```javascript
// src/configs/myTemplate.config.js
export const myTemplateConfig = {
  id: "my-template",
  // ... configuration
};
```

### 2. Export from configs/index.js

```javascript
export { myTemplateConfig } from "./myTemplate.config.js";
```

### 3. Register in core/templateRegistry.js

```javascript
import { myTemplateConfig } from "../configs/index.js";

export const templateRegistry = [
  // ... existing templates
  { ...myTemplateConfig, component: createTemplateComponent(myTemplateConfig) },
];
```

**Done! 3 simple steps in organized locations.** 🎉

## Benefits of New Structure

1. **🎯 Clear Separation** - Core, configs, and components are separated
2. **📦 Modular** - Each directory has a single responsibility
3. **🔍 Easy Navigation** - Find files by category, not by searching
4. **📈 Scalable** - Easy to add new templates and components
5. **🧹 Clean Root** - Only essential files at top level
6. **🚀 Developer-Friendly** - Barrel exports make imports simple

## File Count Comparison

| Location     | Before    | After                   | Change    |
| ------------ | --------- | ----------------------- | --------- |
| Root level   | 8 files   | 2 files                 | -75%      |
| Core files   | Scattered | Organized in `core/`    | ✅        |
| Config files | Scattered | Organized in `configs/` | ✅        |
| Components   | Same      | Same                    | No change |

## Verification

✅ **Build successful** - No errors
✅ **All imports updated** - Relative paths corrected
✅ **Barrel exports added** - Clean import patterns
✅ **Structure documented** - This file!

---

**Result: A clean, organized, and scalable directory structure!** 🎊
