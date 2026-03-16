# Styling Guide

**Package**: @page-builder/ui
**Last Updated**: March 15, 2026

## Overview

The UI component library uses SCSS modules for component styling, following the BEM (Block Element Modifier) methodology combined with modern CSS features.

## Styling Stack

- **SCSS**: CSS preprocessor with variables, nesting, mixins
- **CSS Modules**: Scoped styling (optional, currently using global classes)
- **BEM Methodology**: .block\_\_element--modifier naming
- **Modern CSS**: Flexbox, Grid, Custom Properties

## File Structure

Each component has its own SCSS file:

```
Button/
├── index.jsx       # Component logic
└── index.scss      # Component styles
```

## BEM Methodology

### Block

The top-level component:

```scss
.button {
  display: inline-flex;
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
}
```

### Element

A child part of the block:

```scss
.button__icon {
  margin-right: 0.5rem;
}

.button__text {
  font-weight: 500;
}
```

### Modifier

A variation of the block or element:

```scss
.button--primary {
  background: #007bff;
  color: white;
}

.button--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Component Styling Pattern

```scss
// Button/index.scss

// 1. Block - Base styles
.button {
  // Layout
  display: inline-flex;
  align-items: center;
  justify-content: center;

  // Spacing
  padding: 0.75rem 1.5rem;
  gap: 0.5rem;

  // Typography
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;

  // Visual
  border: 1px solid transparent;
  border-radius: 0.375rem;
  background: #f3f4f6;
  color: #374151;

  // Interaction
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  // States
  &:hover {
    background: #e5e7eb;
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: #f3f4f6;
    }
  }
}

// 2. Elements - Child parts
.button__icon {
  display: flex;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
}

.button__text {
  flex: 1;
}

// 3. Modifiers - Variants
.button--primary {
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
}

.button--secondary {
  background: #6b7280;
  color: white;

  &:hover {
    background: #4b5563;
  }
}

.button--outline {
  background: transparent;
  border-color: currentColor;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
}

.button--ghost {
  background: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
}

// Size modifiers
.button--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.button--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

// State modifiers
.button--loading {
  pointer-events: none;

  .button__icon {
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## Design Tokens

Create shared variables in a central file:

```scss
// styles/_variables.scss

// Colors
$color-primary: #3b82f6;
$color-secondary: #6b7280;
$color-success: #10b981;
$color-warning: #f59e0b;
$color-error: #ef4444;
$color-info: #3b82f6;

$color-gray-50: #f9fafb;
$color-gray-100: #f3f4f6;
$color-gray-200: #e5e7eb;
$color-gray-300: #d1d5db;
$color-gray-400: #9ca3af;
$color-gray-500: #6b7280;
$color-gray-600: #4b5563;
$color-gray-700: #374151;
$color-gray-800: #1f2937;
$color-gray-900: #111827;

// Spacing
$spacing-xs: 0.25rem; // 4px
$spacing-sm: 0.5rem; // 8px
$spacing-md: 1rem; // 16px
$spacing-lg: 1.5rem; // 24px
$spacing-xl: 2rem; // 32px
$spacing-2xl: 3rem; // 48px

// Typography
$font-family-base:
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
$font-family-mono: "SF Mono", Monaco, "Cascadia Code", monospace;

$font-size-xs: 0.75rem; // 12px
$font-size-sm: 0.875rem; // 14px
$font-size-base: 1rem; // 16px
$font-size-lg: 1.125rem; // 18px
$font-size-xl: 1.25rem; // 20px
$font-size-2xl: 1.5rem; // 24px
$font-size-3xl: 1.875rem; // 30px
$font-size-4xl: 2.25rem; // 36px

$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

$line-height-tight: 1.25;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;

// Borders
$border-width: 1px;
$border-radius-sm: 0.25rem; // 4px
$border-radius-md: 0.375rem; // 6px
$border-radius-lg: 0.5rem; // 8px
$border-radius-xl: 1rem; // 16px
$border-radius-full: 9999px;

// Shadows
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

// Z-index
$z-index-dropdown: 1000;
$z-index-modal: 1050;
$z-index-tooltip: 1100;

// Transitions
$transition-base: all 0.2s ease;
$transition-fast: all 0.15s ease;
$transition-slow: all 0.3s ease;

// Breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;
```

Import in components:

```scss
// Button/index.scss
@import "../styles/variables";

.button {
  padding: $spacing-md $spacing-lg;
  font-family: $font-family-base;
  border-radius: $border-radius-md;
  transition: $transition-base;

  &--primary {
    background: $color-primary;
  }
}
```

## Mixins

Create reusable style patterns:

```scss
// styles/_mixins.scss

// Flex center
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Truncate text
@mixin truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Multi-line truncate
@mixin line-clamp($lines: 2) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// Responsive breakpoints
@mixin respond-to($breakpoint) {
  @if $breakpoint == "sm" {
    @media (min-width: $breakpoint-sm) {
      @content;
    }
  } @else if $breakpoint == "md" {
    @media (min-width: $breakpoint-md) {
      @content;
    }
  } @else if $breakpoint == "lg" {
    @media (min-width: $breakpoint-lg) {
      @content;
    }
  } @else if $breakpoint == "xl" {
    @media (min-width: $breakpoint-xl) {
      @content;
    }
  }
}

// Hover with no-touch devices only
@mixin hover {
  @media (hover: hover) {
    &:hover {
      @content;
    }
  }
}

// Focus visible (keyboard only)
@mixin focus-visible {
  &:focus-visible {
    @content;
  }
}

// Visually hidden (accessible)
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

Usage:

```scss
@import "../styles/mixins";

.card {
  @include flex-center;

  &__title {
    @include truncate;
  }

  &__description {
    @include line-clamp(3);
  }

  @include respond-to("md") {
    padding: 2rem;
  }

  @include hover {
    box-shadow: $shadow-lg;
  }
}
```

## Responsive Design

Use mobile-first approach:

```scss
.card {
  // Base (mobile) styles
  padding: 1rem;
  font-size: 0.875rem;

  // Tablet and up
  @media (min-width: 768px) {
    padding: 1.5rem;
    font-size: 1rem;
  }

  // Desktop and up
  @media (min-width: 1024px) {
    padding: 2rem;
    font-size: 1.125rem;
  }
}
```

## Accessibility

### Focus Styles

Always provide clear focus indicators:

```scss
.button {
  &:focus {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }

  // Remove outline for mouse users
  &:focus:not(:focus-visible) {
    outline: none;
  }

  // Keep outline for keyboard users
  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}
```

### Color Contrast

Ensure WCAG AA compliance (4.5:1 ratio for normal text):

```scss
// ✅ Good - sufficient contrast
.button--primary {
  background: #0066cc; // Blue
  color: #ffffff; // White
  // Contrast ratio: 8.59:1 ✅
}

// ❌ Bad - insufficient contrast
.button--light {
  background: #ffe4e1; // Light pink
  color: #ffa07a; // Light salmon
  // Contrast ratio: 2.1:1 ❌
}
```

### Screen Reader Only

```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Performance

### Critical CSS

Mark critical styles that should load first:

```scss
/* Critical: Above-the-fold styles */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.hero {
  min-height: 100vh;
}
```

### Avoid Expensive Properties

```scss
// ❌ Avoid - triggers layout
.element {
  width: 100%; // Triggers layout
  height: auto; // Triggers layout
  top: 10px; // Triggers layout
}

// ✅ Prefer - GPU accelerated
.element {
  transform: translateY(10px); // GPU accelerated
  opacity: 0.5; // GPU accelerated
}
```

### Will-change

Use sparingly for animations:

```scss
.animated-element {
  will-change: transform; // Hint browser to optimize

  &:hover {
    transform: scale(1.05);
  }

  // Remove after animation
  &:not(:hover) {
    will-change: auto;
  }
}
```

## Best Practices

### 1. Component Encapsulation

Each component should be self-contained:

```scss
// ✅ Good - scoped to component
.card {
  padding: 1rem;

  .card__header {
    margin-bottom: 0.5rem;
  }
}

// ❌ Bad - affects global styles
.card {
  p {
    // Too generic
    color: red;
  }
}
```

### 2. Specificity

Keep specificity low:

```scss
// ✅ Good - low specificity
.button--primary {
  background: blue;
}

// ❌ Bad - high specificity
.sidebar .widget .button.button--primary {
  background: blue;
}
```

### 3. Naming Consistency

Use consistent naming:

```scss
// ✅ Good
.button--primary
.button--secondary
.button--disabled

.button--small
.button--large

// ❌ Bad - inconsistent
.button--primary
.btn-secondary
.buttonDisabled
.lg-button
```

### 4. Avoid !important

```scss
// ❌ Avoid
.button {
  color: red !important;
}

// ✅ Use specificity or better selectors
.form .button {
  color: red;
}
```

## Testing Styles

### Visual Regression Testing

Use tools like Percy or Chromatic:

```javascript
// button.test.jsx
import { render } from "@testing-library/react";
import { Button } from "./Button";

test("Button variants render correctly", () => {
  const { container } = render(
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </>,
  );

  expect(container).toMatchSnapshot();
});
```

### Compute Styles

```javascript
test("Button has correct styles", () => {
  const { getByRole } = render(<Button>Click</Button>);
  const button = getByRole("button");

  const styles = window.getComputedStyle(button);
  expect(styles.display).toBe("inline-flex");
  expect(styles.cursor).toBe("pointer");
});
```

---

**See Also**:

- [COMPONENT_LIBRARY.md](./COMPONENT_LIBRARY.md) - Component API documentation
- [../../docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) - Overall architecture
