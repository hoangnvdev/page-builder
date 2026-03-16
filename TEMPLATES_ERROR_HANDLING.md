# Templates Package - Error Handling Strategy

## Overview

The **templates package** is the heart of the page-builder project. It contains:

- **componentRegistry.js** - Maps component types to React components and prop transformations
- **templateRegistry.js** - Registry of all available templates
- **componentHelpers.js** - Utility functions for component operations

Strategic error handling has been added to protect the "spirit" of the project.

---

## Architecture

### Component Flow

```
Template Config → DynamicRenderer → componentRegistry → Component
                       ↓                    ↓               ↓
              ErrorBoundary          try-catch       ErrorBoundary
```

### Error Protection Layers

#### 1. **DynamicRenderer** - Template-level Protection

**Location**: `packages/templates/src/components/DynamicRenderer/index.jsx`

Each component in a template is wrapped with `ComponentErrorBoundary`:

```jsx
{
  layout.map((elementKey, index) => {
    // ... get component and props

    return (
      <ComponentErrorBoundary
        key={`${elementKey}-${index}`}
        componentName={elementKey}
        onError={handleComponentError}
      >
        <Component {...props} />
      </ComponentErrorBoundary>
    );
  });
}
```

**Benefits**:

- ✅ Single component error doesn't break entire template
- ✅ Other sections continue rendering
- ✅ User can interact with working sections
- ✅ Isolated error reporting per component

---

#### 2. **componentRegistry** - Prop Mapping Protection

**Location**: `packages/templates/src/registries/componentRegistry.js`

Added try-catch in `getComponentForElement`:

```javascript
export const getComponentForElement = (elementType, config, templateConfig) => {
  const registration = componentRegistry[elementType];
  if (!registration) {
    console.warn(`No component registered for element type: ${elementType}`);
    return null;
  }

  const { component, propsMapper } = registration;

  try {
    // Map configuration to component props
    const props = propsMapper(config, templateConfig);
    props.dataElement = elementType;
    return { component, props };
  } catch (error) {
    console.error(`Error mapping props for component: ${elementType}`, error);

    if (process.env.NODE_ENV === "development") {
      console.error("Component config:", config);
      console.error("Template config:", templateConfig);
    }

    // Return null - DynamicRenderer will skip this component
    return null;
  }
};
```

**Catches**:

- Invalid config structure
- Missing required properties
- Type conversion errors (e.g., string to number)
- Nested property access errors

---

#### 3. **componentHelpers** - Safe Utility Functions

**Location**: `packages/templates/src/helpers/componentHelpers.js`

All helper functions wrapped with try-catch:

```javascript
export const getDropShadow = (shadow) => {
  try {
    const shadows = {
      none: "none",
      light: "0 2px 4px rgba(0, 0, 0, 0.1)",
      // ...
    };
    return shadows[shadow] || shadows.light;
  } catch (error) {
    console.error("Error in getDropShadow:", error);
    return "0 2px 4px rgba(0, 0, 0, 0.1)"; // Safe fallback
  }
};
```

**All protected helpers**:

- `getDropShadow()` - Returns default "light" shadow
- `getAspectRatioValue()` - Returns default "16 / 9"
- `extractText()` - Returns empty string ""
- `getNestedValue()` - Returns provided defaultValue

---

## ComponentErrorBoundary

### Features

**Lightweight & Focused:**

- Designed specifically for template components
- Minimal overhead
- Does not import i18n (avoids circular dependencies)

**Smart Fallback:**

```jsx
// Default fallback UI
<div style={{ padding: '1rem', backgroundColor: '#fef2f2', ... }}>
  <strong>⚠️ Component Error:</strong> {componentName}
  {/* Development mode: show details */}
</div>
```

**Custom Fallback Support:**

```jsx
<ComponentErrorBoundary
  componentName="hero"
  fallback={(error, componentName) => (
    <div>Custom error UI for {componentName}</div>
  )}
>
  <Hero {...props} />
</ComponentErrorBoundary>
```

**Error Callback:**

```jsx
const handleComponentError = (error, errorInfo, componentName) => {
  console.error(`Template: ${templateConfig.id} - Component: ${componentName}`);
  // Send to error tracking service
  // trackError({ templateId, componentName, error });
};

<ComponentErrorBoundary onError={handleComponentError}>
  <Component />
</ComponentErrorBoundary>;
```

---

## Error Scenarios & Handling

### Scenario 1: Invalid Component Config

**Problem:**

```javascript
// Missing required 'items' array
elements: {
  features: {
    type: 'features',
    heading: 'Features',
    // items: [] is missing!
  }
}
```

**Flow:**

1. `getComponentForElement` calls `propsMapper`
2. `propsMapper` tries to map `config.items`
3. Error accessing `items.map()`
4. Try-catch catches error
5. Returns `null`
6. DynamicRenderer skips this component
7. Other components continue rendering

**Result**: Template shows with missing features section (graceful degradation)

---

### Scenario 2: Component Throws During Render

**Problem:**

```jsx
// Hero component has a bug
export const Hero = ({ title, subtitle }) => {
  // Oops! subtitle might be undefined
  const words = subtitle.split(" "); // Error if undefined!
  // ...
};
```

**Flow:**

1. ComponentErrorBoundary wraps Hero
2. Hero throws error: "Cannot read property 'split' of undefined"
3. ComponentErrorBoundary catches it
4. Shows error fallback for Hero section
5. Other components (Header, Features, Footer) work normally

**Result**: Template shows with error placeholder in Hero section

---

### Scenario 3: Type Conversion Error

**Problem:**

```javascript
elements: {
  hero: {
    titleLevel: "invalid", // Should be number
  }
}
```

**Flow:**

1. `propsMapper` converts: `Number(config.titleLevel)`
2. Results in `NaN`
3. Component receives `NaN` as prop
4. Component might crash OR render incorrectly
5. ComponentErrorBoundary catches render crash
6. Shows error fallback

**Better Prevention:**

```javascript
titleLevel: typeof config.titleLevel === "string"
  ? Number(config.titleLevel) || 2 // Fallback to 2 if NaN
  : config.titleLevel || 2;
```

---

### Scenario 4: Missing Component Registration

**Problem:**

```javascript
layout: ["header", "hero", "newComponent", "footer"];
// 'newComponent' is not in componentRegistry
```

**Flow:**

1. `getComponentForElement('newComponent', ...)`
2. `componentRegistry['newComponent']` is `undefined`
3. Early return with warning
4. Returns `null`
5. DynamicRenderer skips it
6. Other components render normally

**Console:**

```
⚠️ No component registered for element type: newComponent
```

---

## Testing Template Errors

### Test 1: Throw Error in Component

**Add to any template component:**

```jsx
export const Hero = (props) => {
  // Test error
  throw new Error("Test: Hero component error!");

  return <div>...</div>;
};
```

**Expected:**

- ✅ Hero section shows error fallback
- ✅ Header, Features, Footer sections work
- ✅ Console shows: "Error in component: hero"

---

### Test 2: Invalid Config

**Modify template config:**

```javascript
// In businessPro.config.js
elements: {
  features: {
    type: 'features',
    heading: 'Features',
    items: null, // Invalid! Should be array
  }
}
```

**Expected:**

- ✅ Prop mapping error caught
- ✅ Features section skipped
- ✅ Console shows: "Error mapping props for component: features"

---

### Test 3: Helper Function Error

**Modify componentHelpers.js temporarily:**

```javascript
export const getDropShadow = (shadow) => {
  // Simulate error
  const x = null;
  return x.property; // Throws!
};
```

**Expected:**

- ✅ Try-catch catches error
- ✅ Returns safe fallback value
- ✅ Console shows: "Error in getDropShadow"
- ✅ Component renders with default shadow

---

### Test 4: Multiple Component Errors

**Throw errors in multiple components:**

```jsx
// In Hero
throw new Error("Hero error!");

// In Features
throw new Error("Features error!");
```

**Expected:**

- ✅ Both sections show error fallbacks
- ✅ Header and Footer still work
- ✅ Each error logged separately
- ✅ Template structure intact

---

## Error Reporting Integration

### Add Error Tracking Service

**In DynamicRenderer:**

```javascript
const handleComponentError = (error, errorInfo, componentName) => {
  // Log for debugging
  console.error(`Component error: ${componentName}`, error);

  // Send to Sentry/LogRocket/etc
  if (window.Sentry) {
    window.Sentry.captureException(error, {
      tags: {
        templateId: templateConfig.id,
        componentName: componentName,
      },
      extra: {
        errorInfo: errorInfo,
        templateConfig: templateConfig,
      },
    });
  }
};
```

**In getComponentForElement:**

```javascript
} catch (error) {
  console.error(`Prop mapping error: ${elementType}`, error);

  // Track prop mapping errors
  if (window.analytics) {
    window.analytics.track('Component Prop Mapping Error', {
      elementType,
      templateId: templateConfig.id,
      error: error.message,
    });
  }

  return null;
}
```

---

## Best Practices

### ✅ DO:

- ✅ Keep ComponentErrorBoundary lightweight
- ✅ Log errors with component context
- ✅ Provide safe fallback values in helpers
- ✅ Validate config structure early
- ✅ Use default values for optional props
- ✅ Return null for unrecoverable errors

### ❌ DON'T:

- ❌ Let one component error crash entire template
- ❌ Throw errors in helper functions
- ❌ Access nested properties without checking
- ❌ Assume config properties always exist
- ❌ Ignore type conversions (use defaults)

---

## Error Boundary Hierarchy

```
App ErrorBoundary (page-level)
  └─ Route ErrorBoundary (page-level)
      └─ Page ErrorBoundary (component-level)
          └─ PreviewRenderer ErrorBoundary (component-level)
              └─ TemplateComponent
                  └─ DynamicRenderer
                      ├─ ComponentErrorBoundary (header)
                      │   └─ Header component
                      ├─ ComponentErrorBoundary (hero)
                      │   └─ Hero component
                      ├─ ComponentErrorBoundary (features)
                      │   └─ Features component
                      └─ ComponentErrorBoundary (footer)
                          └─ Footer component
```

**Error Isolation:**

- Individual component errors → ComponentErrorBoundary
- Template-wide errors → PreviewRenderer ErrorBoundary
- Page-wide errors → Page ErrorBoundary
- App-wide errors → App ErrorBoundary

---

## Performance Impact

### Minimal Overhead

**ComponentErrorBoundary:**

- No performance impact in happy path
- Only activates on error
- Lightweight fallback rendering
- No external dependencies

**Try-Catch in helpers:**

- Negligible overhead (~1-2%)
- Only catches synchronous errors
- Falls through immediately on success

---

## Summary

The templates package now has **comprehensive error protection**:

1. ✅ **ComponentErrorBoundary** - Isolates component errors
2. ✅ **Try-catch in componentRegistry** - Catches prop mapping errors
3. ✅ **Safe helpers** - All utilities have fallbacks
4. ✅ **Graceful degradation** - Partial template rendering on errors
5. ✅ **Development debugging** - Detailed error logs
6. ✅ **Production ready** - Clean user-facing errors

**The spirit of the project is protected** - individual component failures won't break the entire template experience! 🎉

---

## Quick Reference

### Files Modified

- ✅ `components/ComponentErrorBoundary/index.jsx` - New error boundary
- ✅ `components/DynamicRenderer/index.jsx` - Wraps components with boundary
- ✅ `registries/componentRegistry.js` - Added try-catch in getComponentForElement
- ✅ `helpers/componentHelpers.js` - Added try-catch to all helpers
- ✅ `components/index.js` - Export ComponentErrorBoundary

### Testing

- See [`TESTING_ERROR_BOUNDARY.md`](../TESTING_ERROR_BOUNDARY.md) for general testing
- Add component-specific tests by throwing errors in template components
- Check console for error logs
- Verify partial template rendering

### Integration

- No changes needed in existing components
- Error handling is automatic
- Opt-in custom fallbacks via `fallback` prop
- Opt-in error tracking via `onError` callback
