# ErrorBoundary Implementation Strategy

## Overview

ErrorBoundaries have been strategically placed throughout the application to catch JavaScript errors at different phases/levels, preventing the entire app from crashing and providing graceful error recovery.

## ErrorBoundary Component

### Location

`packages/app/src/components/ErrorBoundary/`

### Features

- **React Class Component** ✅ (Required by React error boundary API)
- **Three fallback types**:
  - `page` - Full-page error UI with reload option
  - `component` - Component-level error UI with retry button
  - `inline` - Minimal inline error message
- **i18n Support** - Multilingual error messages (en, vi, ja, ar)
- **Development Mode** - Shows detailed error stack trace
- **Customizable** - Accepts `onError` and `onReset` callbacks
- **Reset Path** - Can navigate to specific route on reset

### Two Variants

1. **ErrorBoundary** (default export) - With i18n support (withTranslation HOC)
2. **ErrorBoundaryWithoutI18n** - For use before i18n is initialized

## Implementation Hierarchy

### 1. Root Level (main.jsx)

```jsx
<ErrorBoundaryWithoutI18n fallbackType="page">
  <I18nextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>
</ErrorBoundaryWithoutI18n>
```

**Purpose**: Catch errors that occur before i18n or Redux are initialized

---

### 2. App Level (App.jsx)

```jsx
<ErrorBoundary fallbackType="page" resetPath="/template">
  <RTLProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </RTLProvider>
</ErrorBoundary>
```

**Purpose**: Catch routing, navigation, and app-level errors
**Reset**: Navigates to `/template` page

---

### 3. Route Level (routes/index.jsx)

```jsx
<ErrorBoundary fallbackType="page" resetPath="/template">
  <React.Suspense fallback={<LoadingIndicator />}>
    <LazyTemplatePage />
  </React.Suspense>
</ErrorBoundary>
```

**Purpose**: Catch lazy-loading errors and page-specific errors
**Applied to**:

- `/template` route → TemplatePage
- `/design` route → DesignPage

---

### 4. Page Level (pages/)

#### Template Page

```jsx
<ErrorBoundary fallbackType="component">
  <TemplateGallery />
</ErrorBoundary>
```

**Purpose**: Isolate TemplateGallery errors from page structure

---

### 5. Component Level

#### Editor (components/Editor/)

```jsx
// PreviewRenderer
<ErrorBoundary fallbackType="component">
  <PreviewRenderer />
</ErrorBoundary>

// PropertyPanel
<ErrorBoundary fallbackType="component">
  <PropertyPanel />
</ErrorBoundary>
```

**Purpose**: Isolate preview/panel errors - if one fails, the other continues working

#### PreviewRenderer (components/PreviewRenderer/)

```jsx
<ErrorBoundary fallbackType="component">
  <TemplateComponent config={tempConfig} />
</ErrorBoundary>
```

**Purpose**: Catch template rendering errors without crashing the editor

#### TemplateGallery (components/TemplateGallery/)

```jsx
{
  templates.map((template) => (
    <ErrorBoundary fallbackType="inline">
      <TemplateCard template={template} onSelect={handleSelectTemplate} />
    </ErrorBoundary>
  ));
}
```

**Purpose**: If one template card fails, others remain functional

---

## Error Flow Example

**Scenario**: Template rendering error in PreviewRenderer

1. **TemplateComponent throws error**
2. **PreviewRenderer's ErrorBoundary** catches it
   - Shows component-level fallback inside preview area
   - User can retry or continue using PropertyPanel
3. **If retry fails**, error stays contained
4. **If PreviewRenderer boundary fails**, Editor's boundary catches it
5. **If Editor boundary fails**, Route boundary catches it
6. **If Route boundary fails**, App boundary catches it
7. **If App boundary fails**, Root boundary catches it (last resort)

## Fallback UI Types

### Page-level (`fallbackType="page"`)

- Full-screen error UI
- Background gradient
- Large error icon (AlertTriangle 64px)
- Error title and message
- Actions: "Reload Page" or "Go to Home"
- Stack trace in development mode

### Component-level (`fallbackType="component"`)

- Contained error UI with dashed border
- Smaller error icon (AlertTriangle 32px)
- Error title and message
- Action: "Retry" button
- Stack trace in development mode

### Inline-level (`fallbackType="inline"`)

- Minimal inline message
- Tiny error icon (AlertTriangle 16px)
- Text: "Failed to load"
- Link-style "Retry" button

## Translation Keys

All error messages are translatable:

```json
{
  "errorBoundary": {
    "page": {
      "title": "Something went wrong",
      "message": "We're sorry, but something unexpected happened..."
    },
    "component": {
      "title": "Component Error",
      "message": "This component failed to load..."
    },
    "inline": {
      "message": "Failed to load"
    },
    "showDetails": "Show error details",
    "actions": {
      "reload": "Reload Page",
      "goHome": "Go to Home",
      "retry": "Retry"
    }
  }
}
```

## Best Practices Applied

✅ **Progressive Degradation** - Errors caught at lowest level possible
✅ **Graceful Fallback** - App remains partially functional
✅ **User Feedback** - Clear error messages and recovery options
✅ **Developer Experience** - Detailed error info in dev mode
✅ **Internationalization** - Error messages in 4 languages
✅ **Accessibility** - Proper ARIA labels and semantic HTML
✅ **Responsive Design** - Error UI adapts to mobile/desktop

## Testing Error Boundaries

To test ErrorBoundaries in development:

1. **Throw error in a component**:

   ```jsx
   throw new Error("Test error");
   ```

2. **Check console** for:
   - "ErrorBoundary caught an error"
   - Component stack trace
   - Error details

3. **Verify UI** shows appropriate fallback based on `fallbackType`

4. **Test actions**:
   - "Retry" button resets error state
   - "Reload Page" refreshes browser
   - "Go to Home" navigates to reset path

## Future Enhancements

🔮 **Error Reporting Service Integration**

- Add Sentry/LogRocket/Bugsnag integration
- Uncomment line in ErrorBoundary: `logErrorToService(error, errorInfo)`

🔮 **Error Analytics**

- Track error frequency
- Identify problematic components
- Monitor error recovery success rate

🔮 **Custom Error Messages**

- Component-specific error messages
- Context-aware recovery suggestions

🔮 **Error Recovery Strategies**

- Automatic retry with exponential backoff
- Offline mode detection
- State persistence during errors

## Summary

The application now has **comprehensive error protection** at 5 levels:

1. **Root** - Framework initialization errors
2. **App** - Navigation and router errors
3. **Route** - Page lazy-loading errors
4. **Page** - Page-specific component errors
5. **Component** - Individual component errors

Each ErrorBoundary provides appropriate fallback UI and recovery options, ensuring the best possible user experience even when errors occur.

---

## Templates Package Protection

The **templates package** (the heart of the project) has its own specialized error handling:

### ComponentErrorBoundary

**Location**: `packages/templates/src/components/ComponentErrorBoundary/`

A lightweight error boundary specifically for template components:

- Wraps each component in `DynamicRenderer`
- Isolates errors to individual sections (hero, features, footer, etc.)
- If one section fails, others continue working
- Minimal overhead, no i18n dependencies

### Protected Areas

1. **DynamicRenderer** - Each template component wrapped individually
2. **componentRegistry** - Try-catch in prop mapping (`getComponentForElement`)
3. **componentHelpers** - All utility functions have safe fallbacks

### Error Flow Example

```
Template Rendering
  └─ DynamicRenderer
      ├─ ComponentErrorBoundary (header) ✅
      │   └─ Header component
      ├─ ComponentErrorBoundary (hero) ❌ ERROR
      │   └─ Hero component [SHOWS ERROR FALLBACK]
      ├─ ComponentErrorBoundary (features) ✅
      │   └─ Features component
      └─ ComponentErrorBoundary (footer) ✅
          └─ Footer component
```

**Result**: Hero section shows error, but Header, Features, and Footer work normally!

### Key Benefits

- ✅ **Graceful Degradation** - Partial template rendering on errors
- ✅ **Component Isolation** - One error doesn't break entire template
- ✅ **Safe Helpers** - All utility functions have fallbacks
- ✅ **Prop Mapping Protection** - Invalid configs handled gracefully
- ✅ **Development Debugging** - Detailed error logs with component context

**For detailed documentation**, see [`TEMPLATES_ERROR_HANDLING.md`](./TEMPLATES_ERROR_HANDLING.md)

---

## Complete Error Protection Stack

The full error protection hierarchy:

```
Root ErrorBoundary (app initialization)
  └─ App ErrorBoundary (navigation/routing)
      └─ Route ErrorBoundary (page lazy-loading)
          └─ Page ErrorBoundary (page components)
              └─ PreviewRenderer ErrorBoundary (template rendering)
                  └─ TemplateComponent
                      └─ DynamicRenderer
                          ├─ ComponentErrorBoundary (header)
                          ├─ ComponentErrorBoundary (hero)
                          ├─ ComponentErrorBoundary (features)
                          └─ ComponentErrorBoundary (footer)
```

**7 layers of protection** ensure maximum resilience! 🛡️
