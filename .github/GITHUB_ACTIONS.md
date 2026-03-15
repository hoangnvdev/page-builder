# Page Builder - GitHub Actions CI/CD

**Last Updated**: March 15, 2026

## Overview

This document explains the CI/CD workflows for the Page Builder project. The workflows handle building the monorepo (ui + templates + app packages), running tests, and deploying to Netlify.

## Current Workflow: ci.yml

Located at `.github/workflows/ci.yml` - this is the main workflow that runs on every push and PR.

### What It Does

1. **Builds All Packages** in correct order:
   - `@page-builder/ui` (Button, Card, Input, etc.)
   - `@page-builder/templates` (Business Pro, Comic Splash, Futuristic Tech, Refined Classic)
   - `@page-builder/app` (React app with Redux + visual editor)

2. **Verifies Output**:
   - Checks `packages/app/dist` exists
   - Confirms `index.html` is generated
   - Validates bundle structure

3. **Reports Bundle Sizes**:
   - Total dist size
   - Individual JS chunks (react-vendor, redux-vendor, ui-lib, templates-lib)
   - CSS files

4. **Uploads Artifacts**:
   - Saves built `packages/app/dist` for 7 days
   - Can download to test locally

### Triggers

```yaml
on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]
```

**When it runs**:

- Every push to `main` or `dev` branches
- Every pull request targeting `main` or `dev`
- Takes ~30-45 seconds total

## Setup for Your Page Builder Fork

### 1. Enable Actions

Actions are enabled by default. The existing `ci.yml` will start running automatically.

### 2. Add Secrets for Netlify Deployment (Optional)

If you want to deploy from GitHub Actions instead of Netlify's GitHub integration:

**Repo Settings → Secrets and Variables → Actions → New repository secret**

```bash
# Get from: Netlify Dashboard → User Settings → Applications → Personal access tokens
NETLIFY_AUTH_TOKEN=your_token_here

# Get from: Netlify site → Site settings → Site details → API ID
NETLIFY_SITE_ID=your_site_id_here
```

### 3. No Environment Variables Needed

The Page Builder doesn't require environment variables to build. It's a fully client-side app.

## Available Workflows

### Basic CI Workflow

````yaml
# .github/workflows/ci.yml
name: CI

on:How to Add More Workflows

### Add Bundle Size Tracking

Create `.github/workflows/bundle-size.yml`:

```yaml
name: Bundle Size Check

on:
  pull_request:
    branches: [main]

jobs:
  check-size:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 10

      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Page Builder
        run: pnpm build

      - name: Check bundle sizes
        run: |
          echo "📦 Page Builder Bundle Analysis"
          echo ""
          echo "Target sizes:"
          echo "  - react-vendor: < 55KB gzipped"
          echo "  - redux-vendor: < 20KB gzipped"
          echo "  - ui-lib: < 30KB gzipped"
          echo "  - templates-lib: < 45KB gzipped"
          echo "  - app: < 80KB gzipped"
          echo ""
          echo "Actual sizes:"
          find packages/app/dist -name '*.js' -type f -exec bash -c 'echo "  $(basename {}): $(gzip -c {} | wc -c) bytes"' \;
````

### Add Template Validation

Create `.github/workflows/validate-templates.yml`:

```yaml
name: Validate Templates

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 10

      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Build templates package
        run: pnpm --filter @page-builder/templates build

      - name: Validate template configs
        run: |
          echo "✓ Validating Business Pro template"
          echo "✓ Validating Comic Splash template"
          echo "✓ Validating Futuristic Tech template"
          echo "✓ Validating Refined Classic template"
          # Add actual validation script here
```

### Add Auto-Deploy to Netlify

Create `.github/workflows/deploy.yml`:

````yaml
name: Deploy Page Builder

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
          version: 10

      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Page Builder (all 3 packages)
        run: pnpm build
        env:
          NODE_ENV: production

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './packages/app/dist'
          production-deploy: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy Page Builder from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

      - name: Deployment Summary
        run: |
          echo "✅ Page Builder deployed!"
          echo "   - Template Gallery available"
          echo "   - Visual Editor functional"
          echo "   - HTML Export ready"
```json
[
  {
    "name": "App Bundle",
    "path": "packages/app/dist/assets/js/app-*.js",
    "limit": "80 KB"
  },
  {
    "name": "React Vendor",
    "path": "packages/app/dist/assets/js/react-vendor-*.js",
    "limit": "55 KB"
  },
  {
    "name": "Total JS",
    "path": "packages/app/dist/assets/js/*.js",
    "limit": "500 KB"
  }
]
````

### Lighthouse Config

Create `lighthouserc.json` in root:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./packages/app/dist",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

## Workflow Triggers

### Common Trigger Patterns

```yaml
# On push to any branch
on:
  push:
    branches: ['**']

# On push to main only
on:
  push:
    branches: [main]

# On pull request
on:
  pull_request:
    branches: [main]

# On tag creation
on:
  push:
    tags:
      - 'v*'

# Manual trigger
on:
  workflow_dispatch:

# Scheduled (cron)
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday

# Multiple triggers
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

## Caching Strategies

### Cache Node Modules

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: 18
    cache: "pnpm" # Auto-caches pnpm store
```

### Custom Cache

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: |
      node_modules
      packages/*/node_modules
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-
```

### Cache Build Output

```yaml
- name: Cache build
  uses: actions/cache@v3
  with:
    path: |
      packages/*/dist
      node_modules/.vite
    key: ${{ runner.os }}-build-${{ github.sha }}
```

## Environment-Specific Deployments

### Deploy to Staging

```yaml
name: Deploy Staging

on:
  push:
    branches: [develop]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging

    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm build
        env:
          VITE_API_URL: ${{ secrets.STAGING_API_URL }}
      - run: netlify deploy
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.STAGING_SITE_ID }}
```

### Deploy to Production

```yaml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm build
        env:
          VITE_API_URL: ${{ secrets.PRODUCTION_API_URL }}
      - run: netlify deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.PRODUCTION_SITE_ID }}
```

## Matrix Builds

Test across multiple Node versions:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16, 18, 20]

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "pnpm"

      - run: pnpm install
      - run: pnpm test
```

## Notifications

### Slack Notifications

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: "Build completed"
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Discord Notifications

```yaml
- name: Notify Discord
  if: always()
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
    status: ${{ job.status }}
```

## Best Practices

### 1. Use Caching

- Cache node_modules with pnpm cache
- Cache build artifacts when appropriate
- Use cache keys based on lock file hash

### 2. Optimize Workflow Speed

- Run jobs in parallel when possible
- Use matrix builds for testing multiple versions
- Skip unnecessary steps with `if` conditions

### 3. Security

- Never commit secrets to repository
- Use GitHub Secrets for sensitive data
- Rotate tokens periodically
- Use environment protection rules

### 4. Cost Management

- Use `if` conditions to skip unnecessary runs
- Cancel redundant workflow runs
- Use self-hosted runners for large projects

### 5. Debugging

- Enable debug logging: `ACTIONS_STEP_DEBUG=true`
- Use `actions/upload-artifact` for build outputs
- Add debug steps when needed

## Troubleshooting

### Workflow Not Triggering

**Check**:

- Workflow file is in `.github/workflows/`
- YAML syntax is valid
- Trigger conditions match your push/PR

### Build Fails in CI but Works Locally

**Common causes**:

- Different Node versions
- Missing environment variables
- Case-sensitive file paths (Linux vs macOS/Windows)
- Cache issues

**Solutions**:

```yaml
# Match Node version
- uses: actions/setup-node@v3
  with:
    node-version: 18 # Match local version

# Clear cache
- run: rm -rf node_modules/.vite
```

### Out of Disk Space

```yaml
# Clean up before build
- name: Free disk space
  run: |
    sudo rm -rf /usr/local/lib/android
    sudo rm -rf /usr/share/dotnet
```

### Slow Workflows

**Optimize**:

- Use caching effectively
- Run jobs in parallel
- Reduce unnecessary steps
- Use faster action versions

## Monitoring & Insights

### Actions Dashboard

View workflow runs: `https://github.com/USER/REPO/actions`

### Metrics to Watch

- Workflow duration
- Success/failure rate
- Cache hit rate
- Build artifact sizes

### Cost Tracking

- Free tier: 2,000 minutes/month for private repos
- Public repos: Unlimited
- Monitor usage in billing settings

## Understanding Your Build Output

After `pnpm build` completes, you get:

```
packages/app/dist/
├── index.html                           # Main HTML entry
└── assets/
    ├── js/
    │   ├── app-[hash].js                # Your Page Builder app code (~60KB)
    │   ├── react-vendor-[hash].js       # React + ReactDOM + Router (~150KB → ~45KB gzipped)
    │   ├── redux-vendor-[hash].js       # Redux Toolkit (~45KB → ~15KB gzipped)
    │   ├── form-vendor-[hash].js        # Formik (~30KB → ~10KB gzipped)
    │   ├── icons-vendor-[hash].js       # Lucide React (~50KB → ~15KB gzipped)
    │   ├── ui-lib-[hash].js            # Your UI components (~80KB → ~25KB gzipped)
    │   └── templates-lib-[hash].js      # All 4 templates (~120KB → ~40KB gzipped)
    ├── css/
    │   └── main-[hash].css              # All styles combined
    ├── images/
    │   └── [optimized images]
    └── fonts/
        └── [web fonts]
```

**Total size**: ~500KB minified → ~150KB gzipped

This is excellent for a full-featured page builder!Verify template configs exported from `packages/templates/src/configs/index.js`

### Export Function Not Working

**Cause**: Missing dependencies or incorrect build

**Check**:

1. Verify `react-dom/server` is in dependencies
2. Check bundle includes `exportHTML` utility
3. Test export in production build locally before deploying
   **See Also**:

- [DEPLOYMENT.Your Page Builder Builds

### Check Build Status

1. Go to your repo → **Actions** tab
2. See all workflow runs
3. Click any run to see details:
   - Which packages built successfully
   - Build times (ui ~3s, templates ~5s, app ~15s)
   - Bundle sizes
   - Any errors

### View Build Artifacts

AftQuick Reference

### Common Commands

```bash
# Run the existing CI workflow locally
pnpm install --frozen-lockfile
pnpm build

# Check what gets built
ls -lh packages/app/dist
find packages/app/dist/assets/js -name "*.js"

# Test the built app
cd packages/app
pnpm preview  # Opens localhost:4173

# Clean everything and rebuild
pnpm clean
pnpm build
```

### File Locations

- **CI Config**: `.github/workflows/ci.yml`
- **Build Output**: `packages/app/dist/`
- **Netlify Config**: `netlify.toml`
- **Vite Configs**:
  - `packages/app/vite.config.js`
  - `packages/templates/vite.config.js`
  - `packages/ui/vite.config.js`

---

**See Also**:

- [DEPLOYMENT.md](../DEPLOYMENT.md) - How to deploy the Page Builder
- [../doc/BUILD_AND_DEPLOYMENT.md](../doc/BUILD_AND_DEPLOYMENT.md) - Detailed build process
- [Current CI Workflow](../. github/workflows/ci.yml) - See the actual workflow filesvg)

```

Shows build status: ✅ passing or ❌ failing
```
