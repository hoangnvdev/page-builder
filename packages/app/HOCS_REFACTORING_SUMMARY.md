# HOCs Refactoring Summary

## Overview

Created 3 Higher-Order Components (HOCs) to standardize cross-cutting concerns and simplify component composition. HOCs complement our custom hooks by providing declarative wrappers for common patterns.

## HOCs Created

### 1. withErrorBoundary

**Purpose:** Wrap components with ErrorBoundary for graceful error handling

**Location:** `src/hocs/withErrorBoundary.jsx`

**Features:**

- Configurable fallback types: 'page' | 'component'
- Configurable modes: 'fullscreen' | 'inline'
- Optional onError callback for error logging
- Automatic displayName for debugging

**Usage:**

```jsx
// Before
import { ErrorBoundary } from "@/components";

const TemplatePage = () => {
  return (
    <ErrorBoundary fallbackType="component">
      <TemplateGallery />
    </ErrorBoundary>
  );
};

// After
import { withErrorBoundary } from "@/hocs";

const TemplatePageComponent = () => {
  return <TemplateGallery />;
};

export const TemplatePage = withErrorBoundary(TemplatePageComponent, {
  fallbackType: "component",
});
```

**Benefits:**

- Reduced JSX nesting (1 level less)
- Declarative error boundary configuration
- Consistent error handling across components
- Easier to test (component without ErrorBoundary)

### 2. withMemo

**Purpose:** Wrap components with React.memo for performance optimization

**Location:** `src/hocs/withMemo.jsx`

**Features:**

- Automatic memoization
- Optional custom comparison function
- Consistent displayName pattern
- Simpler than inline memo

**Usage:**

```jsx
// Before
import { memo } from "react";

export const AppButton = memo(({ children, variant, onClick, ...props }) => {
  return (
    <button
      className={`app-button app-button--${variant}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

AppButton.displayName = "AppButton";

// After
import { withMemo } from "@/hocs";

const AppButtonComponent = ({ children, variant, onClick, ...props }) => {
  return (
    <button
      className={`app-button app-button--${variant}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const AppButton = withMemo(AppButtonComponent);
```

**Benefits:**

- Flatter component structure (no wrapping parentheses)
- Consistent memoization pattern across codebase
- Easier to add/remove memoization during optimization
- Automatic displayName handling

**Custom Comparison:**

```jsx
export const ExpensiveComponent = withMemo(
  ExpensiveComponentBase,
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.id === nextProps.id && prevProps.name === nextProps.name;
  },
);
```

### 3. withLoadingState

**Purpose:** Handle async data fetching with loading/error states

**Location:** `src/hocs/withLoadingState.jsx`

**Features:**

- Automatic loading state management
- Error handling with custom error component
- Data fetching on mount
- Cleanup on unmount (prevents memory leaks)
- Configurable loading/error components
- Passes fetched data to wrapped component

**Usage:**

```jsx
// Traditional approach (manual state management)
const DataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetchData()
      .then((result) => {
        if (mounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data}</div>;
};

// With HOC (declarative)
const DataComponentBase = ({ data }) => {
  return <div>{data}</div>;
};

export const DataComponent = withLoadingState(
  DataComponentBase,
  async () => {
    const result = await fetchData();
    return result;
  },
  {
    LoadingComponent: () => <Spinner />,
    ErrorComponent: ({ error }) => <Alert>{error.message}</Alert>,
  },
);
```

**Benefits:**

- Eliminates 15-20 lines of boilerplate per component
- Automatic cleanup (no memory leaks)
- Consistent loading/error UI across components
- Separates data fetching from presentation logic
- Easier to test (component receives data as prop)

## Components Refactored

### Pages

1. **TemplatePage** - Now uses `withErrorBoundary`
   - **Before:** 7 lines with ErrorBoundary wrapper
   - **After:** 5 lines with HOC
   - **Savings:** Cleaner component structure

2. **DesignPage** - Added `withErrorBoundary`
   - **Before:** No error handling
   - **After:** Protected with error boundary
   - **Impact:** Better error resilience

### UI Components

3. **AppButton** - Now uses `withMemo`
   - **Before:** Inline memo with manual displayName
   - **After:** Declarative withMemo
   - **Savings:** 3 lines, cleaner structure

4. **Title** - Now uses `withMemo`
   - **Before:** Inline memo with manual displayName
   - **After:** Declarative withMemo
   - **Savings:** 3 lines, consistent pattern

5. **ConfirmDialog** - Now uses `withMemo`
   - **Before:** Inline memo with manual displayName
   - **After:** Declarative withMemo
   - **Savings:** 3 lines, consistent pattern

## Impact Analysis

### Code Quality

- **Declarative composition:** HOCs make component behavior explicit
- **Separation of concerns:** Cross-cutting logic separated from business logic
- **Consistency:** Standardized patterns across codebase
- **Testability:** Easier to test components without wrappers

### Refactoring Statistics

- **Components refactored:** 5
- **Lines eliminated:** ~12 lines
- **Patterns standardized:** Error boundaries (2), Memoization (3)
- **Potential candidates:** 6+ more memoized components, 10+ async data fetchers

### Performance

- **Memoization:** Consistent React.memo usage prevents unnecessary re-renders
- **Error boundaries:** Prevents entire app crashes, isolates failures
- **Loading states:** Prevents memory leaks with automatic cleanup

## When to Use HOCs vs Hooks

### Use HOCs when:

- ✅ Wrapping components declaratively (error boundaries, memoization)
- ✅ Injecting props into multiple components
- ✅ Composing multiple HOCs together
- ✅ Creating component variants (withAuth, withTheme)

### Use Hooks when:

- ✅ Sharing stateful logic (useState, useEffect patterns)
- ✅ Accessing context or refs
- ✅ Side effects that depend on props/state
- ✅ Composing multiple behaviors in one component

### Combine Both:

```jsx
// Hook provides logic, HOC provides composition
const useTemplateData = () => {
  const [templates, setTemplates] = useState([]);
  // ... logic
  return templates;
};

const TemplateListBase = ({ data }) => {
  const templates = useTemplateData();
  return <>{/* render */}</>;
};

export const TemplateList = withErrorBoundary(withMemo(TemplateListBase), {
  fallbackType: "component",
});
```

## Remaining Opportunities

### High Priority

1. **withLoadingState candidates:**
   - TemplateGallery (loads templates)
   - Editor (loads saved state)
   - ExportButton (async export)
   - Any component using `useApiFetch`

2. **More memo candidates:**
   - SubTitle (typography)
   - HelperText (common)
   - FormField (form)
   - HistoryControls (editor)
   - EditorToggleButton (editor)
   - TemplateRenderer (templates)

### Medium Priority

3. **Create domain-specific HOCs:**
   - `withTranslation` - Inject i18n for components
   - `withTheme` - Inject theme context
   - `withAuth` - Check authentication
   - `withAnalytics` - Track component interactions

### Low Priority

4. **Advanced patterns:**
   - Compose multiple HOCs: `compose(withMemo, withErrorBoundary, withAuth)`
   - HOC factories: `withData(endpoint)` generates HOCs
   - Conditional HOCs: `withConditional(condition, HOC)`

## Best Practices

### 1. Naming Convention

```jsx
// Component file structure
const ComponentNameComponent = (props) => {
  /* ... */
};
export const ComponentName = withHOC(ComponentNameComponent);

// HOC automatically sets displayName to "ComponentName"
```

### 2. HOC Composition

```jsx
// Apply HOCs from inside out (right to left)
export const MyComponent = withErrorBoundary(
  withMemo(withLoadingState(MyComponentBase, fetchData)),
  { fallbackType: "component" },
);

// Or use compose utility (if created)
export const MyComponent = compose(
  withErrorBoundary({ fallbackType: "component" }),
  withMemo(),
  withLoadingState(fetchData),
)(MyComponentBase);
```

### 3. TypeScript Support (Future)

```typescript
// HOCs are easily typed
type WithErrorBoundaryOptions = {
  fallbackType?: "page" | "component";
  mode?: "fullscreen" | "inline";
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  options?: WithErrorBoundaryOptions,
): ComponentType<P>;
```

### 4. Testing

```jsx
// Test the base component without HOC
import { AppButtonComponent } from "./index";

test("renders button", () => {
  render(<AppButtonComponent>Click me</AppButtonComponent>);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

// Test the wrapped component if needed
import { AppButton } from "./index";

test("memoization works", () => {
  const { rerender } = render(<AppButton>Click</AppButton>);
  // Verify memo behavior
});
```

## Documentation

- HOC implementations: `packages/app/src/hocs/`
- Hook implementations: `packages/app/src/hooks/`
- Usage examples: This file
- Related: `HOOKS_REFACTORING_SUMMARY.md`

## Migration Guide

### For Existing Components Using Inline Memo

1. Import withMemo:

```jsx
import { withMemo } from "@/hocs";
```

2. Rename component to `ComponentName + Component`:

```jsx
const AppButtonComponent = ({ ... }) => { /* ... */ };
```

3. Export with HOC:

```jsx
export const AppButton = withMemo(AppButtonComponent);
```

4. Remove old displayName and memo import.

### For Existing Components Using ErrorBoundary

1. Import withErrorBoundary:

```jsx
import { withErrorBoundary } from "@/hocs";
```

2. Extract component content:

```jsx
const MyPageComponent = () => {
  return <MyContent />;
};
```

3. Export with HOC:

```jsx
export const MyPage = withErrorBoundary(MyPageComponent, options);
```

4. Remove ErrorBoundary JSX wrapper.

## Conclusion

HOCs provide a powerful composition pattern that complements our custom hooks. Together, they enable:

- **Hooks:** Reusable stateful logic (useWindowResize, useLoadingState, etc.)
- **HOCs:** Reusable component wrappers (withMemo, withErrorBoundary, etc.)

This dual approach gives us maximum flexibility for code reuse and consistent patterns across the codebase.

**Total Refactoring Impact (Hooks + HOCs):**

- 6 custom hooks + 3 HOCs created
- 9 components refactored
- ~90+ lines of code eliminated
- Patterns established for future development
- Significantly improved code maintainability
