# Page Builder

A browser-based page builder for non-technical users to create static websites.

## Features

- 🎨 **Template Gallery** - Browse and select from pre-built templates
- ✏️ **Visual Editor** - Click and customize any element
- 👁️ **Live Preview** - See changes in real-time
- 📦 **HTML Export** - Download as ready-to-use static HTML
- 🎯 **No Code Required** - Perfect for non-technical users

## Quick Start

```bash
# Install dependencies (run from root)
pnpm install

# Start development server
pnpm start

# Build all packages
pnpm build

# Build individual packages
pnpm build:ui         # UI components
pnpm build:templates  # Template library
pnpm build:app        # Main application
```

## How to Use

1. **Select a Template** - Choose from available templates
2. **Customize** - Click on elements to edit colors, text, images, etc.
3. **Preview** - See your changes in real-time
4. **Export** - Download your page as static HTML

## Templates

- **Modern Portfolio** - Clean, professional portfolio layout
- **Business Landing** - Conversion-focused business page

## Project Structure

This is a **monorepo** managed by **pnpm workspaces** with three packages:

```
page-builder/
├── packages/
│   ├── ui/                     # @page-builder/ui
│   │   ├── src/                # Reusable UI components library
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── ColorPicker/
│   │   │   ├── Input/
│   │   │   ├── Panel/
│   │   │   └── ... (12 components)
│   │   └── package.json        # Publishable package
│   │
│   ├── templates/              # @page-builder/templates
│   │   ├── src/                # Template library
│   │   │   ├── ModernPortfolio/
│   │   │   ├── BusinessLanding/
│   │   │   └── templateRegistry.js
│   │   └── package.json        # Depends on @page-builder/ui
│   │
│   └── app/                    # @page-builder/app
│       ├── src/                # Main application
│       │   ├── pages/          # Design & Template pages
│       │   ├── routes/         # React Router config
│       │   ├── store/          # Redux Toolkit state
│       │   └── utils/          # App-specific utilities
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

## Tech Stack

- React 18
- Redux Toolkit (state management)
- Formik (forms)
- Vite (build tool)
- Lucide React (icons)

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
