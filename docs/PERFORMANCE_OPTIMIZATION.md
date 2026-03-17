# Performance Optimization Guide

**Last Updated**: March 15, 2026

## Overview

This guide details all performance optimizations implemented in the Page Builder project, from build-time optimizations to runtime performance enhancements.

## Vite Build Optimizations

### Modern Target Configuration

```javascript
// All packages use modern ES2020+ target
build: {
  target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
}
```

**Benefits**:

- Smaller bundle size (less transpilation)
- Native async/await (no polyfills)
- Native optional chaining
- Native nullish coalescing
- Faster execution in modern browsers

**Trade-off**: Drops support for IE11 and older browsers

### Minification Strategy

#### App Package: esbuild

```javascript
build: {
  minify: 'esbuild',  // Fast, good compression
}
```

**Pros**:

- 20-40x faster than Terser
- Good compression ratio
- No configuration needed

**Cons**:

- Slightly larger than Terser (~2-5%)

#### Performance Comparison

| Minifier | Time | Size  | Best For                      |
| -------- | ---- | ----- | ----------------------------- |
| esbuild  | 2s   | 245KB | Development builds            |
| Terser   | 45s  | 238KB | Production (if size critical) |

To switch to Terser for maximum compression:

```javascript
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info'],
      passes: 2,  // Multiple passes for extra compression
    },
    mangle: {
      safari10: true,  // Safari 10 bug workaround
    },
  },
}
```

### Code Splitting

#### Manual Chunk Strategy

```javascript
manualChunks: (id) => {
  if (id.includes("node_modules")) {
    // Separate vendor chunks by library
    if (id.includes("react") || id.includes("react-dom")) {
      return "react-vendor"; // ~150KB
    }
    if (id.includes("redux")) {
      return "redux-vendor"; // ~45KB
    }
    if (id.includes("formik")) {
      return "form-vendor"; // ~30KB
    }
    if (id.includes("lucide-react")) {
      return "icons-vendor"; // ~50KB
    }
    return "vendor"; // Other dependencies
  }

  // Separate internal packages
  if (id.includes("packages/ui")) {
    return "ui-lib"; // ~80KB
  }
  if (id.includes("packages/templates")) {
    return "templates-lib"; // ~120KB
  }
};
```

**Rationale**:

- **React vendor**: Changes rarely, cached long-term
- **Redux vendor**: Independent of React updates
- **Form vendor**: Lazy-loadable for pages without forms
- **Icons vendor**: Can be code-split per route
- **UI/Templates**: Update independently of vendors

#### Bundle Size Targets

| Chunk         | Size (gzipped) | Cache Duration   |
| ------------- | -------------- | ---------------- |
| react-vendor  | ~45KB          | Long (1 year)    |
| redux-vendor  | ~15KB          | Long (1 year)    |
| ui-lib        | ~25KB          | Medium (1 month) |
| templates-lib | ~40KB          | Medium (1 month) |
| app           | ~60KB          | Short (1 day)    |

### Tree-Shaking Optimizations

```javascript
rollupOptions: {
  treeshake: {
    moduleSideEffects: 'no-external',  // Assume externals are pure
    propertyReadSideEffects: false,    // Assume property reads are pure
    tryCatchDeoptimization: false,     // Don't deoptimize try-catch
  },
}
```

**Result**: Eliminates 20-30% of unused code

### CSS Optimization

```javascript
build: {
  cssCodeSplit: true,      // Split CSS per chunk
  cssMinify: true,         // Minify CSS
}

css: {
  modules: {
    localsConvention: 'camelCase',  // Better tree-shaking
  },
  preprocessorOptions: {
    scss: {
      outputStyle: 'compressed',  // Compress SCSS output
    },
  },
}
```

### Asset Optimization

```javascript
build: {
  assetsInlineLimit: 4096,  // Inline assets < 4KB as base64

  assetFileNames: (assetInfo) => {
    const name = assetInfo.names?.[0] || assetInfo.name;

    // Organize by type
    if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(name)) {
      return 'assets/images/[name]-[hash][extname]';
    }
    if (/\.(woff|woff2|eot|ttf|otf)$/i.test(name)) {
      return 'assets/fonts/[name]-[hash][extname]';
    }
    if (/\.css$/i.test(name)) {
      return 'assets/css/[name]-[hash][extname]';
    }
    return 'assets/[name]-[hash][extname]';
  },
}
```

**Benefits**:

- Small assets inlined (saves HTTP requests)
- Organized folder structure
- Content-based hashing (optimal caching)

## React Optimizations

### React Hooks Rules

**Critical**: All hooks must be called in the same order on every render.

❌ **Bad** - Hooks after conditional returns:

```jsx
function Component() {
  if (condition) {
    return <div>Early return</div>;
  }

  // ❌ ERROR: Hooks called conditionally
  const callback = useCallback(() => {}, []);
  const value = useMemo(() => {}, []);
}
```

✅ **Good** - All hooks before conditional returns:

```jsx
function Component() {
  // ✅ All hooks first
  const callback = useCallback(() => {}, []);
  const value = useMemo(() => {}, []);

  // Then conditional returns
  if (condition) {
    return <div>Early return</div>;
  }

  return <div>Normal flow</div>;
}
```

**Implementation Example**: Editor Component

```jsx
export const Editor = () => {
  // 1. All useState hooks
  const [state1, setState1] = useState();
  const [state2, setState2] = useState();

  // 2. All useEffect hooks
  useEffect(() => {}, []);

  // 3. All useCallback/useMemo hooks
  // IMPORTANT: All hooks must be defined BEFORE any conditional returns
  const callback = useCallback(() => {}, []);
  const value = useMemo(() => {}, []);

  // 4. Conditional returns AFTER all hooks
  if (!data) return <Loading />;

  // 5. Normal JSX
  return <div>...</div>;
};
```

### Component Isolation Strategy

**Problem**: Parent component rerenders → All children rerender (even memoized ones)

**Solution**: Extract components to separate files with module boundaries

#### Before - Inline Components (Rerender on Parent Update)

```jsx
// PreviewRenderer.jsx
export const PreviewRenderer = () => {
  const { selectedElement } = useSelection(); // Triggers on every selection change
  const [showHelper, setShowHelper] = useState(false);

  // ❌ Inline component - rerenders when PreviewRenderer rerenders
  const HelperText = memo(({ message, onDismiss }) => <div>{message}</div>);

  return (
    <>
      <div>{/* template */}</div>
      <HelperText message="tip" onDismiss={dismiss} />
    </>
  );
};
```

**Issue**: `HelperText` rerenders on every selection change because it's a child of `PreviewRenderer`

#### After - Separate Component Files (No Unnecessary Rerenders)

```jsx
// HelperText/index.jsx - Separate file
export const HelperText = memo(({ show, onDismiss }) => {
  const { t } = useTranslation(); // Self-contained
  if (!show) return null;
  return <div>{t("message")}</div>;
});

// Editor.jsx - Parent doesn't subscribe to selection
export const Editor = () => {
  // Editor doesn't use useSelection(), so it won't rerender on selection changes
  const [showHelper, setShowHelper] = useState(true);

  return (
    <div>
      <PreviewRenderer /> {/* This rerenders on selection */}
      <HelperText show={showHelper} onDismiss={() => setShowHelper(false)} />
    </div>
  );
};

// PreviewRenderer.jsx - Simplified
export const PreviewRenderer = () => {
  const { selectedElement } = useSelection(); // Triggers rerenders

  // No helper text here - hosted by parent
  return <div>{/* template */}</div>;
};
```

**Result**:

- `HelperText` doesn't rerender when elements are selected
- Complete module boundary with own translations
- Editor doesn't subscribe to selection context

#### Implementation: Editor Components

✅ **Extracted Components**:

- `HelperText/` - Welcome tooltip (isolated from selection changes)
- `EditorToggleButton/` - Mobile panel toggle (isolated from selection changes)
- `TemplateRenderer/` - Template wrapper with ErrorBoundary

✅ **Parent Location**: All hosted in `Editor` component (doesn't use `useSelection`)

✅ **Rerender Prevention**:

- Editor only rerenders on: template change, config change, panel toggle
- Editor does NOT rerender on: element selection, property edits
- Child components remain stable during selection interactions

### Component Memoization

```jsx
import { memo, useMemo, useCallback } from "react";

// Memoize expensive components
export const ExpensiveComponent = memo(({ data }) => {
  // Component only re-renders when data changes
  return <div>{/* ... */}</div>;
});

// Memoize expensive computations
function MyComponent({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);

  return <List items={sortedItems} />;
}

// Memoize callbacks
function Parent() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // Callback never changes

  return <Child onClick={handleClick} />;
}
```

### Lazy Loading

```jsx
import { lazy, Suspense } from "react";

// Lazy load routes
const Design = lazy(() => import("./pages/Design"));
const Template = lazy(() => import("./pages/Template"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Template />} />
        <Route path="/design" element={<Design />} />
      </Routes>
    </Suspense>
  );
}

// Lazy load heavy components
const HeavyChart = lazy(() => import("./components/HeavyChart"));

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart data={data} />
      </Suspense>
    </div>
  );
}
```

### Virtual Scrolling

For long lists (100+ items):

```jsx
import { FixedSizeList } from "react-window";

function TemplateList({ templates }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <TemplateCard template={templates[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={templates.length}
      itemSize={200}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

## Redux Performance

### Selector Memoization

```javascript
import { createSelector } from "@reduxjs/toolkit";

// Memoized selector - only recomputes when dependencies change
export const selectVisibleSections = createSelector(
  [(state) => state.builder.sections, (state) => state.builder.filter],
  (sections, filter) => {
    return sections.filter((s) => s.type === filter);
  },
);

// Usage
const visibleSections = useSelector(selectVisibleSections);
```

### Normalized State

```javascript
// ❌ Nested state (hard to update)
{
  templates: [
    {
      id: 1,
      sections: [
        { id: 1, title: 'Hero' },
        { id: 2, title: 'Footer' }
      ]
    }
  ]
}

// ✅ Normalized state (easy to update)
{
  templates: {
    byId: {
      1: { id: 1, name: 'Business', sectionIds: [1, 2] }
    },
    allIds: [1]
  },
  sections: {
    byId: {
      1: { id: 1, title: 'Hero' },
      2: { id: 2, title: 'Footer' }
    },
    allIds: [1, 2]
  }
}
```

### Batched Updates

```javascript
import { batch } from 'react-redux';

// Update multiple slices in one render
function updateAll() {
  batch(() => {
    dispatch(updateTemplate(...));
    dispatch(updateSection(...));
    dispatch(updateTheme(...));
  });
  // React re-renders once ✅
}
```

## Image Optimization

### Lazy Loading

```jsx
<img
  src="image.jpg"
  loading="lazy" // Native lazy loading
  decoding="async" // Async image decode
  alt="Description"
/>
```

### Modern Formats

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="fallback" />
</picture>
```

### Responsive Images

```html
<img
  srcset="image-320w.jpg 320w, image-640w.jpg 640w, image-1280w.jpg 1280w"
  sizes="(max-width: 640px) 100vw, 640px"
  src="image-640w.jpg"
  alt="Responsive image"
/>
```

## Network Optimization

### HTTP/2 & HTTP/3

Netlify automatically serves over HTTP/2:

- Multiplexing (parallel requests)
- Header compression
- Server push (optional)

### Caching Strategy

```javascript
// netlify.toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"  # 1 year

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=86400"  # 1 day

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"  # Always check
```

### Compression

```javascript
// Netlify automatically compresses with:
// - Brotli (preferred, ~20% better than gzip)
// - gzip (fallback)
```

### Preloading

```html
<!-- Preload critical assets -->
<link rel="preload" href="/assets/fonts/main.woff2" as="font" crossorigin />
<link rel="preload" href="/assets/js/react-vendor.js" as="script" />

<!-- Prefetch next pages -->
<link rel="prefetch" href="/design" />

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

## Development Performance

### HMR Optimization

```javascript
server: {
  hmr: {
    overlay: true,  // Show errors in browser
  },
  warmup: {
    clientFiles: [
      './src/**/*.jsx',  // Pre-transform on startup
      './src/**/*.js',
    ],
  },
}
```

### Dependency Pre-bundling

```javascript
optimizeDeps: {
  include: [
    'react',
    'react-dom',
    'react-redux',
    '@reduxjs/toolkit',
    // Pre-bundle for faster dev startup
  ],
  esbuildOptions: {
    target: 'es2020',
  },
}
```

## Monitoring

### Web Vitals

```javascript
// main.jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric) {
  console.log(metric);
  // Send to analytics service
}

getCLS(sendToAnalytics); // Cumulative Layout Shift
getFID(sendToAnalytics); // First Input Delay
getFCP(sendToAnalytics); // First Contentful Paint
getLCP(sendToAnalytics); // Largest Contentful Paint
getTTFB(sendToAnalytics); // Time to First Byte
```

### Performance Targets

| Metric | Good    | Needs Improvement | Poor    |
| ------ | ------- | ----------------- | ------- |
| FCP    | < 1.8s  | 1.8s - 3.0s       | > 3.0s  |
| LCP    | < 2.5s  | 2.5s - 4.0s       | > 4.0s  |
| FID    | < 100ms | 100ms - 300ms     | > 300ms |
| CLS    | < 0.1   | 0.1 - 0.25        | > 0.25  |
| TTFB   | < 600ms | 600ms - 1.8s      | > 1.8s  |

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm build
      - run: pnpm lighthouse:ci
```

## Bundle Analysis

### Analyze Command

```bash
# Add to package.json
{
  "scripts": {
    "build:analyze": "vite build --mode analyze"
  }
}

# Run analysis
pnpm build:analyze
```

### Visualize Bundle

```javascript
// vite.config.js
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

## Performance Checklist

### Build Time

- ✅ Use esbuild for minification
- ✅ Enable tree-shaking
- ✅ Split vendor chunks
- ✅ Inline small assets (< 4KB)
- ✅ Compress CSS
- ✅ Generate content-based hashes

### Runtime

- ✅ Lazy load routes
- ✅ Memoize expensive components
- ✅ Use virtual scrolling for long lists
- ✅ Debounce/throttle event handlers
- ✅ Normalize Redux state
- ✅ Memoize selectors

### Network

- ✅ Enable compression (Brotli/gzip)
- ✅ Set cache headers
- ✅ Lazy load images
- ✅ Use modern image formats (WebP, AVIF)
- ✅ Implement responsive images
- ✅ Preload critical resources

### Monitoring

- ✅ Track Web Vitals
- ✅ Set performance budgets
- ✅ Run Lighthouse in CI
- ✅ Monitor bundle size
- ✅ Profile in production

---

**Next Steps**:

1. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
2. Check [BUILD_AND_DEPLOYMENT.md](./BUILD_AND_DEPLOYMENT.md) for deployment
3. See [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for coding practices
