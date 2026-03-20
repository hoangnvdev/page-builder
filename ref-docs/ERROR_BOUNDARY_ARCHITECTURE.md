# ErrorBoundary Architecture Documentation

**Last Updated**: March 20, 2026

## Overview

This document details the unified ErrorBoundary architecture implemented across the page-builder application. The ErrorBoundary is a single, shared component in the `@page-builder/ui` package, providing consistent error handling across all packages with three display modes.

**Date Completed**: March 17, 2026
**Location**: `packages/ui/src/components/ErrorBoundary/`
**Impact**: Used in `app` and `templates` packages
**Display Modes**: page, component, inline

---

## Problem Statement

### Before Refactoring

**Issues with Original Architecture**:

1. **Code Duplication**
   - `packages/app/src/components/ErrorBoundary/` (~400 lines)
   - `packages/templates/src/components/ComponentErrorBoundary/` (~350 lines)
   - Two separate implementations with similar logic
   - Difficult to maintain consistency

2. **Inconsistent UX**
   - App ErrorBoundary: Blue theme, lucide-react icons
   - ComponentErrorBoundary: Orange theme, inline SVG icons
   - Different animation timings
   - Different error message structures

3. **Maintenance Burden**
   - Bug fixes needed in two places
   - Feature additions required dual implementation
   - Style updates had to be synchronized manually

4. **Bundle Size**
   - Duplicate code in final bundles
   - Repeated SCSS compilation
   - Larger JavaScript payloads

### Solution

**Unified Shared Component**:

- Single source of truth in `@page-builder/ui`
- Supports multiple display modes
- Optional i18n integration
- Consistent styling and animations
- Reusable across all packages

---

## Architecture Design

### Component Structure

```
packages/ui/src/components/ErrorBoundary/
├── index.jsx        # Main component logic
└── index.scss       # Styles and animations
```

### Key Features

1. **Multi-Mode Support**
   - `page`: Full-page error for critical failures
   - `component`: Component-level errors with boundaries
   - `inline`: Compact inline error display

2. **Dimension Tracking**
   - Uses ResizeObserver API
   - Preserves container dimensions before error
   - Prevents layout shift when error UI appears
   - Smooth visual transitions

3. **Optional i18n Support**
   - Accepts translation function via `t` prop
   - Falls back to English if no `t` provided
   - Works in pre-i18n contexts (e.g., main.jsx)

4. **Elegant UI Design**
   - Smooth CSS animations (fadeIn, pulse, ripple)
   - Gradient backgrounds and shadows
   - Collapsible technical details
   - Responsive design (mobile-first)
   - Accessibility features

5. **Developer Experience**
   - Detailed error information in development
   - Component stack traces
   - Console logging with component names
   - Retry/reload functionality

---

## Component API

### Props

```typescript
interface ErrorBoundaryProps {
  // Required
  children: React.ReactNode;

  // Optional - Mode configuration
  mode?: "page" | "component" | "inline"; // default: 'component'

  // Optional - Customization
  componentName?: string; // For component identification
  fallback?:
    | React.ReactNode
    | ((error: Error, componentName?: string) => React.ReactNode);

  // Optional - Callbacks
  onError?: (
    error: Error,
    errorInfo: React.ErrorInfo,
    componentName?: string,
  ) => void;
  onReset?: () => void;
  resetPath?: string; // Navigation path for page errors

  // Optional - Internationalization
  t?: (key: string, fallback: string) => string; // i18n translate function
}
```

### Usage Examples

#### 1. Page-Level Error Boundary (with i18n)

```javascript
import { ErrorBoundary } from "@page-builder/ui";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary mode="page" resetPath="/template" t={t}>
      <YourApp />
    </ErrorBoundary>
  );
}
```

#### 2. Page-Level Error Boundary (without i18n)

```javascript
import { ErrorBoundary } from "@page-builder/ui";

// In main.jsx before i18n is initialized
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary mode="page">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ErrorBoundary>
  </StrictMode>,
);
```

#### 3. Component-Level Error Boundary

```javascript
import { ErrorBoundary } from "@page-builder/ui";
import { useTranslation } from "react-i18next";

function Editor() {
  const { t } = useTranslation();

  return (
    <div>
      <ErrorBoundary mode="component" t={t}>
        <PreviewRenderer />
      </ErrorBoundary>

      <ErrorBoundary mode="component" t={t}>
        <PropertyPanel />
      </ErrorBoundary>
    </div>
  );
}
```

#### 4. Template Component Error Boundary

```javascript
import { ErrorBoundary } from "@page-builder/ui";

function DynamicRenderer({ elementKey, Component, props }) {
  return (
    <ErrorBoundary
      mode="component"
      componentName={elementKey}
      onError={(error, errorInfo, name) => {
        console.error(`Error in ${name}:`, error);
      }}
    >
      <Component {...props} />
    </ErrorBoundary>
  );
}
```

#### 5. Inline Error Boundary

```javascript
import { ErrorBoundary } from "@page-builder/ui";
import { useTranslation } from "react-i18next";

function TemplateGallery() {
  const { t } = useTranslation();

  return (
    <div className="grid">
      {templates.map((template) => (
        <ErrorBoundary key={template.id} mode="inline" t={t}>
          <TemplateCard template={template} />
        </ErrorBoundary>
      ))}
    </div>
  );
}
```

#### 6. Custom Fallback

```javascript
import { ErrorBoundary } from "@page-builder/ui";

<ErrorBoundary
  mode="component"
  fallback={(error, componentName) => (
    <div className="custom-error">
      <h3>Oops! {componentName} failed</h3>
      <p>{error.message}</p>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>;
```

---

## Display Modes

### Page Mode (`mode="page"`)

**Use Case**: Critical application-level errors

**Visual Design**:

- Full viewport height background
- Large error icon (72px) with red color scheme
- Gradient background with subtle patterns
- Prominent title and description
- Action buttons (Reload Page, Go to Home)
- Collapsible error details in development

**When to Use**:

- Root level error boundaries (main.jsx, App.jsx)
- Critical route failures
- Authentication errors
- Fatal configuration errors

**Features**:

- Reload page functionality
- Optional navigation to safe path
- Maximum visibility for critical errors
- Full responsive experience

---

### Component Mode (`mode="component"`)

**Use Case**: Individual component failures within the app

**Visual Design**:

- Preserves original component dimensions
- Medium error icon (40px) with orange color scheme
- Dashed border with gradient background
- Component name badge (if provided)
- Compact error message
- Retry button
- Collapsible details in development

**When to Use**:

- Preview renderer regions
- Property panels
- Editor sections
- Template components (Hero, Header, Footer, etc.)
- Dynamic content areas

**Features**:

- Dimension tracking prevents layout shift
- Hover effects on container
- Smooth animations
- Component identification
- Retry without full page reload

---

### Inline Mode (`mode="inline"`)

**Use Case**: Small UI elements, list items, card components

**Visual Design**:

- Minimal height (single line)
- Small error icon (16px)
- Light red background with border
- Compact "Failed to load" message
- Small retry button

**When to Use**:

- Template gallery cards
- List items
- Navigation elements
- Small widgets
- Form components

**Features**:

- Minimal space usage
- Clear but unobtrusive
- Quick retry action
- Maintained list flow

---

## Dimension Tracking System

### How It Works

```javascript
componentDidMount() {
  // Set up ResizeObserver to track dimensions BEFORE errors occur
  if (this.containerRef.current && typeof ResizeObserver !== 'undefined') {
    this.resizeObserver = new ResizeObserver((entries) => {
      if (entries[0] && !this.state.hasError) {
        const { width, height } = entries[0].contentRect;
        this.setState({
          dimensions: { width, height },
        });
      }
    });
    this.resizeObserver.observe(this.containerRef.current);
  }
}
```

### Why It Matters

**Problem**: Error UI has different dimensions than failed component

- Causes layout shift when error appears
- Breaks page flow
- Poor user experience

**Solution**: Preserve original component dimensions

```javascript
const style = dimensions
  ? {
      minWidth: `${dimensions.width}px`,
      minHeight: `${dimensions.height}px`,
    }
  : {};
```

**Benefits**:

- No layout shift on error
- Smooth visual transition
- Maintains page structure
- Professional appearance

---

## Styling Architecture

### Animation System

```scss
// Keyframe animations
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes chevronRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}
```

### Color Schemes

**Page Mode (Critical Errors)**:

```scss
$page-primary: #ef4444; // Red
$page-secondary: #3b82f6; // Blue
$page-background: #fafafa; // Light gray
```

**Component Mode (Template Errors)**:

```scss
$component-primary: #f97316; // Orange
$component-background: #fefefe;
$component-border: #e5e7eb; // Light border
```

**Inline Mode (Minor Errors)**:

```scss
$inline-background: #fef2f2; // Light red
$inline-border: #fecaca; // Pink border
$inline-text: #dc2626; // Dark red
```

### Responsive Design

```scss
// Desktop (default)
.error-boundary__title {
  font-size: 2.25rem;
}

// Tablet (max-width: 768px)
@media (max-width: 768px) {
  .error-boundary__title {
    font-size: 1.75rem;
  }
}

// Mobile (max-width: 480px)
@media (max-width: 480px) {
  .error-boundary__title {
    font-size: 1.5rem;
  }
}
```

---

## Migration Guide

### Changes Made

#### 1. App Package

**Before**:

```javascript
// packages/app/src/components/ErrorBoundary/index.jsx
import ErrorBoundary from "./ErrorBoundary";
export { ErrorBoundary, ErrorBoundaryWithoutI18n };
```

**After**:

```javascript
// packages/app/src/components/index.js
export { ErrorBoundary } from "@page-builder/ui";
```

**Updated Files**:

- `src/App.jsx`: Changed `fallbackType="page"` → `mode="page"`, added `t={t}`
- `src/main.jsx`: Changed to use shared ErrorBoundary, `mode="page"`
- `src/components/Editor/index.jsx`: `mode="component"`, added `t={t}`
- `src/components/PreviewRenderer/index.jsx`: `mode="component"`, added `t={t}`
- `src/components/TemplateGallery/index.jsx`: `mode="inline"`, added `t={t}`
- `src/components/index.js`: Re-export from `@page-builder/ui`

**Removed**:

- `packages/app/src/components/ErrorBoundary/` (entire directory)

---

#### 2. Templates Package

**Before**:

```javascript
// packages/templates/src/components/ComponentErrorBoundary/index.jsx
import ComponentErrorBoundary from "./ComponentErrorBoundary";
export { ComponentErrorBoundary };
```

**After**:

```javascript
// packages/templates/src/components/index.js
export { ErrorBoundary } from "@page-builder/ui";
```

**Updated Files**:

- `src/components/DynamicRenderer/index.jsx`:
  - Import changed to `ErrorBoundary` from `@page-builder/ui`
  - Changed `ComponentErrorBoundary` → `ErrorBoundary`
  - Added `mode="component"` prop
- `src/components/index.js`: Re-export from `@page-builder/ui`

**Removed**:

- `packages/templates/src/components/ComponentErrorBoundary/` (entire directory)

---

#### 3. UI Package

**Added**:

```
packages/ui/src/components/ErrorBoundary/
├── index.jsx        # 450 lines - unified component
└── index.scss       # 550 lines - comprehensive styles
```

**Exported**:

```javascript
// packages/ui/src/index.js
export { default as ErrorBoundary } from "./components/ErrorBoundary";
```

---

### Prop Migration Table

| Old Prop (app)             | Old Prop (templates) | New Unified Prop   | Notes                            |
| -------------------------- | -------------------- | ------------------ | -------------------------------- |
| `fallbackType="page"`      | N/A                  | `mode="page"`      | Renamed for clarity              |
| `fallbackType="component"` | N/A                  | `mode="component"` | Same functionality               |
| `fallbackType="inline"`    | N/A                  | `mode="inline"`    | Same functionality               |
| N/A                        | `componentName`      | `componentName`    | Now available in all modes       |
| `resetPath`                | N/A                  | `resetPath`        | Unchanged                        |
| `onReset`                  | N/A                  | `onReset`          | Unchanged                        |
| `onError`                  | `onError`            | `onError`          | Now includes componentName param |
| `t` (via withTranslation)  | N/A                  | `t` (prop)         | Now optional prop                |
| N/A                        | `fallback`           | `fallback`         | Available in all modes           |

---

## Testing Strategy

### Unit Tests

```javascript
describe("ErrorBoundary", () => {
  it("should render children when no error", () => {
    const wrapper = mount(
      <ErrorBoundary mode="component">
        <div>Content</div>
      </ErrorBoundary>,
    );
    expect(wrapper.text()).toContain("Content");
  });

  it("should render error UI when error occurs", () => {
    const ThrowError = () => {
      throw new Error("Test error");
    };

    const wrapper = mount(
      <ErrorBoundary mode="component">
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(wrapper.text()).toContain("Component Error");
  });

  it("should preserve dimensions on error", () => {
    // Test ResizeObserver dimension tracking
  });

  it("should call onError callback", () => {
    const onError = jest.fn();
    // Test error callback invocation
  });
});
```

### Integration Tests

```javascript
describe("ErrorBoundary Integration", () => {
  it("should handle template component errors", () => {
    // Render template with error
    // Verify ErrorBoundary catches it
    // Verify retry functionality
  });

  it("should work without i18n", () => {
    // Render without t prop
    // Verify fallback English text
  });

  it("should handle page-level errors", () => {
    // Simulate critical error
    // Verify page mode rendering
    // Test reload functionality
  });
});
```

### Manual Testing Checklist

- [ ] Trigger error in Hero component → Orange component error appears
- [ ] Trigger error in PropertyPanel → Orange component error with retry
- [ ] Trigger error in template gallery card → Inline error appears
- [ ] Trigger critical app error → Full page error with reload
- [ ] Test without i18n (main.jsx) → English fallback works
- [ ] Test with i18n (App.jsx) → Translated text appears
- [ ] Verify dimension preservation (no layout shift)
- [ ] Test retry functionality in component mode
- [ ] Test reload functionality in page mode
- [ ] Check responsive design on mobile/tablet
- [ ] Verify collapsible details in development
- [ ] Confirm details hidden in production

---

## Performance Considerations

### Bundle Size Impact

**Before Refactoring**:

```
app/ErrorBoundary:       ~8KB (JS) + ~4KB (CSS)
templates/ComponentEB:   ~7KB (JS) + ~3KB (CSS)
Total:                   ~22KB
```

**After Refactoring**:

```
ui/ErrorBoundary:        ~9KB (JS) + ~5KB (CSS)
Total:                   ~14KB
Savings:                 ~8KB (~36% reduction)
```

### Runtime Performance

**ResizeObserver Impact**:

- Minimal: Only observes container, not all DOM
- Disconnects on unmount
- Only active when boundary mounted
- No performance impact on error-free renders

**Re-render Optimization**:

- Uses React class component (ErrorBoundary requirement)
- No unnecessary re-renders
- Children wrapped in stable div with ref
- Dimension state only updates before errors

---

## Error Logging Integration

### Current Implementation

```javascript
componentDidCatch(error, errorInfo) {
  const { componentName, onError } = this.props;

  // Console logging in development
  if (process.env.NODE_ENV === 'development') {
    const prefix = componentName
      ? `[ErrorBoundary:${componentName}]`
      : '[ErrorBoundary]';
    console.error(`${prefix} Error caught:`, error);
    console.error('Error info:', errorInfo);
  }

  // Store for UI display
  this.setState({ error, errorInfo });

  // Callback for custom handling
  if (onError) {
    onError(error, errorInfo, componentName);
  }

  // TODO: Send to error reporting service
}
```

### Future Integration: Error Reporting Services

#### Sentry

```javascript
import * as Sentry from '@sentry/react';

componentDidCatch(error, errorInfo) {
  // Existing logic...

  // Send to Sentry
  Sentry.captureException(error, {
    contexts: {
      react: {
        componentStack: errorInfo.componentStack,
        componentName: this.props.componentName,
      },
    },
  });
}
```

#### LogRocket

```javascript
import LogRocket from 'logrocket';

componentDidCatch(error, errorInfo) {
  // Existing logic...

  // Send to LogRocket
  LogRocket.captureException(error, {
    tags: {
      component: this.props.componentName || 'unknown',
      mode: this.props.mode,
    },
    extra: {
      errorInfo: errorInfo.componentStack,
    },
  });
}
```

---

## Accessibility Features

### ARIA Attributes

```javascript
// Error container
<div
  role="alert"
  aria-live="assertive"
  className="error-boundary"
>

// Retry button
<button
  aria-label={t('errorBoundary.actions.retry', 'Retry')}
  onClick={handleRetry}
>

// Details element
<details aria-expanded="false">
  <summary aria-label="Show technical details">
```

### Keyboard Navigation

- All interactive elements focusable
- Tab order follows visual order
- Enter/Space activates buttons
- Details toggle with keyboard

### Screen Reader Support

- Error announced immediately (role="alert")
- Descriptive button labels
- Clear error messages
- Technical details optional

---

## Best Practices

### DO ✅

1. **Always use mode prop explicitly**

   ```javascript
   <ErrorBoundary mode="component">
   ```

2. **Pass translation function when available**

   ```javascript
   <ErrorBoundary mode="component" t={t}>
   ```

3. **Use componentName for debugging**

   ```javascript
   <ErrorBoundary mode="component" componentName="Hero">
   ```

4. **Provide onError callback for logging**

   ```javascript
   <ErrorBoundary
     mode="component"
     onError={(error, errorInfo, name) => {
       logToService(error, errorInfo, name);
     }}
   >
   ```

5. **Use appropriate mode for context**
   - Page errors → `mode="page"`
   - Component sections → `mode="component"`
   - List items → `mode="inline"`

### DON'T ❌

1. **Don't nest ErrorBoundaries with same mode**

   ```javascript
   // ❌ BAD
   <ErrorBoundary mode="page">
     <ErrorBoundary mode="page">
       {" "}
       {/* Unnecessary */}
       <App />
     </ErrorBoundary>
   </ErrorBoundary>
   ```

2. **Don't use inline mode for large content**

   ```javascript
   // ❌ BAD - Use component mode instead
   <ErrorBoundary mode="inline">
     <ComplexDashboard />
   </ErrorBoundary>
   ```

3. **Don't skip error boundaries for critical paths**

   ```javascript
   // ❌ BAD - Always wrap preview rendering
   <PreviewRenderer />  // One error crashes entire app

   // ✅ GOOD
   <ErrorBoundary mode="component">
     <PreviewRenderer />
   </ErrorBoundary>
   ```

4. **Don't use custom fallback without good reason**
   - Built-in fallbacks are comprehensive
   - Custom fallbacks may lack features
   - Only use for specific UX requirements

---

## Troubleshooting

### Issue: ErrorBoundary not catching errors

**Symptoms**: Error crashes app instead of showing ErrorBoundary

**Possible Causes**:

1. Error thrown in event handler (not render)
2. Error in async code (Promise rejection)
3. Error in ErrorBoundary itself

**Solutions**:

```javascript
// ✅ For event handlers - use try/catch
const handleClick = () => {
  try {
    dangerousOperation();
  } catch (error) {
    setError(error); // Handle in component
  }
};

// ✅ For async code - use error boundary in render
if (error) {
  throw error; // ErrorBoundary will catch
}

// ✅ For Promise rejections - use error state
fetchData().catch((error) => {
  setError(error);
});
```

---

### Issue: Layout shift on error

**Symptoms**: Page jumps when error appears

**Causes**: Dimension tracking not working

**Solutions**:

1. Verify ResizeObserver support (modern browsers only)
2. Check container has measurable dimensions
3. Ensure ref is properly attached
4. Component must render before error occurs

---

### Issue: Translations not appearing

**Symptoms**: English fallback shown instead of translations

**Causes**: `t` function not passed or not working

**Solutions**:

```javascript
// ✅ Ensure t function is passed
const { t } = useTranslation();
<ErrorBoundary mode="component" t={t}>

// ✅ Check i18n is initialized
// ✅ Verify translation keys exist in locale files
```

---

## Maintenance & Updates

### Adding New Display Modes

1. Add mode to PropTypes

```javascript
mode: PropTypes.oneOf(['page', 'component', 'inline', 'newMode']),
```

2. Create render method

```javascript
renderNewModeFallback() {
  return (
    <div className="error-boundary error-boundary--new-mode">
      {/* Custom UI */}
    </div>
  );
}
```

3. Add to render switch

```javascript
case 'newMode':
  return this.renderNewModeFallback();
```

4. Add styles

```scss
.error-boundary--new-mode {
  // Custom styles
}
```

### Updating Styles

All styles in single file:

```
packages/ui/src/components/ErrorBoundary/index.scss
```

Changes automatically apply to all packages using ErrorBoundary.

### Updating Translation Keys

Add keys to locale files in consuming packages:

```json
{
  "errorBoundary": {
    "page": {
      "title": "Oops! Something went wrong",
      "message": "..."
    }
  }
}
```

---

## Version History

### v1.0.0 (March 17, 2026)

- Initial unified implementation
- Migrated from app and templates packages
- Three display modes (page, component, inline)
- Dimension tracking system
- Optional i18n support
- Comprehensive styling and animations
- Full responsive design

---

## Related Documentation

- [Performance Optimizations](./PERFORMANCE_OPTIMIZATIONS.md)
- [Component Architecture](./ARCHITECTURE.md)
- [Development Guide](./DEVELOPMENT_GUIDE.md)
- [Testing Strategy](../TESTING_ERROR_BOUNDARY.md)

---

**Document Version**: 1.0
**Last Updated**: March 17, 2026
**Maintained By**: Development Team
**Component Location**: `packages/ui/src/components/ErrorBoundary/`
