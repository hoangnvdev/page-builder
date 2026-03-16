# Dynamic Template Renderer

## Overview

The dynamic renderer system allows you to create page templates dynamically from configuration objects without writing hardcoded JSX. The system reads a template configuration and recursively constructs the page by mapping config elements to their corresponding React components.

## Architecture

### Core Components

1. **componentRegistry.js** - Maps element types to React components and defines prop mappings
2. **DynamicRenderer.jsx** - Main renderer that processes template configs and renders pages
3. **Template Configs** - Configuration objects that define template structure and defaults

## How It Works

### 1. Component Registry

The `componentRegistry` maps element type names (like "hero", "header", "footer") to:

- The React component to render
- A `propsMapper` function that transforms config data into component props

Example:

```javascript
{
  hero: {
    component: Hero,
    propsMapper: (config) => ({
      title: config.title,
      subtitle: config.subtitle,
      buttonText: config.buttonText || config.ctaButtonText,
      backgroundColor: config.backgroundColor,
      // ... more prop mappings
    }),
  }
}
```

### 2. Template Configuration

Each template requires:

- **id**: Unique identifier
- **name**: Display name
- **layout**: Array defining the order of elements to render
- **configSchema**: Schema defining editable fields
- **defaultConfig**: Default values for all fields

Example:

```javascript
{
  id: "my-template",
  name: "My Template",
  layout: ["header", "hero", "footer"],  // Rendering order
  navLinks: [...],  // Optional: template-specific data
  defaultConfig: {
    page: { fontFamily: "...", backgroundColor: "...", ... },
    elements: {
      hero: { title: "...", subtitle: "...", ... },
      footer: { text: "...", ... }
    }
  }
}
```

### 3. Dynamic Rendering Process

1. `DynamicRenderer` receives the template config and runtime config
2. Iterates through the `layout` array
3. For each element:
   - Looks up the component in `componentRegistry`
   - Applies the `propsMapper` to transform config → props
   - Renders the component with the mapped props

## Creating a New Template

### Step 1: Define Your Template Configuration

```javascript
export const myTemplateConfig = {
  id: "my-awesome-template",
  name: "My Awesome Template",
  description: "A description of your template",
  icon: "🎯",

  // Define which elements to render and in what order
  layout: ["hero", "features", "cta", "footer"],

  // Optional: Template-specific data (like nav links)
  navLinks: [
    { text: "Home", href: "#" },
    { text: "About", href: "#about" }
  ],

  // Define the schema for editable fields
  editableFields: [
    { id: "page.fontFamily", label: "Font", type: "select", options: [...] },
    { id: "elements.hero.title", label: "Hero Title", type: "text" },
    // ... more fields
  ],

  // Define the config schema structure
  configSchema: {
    page: {
      fontFamily: { type: "select", label: "Font Family", options: [...] },
      // ... more page settings
    },
    elements: {
      hero: {
        title: { type: "text", label: "Hero Title" },
        subtitle: { type: "text", label: "Subtitle" },
        // ... more hero settings
      },
      // ... more elements
    }
  },

  // Define default values
  defaultConfig: {
    page: {
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#ffffff",
      textColor: "#1a1a1a"
    },
    elements: {
      hero: {
        title: "Welcome",
        subtitle: "This is my awesome template",
        backgroundColor: "#f0f9ff"
      },
      // ... more default values
    }
  }
};
```

### Step 2: Create the Component

```javascript
import PropTypes from "prop-types";
import { DynamicRenderer } from "./DynamicRenderer";

export const MyAwesomeTemplate = ({ config }) => {
  return <DynamicRenderer templateConfig={myTemplateConfig} config={config} />;
};

MyAwesomeTemplate.propTypes = {
  config: PropTypes.shape({
    page: PropTypes.shape({
      fontFamily: PropTypes.string,
      backgroundColor: PropTypes.string,
      textColor: PropTypes.string,
    }).isRequired,
    elements: PropTypes.object.isRequired,
  }).isRequired,
};
```

### Step 3: Register in Template Registry

```javascript
import { MyAwesomeTemplate, myTemplateConfig } from "./MyAwesomeTemplate";

export const templateRegistry = [
  {
    ...myTemplateConfig,
    component: MyAwesomeTemplate,
  },
  // ... other templates
];
```

## Adding New Component Types

If you need a new component type (e.g., "testimonials", "pricing"), add it to `componentRegistry.js`:

```javascript
import { Testimonials } from "./components/Testimonials";

export const componentRegistry = {
  // ... existing registrations

  testimonials: {
    component: Testimonials,
    propsMapper: (config) => ({
      heading: config.heading,
      items: config.items,
      backgroundColor: config.backgroundColor,
      // ... map all required props
    }),
  },
};
```

## Benefits of Dynamic Rendering

1. **No Repetitive JSX**: Write configuration, not JSX
2. **Consistency**: All templates follow the same pattern
3. **Easier Maintenance**: Component changes propagate automatically
4. **Extensibility**: Easy to add new component types
5. **Type Safety**: Props are validated through the registry
6. **Performance**: Same runtime performance as hardcoded JSX

## Advanced Features

### Custom Props Mapping

You can access both element config and template config in prop mappers:

```javascript
propsMapper: (config, templateConfig) => ({
  // Use template-level data
  links: templateConfig.navLinks || [],
  // Use element-level config
  title: config.title,
});
```

### Conditional Rendering

Elements not in the `layout` array won't be rendered. You can create template variants by changing the layout:

```javascript
// Full version
layout: ["header", "hero", "features", "testimonials", "cta", "footer"];

// Minimal version
layout: ["hero", "features", "footer"];
```

### Dynamic Element Keys

If you need multiple instances of the same component type, use unique keys in the layout and elements config:

```javascript
layout: ["hero", "features-1", "features-2", "footer"]

elements: {
  "features-1": { heading: "Our Services", items: [...] },
  "features-2": { heading: "Why Choose Us", items: [...] }
}
```

## Migration from Hardcoded Templates

To migrate an existing hardcoded template:

1. Add a `layout` array listing all elements in render order
2. Replace the JSX component with `<DynamicRenderer />`
3. Ensure all prop mappings exist in `componentRegistry`
4. Move any hardcoded data (like links) to the template config
5. Test thoroughly!

## Examples

See:

- [BusinessLanding.jsx](./BusinessLanding.jsx) - Business landing page template
- [ModernPortfolio.jsx](./ModernPortfolio.jsx) - Portfolio template
