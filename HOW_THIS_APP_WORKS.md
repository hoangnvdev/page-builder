# How This App Works

## System Architecture

The Page Builder is a sophisticated monorepo-based application that transforms template configurations into editable, exportable websites. The architecture consists of three interconnected packages working together to provide a seamless page building experience.

### Monorepo Benefits

- **Shared Dependencies**: All packages use a single source of truth for dependencies (managed by pnpm), ensuring consistency and reducing duplication.
- **Atomic Changes**: Updates can be made across multiple packages in one commit, simplifying version control and collaboration.
- **Code Sharing**: Easy cross-package imports enable efficient reuse of components and utilities through workspace protocol (`workspace:*`).
- **Simplified Tooling**: Unified build pipeline with Vite configurations that share common patterns across packages.

### Layered Architecture

The app follows a strict layered architecture with clear separation of concerns:

1. **Presentation Layer** (`packages/ui`):
   - 27 primitive UI components (Button, Card, Input, Grid, etc.)
   - Centralized design tokens in `_variables.scss`
   - SCSS modules for scoped styling
   - i18n support for 4 languages
   - Shared ErrorBoundary component
   - **No dependencies on other packages**

2. **Business Logic Layer** (`packages/templates`):
   - 4 complete templates with distinct personalities
   - 14 template section components (Hero, Footer, Features, etc.)
   - Component registry system for mapping configs to components
   - DynamicRenderer for constructing pages from configurations
   - Prop mapper utilities for transforming data
   - **Depends on**: `@page-builder/ui`

3. **Application Layer** (`packages/app`):
   - Visual editor with property panel
   - Redux store for state management
   - History management with undo/redo
   - HTML export functionality
   - Routing and navigation
   - Centralized i18n instance
   - **Depends on**: `@page-builder/ui`, `@page-builder/templates`

---

## The Four Templates

### 1. Business Pro (`business-pro-refactored`)

**Personality**: Professional, conversion-focused corporate landing page

**Sections** (7 total): header → hero → about → features → projects → cta → footer

**Visual Style**:

- Blue gradients and clean grays
- Helvetica/Inter/system fonts
- Trustworthy, modern, efficient vibe

**Best For**: B2B companies, SaaS products, professional services

### 2. Comic Splash (`comic-splash-refactored`)

**Personality**: Fun, playful, cartoon-inspired with explosive energy

**Sections** (9 total): hero → marquee → comicPanels → features → stats → testimonials → imageGrid → cta → footer

**Visual Style**:

- Hot pink (#FF6B9D), sunshine yellow (#FFD93D), lime green (#6BCB77)
- Comic Sans/Bangers/Fredoka fonts
- Animated marquee and comic-style panels

**Best For**: Creative agencies, kids products, indie games, entertainment

### 3. Futuristic Tech (`futuristic-tech-refactored`)

**Personality**: Cyberpunk/sci-fi with cutting-edge tech aesthetic

**Sections** (7 total): hero → features → terminal → about → stats → cta → footer

**Visual Style**:

- Neon effects and tech-inspired typography
- Terminal component with code display
- Dark mode, glowing accents

**Best For**: Tech startups, developer tools, gaming products

### 4. Refined Classic (`refined-classic-refactored`)

**Personality**: Elegant, sophisticated with timeless design

**Sections** (8 total): hero → about → features → portfolio → stats → testimonials → cta → footer

**Visual Style**:

- Serif typography (Playfair Display, Lora)
- Portfolio image grid
- Sophisticated color palette

**Best For**: Luxury brands, creative portfolios, high-end services

---

## Component Registry System

The component registry is the backbone of the config-driven architecture, enabling dynamic rendering of templates from pure data.

### How It Works

1. **Registration**: Each template section component is registered with a unique key
2. **Lookup**: DynamicRenderer queries the registry by element type
3. **Mapping**: Registry applies `propsMapper` to transform config data into component props
4. **Rendering**: Component is instantiated with transformed props

### Registry Structure

Located in `packages/templates/src/registries/componentRegistry.js`:

```javascript
{
  hero: {
    component: Hero,
    propsMapper: (config) => ({
      // Transform nested config into flat component props
      ...mapTextContentProps(config, "title"),      // Extract title.text, title.color, etc.
      ...mapTextContentProps(config, "subtitle"),
      ...mapButtonProps(config),                    // Extract button.text, button.variant, etc.
      ...mapSectionProps(config),                   // Extract backgroundColor, padding, etc.
    })
  },
  features: {
    component: ItemGrid,
    propsMapper: (config) => ({
      items: unwrapArrayItems(config.items),        // Extract items from nested structure
      columns: config.columns || 3,
      gap: config.gap || '2rem',
      ...mapSectionProps(config),
    })
  },
  // ... 14+ registered components
}
```

### Prop Mapper Utilities

Located in `packages/templates/src/utils/`:

- **`mapTextContentProps`**: Extracts text content and styling (text, color, fontSize, fontWeight, align)
- **`mapButtonProps`**: Extracts button data (text, href, variant, size, backgroundColor)
- **`mapSectionProps`**: Extracts container properties (backgroundColor, padding, maxWidth, align)
- **`mapCardProps`**: Extracts card styling (backgroundColor, borderRadius, padding, shadow)
- **`unwrapArrayItems`**: Flattens nested array structures
- **`unwrapText`**: Extracts text from nested objects
- **`mapAlignToFlex`**: Converts alignment strings to flexbox values
- **`mapLevel`**: Converts heading levels (h1-h6)

### Dynamic Component Selection

Some sections have conditional rendering:

```javascript
// Testimonials: Choose variant based on config
const TestimonialsComponent =
  config.style === "speech-bubble"
    ? SpeechBubbleTestimonials
    : TestimonialCards;
```

---

## State Management with Redux

The app uses Redux Toolkit for centralized, predictable state management with powerful features.

### Store Architecture

Located in `packages/app/src/store/store.js`:

```javascript
{
  builder: {
    selectedTemplate: {
      id: 'business-pro-refactored',
      name: 'Business Pro',
      component: BusinessProComponent,      // React component (not serialized)
      defaultConfig: { /* ... */ },
      layout: ['header', 'hero', 'about', ...]
    },
    currentConfig: {
      page: {
        title: 'My Website',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#ffffff',
        textColor: '#000000'
      },
      elements: {
        hero: {
          backgroundColor: '#1e40af',
          title: { text: 'Welcome', color: '#ffffff' },
          subtitle: { text: 'Build amazing sites', color: '#e0e0e0' },
          button: { text: 'Get Started', variant: 'primary' }
        },
        // ... all sections
      }
    },
    history: {
      past: [
        { id: 'uuid-1', config: {...}, timestamp: 1234567890, action: 'Update hero title', elementId: 'hero' },
        // ... up to 150 entries
      ],
      future: []  // For redo
    }
  }
}
```

### Key Features

1. **localStorage Persistence**:
   - Debounced save every 1 second
   - Triggered only when history changes (not on every keystroke)
   - Excludes React component from serialization
   - Immediate save on `beforeunload` to prevent data loss

2. **History Management**:
   - Max 150 actions tracked
   - Each entry has UUID, config snapshot, timestamp, action label, optional elementId
   - Undo/redo navigate through snapshots
   - Live updates don't create history entries (for text inputs)

3. **Smart Serialization**:
   ```javascript
   const stateToSave = {
     ...state,
     builder: {
       ...state.builder,
       selectedTemplate: {
         ...state.builder.selectedTemplate,
         component: undefined, // Remove React component before saving
       },
     },
   };
   ```

### Actions

Located in `packages/app/src/store/builderSlice.js`:

1. **`selectTemplate(template)`**: Initialize template, reset history, set default config
2. **`updatePageConfig(changes)`**: Update page-level settings (title, fonts, colors) + create history entry
3. **`updateConfig(config)`**: Full config replacement + history entry
4. **`updateConfigLive(config)`**: Live preview without history (for text inputs)
5. **`updateElementConfig({ elementId, config })`**: Update specific section + history entry
6. **`undo()`**: Navigate to previous history state
7. **`redo()`**: Navigate to next history state
8. **`resetToGallery()`**: Clear selection, return to template picker
9. **`resetCurrentConfig()`**: Restore template defaults
10. **`rehydrateTemplateComponent(component)`**: Restore component reference after localStorage load

### EditorContext Wrapper

Wraps Redux for convenience in components:

```javascript
const { selectedTemplate, currentConfig, history, canUndo, canRedo, actions } =
  useEditor();

// Usage
actions.updateElement("hero", { backgroundColor: "#000" });
actions.undo();
```

---

## Dynamic Template Renderer

The DynamicRenderer constructs complete pages from configuration objects, eliminating hardcoded JSX.

### Rendering Process

Located in `packages/templates/src/sections/DynamicRenderer/`:

```javascript
export function DynamicRenderer({ config, template }) {
  const { layout } = template;

  return (
    <div className={styles.dynamicRenderer}>
      {layout.map((elementKey) => {
        const elementConfig = config.elements[elementKey];
        const { component: Component, propsMapper } = getComponentForElement(
          elementKey,
          elementConfig,
        );
        const props = propsMapper(elementConfig);

        return (
          <ErrorBoundary
            key={elementKey}
            mode="component"
            componentName={elementKey}
          >
            <MemoizedSection
              Component={Component}
              props={props}
              config={elementConfig}
            />
          </ErrorBoundary>
        );
      })}
    </div>
  );
}
```

### Memoization Strategy

Prevents unnecessary re-renders:

```javascript
const MemoizedSection = memo(
  ({ Component, props, config }) => <Component {...props} />,
  (prev, next) => {
    // Only re-render if config actually changed
    return JSON.stringify(prev.config) === JSON.stringify(next.config);
  },
);
```

### Error Boundary Wrapping

Each section is individually protected:

- Errors in one section don't crash the entire page
- Component-level error UI shows section name
- "Retry" button attempts to re-render failed section
- Preserves original component dimensions to prevent layout shift

---

## Internationalization (i18n)

### Architecture

Located in `packages/app/src/i18n.js`:

**Libraries**:

- `i18next`: Core i18n engine
- `react-i18next`: React hooks and HOCs
- `i18next-browser-languagedetector`: Auto language detection

**Supported Languages** (4):

1. **English (en)** - LTR, default
2. **Vietnamese (vi)** - LTR
3. **Japanese (ja)** - LTR
4. **Arabic (ar)** - RTL

### Translation Structure

Merges translations from all 3 packages into a single namespace:

```javascript
resources: {
  en: {
    translation: {
      // From @page-builder/app
      editor: { toolbar: 'Toolbar', loading: 'Loading...' },
      export: { button: 'Export HTML', error: 'Export failed' },

      // From @page-builder/templates (flattened)
      templates: {
        businessPro: 'Business Pro',
        comicSplash: 'Comic Splash',
        // ...
      },

      // From @page-builder/ui (namespaced)
      ui: {
        errorBoundary: { title: 'Something went wrong', reload: 'Reload Page' },
        button: { loading: 'Loading...' },
        // ...
      }
    }
  },
  // ... vi, ja, ar
}
```

### Language Detection

Order of detection:

1. Query string (`?lng=en`)
2. Cookie
3. localStorage
4. Browser language
5. HTML tag `lang` attribute

### RTL Support

`RTLProvider` component automatically sets document direction:

```javascript
<html dir="rtl">  {/* for Arabic */}
<html dir="ltr">  {/* for English, Vietnamese, Japanese */}
```

Smooth transitions when switching languages, updates on language change events.

---

## HTML Export System

### Export Process

Located in `packages/app/src/utils/exportHTML.jsx`:

1. **Render to Static HTML**:

   ```javascript
   const bodyContent = ReactDOMServer.renderToStaticMarkup(
     <TemplateComponent config={currentConfig} />,
   );
   ```

2. **Extract All CSS**:

   ```javascript
   let css = "";
   for (const sheet of document.styleSheets) {
     const rules = Array.from(sheet.cssRules || []);
     css += rules.map((rule) => rule.cssText).join("\n");
   }
   ```

3. **Build Complete Document**:

   ```javascript
   const htmlDocument = `
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <title>${pageTitle}</title>
       <style>${BASE_RESET_STYLES}${componentStyles}</style>
     </head>
     <body>${bodyContent}</body>
     </html>
   `;
   ```

4. **Clean Editor Attributes**:

   ```javascript
   // Remove data-element, data-section, etc.
   return htmlDocument.replace(/\s*data-[a-z-]+="[^"]*"/g, "");
   ```

5. **Download**:
   ```javascript
   const blob = new Blob([cleanedHTML], { type: "text/html" });
   const url = URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.href = url;
   link.download = `${templateId}-${date}.html`;
   link.click();
   ```

### Export Features

- **Self-Contained**: All CSS inlined, no external dependencies
- **Pure HTML/CSS**: No React runtime or JavaScript required
- **SEO-Ready**: Semantic HTML, proper meta tags
- **Cross-Browser**: Includes CSS reset for consistency
- **Production-Ready**: Minified, optimized, deployable to any static host

---

## Error Boundary System

### Three-Level Protection

Located in `packages/ui/src/components/ErrorBoundary/`:

1. **Page-Level** (mode="page"):
   - Full-screen error UI
   - Large alert icon (64px)
   - "Reload Page" button
   - Optional "Go to Home" button
   - Shows stack traces in development

2. **Component-Level** (mode="component"):
   - Contained error UI with dashed border
   - Medium icon (32px)
   - Component name display
   - "Retry" button to re-render
   - Preserves original component dimensions

3. **Inline-Level** (mode="inline"):
   - Minimal inline error
   - Small icon (16px)
   - "Failed to load" text with retry link

### Hierarchy in App

```
Root (main.jsx)
├─ ErrorBoundary (page, before i18n)
   └─ I18nextProvider
      └─ ErrorBoundary (page, after i18n)
         └─ App
            └─ Routes
               ├─ DesignPage
               │  ├─ ErrorBoundary (component) - PreviewRenderer
               │  └─ ErrorBoundary (component) - PropertyPanel
               └─ TemplatePage
                  └─ ErrorBoundary (inline) - each TemplateCard
```

### Features

- **i18n Support**: Multilingual error messages
- **Dimension Preservation**: Uses ResizeObserver to track size before error
- **Development Mode**: Shows full stack traces
- **Recovery**: Retry button attempts re-render
- **Graceful Degradation**: Errors don't crash entire app

---

## Performance Optimizations

### Build-Time

1. **Code Splitting**:
   - Manual vendor chunks: react-vendor, redux-vendor, i18n-vendor, icons-vendor
   - Lazy-loaded routes
   - Separate CSS files per component

2. **Modern Target**:
   - ES2020+ (no IE11 support)
   - Native async/await
   - Native optional chaining
   - Smaller bundle size

3. **esbuild Minification**:
   - 20-40x faster than Terser
   - Good compression ratio
   - No configuration needed

### Runtime

1. **Memoization**:
   - Template renderer memoized
   - Each section individually memoized
   - Custom comparison functions

2. **Debounced Persistence**:
   - localStorage saves debounced to 1 second
   - Only saves when history changes
   - Prevents excessive writes

3. **Selective Re-rendering**:
   - Only re-render sections with config changes
   - Live updates don't trigger full re-renders
   - Property panel updates are isolated

4. **Lazy Loading**:
   - Routes loaded on-demand
   - Suspense fallbacks for smooth UX

---

## Template Configuration Reference

### Standard Structure

Every template follows this pattern:

```javascript
export default {
  id: 'unique-template-id',
  name: 'Template Display Name',
  description: 'Brief description of the template',
  icon: '🎨',

  // Defines section order
  layout: ['hero', 'features', 'testimonials', 'cta', 'footer'],

  // Defines editable fields (NOT used directly by editor anymore)
  configSchema: {
    page: {
      title: { type: 'text', label: 'Page Title' },
      fontFamily: { type: 'select', options: [...], label: 'Font Family' },
      backgroundColor: { type: 'color', label: 'Background Color' },
    },
    elements: {
      hero: {
        backgroundColor: { type: 'color' },
        title: {
          text: { type: 'text' },
          color: { type: 'color' },
          fontSize: { type: 'text' },
        },
        subtitle: {
          text: { type: 'text' },
          color: { type: 'color' },
        },
        button: {
          text: { type: 'text' },
          variant: { type: 'select', options: [...] },
        }
      },
      // ... all sections
    }
  },

  // Actual default values
  defaultConfig: {
    page: {
      title: 'My Awesome Website',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#ffffff',
    },
    elements: {
      hero: {
        backgroundColor: '#1e40af',
        title: { text: 'Welcome', color: '#ffffff', fontSize: '3rem' },
        subtitle: { text: 'Build amazing sites', color: '#e0e0e0' },
        button: { text: 'Get Started', variant: 'primary' }
      },
      // ... all sections with full default data
    }
  }
};
```

### Key Principles

1. **Layout is the Renderer**: DynamicRenderer iterates through `layout` array
2. **Config is the Data**: All template content stored in `defaultConfig`
3. **Registry is the Mapper**: Component registry transforms config into props
4. **Schema is Historical**: `configSchema` exists for reference but editor uses component registry

### Field Types

- **text**: Single-line text input
- **textarea**: Multi-line text
- **color**: Color picker
- **select**: Dropdown with options
- **toggle**: Boolean on/off
- **number**: Numeric input
- **array**: List of items (cards, features, testimonials)

---

## Summary

The Page Builder is a sophisticated config-driven application that:

1. **Separates Concerns**: Three-layer architecture (UI → Templates → App)
2. **Enables Customization**: Component registry + prop mappers transform data into UI
3. **Manages State**: Redux with history, persistence, and undo/redo
4. **Supports i18n**: 4 languages with RTL support
5. **Exports Static Sites**: Self-contained HTML with inlined CSS
6. **Handles Errors Gracefully**: Three-level error boundaries
7. **Optimizes Performance**: Memoization, code splitting, lazy loading, debouncing

This architecture took 10 days to complete and represents a production-ready, maintainable system for building and exporting professional websites without code.
