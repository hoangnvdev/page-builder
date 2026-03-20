# Page Builder - Project Overview

**Last Updated**: March 20, 2026

## Executive Summary

Page Builder is a modern, high-performance web application that enables users to create professional static websites through a visual editor interface. Built as a monorepo using React 18, Redux Toolkit, and Vite 8, it emphasizes performance, extensibility, and developer experience.

## Vision & Goals

### Primary Objectives

1. **Accessibility**: Enable users to create professional websites without coding
2. **Performance**: Deliver fast, optimized builds and runtime performance
3. **Extensibility**: Support easy addition of new templates and components
4. **Quality**: Export production-ready, standards-compliant HTML with inlined CSS

### Target Users

- **Content Creators**: Bloggers, writers, and content producers
- **Small Business Owners**: Local businesses needing web presence
- **Designers**: Visual designers without coding experience
- **Marketers**: Marketing professionals creating landing pages
- **Agencies**: Digital agencies building client sites quickly

## Project Architecture

### Monorepo Structure

```
page-builder/
├── packages/
│   ├── app/              # Main application (React + Redux)
│   ├── templates/        # Template library (config-driven)
│   └── ui/               # Component library (reusable UI)
├── ref-docs/             # Reference documentation
├── scripts/              # Build and utility scripts
├── .github/              # GitHub Actions CI/CD
└── netlify.toml          # Deployment configuration
```

### Package Responsibilities

#### @page-builder/app

**Role**: User-facing application

- Visual editor interface with PropertyPanel
- Template selection and gallery
- State management (Redux Toolkit with localStorage persistence)
- HTML export functionality (ReactDOMServer + CSS extraction)
- Routing and navigation (React Router with lazy loading)
- Centralized i18n instance (4 languages: en, vi, ja, ar)
- History management (undo/redo with 150-action buffer)
- Error boundaries at multiple levels

**Component Count**: 34 components in 7 categories
**Dependencies**: `@page-builder/ui`, `@page-builder/templates`

#### @page-builder/templates

**Role**: Template system and business logic

- 4 pre-built template configurations:
  - Business Pro (professional corporate)
  - Comic Splash (playful cartoon)
  - Futuristic Tech (cyberpunk/sci-fi)
  - Refined Classic (elegant sophistication)
- 14 template section components (Hero, Footer, Features, Terminal, etc.)
- Dynamic rendering engine (DynamicRenderer)
- Component registry with prop mapping
- Config-driven architecture (templates = data, not code)

**Component Count**: 14 sections
**Dependencies**: `@page-builder/ui`

#### @page-builder/ui

**Role**: Foundation component library

- **27 primitive components**:
  - Layout: Container, Flex, Grid, Section, Spacer
  - Typography: Title, Subtitle, Text, Link
  - Interactive: Button, Input, Textarea, Select, Checkbox, Toggle, ColorPicker
  - Display: Card, Badge, Icon, Image, Logo, Divider
  - Feedback: ErrorBoundary, Loader, Toast
  - Utility: Portal, Tooltip
- Centralized design tokens in `_variables.scss`
- SCSS modules for scoped styling
- i18n support for 4 languages
- Shared ErrorBoundary with 3 display modes

**Dependencies**: None (leaf package)

### Dependency Graph

```
┌─────────────────┐
│ @page-builder/  │
│      app        │
│   (34 comp)     │
└────────┬────────┘
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
┌────────┐ ┌──────────────┐
│   ui   │ │  templates   │
│(27 c.) │ │  (14 sec)    │
└────────┘ └──────┬───────┘
               │
               ▼
           ┌────────┐
           │   ui   │
           └────────┘
```

## Key Features

### 1. Template System

- **Config-Driven**: Templates defined by JSON-like configs
- **Dynamic Rendering**: Components instantiated from configuration
- **Registry Pattern**: Central component lookup
- **Flexible**: Easy to add new templates without code changes

### 2. Visual Editor

- **Click-to-Edit**: Direct manipulation of elements
- **Live Preview**: Real-time rendering
- **Property Panels**: Contextual editing controls
- **Undo/Redo**: Full history management

### 3. Component Library

- **13 Template Sections**: Hero, Footer, Testimonials, CallToAction, etc.
- **15 UI Primitives**: Button, Card, Grid, Container, etc.
- **34 App Components**: Editor UI, forms, layout organized in 7 categories
- **Composable**: Components work together seamlessly
- **Styled**: Consistent design system

### 4. Export System

- **Static HTML**: Fully self-contained output
- **Optimized**: Minified, production-ready code
- **Portable**: No runtime dependencies
- **SEO-Friendly**: Semantic HTML with proper structure

## Technology Stack

### Frontend Framework

- **React 18**: Latest version with automatic JSX runtime
- **Redux Toolkit**: Modern Redux with slices pattern
- **React Router**: Client-side routing

### Build System

- **Vite**: Next-generation bundler
  - Lightning-fast HMR
  - Optimized production builds
  - Native ES modules in dev
  - Plugin ecosystem

### Styling

- **SCSS**: CSS preprocessor
- **CSS Modules**: Scoped styling
- **Modern CSS**: Flexbox, Grid, Custom Properties

### Development Tools

- **pnpm**: Fast, disk-efficient package manager
- **ESLint**: Code linting
- **Prettier**: Code formatting (if configured)

### Deployment

- **Netlify**: Static site hosting
  - Automatic builds
  - CDN distribution
  - Custom domains
  - Form handling

## Design Principles

### 1. Config Over Code

Templates are data structures, not hardcoded JSX. This enables:

- Non-developers to create templates
- Easy template versioning
- Dynamic template loading
- A/B testing of layouts

### 2. Component Composition

Small, single-purpose components that combine into complex UIs:

- Easier to test
- More reusable
- Better code organization
- Simpler maintenance

### 3. Performance First

Every decision prioritizes performance:

- Code splitting (vendor, UI, templates)
- Tree-shaking (eliminate dead code)
- Modern ES2020+ targets (smaller bundles)
- Lazy loading (load on demand)
- Asset optimization (images, fonts)

### 4. Developer Experience

Tools and patterns that enhance productivity:

- Hot Module Replacement (instant feedback)
- TypeScript-ready (type definitions available)
- Clear folder structure (easy navigation)
- Comprehensive docs (reduce onboarding time)

### 5. User Experience

Intuitive interface for non-technical users:

- Visual feedback (immediate updates)
- Undo/redo (safe experimentation)
- Preview modes (desktop, tablet, mobile)
- Simple export (one-click download)

## Use Cases

### Landing Pages

**Scenario**: Marketing team needs a product launch page
**Solution**: Select template → Customize content → Export HTML → Deploy

### Portfolio Sites

**Scenario**: Designer needs to showcase work
**Solution**: Use portfolio template → Add projects → Customize colors → Export

### Business Sites

**Scenario**: Small business needs web presence
**Solution**: Choose business template → Edit services → Add contact form → Export

### Event Pages

**Scenario**: Event organizer needs registration page
**Solution**: Select event template → Set date/location → Add speakers → Export

## Success Metrics

### Performance Metrics

- **Load Time**: < 2 seconds on 3G
- **Bundle Size**: < 500KB gzipped
- **Lighthouse Score**: > 90 for Performance
- **Time to Interactive**: < 3.5 seconds

### User Metrics

- **Template Customization**: < 5 minutes average
- **Export Success Rate**: > 95%
- **User Satisfaction**: > 4.5/5 stars
- **Return Rate**: > 60% within 30 days

### Developer Metrics

- **Build Time**: < 30 seconds for production
- **Hot Reload**: < 100ms for changes
- **Test Coverage**: > 80%
- **Documentation Coverage**: 100% of public APIs

## Future Roadmap

### Phase 2: Enhanced Editing

- Drag-and-drop section reordering
- Media library for images
- Global style editor
- Custom CSS injection

### Phase 3: Collaboration

- Multi-user editing
- Version history
- Template marketplace
- Shared component library

### Phase 4: Advanced Features

- Dynamic content (forms, APIs)
- Multi-page sites
- SEO optimizer
- Analytics integration

### Phase 5: Enterprise

- White-label solution
- Custom domain mapping
- Advanced permissions
- Priority support

## Contributing

### Getting Started

1. Clone repository
2. Install dependencies: `pnpm install`
3. Start dev server: `pnpm start`
4. Read architecture docs in `/doc`

### Code Standards

- Follow existing patterns
- Write tests for new features
- Update documentation
- Keep bundles small

### Commit Guidelines

- Use conventional commits
- Reference issue numbers
- Write clear descriptions
- Keep commits focused

## Resources

### Documentation

- `/docs/ARCHITECTURE.md` - System architecture
- `/docs/DEVELOPMENT_GUIDE.md` - Development setup
- `/docs/BUILD_AND_DEPLOYMENT.md` - Build and deploy process
- `/docs/PERFORMANCE_OPTIMIZATION.md` - Performance guidelines

### Package Docs

- `packages/app/README.md` - App documentation
- `packages/templates/README.md` - Template system
- `packages/ui/README.md` - Component library

### External Links

- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Vite Documentation](https://vitejs.dev)
- [Netlify Docs](https://docs.netlify.com)

## Contact & Support

### Internal Team

- **Lead Developer**: [Your Name]
- **Architecture**: [Architect Name]
- **Design**: [Designer Name]

### Communication Channels

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Slack**: #page-builder (internal)

---

**Note**: This is a living document. Keep it updated as the project evolves.
