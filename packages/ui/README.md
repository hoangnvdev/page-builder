# @page-builder/ui

A comprehensive, production-ready UI component library for the Page Builder application. Built with React and SCSS modules, optimized for tree-shaking and minimal bundle size.

## Package Structure

```
packages/ui/src/
├── assets/              # Static assets
│   └── images/
│       └── default-image.png  # Default fallback image
├── components/          # All primitive UI components
│   ├── Badge/
│   ├── Button/
│   ├── Card/
│   ├── ColorPicker/
│   ├── Container/
│   ├── Divider/
│   ├── EmptyState/
│   ├── ErrorBoundary/
│   ├── ErrorDisplay/
│   ├── FieldGroup/
│   ├── Flex/
│   ├── Grid/
│   ├── Image/
│   ├── Input/
│   ├── Link/
│   ├── Panel/
│   ├── Radio/
│   ├── Section/
│   ├── Select/
│   ├── Slider/
│   ├── SubTitle/
│   ├── Text/
│   ├── Textarea/
│   ├── Title/
│   ├── Toggle/
│   └── Toolbar/
├── locales/             # i18n translation files (JSON)
│   ├── en-EN.json
│   ├── vn-VN.json
│   ├── ja-JP.json
│   └── ar-AR.json
├── index.js             # Package exports
└── styles.js            # Global style imports
```

## Components

### Layout Components

- **Container** - Responsive content wrapper with max-width constraints
- **Flex** - Flexbox layout container with alignment props
- **Grid** - CSS Grid layout container with responsive columns
- **Section** - Page section wrapper with spacing utilities
- **Panel** - Slide-out side panel with animations

### Form Components

- **Input** - Text input with label and validation states
- **Textarea** - Multi-line text input
- **Select** - Dropdown select with custom styling
- **Radio** - Radio button groups with horizontal/vertical layouts
- **Toggle** - Switch/toggle component with sizes
- **Slider** - Range slider with customizable min/max/step
- **ColorPicker** - Advanced color selection input with hex/transparent support

### Display Components

- **Button** - Versatile button with multiple variants (primary, secondary, export, danger, ghost)
- **Card** - Flexible card container with Image, Content, Title, Description, Actions
- **Badge** - Status badge with color variants
- **EmptyState** - Empty state placeholder with icon and message
- **Divider** - Horizontal/vertical dividers
- **Image** - Optimized image component with lazy loading
- **Toolbar** - Top toolbar with sections and actions

### Typography

- **Title** - Page/section title component with heading levels
- **SubTitle** - Secondary heading component
- **Text** - Body text with size and weight variants
- **Link** - Styled anchor link component with external link support

### Error Handling

- **ErrorBoundary** - React error boundary for graceful error handling
- **ErrorDisplay** - Error message display component
- **FieldGroup** - Form field grouping component
- **Link** - Styled anchor link component

### Navigation

- **Toolbar** - Top toolbar with left/right sections and actions

## Installation

This package is part of the page-builder monorepo and is managed via pnpm workspaces.

## Usage

```jsx
import { Button, Card, Input, Grid, Flex } from "@page-builder/ui";
import "@page-builder/ui/styles"; // Import styles

function MyComponent() {
  return (
    <Grid columns={3} gap="lg">
      <Card>
        <Card.Image src="/image.jpg" alt="Example" />
        <Card.Content>
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card description goes here</Card.Description>
        </Card.Content>
        <Card.Actions>
          <Button variant="primary">Learn More</Button>
        </Card.Actions>
      </Card>
    </Grid>
  );
}
```

### Importing Components

All components are exported from the main package entry:

```jsx
// ✅ Recommended - named imports
import { Button, Card, Input } from "@page-builder/ui";

// All imports resolve to: @page-builder/ui/src/components/ComponentName
```

## Styling

Components use SCSS modules for scoped styling. Import the styles using the package export:

```js
import "@page-builder/ui/styles";
```

The package automatically resolves to:

- **Development**: Source SCSS files (for hot reload)
- **Production**: Compiled CSS bundle (optimized)

## Tree-Shaking

The library is built with ESM and supports tree-shaking. Only import what you use:

```jsx
// ✅ Good - only imports Button code
import { Button } from "@page-builder/ui";

// ❌ Avoid - imports everything
import * as UI from "@page-builder/ui";
```

## Development

```bash
# Build the package (optimized for production)
pnpm build

# Watch mode (for development)
pnpm dev

# Build with analysis
pnpm build -- --mode analyze
```

## Build Optimizations

- **Modern targets**: ES2020+ for smaller bundle size
- **Tree-shaking**: Unused components are excluded
- **CSS bundling**: All styles compiled to single CSS file
- **Minification**: esbuild for fast, efficient minification
- **No external deps**: Bundles everything except React/ReactDOM
