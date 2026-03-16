# Page Builder

A modern, high-performance browser-based page builder for creating and exporting static websites. Built with React, Redux Toolkit, and an optimized Vite build pipeline.

## Features

- 🎨 **Template Gallery** - Browse and select from pre-built, professionally designed templates
- ✏️ **Visual Editor** - Click and customize any element with an intuitive interface
- 👁️ **Live Preview** - See changes in real-time with hot module replacement
- 📦 **HTML Export** - Download production-ready static HTML
- 🎯 **No Code Required** - Perfect for designers and non-technical users
- ⚡ **Optimized Performance** - Lazy loading, code splitting, and modern build optimizations
- 🧩 **Component System** - Extensive template component library with 18+ reusable sections
- 🎭 **Config-Driven** - Templates defined by data, not hardcoded layouts
- 🌐 **Internationalization** - Multi-language support (English, Vietnamese, Japanese, Arabic) with RTL layout

## Prerequisites

- **Node.js** 20.19+ or 22.12+ (required for Vite 8)
- **pnpm** 10.0+ (package manager)

You can use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions:

```bash
nvm use
```

## Quick Start

```bash
# Install dependencies (run from root)
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm start

# Build all packages for production
pnpm build

# Build individual packages
pnpm build:ui         # UI component library
pnpm build:templates  # Template library
pnpm build:app        # Main application

# Preview production build
pnpm preview
```

## How to Use

1. **Select a Template** - Choose from available templates
2. **Customize** - Click on elements to edit colors, text, images, etc.
3. **Preview** - See your changes in real-time
4. **Export** - Download your page as static HTML

## Available Templates

- **Business Pro** - Professional business landing page with modern design
- **Comic Splash** - Creative, comic-style layout with unique visual elements
- **Futuristic Tech** - Cutting-edge tech product showcase
- **Refined Classic** - Timeless, elegant design for sophisticated brands

Each template includes:

- Fully customizable sections (Hero, Features, Testimonials, etc.)
- Pre-configured layouts optimized for conversion
- Responsive design for all devices
- Export-ready HTML/CSS

## Project Structure

This is a **monorepo** managed by **pnpm workspaces** with three packages:

```
page-builder/
├── packages/
│   ├── ui/                     # @page-builder/ui
│   │   ├── src/                # Reusable UI components library
│   │   │   ├── assets/         # Static assets (images, etc.)
│   │   │   ├── components/     # All primitive UI components
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   ├── ColorPicker/
│   │   │   │   ├── Input/
│   │   │   │   ├── Panel/
│   │   │   │   └── ... (25 components)
│   │   │   ├── locales/        # i18n translation files (JSON)
│   │   │   ├── index.js        # Package exports
│   │   │   └── styles.js       # Style imports
│   │   └── package.json        # Publishable package
│   │
│   ├── templates/              # @page-builder/templates
│   │   ├── src/                # Template library
│   │   │   ├── components/     # Template components
│   │   │   ├── configs/        # Template configurations
│   │   │   ├── locales/        # i18n translation files (JSON)
│   │   │   ├── registries/     # Component & template registries
│   │   │   └── utils/          # Helper functions
│   │   └── package.json        # Depends on @page-builder/ui
│   │
│   └── app/                    # @page-builder/app
│       ├── src/                # Main application
│       │   ├── components/     # App components
│       │   ├── locales/        # Translation files
│       │   ├── pages/          # Design & Template pages
│       │   ├── routes/         # React Router config
│       │   ├── store/          # Redux Toolkit state
│       │   ├── utils/          # App-specific utilities
│       │   └── i18n.js         # i18n configuration
│       ├── index.html
│       └── package.json        # Depends on ui + templates
│
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

## Documentation

Comprehensive documentation is available in the [`docs/`](docs/) directory:

- **[i18n Architecture](docs/i18n-architecture.md)** - Complete internationalization system guide
- **[RTL Support](docs/rtl-support.md)** - Right-to-left layout implementation
- **[Default Image Usage](docs/default-image-usage.md)** - Default image fallback system
- **[Documentation Index](docs/README.md)** - Full documentation overview

## Tech Stack

### Core

- **React 18** - UI framework with automatic JSX runtime
- **Redux Toolkit** - State management with slices pattern
- **React Router** - Client-side routing
- **Vite** - Next-generation build tool with optimized configs

### Libraries

- **Formik** - Form handling and validation
- **Lucide React** - Modern icon library
- **UUID** - Unique identifier generation
- **PropTypes** - Runtime type checking

### Build Optimizations

- Code splitting with dynamic imports
- Tree-shaking for minimal bundle size
- Modern ES2020+ target for smaller output
- Optimized chunk splitting (vendor, UI, templates)
- CSS code splitting and minification
- Asset optimization (images, fonts)
- esbuild for fast minification

## Export Format

Exported pages are fully self-contained HTML files with inline CSS. No build tools or runtime dependencies required.

## Deployment

This project is optimized for deployment on Netlify with:

- Automated build configuration
- Asset optimization and code splitting
- Security headers and caching rules

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### CI/CD

GitHub Actions automatically:

- ✅ Verifies builds on every push and PR
- ✅ Runs bundle size analysis
- ✅ (Optional) Deploys previews for PRs
- ✅ (Optional) Deploys to production

See [.github/GITHUB_ACTIONS.md](.github/GITHUB_ACTIONS.md) for setup details.
