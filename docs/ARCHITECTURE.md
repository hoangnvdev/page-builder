# System Architecture

**Last Updated**: March 15, 2026

## Overview

Page Builder follows a monorepo architecture with three distinct packages that work together to create a cohesive page building experience. The architecture emphasizes separation of concerns, performance, and extensibility.

## Architectural Patterns

### 1. Monorepo Architecture

**Benefits**:

- **Shared dependencies**: Single source of truth for versions
- **Atomic changes**: Update multiple packages in one commit
- **Code sharing**: Easy cross-package imports
- **Simplified tooling**: One build pipeline
- **Better collaboration**: All code in one repository

**Structure**:

```
page-builder/
├── packages/
│   ├── ui/           # Independent component library
│   ├── templates/    # Depends on ui
│   └── app/          # Depends on ui + templates
└── pnpm-workspace.yaml
```

### 2. Layered Architecture

```
┌─────────────────────────────────────────┐
│         Application Layer               │
│    (User Interface & Interactions)      │
│         packages/app                    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────┴───────────────────────┐
│       Business Logic Layer              │
│   (Templates, Rendering, Export)        │
│       packages/templates                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────┴───────────────────────┐
│      Presentation Layer                 │
│   (UI Components & Styling)             │
│         packages/ui                     │
└─────────────────────────────────────────┘
```

Each layer depends only on layers below it, ensuring unidirectional data flow and preventing circular dependencies.

### 3. Config-Driven Architecture

Templates are defined declaratively as configuration objects:

```javascript
// Template = Data, not Code
const template = {
  name: "Business Pro",
  theme: { colors: {...}, fonts: {...} },
  sections: [
    { type: "Hero", props: {...} },
    { type: "Features", props: {...} },
    { type: "Footer", props: {...} }
  ]
};
```

**Advantages**:

- Templates are serializable (JSON, YAML)
- Can be loaded dynamically from APIs
- Non-developers can create templates
- Easy to version and diff
- Enables template marketplace

### 4. Registry Pattern

Components are registered in a central lookup table:

```javascript
// Component Registry
const registry = {
  Hero: HeroComponent,
  Features: FeaturesComponent,
  Footer: FooterComponent,
  // ...
};

// Dynamic instantiation
const Component = registry[section.type];
return <Component {...section.props} />;
```

**Benefits**:

- Add components without modifying core renderer
- Plugin architecture support
- Lazy load components
- Override components for customization

## Package Architecture

### packages/ui - Component Library

**Purpose**: Reusable UI primitives

**Architecture**:

```
ui/src/
├── Button/
│   ├── index.jsx         # Component logic
│   ├── index.scss        # Scoped styles
│   └── Button.stories.js # Storybook stories (optional)
├── Card/
├── Input/
└── index.js              # Public API
```

**Design Principles**:

- **Single Responsibility**: Each component does one thing
- **Composability**: Components combine easily
- **Customization**: Props for all visual aspects
- **Accessibility**: ARIA labels, keyboard navigation
- **No Business Logic**: Pure presentation

**Public API**:

```javascript
// Named exports for tree-shaking
export { Button } from "./Button";
export { Card } from "./Card";
export { Input } from "./Input";
// ...
```

### packages/templates - Template System

**Purpose**: Template library with dynamic rendering

**Architecture**:

```
templates/src/
├── components/           # Template-specific components
│   ├── Hero/
│   ├── Footer/
│   └── ...
├── configs/             # Template configurations
│   ├── businessPro.config.js
│   ├── comicSplash.config.js
│   └── index.js
├── core/                # Core rendering logic
│   ├── components/      # Base components
│   ├── hoc/            # Higher-order components
│   └── registries/     # Component registry
└── index.js            # Public API
```

**Key Concepts**:

#### Component Registry

```javascript
// core/registries/componentRegistry.js
const componentRegistry = new Map();

export const registerComponent = (name, component) => {
  componentRegistry.set(name, component);
};

export const getComponent = (name) => {
  return componentRegistry.get(name);
};

// Auto-register all components
import Hero from "../components/Hero";
import Footer from "../components/Footer";

registerComponent("Hero", Hero);
registerComponent("Footer", Footer);
```

#### Dynamic Renderer

```javascript
// core/DynamicRenderer.jsx
export function DynamicRenderer({ config }) {
  const { sections, theme } = config;

  return (
    <ThemeProvider theme={theme}>
      {sections.map((section, index) => {
        const Component = getComponent(section.type);
        if (!Component) {
          console.warn(`Component not found: ${section.type}`);
          return null;
        }
        return <Component key={index} {...section.props} />;
      })}
    </ThemeProvider>
  );
}
```

#### HOC Pattern

```javascript
// core/hoc/withTheme.jsx
export function withTheme(Component) {
  return function ThemedComponent(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
}

// Usage
export default withTheme(Hero);
```

### packages/app - Main Application

**Purpose**: User-facing page builder

**Architecture**:

```
app/src/
├── components/          # App-specific components
├── hooks/              # Custom React hooks
├── pages/              # Route pages
│   ├── Design/         # Builder interface
│   └── Template/       # Template gallery
├── routes/             # Routing configuration
├── services/           # External services
├── store/              # Redux store
│   ├── builderSlice.js # Main state slice
│   └── store.js
├── utils/              # Utilities
│   ├── exportHTML.jsx
│   └── processTemplateConfig.js
├── App.jsx
└── main.jsx
```

**State Management**:

Redux Toolkit with slices pattern:

```javascript
// store/builderSlice.js
const builderSlice = createSlice({
  name: "builder",
  initialState: {
    selectedTemplate: null,
    sections: [],
    editingSection: null,
    history: [],
    future: [],
  },
  reducers: {
    selectTemplate(state, action) {
      state.selectedTemplate = action.payload;
      state.sections = action.payload.sections;
    },
    updateSection(state, action) {
      const { id, ...updates } = action.payload;
      const section = state.sections.find((s) => s.id === id);
      if (section) {
        Object.assign(section, updates);
        // Save to history for undo
        state.history.push(JSON.stringify(state.sections));
      }
    },
    undo(state) {
      if (state.history.length > 0) {
        state.future.push(JSON.stringify(state.sections));
        state.sections = JSON.parse(state.history.pop());
      }
    },
    redo(state) {
      if (state.future.length > 0) {
        state.history.push(JSON.stringify(state.sections));
        state.sections = JSON.parse(state.future.pop());
      }
    },
  },
});
```

**Routing**:

```javascript
// routes/index.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<TemplateGallery />} />
    <Route path="/design" element={<DesignPage />} />
    <Route path="/template/:id" element={<TemplatePreview />} />
  </Routes>
</BrowserRouter>
```

## Data Flow

### 1. Template Selection Flow

```
User clicks template
      ↓
Action dispatched
      ↓
Redux updates state
      ↓
Component re-renders
      ↓
DynamicRenderer receives config
      ↓
Sections rendered from registry
      ↓
User sees template
```

### 2. Edit Flow

```
User clicks element
      ↓
Edit panel opens
      ↓
User changes property
      ↓
Action dispatched (updateSection)
      ↓
Redux updates state + history
      ↓
Component re-renders
      ↓
User sees change
```

### 3. Export Flow

```
User clicks export
      ↓
exportHTML utility called
      ↓
Current state → React components
      ↓
Components → HTML strings  (ReactDOMServer)
      ↓
Inline CSS extracted
      ↓
Bundle HTML + CSS
      ↓
Download file
```

## Performance Architecture

### Bundle Splitting Strategy

```
Main App Bundle
├── react-vendor.js     # React, ReactDOM, Router
├── redux-vendor.js     # Redux Toolkit
├── form-vendor.js      # Formik
├── icons-vendor.js     # Lucide React
├── ui-lib.js          # @page-builder/ui
├── templates-lib.js    # @page-builder/templates
└── app.js             # Application code
```

**Rationale**:

- **Vendor chunks**: Cache separately (rarely change)
- **Library chunks**: Update independently
- **App chunk**: Changes frequently

### Code Splitting

```javascript
// Lazy load routes
const Design = lazy(() => import("./pages/Design"));
const Template = lazy(() => import("./pages/Template"));

// Lazy load components
const HeavyComponent = lazy(() => import("./components/Heavy"));
```

### Tree-Shaking

All packages use ESM exports:

```javascript
// ✅ Tree-shakable
export { Button } from "./Button";
export { Card } from "./Card";

// ❌ Not tree-shakable
export default { Button, Card };
```

Build tools eliminate unused exports:

```javascript
// Import only Button
import { Button } from "@page-builder/ui";

// Card is NOT included in bundle ✅
```

## Security Architecture

### XSS Protection

```javascript
// Sanitize user input
import DOMPurify from "dompurify";

function sanitizeHTML(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "strong", "em"],
    ALLOWED_ATTR: [],
  });
}
```

### Content Security Policy

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self';
               script-src 'self';
               style-src 'self' 'unsafe-inline';"
/>
```

### Safe HTML Export

```javascript
// Escape user content in exports
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

## Scalability Considerations

### Adding New Templates

1. Create config in `templates/src/configs/`
2. Register in `configs/index.js`
3. No other changes needed ✅

### Adding New Components

1. Create component in `templates/src/components/`
2. Register in `core/registries/componentRegistry.js`
3. Component immediately available in all templates ✅

### Adding New UI Components

1. Create in `ui/src/ComponentName/`
2. Export in `ui/src/index.js`
3. Available to all packages ✅

## Testing Strategy

### Unit Tests

- Individual components
- Utility functions
- Redux reducers

### Integration Tests

- Component interactions
- State management flow
- Export functionality

### E2E Tests

- Full user workflows
- Template selection → Edit → Export
- Cross-browser compatibility

## Monitoring & Observability

### Performance Monitoring

```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Error Tracking

```javascript
// Global error handler
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  // Send to error tracking service
});
```

### Analytics

```javascript
// Track template usage
trackEvent("template_selected", {
  templateName: template.name,
  timestamp: Date.now(),
});
```

## Deployment Architecture

```
GitHub Repository
      ↓
   Push to main
      ↓
Netlify Build Trigger
      ↓
  pnpm install
      ↓
   pnpm build
      ↓
Build Optimization
      ↓
   Deploy to CDN
      ↓
  Live on netlify
```

---

**See Also**:

- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Development workflow
- [PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md) - Performance details
- [BUILD_AND_DEPLOYMENT.md](./BUILD_AND_DEPLOYMENT.md) - Build process
