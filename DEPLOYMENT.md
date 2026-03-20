# Page Builder - Deployment Guide

**Last Updated**: March 20, 2026

## Overview

This guide explains how to deploy the Page Builder application. The app is a fully client-side React application that exports to static HTML, making it ideal for static hosting platforms like Netlify, Vercel, GitHub Pages, or any CDN.

---

## Production Build

### Prerequisites

- **Node.js**: 20.19+ or 22.12+
- **pnpm**: 9.15.4 or higher
- **Git**: For version control

### Build All Packages

The monorepo consists of three packages that must be built in order:

```bash
# Install dependencies
pnpm install

# Build all packages (ui → templates → app)
pnpm build
```

This command runs:

1. `pnpm build:ui` - Builds the UI component library
2. `pnpm build:templates` - Builds the template system (depends on ui)
3. `pnpm build:app` - Builds the main application (depends on ui and templates)

### Build Output

**Location**: `packages/app/dist/`

**Contents**:

- `index.html` - Main HTML entry point
- `assets/` - JavaScript and CSS bundles
  - `index-[hash].js` - Main application bundle
  - `react-vendor-[hash].js` - React vendor chunk
  - `redux-vendor-[hash].js` - Redux vendor chunk
  - `i18n-vendor-[hash].js` - i18next vendor chunk
  - `icons-vendor-[hash].js` - Lucide icons vendor chunk
  - `index-[hash].css` - Application styles

**Total Size**: ~500-800 KB (minified + gzipped)

---

## Deployment to Netlify (Recommended)

Netlify is the recommended deployment platform due to:

- Simple setup with `netlify.toml` configuration
- Automatic builds on git push
- CDN distribution
- Instant rollbacks
- Free tier available

### Option 1: Deploy via Netlify UI

1. **Create Netlify Account**
   - Sign up at [netlify.com](https://netlify.com)
   - Connect your GitHub/GitLab/Bitbucket account

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Authorize Netlify to access your repo

3. **Configure Build Settings**
   Netlify will auto-detect settings from `netlify.toml`, but verify:
   - **Build command**: `pnpm install && pnpm build`
   - **Publish directory**: `packages/app/dist`
   - **Node version**: 20.19 (from `.nvmrc`)

4. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://[random-name].netlify.app`

5. **Custom Domain** (Optional)
   - Go to "Domain settings"
   - Add your custom domain
   - Configure DNS settings as instructed

### Option 2: Deploy via Netlify CLI

For more control and automation:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the app
pnpm build

# Deploy to draft URL (for testing)
netlify deploy --dir=packages/app/dist

# Deploy to production
netlify deploy --prod --dir=packages/app/dist
```

### Netlify Configuration

The `netlify.toml` file in the root directory provides:

```toml
[build]
  command = "pnpm install && pnpm build"
  publish = "packages/app/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20.19"
```

**Features**:

- **SPA redirect**: All routes redirect to `index.html` for client-side routing
- **Node version**: Locked to 20.19 for consistency
- **Build command**: Installs deps and builds all packages

---

## Deployment to Vercel

Vercel is another excellent option for static sites.

### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Build the app
pnpm build

# Deploy to preview
vercel --cwd packages/app

# Deploy to production
vercel --prod --cwd packages/app
```

### Deploy via Vercel UI

1. Import your repository at [vercel.com](https://vercel.com)
2. Configure:
   - **Build Command**: `pnpm install && pnpm build`
   - **Output Directory**: `packages/app/dist`
   - **Install Command**: `pnpm install`
3. Deploy

### Vercel Configuration

Create `vercel.json` in the root (optional):

```json
{
  "buildCommand": "pnpm install && pnpm build",
  "outputDirectory": "packages/app/dist",
  "framework": null,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Deployment to GitHub Pages

### Prerequisites

- GitHub repository
- GitHub Actions enabled

### Configuration

1. **Create GitHub Actions Workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20.19"

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/app/dist
```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (auto-created by workflow)

3. **Access Your Site**
   - `https://[username].github.io/[repository-name]`

---

## Deployment to AWS S3 + CloudFront

For enterprise deployments with AWS infrastructure.

### Steps

1. **Create S3 Bucket**

```bash
aws s3 mb s3://my-page-builder-app
```

2. **Configure Bucket for Static Hosting**

```bash
aws s3 website s3://my-page-builder-app --index-document index.html --error-document index.html
```

3. **Build and Upload**

```bash
pnpm build
aws s3 sync packages/app/dist/ s3://my-page-builder-app --delete
```

4. **Create CloudFront Distribution** (Optional but Recommended)
   - Point to S3 bucket
   - Configure custom domain
   - Enable HTTPS with ACM certificate
   - Set custom error response: 404 → /index.html (for SPA routing)

---

## Environment Variables (Optional)

The Page Builder app doesn't require environment variables by default. If you add analytics or API integrations, use:

### Netlify

```bash
# netlify.toml
[build.environment]
  VITE_ANALYTICS_ID = "your-id"
```

Or set in Netlify UI: Site settings → Environment variables

### Vercel

Set in Vercel UI: Settings → Environment Variables

### GitHub Actions

```yaml
- name: Build
  run: pnpm build
  env:
    VITE_ANALYTICS_ID: ${{ secrets.ANALYTICS_ID }}
```

### Access in Code

```javascript
const analyticsId = import.meta.env.VITE_ANALYTICS_ID;
```

---

## Performance Optimization

### Pre-Deployment Checklist

✅ **Bundle Analysis**

```bash
pnpm build
# Check packages/app/dist/ size
```

✅ **Lighthouse Audit**

- Run on production URL
- Target: 90+ on all metrics

✅ **Test Export Functionality**

- Create a page
- Export to HTML
- Verify exported HTML works standalone

✅ **Test i18n**

- Switch between all 4 languages
- Verify RTL layout for Arabic
- Check translations are complete

✅ **Test Error Boundaries**

- Force errors in development
- Verify graceful degradation

### Post-Deployment Optimization

**CDN Configuration**:

- Enable HTTP/2
- Enable Brotli/Gzip compression
- Set cache headers for assets (1 year)
- Set cache headers for HTML (no-cache)

**Security Headers** (add to `netlify.toml`):

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## Monitoring and Analytics

### Error Monitoring

Integrate Sentry (optional):

```bash
pnpm add @sentry/react @sentry/vite-plugin
```

Configure in `packages/app/src/main.jsx`:

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

### Analytics

Add Google Analytics (optional):

```javascript
// packages/app/public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Rollback Strategy

### Netlify

- Go to "Deploys" tab
- Click on previous deploy
- Click "Publish deploy"

### Vercel

- Go to "Deployments" tab
- Click on previous deployment
- Click "Promote to Production"

### GitHub Pages

- Revert commit and push
- Or manually deploy from specific commit

---

## Troubleshooting

### Build Fails

**Error**: `Cannot find module '@page-builder/ui'`

- **Solution**: Run `pnpm install` to link workspace packages

**Error**: `Out of memory`

- **Solution**: Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096 pnpm build`

### Routes Return 404

**Issue**: Direct URL navigation fails (e.g., `/design`)

- **Solution**: Configure SPA redirects (see Netlify/Vercel sections above)

### Assets Not Loading

**Issue**: Assets fail to load on deployment

- **Solution**: Check `base` in `vite.config.js` matches deployment path
- For subdirectory deploys: `base: '/page-builder/'`

### Slow Initial Load

**Issue**: Large bundle size

- **Solution**: Verify code splitting is working
- Check vendor chunks are separate
- Enable Brotli compression on CDN

---

## CI/CD Integration

### GitHub Actions Example

See `.github/workflows/build.yml` for automated:

- Build verification on PRs
- Deployment to Netlify on push to main
- Bundle size reporting

### Custom Deployment Pipeline

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v3
        with:
          node-version: "20.19"
          cache: "pnpm"

      - run: pnpm install
      - run: pnpm build
      - run: pnpm test # if tests exist

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: "./packages/app/dist"
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## Summary

The Page Builder app is optimized for static deployment with:

- Client-side rendering (no server required)
- Optimized bundle splitting
- CDN-friendly caching
- SPA routing with redirects

**Recommended Flow**:

1. Build locally: `pnpm build`
2. Test build: `pnpm preview`
3. Deploy to Netlify with automatic builds
4. Monitor performance with Lighthouse
5. Use CI/CD for automated deployments

For questions or issues, refer to [HOW_THIS_APP_WORKS.md](HOW_THIS_APP_WORKS.md) for architectural details.
