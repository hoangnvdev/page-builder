# Page Builder

A modern, high-performance browser-based page builder for creating and exporting static websites. Built with React, Redux Toolkit, and an optimized Vite build pipeline.

## Features

- **Template Gallery** - Browse and select from 4 professionally designed templates (Business Pro, Comic Splash, Futuristic Tech, Refined Classic)
- **Visual Editor** - Click and customize any element with an intuitive property panel
- **Live Preview** - See changes in real-time with instant feedback
- **HTML Export** - Download production-ready static HTML with inlined CSS
- **No Code Required** - Perfect for designers and non-technical users
- **Optimized Performance** - Lazy loading, code splitting, memoization, and modern build optimizations
- **Component System** - Extensive library with 14 template sections, 27 UI primitives, and 34 editor components
- **Config-Driven Architecture** - Templates defined by data configurations, not hardcoded JSX
- **Internationalization** - Multi-language support (English, Vietnamese, Japanese, Arabic) with RTL layout support
- **Undo/Redo** - Full history management with up to 150 actions tracked
- **Error Boundaries** - Robust error handling with graceful fallbacks at page, component, and inline levels

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Build all packages for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

This is a **monorepo** managed by **pnpm workspaces** with three packages:

```
page-builder/
├── packages/
│   ├── ui/                     # @page-builder/ui
│   │   ├── src/                # Reusable UI components library
│   │   ├── locales/            # i18n translation files
│   │   ├── index.js            # Package exports
│   │   └── styles.js           # Style imports
│   ├── templates/              # @page-builder/templates
│   │   ├── src/                # Template library
│   │   ├── components/         # Template components
│   │   ├── configs/            # Template configurations
│   │   ├── locales/            # i18n translation files
│   │   ├── registries/         # Component & template registries
│   │   └── utils/              # Helper functions
│   └── app/                    # @page-builder/app
│       ├── src/                # Main application
│       ├── components/         # App components
│       ├── locales/            # Translation files
│       ├── pages/              # Design & Template pages
│       ├── routes/             # React Router config
│       ├── store/              # Redux Toolkit state
│       ├── utils/              # App-specific utilities
│       └── i18n.js             # i18n configuration
├── pnpm-workspace.yaml         # Workspace configuration
└── package.json                # Root package with scripts
```

### Package Dependencies

```
@page-builder/app
├── @page-builder/ui
└── @page-builder/templates
    └── @page-builder/ui
```

Each package is independently buildable and can be published to npm.

## Architecture

### Monorepo Structure

This project uses a **monorepo architecture** with **pnpm workspaces**, consisting of three independent yet interconnected packages:

#### 1. `@page-builder/ui` (Foundation Layer)

**Purpose**: Reusable primitive UI component library

**Components** (27 total):

- **Layout**: Container, Flex, Grid, Section, Spacer
- **Typography**: Title, Subtitle, Text, Link
- **Interactive**: Button, Input, Textarea, Select, Checkbox, Toggle, ColorPicker
- **Display**: Card, Badge, Icon, Image, Logo, Divider
- **Feedback**: ErrorBoundary, Loader, Toast
- **Utility**: Portal, Tooltip

**Features**:

- SCSS modules with centralized design tokens
- i18n support (4 languages)
- No dependencies on other packages
- Tree-shakeable exports

#### 2. `@page-builder/templates` (Business Logic Layer)

**Purpose**: Template configurations and rendering system

**Templates** (4 total):

1. **Business Pro**: Professional corporate, blue gradients, 7 sections
2. **Comic Splash**: Playful cartoon style, bold colors, 9 sections with unique marquee and comic panels
3. **Futuristic Tech**: Cyberpunk/sci-fi, neon effects, 7 sections with terminal component
4. **Refined Classic**: Elegant serif typography, 8 sections with portfolio grid

**Template Sections** (14 components):

- CallToAction, ComicPanels, ContentSection, Footer, Header, Hero
- ImageGrid, ItemGrid, Marquee, SpeechBubbleTestimonials
- StatsCounter, Terminal, TestimonialCards, DynamicRenderer

**Key Systems**:

- **Component Registry**: Maps config types to React components with prop transformation
- **Dynamic Renderer**: Constructs pages from configuration objects
- **Config-Driven Templates**: Templates are data, not code
- **Prop Mappers**: Utility functions to transform config data into component props

**Dependencies**: `@page-builder/ui`

#### 3. `@page-builder/app` (Application Layer)

**Purpose**: Visual editor interface and state management

**Features**:

- **Redux Store**: Centralized state with localStorage persistence (debounced 1s)
- **History Management**: Undo/redo with 150-action buffer
- **Visual Editor**: Property panel with hierarchical selection (page → section → element)
- **HTML Export**: Static site generation with inlined CSS
- **Routing**: React Router with lazy-loaded pages
- **Internationalization**: Centralized i18n instance merging translations from all packages
- **Error Handling**: Multi-level error boundaries (page, component, inline)

**App Components** (34 total in 7 categories):

- Editor: PropertyPanel, PreviewRenderer, EditorCanvas, Toolbar
- Controls: ColorPicker, FontPicker, AlignmentPicker, SpacingControls
- History: HistoryList, HistoryItem
- Export: ExportButton, ExportModal
- Gallery: TemplateGallery, TemplateCard
- Layout: Header, Footer, Sidebar
- Utility: ErrorBoundary variants, Loader, Toast notifications

**Dependencies**: `@page-builder/ui`, `@page-builder/templates`

### Dependency Graph

```
@page-builder/app
├── @page-builder/ui
└── @page-builder/templates
    └── @page-builder/ui
```

### Key Architectural Patterns

1. **Config-Driven Templates**: Templates are JSON-like configurations, not hardcoded JSX
2. **Component Registry Pattern**: Maps type strings to React components with prop transformation
3. **Generic Component-Based Editor**: Property panel dynamically renders fields based on component type
4. **Centralized i18n**: Single i18n instance with namespaced translations from all packages
5. **Error Boundaries at Every Level**: Page-level, component-level, and inline error handling

## Tech Stack

### Core Technologies

- **React 18** - UI framework with automatic JSX runtime and concurrent features
- **Redux Toolkit** - State management with slices pattern and built-in immutability
- **React Router** - Client-side routing with lazy-loaded pages
- **Vite 8** - Next-generation build tool with optimized HMR and build pipeline

### Key Libraries

- **i18next** - Internationalization framework with browser language detection
- **react-i18next** - React bindings for i18next with hooks
- **Lucide React** - Modern icon library with tree-shakeable imports
- **UUID** - Unique identifier generation for history tracking
- **PropTypes** - Runtime type checking for component props
- **ReactDOMServer** - Server-side rendering for HTML export

### Build Optimizations

#### Code Splitting

- **Manual chunk splitting**: Separate vendor bundles for React, Redux, i18n, and icons
- **Lazy loading**: Routes loaded on-demand with React.lazy
- **Tree-shaking**: Named exports with ES modules for minimal bundle size
- **CSS code splitting**: Separate CSS files per component

#### Performance

- **Modern ES2020+ target**: Smaller output, native async/await, optional chaining
- **esbuild minification**: 20-40x faster than Terser with good compression
- **Memoization**: Template renderer and sections memoized to prevent unnecessary re-renders
- **Debounced persistence**: localStorage saves debounced to 1 second
- **Asset optimization**: Images inlined under 4KB, larger assets optimized

#### Developer Experience

- **Hot Module Replacement (HMR)**: Instant feedback during development
- **Sourcemaps disabled in production**: Faster builds and smaller deployments
- **pnpm workspaces**: Fast, efficient monorepo management with hard links

## Export System

The Page Builder exports fully self-contained, production-ready HTML files with inlined CSS. No build tools or runtime dependencies required.

### Export Process

1. **Render to Static HTML**: Uses `ReactDOMServer.renderToStaticMarkup()` to convert React components to pure HTML
2. **Extract Styles**: Collects all CSS from loaded stylesheets in the document
3. **Bundle**: Combines CSS reset, component styles, and HTML into a complete document
4. **Clean**: Removes editor-specific attributes (`data-element`, etc.)
5. **Download**: Creates a Blob and triggers browser download

### Export Features

- **Self-Contained**: All CSS inlined, no external dependencies
- **SEO-Ready**: Semantic HTML with proper `<title>` and meta tags
- **Clean Output**: Removes editor attributes used for selection
- **Reset Styles**: Includes CSS reset for cross-browser consistency
- **Filename Pattern**: `{template-id}-{date}.html` (e.g., `business-pro-2026-03-20.html`)
- **Pure HTML/CSS**: No React runtime, works without JavaScript

### Implementation

Located in `packages/app/src/utils/exportHTML.jsx`

```javascript
export const exportToHTML = (TemplateComponent, config, templateName) => {
  // 1. Render React to static HTML
  const bodyContent = renderToStaticMarkup(
    <TemplateComponent config={config} />,
  );

  // 2. Extract styles from loaded stylesheets
  const componentStyles = extractStylesFromDocument();

  // 3. Bundle HTML + CSS into full document
  const htmlDocument = buildHTMLDocument(pageTitle, allStyles, bodyContent);

  // 4. Clean editor attributes and download
  return removeEditorAttributes(htmlDocument);
};
```

This project is optimized for deployment on Netlify with:

- Automated build configuration
- Asset optimization and code splitting
- Security headers and caching rules

### Updated Deployment Guide

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions. The guide includes:

- Netlify setup with `netlify.toml`
- Build commands for all packages
- Environment variable configuration (optional)
- Manual deployment steps for testing and production

### CI/CD

GitHub Actions automatically:

- ✅ Verifies builds on every push and PR
- ✅ Runs bundle size analysis
- ✅ (Optional) Deploys previews for PRs
- ✅ (Optional) Deploys to production

### Updated CI/CD Guide

See [.github/GITHUB_ACTIONS.md](.github/GITHUB_ACTIONS.md) for setup details. The guide includes:

- Workflow for building and testing all packages
- Artifact uploads for manual testing
- Optional Netlify deployment secrets
