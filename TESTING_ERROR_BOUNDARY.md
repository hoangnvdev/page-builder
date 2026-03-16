# Testing ErrorBoundary - Complete Guide

## Quick Test Methods

### Method 1: Using the Test Component (Easiest)

1. **Add test component to Template page**:

```jsx
// packages/app/src/pages/Template/index.jsx
import React from "react";
import { ErrorBoundary } from "@/components";
import { ErrorBoundaryTest } from "@/components/ErrorBoundaryTest"; // Add this
import { TemplateGallery } from "../../components/TemplateGallery";

export const TemplatePage = () => {
  return (
    <>
      <ErrorBoundaryTest /> {/* Add this for testing */}
      <ErrorBoundary fallbackType="component">
        <TemplateGallery />
      </ErrorBoundary>
    </>
  );
};
```

2. **Navigate to `/template` page**
3. **Click the test buttons** to trigger different error scenarios
4. **Open DevTools Console** (F12) to see error logs

---

### Method 2: Throw Error in Existing Component

**Temporarily modify any component to throw an error:**

```jsx
// In TemplateCard component for example
export const TemplateCard = ({ template, onSelect }) => {
  // Add this line to test
  throw new Error("Test: TemplateCard error!");

  // ... rest of component
};
```

**What you'll see:**

- The ErrorBoundary will catch the error
- Show appropriate fallback UI based on `fallbackType`
- Error details in console (dev mode)

---

### Method 3: Simulate API Failure

**In TemplateGallery component:**

```jsx
const loadTemplates = async () => {
  try {
    setLoading(true);
    setError(null);

    // Simulate API error - uncomment to test
    throw new Error("Test: API call failed!");

    const rawTemplates = await fetchTemplatesFromAPI();
    // ...
  } catch (err) {
    // This won't be caught by ErrorBoundary (try-catch handles it)
    // But you can see your error handling logic working
    console.error("Failed to load templates:", err);
    setError(err.message || "Failed to load templates");
  }
};
```

---

### Method 4: Undefined Property Access

**Common real-world error:**

```jsx
// In any component
export const MyComponent = ({ data }) => {
  // Test: access property of undefined
  const value = data.user.name; // If data is undefined, throws error

  return <div>{value}</div>;
};
```

---

### Method 5: Test Different Boundary Levels

**Test the error boundary hierarchy:**

#### Test 1: Component-level boundary (Preview area only)

```jsx
// In PreviewRenderer component
export const PreviewRenderer = () => {
  // Add this line
  throw new Error("Test: PreviewRenderer error!");

  // Result: Only preview shows error, PropertyPanel still works
};
```

#### Test 2: Page-level boundary (Entire page)

```jsx
// In TemplatePage
export const TemplatePage = () => {
  // Add this line
  throw new Error("Test: TemplatePage error!");

  // Result: Entire page shows error UI
};
```

#### Test 3: Route-level boundary

```jsx
// In routes/index.jsx - throw error in Suspense fallback
<React.Suspense fallback={<LoadingIndicator />}>
  {(() => {
    throw new Error("Test: Route error!");
  })()}
  <LazyTemplatePage />
</React.Suspense>
```

---

## Testing Different Fallback Types

### Test Page Fallback (`fallbackType="page"`)

```jsx
// Wrap component with page-level boundary
<ErrorBoundary fallbackType="page" resetPath="/template">
  <ComponentThatThrows />
</ErrorBoundary>
```

**Expected Result:**

- ✅ Full-screen error page
- ✅ Large alert icon (64px)
- ✅ "Reload Page" button
- ✅ "Go to Home" button
- ✅ Error stack trace (dev mode)

---

### Test Component Fallback (`fallbackType="component"`)

```jsx
// Wrap component with component-level boundary
<ErrorBoundary fallbackType="component">
  <ComponentThatThrows />
</ErrorBoundary>
```

**Expected Result:**

- ✅ Contained error box with dashed border
- ✅ Medium alert icon (32px)
- ✅ "Retry" button
- ✅ Error stack trace (dev mode)
- ✅ Rest of page still functional

---

### Test Inline Fallback (`fallbackType="inline"`)

```jsx
// Wrap component with inline boundary
<ErrorBoundary fallbackType="inline">
  <ComponentThatThrows />
</ErrorBoundary>
```

**Expected Result:**

- ✅ Small inline error message
- ✅ Tiny alert icon (16px)
- ✅ "Retry" link
- ✅ Minimal space usage

---

## Testing i18n Error Messages

### Test Language Switching

1. **Start app** (default English)
2. **Trigger an error** (use test component)
3. **Click language switcher** → Change to Vietnamese
4. **Trigger error again** → Should show Vietnamese error message
5. **Repeat for Japanese and Arabic**

**Expected translations:**

- **English**: "Something went wrong"
- **Vietnamese**: "Đã xảy ra lỗi"
- **Japanese**: "問題が発生しました"
- **Arabic**: "حدث خطأ ما"

---

## Testing Error Recovery

### Test Retry Button

1. **Cause an error** in a component
2. **Click "Retry" button**
3. **Expected**: Error state clears, component re-renders

### Test Reload Button

1. **Cause a page-level error**
2. **Click "Reload Page" button**
3. **Expected**: Browser reloads, fresh state

### Test Reset Path

1. **Cause error on `/design` page**
2. **Click "Go to Home" button**
3. **Expected**: Navigate to `/template` page

---

## Testing Console Output

### Development Mode

**When error occurs, console should show:**

```
ErrorBoundary caught an error: Error: Test error message
Error info: { componentStack: '...' }
```

### Production Mode

**Console should NOT show:**

- Error details
- Component stack
- Debug information

---

## Real-World Error Scenarios

### Scenario 1: Template Rendering Error

**Test:**

```jsx
// In a template config
export default {
  // ... config
  sections: [
    {
      component: "NonExistentComponent", // This component doesn't exist
      // ...
    },
  ],
};
```

**Expected:**

- PreviewRenderer ErrorBoundary catches it
- Shows component fallback
- PropertyPanel continues working

---

### Scenario 2: Network Failure Simulation

**Test:**

```jsx
// In fetchTemplatesFromAPI
export const fetchTemplatesFromAPI = async () => {
  // Simulate network failure
  if (Math.random() > 0.5) {
    throw new Error("Network request failed");
  }
  // ... normal code
};
```

**Expected:**

- Error caught in try-catch (not ErrorBoundary)
- Custom error UI shown
- "Retry" button available

---

### Scenario 3: Invalid Configuration

**Test:**

```jsx
// Pass invalid config to template
<TemplateComponent config={null} /> // null config
```

**Expected:**

- Template tries to access `config.properties`
- Throws: "Cannot read properties of null"
- ErrorBoundary catches and shows fallback

---

## Browser DevTools Testing

### Check Error Boundary in React DevTools

1. **Install React DevTools** extension
2. **Open DevTools** → React tab
3. **Find ErrorBoundary** component in tree
4. **Check state**: `{ hasError: true/false, error: ..., errorInfo: ... }`
5. **After error**: Should see `hasError: true`

---

## Automated Testing (Optional)

### Unit Test Example

```jsx
// ErrorBoundary.test.jsx
import { render } from "@testing-library/react";
import ErrorBoundary from "./index";

const ThrowError = () => {
  throw new Error("Test error");
};

test("catches errors and displays fallback", () => {
  const { getByText } = render(
    <ErrorBoundary fallbackType="component">
      <ThrowError />
    </ErrorBoundary>,
  );

  expect(getByText(/Component Error/i)).toBeInTheDocument();
});
```

---

## Checklist: What to Verify

### ✅ Functionality

- [ ] ErrorBoundary catches synchronous errors
- [ ] ErrorBoundary catches async errors (setState after delay)
- [ ] Error displays appropriate fallback UI
- [ ] Retry button resets error state
- [ ] Reload button refreshes page
- [ ] Reset path navigation works

### ✅ UI/UX

- [ ] Page fallback: Full-screen with gradient
- [ ] Component fallback: Dashed border box
- [ ] Inline fallback: Small inline message
- [ ] Error icons display correctly
- [ ] Buttons are clickable and styled
- [ ] Responsive on mobile

### ✅ Internationalization

- [ ] English error messages work
- [ ] Vietnamese error messages work
- [ ] Japanese error messages work
- [ ] Arabic error messages work (RTL layout)
- [ ] Language switching updates error messages

### ✅ Development Mode

- [ ] Error stack trace visible
- [ ] Component stack visible
- [ ] Console logs error details
- [ ] "Show error details" expandable works

### ✅ Production Mode

- [ ] Error details hidden from users
- [ ] No console logs visible
- [ ] Professional error messages only

### ✅ Error Hierarchy

- [ ] Component error: Only that component affected
- [ ] Page error: Entire page affected, navigation works
- [ ] Route error: Route affected, can go back
- [ ] App error: Can reset to home
- [ ] Root error: Last resort, can reload

---

## Common Issues & Debugging

### Issue: Error not caught by ErrorBoundary

**Possible reasons:**

1. **Event handler error** - ErrorBoundaries don't catch these
   - Solution: Use try-catch in event handlers
2. **Async error in setTimeout/Promise** not using setState
   - Solution: Trigger state update to re-render with error
3. **Error in ErrorBoundary itself**
   - Solution: Check ErrorBoundary code for bugs

### Issue: Blank page after error

**Check:**

1. ErrorBoundary properly wrapping component?
2. Fallback UI rendering correctly?
3. Console for additional errors?

### Issue: Error persists after retry

**Check:**

1. Error still being thrown in component?
2. State properly reset?
3. Component re-mounting correctly?

---

## Conclusion

The ErrorBoundary implementation is now fully testable. Use the **ErrorBoundaryTest** component for quick testing, or follow the scenarios above for thorough validation.

**Remember**: ErrorBoundaries are a safety net, not a replacement for proper error handling in async operations and event handlers!
