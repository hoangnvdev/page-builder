# @page-builder/ui

A comprehensive, production-ready UI component library for the Page Builder application. Built with React and SCSS modules, optimized for tree-shaking and minimal bundle size.

## Components

### Layout Components

- **Container** - Responsive content wrapper with max-width constraints
- **Flex** - Flexbox layout container with alignment props
- **Grid** - CSS Grid layout container with responsive columns
- **Section** - Page section wrapper with spacing utilities
- **Page** - Full page wrapper component
- **Panel** - Slide-out side panel with animations

### Form Components

- **Input** - Text input with label and validation states
- **Textarea** - Multi-line text input
- **Select** - Dropdown select with custom styling
- **ColorPicker** - Advanced color selection input with presets

### Display Components

- **Button** - Versatile button with multiple variants (primary, secondary, outline, ghost)
- **Card** - Flexible card container with Image, Content, Title, Description, Actions
- **Avatar** - User avatar with image or initials
- **Badge** - Status badge with color variants
- **EmptyState** - Empty state placeholder with icon and message
- **Divider** - Horizontal/vertical dividers
- **Image** - Optimized image component with lazy loading

### Typography

- **Title** - Page/section title component
- **SubTitle** - Secondary heading component
- **Text** - Body text with size variants
- **Label** - Form label component
- **Link** - Styled anchor link component

### Navigation

- **Toolbar** - Top toolbar with left/right sections and actions

## Installation

This package is part of the page-builder monorepo and is managed via pnpm workspaces.

## Usage

```jsx
import { Button, Card, Input, Grid, Flex } from "@page-builder/ui";
import "@page-builder/ui/dist/style.css"; // Import styles

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

## Styling

Components use SCSS modules for scoped styling. Import the compiled CSS bundle:

```js
import "@page-builder/ui/dist/style.css";
```

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
