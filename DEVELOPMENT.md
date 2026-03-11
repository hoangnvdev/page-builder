# Development Guide

## Project Structure

```
page-builder/
├── src/
│   ├── components/           # React UI components
│   │   ├── TemplateGallery.jsx   # Template selection screen
│   │   ├── Editor.jsx            # Main editor layout
│   │   ├── PropertyPanel.jsx     # Configuration sidebar
│   │   ├── PreviewRenderer.jsx   # Live preview area
│   │   └── ExportButton.jsx      # HTML export button
│   ├── templates/           # Template definitions
│   │   ├── ModernPortfolio.jsx   # Portfolio template
│   │   ├── BusinessLanding.jsx   # Business template
│   │   └── templateRegistry.js   # Template registry
│   ├── store/              # State management
│   │   └── useBuilderStore.js   # Zustand store
│   ├── utils/              # Helper functions
│   │   └── exportHTML.js        # HTML export logic
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## How It Works

### 1. Template System

Each template consists of:

- **React Component** - The visual layout
- **Configuration Schema** - Defines what's editable
- **Default Configuration** - Starting values

Templates use a two-level configuration system:

- **Page-level** - Global settings (fonts, colors, etc.)
- **Element-level** - Section-specific settings (hero, about, footer, etc.)

### 2. State Management

Redux Toolkit manages the application state with the following slices:

**Builder Slice** (`src/store/builderSlice.js`):
- `selectedTemplate` - Currently selected template
- `currentConfig` - Current page configuration
- `selectedElement` - Currently selected element for editing
- `mode` - 'gallery' or 'editor'

**Actions:**
- `selectTemplate` - Select a template and initialize config
- `updatePageConfig` - Update page-level settings
- `updateElementConfig` - Update element-level settings
- `selectElement` / `deselectElement` - Element selection
- `resetToGallery` - Return to template gallery
- `resetCurrentConfig` - Reset config to template defaults

**Forms:**
- Formik is used for form state management and validation in the PropertyPanel

### 3. Live Preview

The preview renderer:

1. Listens to configuration changes
2. Re-renders the template component with new config
3. Highlights clickable sections
4. Allows element selection

### 4. Export System

The export process:

1. Renders React component to static HTML using `renderToStaticMarkup`
2. Wraps in complete HTML document structure
3. Inlines all styles
4. Removes editor-specific attributes
5. Downloads as `.html` file

## Adding a New Template

1. Create template component in `src/templates/`:

```jsx
export const MyTemplate = ({ config }) => {
  const { page, elements } = config;

  return (
    <div style={{ fontFamily: page.fontFamily }}>
      <section data-element="hero">{/* Your layout */}</section>
    </div>
  );
};

export const myTemplateConfig = {
  id: "my-template",
  name: "My Template",
  description: "Template description",
  preview: "🎯",
  configSchema: {
    page: {
      /* page-level fields */
    },
    elements: {
      /* element-level fields */
    },
  },
  defaultConfig: {
    page: {
      /* default page config */
    },
    elements: {
      /* default element configs */
    },
  },
};
```

2. Register in `templateRegistry.js`:

```js
import { MyTemplate, myTemplateConfig } from "./MyTemplate";

export const templateRegistry = [
  // ... existing templates
  {
    ...myTemplateConfig,
    component: MyTemplate,
  },
];
```

## Configuration Schema Field Types

Available field types:

- `text` - Single line text input
- `textarea` - Multi-line text input
- `color` - Color picker with hex input
- `select` - Dropdown with predefined options
- `projects-list` - List of projects (title + description)
- `features-list` - List of features (icon + title + description)

Example:

```js
configSchema: {
  page: {
    fontFamily: {
      type: 'select',
      label: 'Font Family',
      options: [
        { value: 'Arial, sans-serif', label: 'Arial' }
      ]
    }
  },
  elements: {
    hero: {
      title: { type: 'text', label: 'Hero Title' },
      backgroundColor: { type: 'color', label: 'Background' }
    }
  }
}
```

## Making Elements Clickable

Add `data-element` attribute to sections you want to be editable:

```jsx
<section data-element="hero">{/* Content */}</section>
```

The element ID must match a key in `configSchema.elements`.

## Tips

- Keep template components pure (no state)
- Use inline styles for portability
- Make sure exported HTML is self-contained
- Test exported files by opening in browser
- Use semantic HTML elements
- Keep configuration schemas simple and intuitive
