# Build and Deployment Guide

**Last Updated**: March 15, 2026

## Build Process Overview

The Page Builder uses a monorepo structure with independent build processes for each package. The build system is powered by Vite for fast, optimized production builds.

## Build Commands

### Root Level

```bash
# Build all packages in correct order
pnpm build

# Build sequence:
# 1. @page-builder/ui (no dependencies)
# 2. @page-builder/templates (depends on ui)
# 3. @page-builder/app (depends on ui + templates)

# Clean all build artifacts
pnpm clean

# Clean and rebuild
pnpm clean && pnpm build
```

### Individual Packages

```bash
# Build UI library
cd packages/ui
pnpm build
# Output: packages/ui/dist/

# Build templates library
cd packages/templates
pnpm build
# Output: packages/templates/dist/

# Build main app
cd packages/app
pnpm build
# Output: packages/app/dist/
```

## Build Configuration

### packages/ui/vite.config.js

```javascript
export default defineConfig({
  build: {
    // Library mode for npm publishing
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "PageBuilderUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },

    // Externalize React (peer dependency)
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },

    // Optimization settings
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    minify: "esbuild",
    cssCodeSplit: false, // Single CSS bundle
    sourcemap: false,
  },
});
```

**Output Structure**:

```
packages/ui/dist/
├── index.mjs         # ES module (tree-shakable)
├── index.js          # CommonJS (backwards compatibility)
└── style.css         # Bundled styles
```

### packages/templates/vite.config.js

Similar to UI package, built as a library:

**Output Structure**:

```
packages/templates/dist/
├── index.mjs         # ES module
├── index.js          # CommonJS
└── style.css         # Component styles
```

### packages/app/vite.config.js

```javascript
export default defineConfig({
  build: {
    // Application mode (not library)
    outDir: "dist",

    // Modern browser targets
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],

    // Fast minification
    minify: "esbuild",

    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for optimal caching
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("redux")) return "redux-vendor";
            if (id.includes("formik")) return "form-vendor";
            if (id.includes("lucide")) return "icons-vendor";
            return "vendor";
          }
          if (id.includes("packages/ui")) return "ui-lib";
          if (id.includes("packages/templates")) return "templates-lib";
        },

        // Organized asset structure
        assetFileNames: (assetInfo) => {
          // Images go to assets/images/
          // Fonts go to assets/fonts/
          // CSS goes to assets/css/
          // JS goes to assets/js/
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },

    cssCodeSplit: true, // Split CSS by chunk
    assetsInlineLimit: 4096, // Inline < 4KB
  },
});
```

**Output Structure**:

```
packages/app/dist/
├── index.html
└── assets/
    ├── js/
    │   ├── app-[hash].js
    │   ├── react-vendor-[hash].js
    │   ├── redux-vendor-[hash].js
    │   ├── ui-lib-[hash].js
    │   └── templates-lib-[hash].js
    ├── css/
    │   └── main-[hash].css
    ├── images/
    │   └── ...
    └── fonts/
        └── ...
```

## Build Performance

### Build Times

| Package   | Clean Build | Incremental | Watch Mode |
| --------- | ----------- | ----------- | ---------- |
| ui        | ~3s         | ~1s         | ~100ms     |
| templates | ~5s         | ~2s         | ~200ms     |
| app       | ~15s        | ~5s         | ~300ms     |
| **Total** | **~25s**    | **~10s**    | **~500ms** |

### Optimization Techniques

1. **Parallel Builds**: UI and templates build independently
2. **Incremental Compilation**: Only rebuild changed files
3. **esbuild**: 10-100x faster than Babel/Terser
4. **Smart Caching**: Vite caches dependencies

### Build Caching

```bash
# Vite cache location
node_modules/.vite/

# Clear cache if issues
rm -rf node_modules/.vite
pnpm build
```

## Production Build

### Environment Variables

Create `.env.production`:

```bash
# API Configuration
VITE_API_URL=https://api.pagebuilder.com

# Feature Flags
VITE_ENABLE_EXPORT=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_TEMPLATES=true

# Analytics IDs
VITE_GA_ID=UA-XXXXXXXXX-X
VITE_SENTRY_DSN=https://...

# Build Config
NODE_ENV=production
```

### Production Build Command

```bash
# Set environment and build
NODE_ENV=production pnpm build

# Or use script
pnpm build:prod
```

### Build Verification

```bash
# Check build output
ls -lh packages/app/dist

# Preview production build locally
cd packages/app
pnpm preview

# Opens http://localhost:4173
```

## Deployment to Netlify

### Netlify Configuration

`netlify.toml` in repository root:

```toml
[build]
  # Build command
  command = "pnpm install && pnpm build"

  # Publish directory
  publish = "packages/app/dist"

  # Node version
  [build.environment]
    NODE_VERSION = "18"

# SPA routing - redirect all to index.html
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers for caching and security
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Deployment Process

#### Automatic Deployment (Recommended)

1. **Connect Repository**:
   - Log in to Netlify
   - Connect GitHub repository
   - Netlify auto-detects settings from netlify.toml

2. **Configure Environment Variables**:
   - Go to Site Settings → Environment Variables
   - Add production variables:
     ```
     VITE_API_URL=https://api.production.com
     VITE_ENABLE_ANALYTICS=true
     ```

3. **Deploy**:
   - Push to `main` branch
   - Netlify automatically builds and deploys
   - Deploy preview for PRs

#### Manual Deployment

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Login
netlify login

# Build
pnpm build

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Deployment Checklist

- [ ] All tests passing
- [ ] Build succeeds locally
- [ ] Environment variables set
- [ ] Performance budget met
- [ ] Lighthouse score > 90
- [ ] No console errors/warnings
- [ ] Images optimized
- [ ] Error tracking configured

## Post-Deployment

### Verification

```bash
# Check production site
curl -I https://your-site.netlify.app

# Verify headers
curl -I https://your-site.netlify.app/assets/js/app-hash.js

# Check bundle size
curl -s https://your-site.netlify.app/assets/js/react-vendor-hash.js | wc -c
```

### Monitoring

```javascript
// Add to main.jsx for production monitoring
if (process.env.NODE_ENV === "production") {
  // Performance monitoring
  import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  });

  // Error tracking
  window.addEventListener("error", (event) => {
    // Send to Sentry/LogRocket/etc.
  });
}
```

## CDN & Caching

### Netlify CDN

- **Global CDN**: 100+ edge locations
- **Automatic**: No configuration needed
- **Smart Routing**: Serves from nearest location
- **Brotli Compression**: Automatic compression

### Cache Strategy

```
Static Assets (immutable):
  /assets/*  →  1 year cache

JavaScript/CSS:
  /*.js, /*.css  →  1 day cache

HTML:
  /*.html  →  No cache (always fresh)
```

### Cache Invalidation

Content-based hashing ensures automatic cache busting:

```
app-abc123.js  →  app-xyz789.js  (new hash = new file)
```

## Rollback Strategy

### Quick Rollback

```bash
# Via Netlify CLI
netlify rollback

# Or in Netlify UI
# Deploys → Select previous deploy → Publish
```

### Git Rollback

```bash
# Revert last commit
git revert HEAD
git push

# Netlify auto-deploys reverted version
```

## Build Troubleshooting

### Common Issues

#### Issue: Build fails with "Cannot find module"

**Solution**:

```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
pnpm build
```

#### Issue: Build succeeds but app doesn't work

**Solution**: Check environment variables

```bash
# Verify .env.production exists
cat .env.production

# Ensure VITE_ prefix
VITE_MY_VAR=value  ✅
MY_VAR=value       ❌ (won't be included)
```

#### Issue: "JavaScript heap out of memory"

**Solution**: Increase Node memory

```bash
# In package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}
```

#### Issue: CSS not loading in production

**Solution**: Check asset paths

```javascript
// vite.config.js
export default defineConfig({
  base: "/", // Must match deployment path
});
```

## Performance Budgets

### Bundle Size Limits

```json
{
  "budgets": [
    {
      "name": "react-vendor",
      "limit": "55KB",
      "gzip": true
    },
    {
      "name": "app",
      "limit": "80KB",
      "gzip": true
    },
    {
      "name": "total",
      "limit": "500KB",
      "gzip": true
    }
  ]
}
```

### Automated Checks

```yaml
# .github/workflows/size-limit.yml
name: Size Limit
on: [pull_request]
jobs:
  size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm build
      - uses: andresz1/size-limit-action@v1
```

## Continuous Integration

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build
        env:
          NODE_ENV: production

      - name: Deploy to Netlify
        if: github.ref == 'refs/heads/main'
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod
```

## Build Optimization Tips

1. **Use pnpm**: 2-3x faster than npm
2. **Enable caching**: CI/CD cache node_modules
3. **Parallel builds**: Build packages concurrently
4. **Skip unnecessary steps**: Don't rebuild unchanged packages
5. **Use modern targets**: ES2020+ = smaller output

---

**Related Documentation**:

- [PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
