# @page-builder/app

The main Page Builder application - a visual editor for creating and exporting static websites using customizable templates.

## Overview

This is the user-facing application that brings together the UI component library (`@page-builder/ui`) and template system (`@page-builder/templates`) into a cohesive page builder experience.

## Features

- **Visual Template Editor** - Click-to-edit interface for customizing templates
- **Template Gallery** - Browse and select from available templates
- **Live Preview** - Real-time rendering of changes
- **State Management** - Redux Toolkit with builder slice for managing page state
- **HTML Export** - Export finished designs as static HTML
- **Component Customization** - Edit text, colors, images, and layout properties
- **Responsive Preview** - View designs at different breakpoints

## Tech Stack

- **React 18** - UI framework with hooks and automatic JSX runtime
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Vite** - Build tool with optimized configuration
- **Formik** - Form handling
- **Lucide React** - Icons

## Project Structure

```
packages/app/
├── src/
│   ├── components/          # App-specific UI components
│   │   ├── LoadingIndicator/
│   │   └── index.js
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route pages
│   │   ├── Design/         # Main builder interface
│   │   ├── Template/       # Template selection
│   │   └── index.js
│   ├── routes/             # React Router configuration
│   │   └── index.jsx
│   ├── services/           # API and external services
│   │   ├── fakeAPIService.js
│   │   └── index.js
│   ├── store/              # Redux store
│   │   ├── builderSlice.js # Main builder state
│   │   └── store.js        # Store configuration
│   ├── utils/              # Utility functions
│   │   ├── exportHTML.jsx  # HTML export logic
│   │   ├── processTemplateConfig.js
│   │   └── index.js
│   ├── App.jsx             # Root app component
│   └── main.jsx            # App entry point
├── helpers/                # Helper utilities
│   ├── object.js
│   └── index.js
├── public/                 # Static assets
│   └── _redirects          # Netlify redirects
├── index.html              # HTML template
├── vite.config.js          # Optimized Vite config
└── package.json

```

## Development

```bash
# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build (http://localhost:4173)
pnpm preview

# Lint code
pnpm lint
```

## Key Modules

### builderSlice.js

Redux Toolkit slice managing the builder state:

- Current template selection
- Section configuration
- User edits and customizations
- Undo/redo state

### exportHTML.jsx

Converts the current builder state into static HTML:

- Renders React components to HTML strings
- Inlines critical CSS
- Bundles external assets
- Produces download-ready files

### processTemplateConfig.js

Processes template configurations from the template library:

- Normalizes config structure
- Resolves component references
- Merges with default values
- Validates configuration

### fakeAPIService.js

Mock API for development and testing:

- Simulates backend endpoints
- Provides template data
- Mocks user authentication
- Enables offline development

## Build Optimizations

The Vite configuration is optimized for production:

### Code Splitting

- **react-vendor**: React, ReactDOM, React Router
- **redux-vendor**: Redux Toolkit
- **form-vendor**: Formik
- **icons-vendor**: Lucide React
- **ui-lib**: @page-builder/ui components
- **templates-lib**: @page-builder/templates

### Performance Features

- Modern ES2020+ target for smaller bundles
- esbuild minification (faster than Terser)
- Tree-shaking with side-effect detection
- CSS code splitting per route
- Asset optimization (images, fonts)
- Lazy loading for route components
- HMR (Hot Module Replacement) optimizations
- Client file warmup for faster startup

### Asset Organization

```
dist/
├── assets/
│   ├── js/           # JavaScript chunks
│   ├── css/          # Stylesheets
│   ├── images/       # Images
│   └── fonts/        # Web fonts
└── index.html        # Entry HTML
```

## Environment Variables

Create a `.env` file in the package root:

```bash
# API Configuration
VITE_API_URL=https://api.example.com

# Feature Flags
VITE_ENABLE_EXPORT=true
VITE_ENABLE_TEMPLATES=true

# Analytics
VITE_GA_ID=UA-XXXXXXXXX-X
```

## Deployment

Configured for Netlify deployment (see `netlify.toml` in root):

```bash
# Build command
pnpm build

# Publish directory
packages/app/dist
```

Supports:

- SPA routing with `_redirects`
- Environment variables
- Build optimizations
- Asset caching

## Routes

- `/` - Template gallery (home page)
- `/design` - Main builder interface
- `/template/:id` - Template preview

## State Management

The app uses Redux Toolkit with the following structure:

```js
{
  builder: {
    selectedTemplate: 'businessPro',
    sections: [...],
    editingSection: null,
    history: [...],
    // ...
  }
}
```

## Usage Example

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { updateSection } from './store/builderSlice';

function Editor() {
  const sections = useSelector(state => state.builder.sections);
  const dispatch = useDispatch();

  const handleEdit = (sectionId, updates) => {
    dispatch(updateSection({ id: sectionId, ...updates }));
  };

  return (
    // Editor UI
  );
}
```

## Contributing

When working on the app:

1. Keep the UI clean and intuitive
2. Maintain Redux state immutability
3. Use the provided UI components from `@page-builder/ui`
4. Follow the established patterns for new features
5. Test HTML export thoroughly
6. Ensure responsive design

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Bundle size: < 500KB (gzipped)
- Lighthouse score: > 90

## Browser Support

- Chrome/Edge 87+
- Firefox 78+
- Safari 14+
- Modern ES2020-compatible browsers
