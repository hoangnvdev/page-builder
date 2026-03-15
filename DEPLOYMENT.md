# Page Builder - Deployment Guide

**Last Updated**: March 16, 2026

## Overview

This guide covers deploying the Page Builder application - a visual page builder for creating static websites with templates like Business Pro, Comic Splash, Futuristic Tech, and Refined Classic. The application is built as a React SPA with Redux state management and exports production-ready HTML.

## Prerequisites

- **Built application**: Run `pnpm build` from project root
- **Git repository**: Connected to GitHub/GitLab
- **Node.js 20.19+**: Required for Vite 8 (or 22.12+)
- **pnpm 10+**: Package manager (faster than npm/yarn)
- **Hosting account**: Netlify (recommended), Vercel, or other static host

## Netlify Deployment (Recommended)

### Automatic Deployment via Git

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Connect Page Builder Repository**
   - Click "Add new site" → "Import an existing project"
   - Select your page-builder repository
   - Grant Netlify access

3. **Configure Build Settings**

   The `netlify.toml` file in the root already configures everything, but verify:
   - **Build command**: `pnpm install && pnpm build`
   - **Publish directory**: `packages/app/dist`
   - **Node version**: 20

   The build process:
   1. Builds `@page-builder/ui` (component library)
   2. Builds `@page-builder/templates` (template system with 4 templates)
   3. Builds `@page-builder/app` (main React application)
   4. Outputs optimized chunks (react-vendor, redux-vendor, ui-lib, templates-lib)

4. **Set Environment Variables** (Optional)

   The app works without external APIs, but you can add:

   ```bash
   # If you add backend API for saving templates
   VITE_API_URL=https://your-api.com

   # Track template usage and exports
   VITE_GA_ID=UA-XXXXXXXXX-X

   # Monitor errors in production
   VITE_SENTRY_DSN=https://your-sentry-dsn
   ```

5. **Deploy**
   - Click "Deploy site"
   - Netlify builds all 3 packages in ~30 seconds
   - Your Page Builder is live at: `https://random-name.netlify.app`
   - Users can now:
     - Browse Business Pro, Comic Splash, Futuristic Tech, Refined Classic templates
     - Visual editor to customize sections
     - Export customized pages as HTML

6. **Custom Domain** (Optional)
   - Go to Domain settings → Add custom domain
   - Example: `pagebu globally
     npm install -g netlify-cli

# Login to Netlify

netlify login

# From the page-builder root directory

cd /path/to/page-builder

# Build all packages (ui → templates → app)

pnpm build

# Deploy preview to test before going live

# This creates a temporary URL to test your Page Builder

netlify deploy --dir=packages/app/dist

# Verify the preview:

# - Test template selection (Business Pro, Comic Splash, etc.)

# - Test visual editor (click sections to edit)

# - Test export functionality

# - Check mobile responsiveness

# Deploy to production

netlify deploy --prod --dir=packages/app/dist

# Deploy preview for Page Builder

The existing `netlify.toml` already configures this:

```toml
[build]
  command = "pnpm install && pnpm build"
  publish = "packages/app/dist"

[build.environment]
  NODE_VERSION = "20"

# SPA routing for React Router
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Cache static assets (vendor chunks, templates, UI components)
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Workflow**:

- Push to `main` → Production deploy (live Page Builder)
- Open PR → Preview deploy (test new templates/features)
- Push to `develop` → Staging deploy (internal testing)ranch deploy previews
  [context.branch-deploy]
  command = "pnpm install && pnpm build"

# Deploy previews for PRs

[context.deploy-prev (Alternative)

### Via Vercel Dashboard

1. **Import Page Builder Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your page-builder repository

2. **Configure for Monorepo**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (monorepo root)
   - **Build Command**: `pnpm install && pnpm build`
   - **Output Directory**: `packages/app/dist`
   - **Install Command**: `pnpm install --frozen-lockfile`

3. **Environment Variables** (Optional)

   The Page Builder works standalone, but add if needed:

   ```bash
   # Only if using backend API
   VITE_API_URL=https://api.example.com

   # Analytics for template usage
   VITE_GA_ID=UA-XXXXXXXXX-X
   ```

4. **Deploy**
   - Every push to `main` → Production deploy
   - PRs → Preview deployments to test new templates
   - Build time: ~25 seconds for all 3 package

5. **Deploy**
   - Vercel automatically builds on every push
   - Preview deployments for PRs

### Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## AWS S3 + CloudFront

### Prerequisites

- AWS account
- AWS CLI installed and configured

### Deployment Steps

1. **Build Application**

   ```bash
   pnpm build
   ```

2. **Create S3 Bucket**

   ```bash
   aws s3 mb s3://your-bucket-name

   # Enable static website hosting
   aws s3 website s3://your-bucket-name \
     --index-document index.html \
     --error-document index.html
   ```

3. **Upload Files**

   ```bash
   # Sync build directory to S3
   aws s3 sync packages/app/dist s3://your-bucket-name \
     --delete \
     --cache-control "public, max-age=31536000, immutable" \
     --exclude "*.html"

   # Upload HTML with no-cache
   aws s3 sync packages/app/dist s3://your-bucket-name \
     --delete \
     --cache-control "public, max-age=0, must-revalidate" \
     --exclude "*" \
     --include "*.html"
   ```

4. **Configure Bucket Policy**

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

5. **Create CloudFront Distribution**
   - Origin: Your S3 bucket
   - Default root object: `index.html`
   - Error pages: 404 → `/index.html` (for SPA routing)
   - SSL certificate: Use ACM or custom certificate

6. **Invalidate Cache on Deploy**
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```

## GitHub Pages

### Setup

1. **Install gh-pages**

   ```bash
   pnpm add -D gh-pages
   ```

2. **Add Deploy Script**

   In `packages/app/package.json`:

   ```json
   {
     "scripts": {
       "deploy": "pnpm build && gh-pages -d dist"
     }
   }
   ```

3. **Configure Base Path**

   In `packages/app/vite.config.js`:

   ```javascript
   export default defineConfig({
     base: "/page-builder/", // Your repo name
     // ...
   });
   ```

4. **Deploy**

   ```bash
   cd packages/app
   pnpm deploy
   ```

5. **Configure GitHub**
   - Go to repository Settings → Pages
   - Source: Deploy from `gh-pages` branch
   - Your site: `https://username.github.io/page-builder/`

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ui/package.json ./packages/ui/
COPY packages/templates/package.json ./packages/templates/
COPY packages/app/package.json ./packages/app/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/packages/app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build and Run

```bash
# Build image
docker build -t page-builder .

# Run container
docker run -d -p 80:80 page-builder

# Access at http://localhost
```

### Docker Compose

````yaml
version: '3.8'

services:
  page-builder:
    build: .
    ports: for Page Builder

### Currently Used Variables

The Page Builder currently works **without any required environment variables**. It's a fully client-side application.

### Optional Enhancements

```bash
# Track which templates users select and export
VITE_GA_ID=UA-XXXXXXXXX-X

# Monitor errors (export failures, template loading issues)
VITE_SENTRY_DSN=https://your-sentry-dsn

# If you add a backend to save user templates
VITE_API_URL=https://api.pagebuilder.com
````

### Debug Mode

```bash
# Enable console logs in production
VITE_DEBUG=true

# Show Redux DevTools in production
VITE_REDUX_DEVTOOLS=true
```

**Note**: All environment variables must be prefixed with `VITE_` to be included in the build. This is how Vite works.

# Error tracking

VITE_SENTRY_DSN=https://...

# Feature flags

VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false

````

### Setting Variables by Platform

#### Netlify
Site Settings → Environment Variables

#### Vercel
Project Settings → Environment Variables

#### AWS for Page Builder

### Functionality Tests
- [ ] **Site loads**: Visit your deployed URL
- [ ] **Template Gallery**: See all 4 templates (Business Pro, Comic Splash, Futuristic Tech, Refined Classic)
- [ ] **Template Selection**: Click and load each template
- [ ] **Visual Editor**: Click on Hero section → Edit text
- [ ] **Section Editing**: Modify colors, text, images in any section
- [ ] **Live Preview**: Changes appear immediately
- [ ] **HTML Export**: Click "Export HTML" → Download works
- [ ] **Exported HTML**: Open downloaded file → Looks correct

### Technical Verification
- [ ] **SPA Routing**: `/design` and `/template/:id` routes work
- [ ] **Assets Load**: Check DevTools Network tab
  - React vendor chunk loads (~45KB gzipped)
  - Redux vendor chunk loads (~15KB gzipped)
  - UI library chunk loads (~25KB gzipped)
  - Templates library chunk loads (~40KB gzipped)
- [ ] **Mobile Responsive**: Test on phone/tablet
- [ ] **SSL Certificate**: URL shows `https://` with lock icon
- [ ] **Performance**: Run Lighthouse (should be > 90)

### Optional Setup
- [ ] Configure custom domain (e.g., `builder.yourdomain.com`)
- [ ] Add Google Analytics to track template usage
- [ ] Set up Sentry for error monitoring
- [ ] Add Discord/Slack notifications for deployments
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate (HTTPS)
- [ ] Test performance (Lighthouse score > 90)
- [ ] Configure custom domain (if applicable)
- [ ] Set up monitoring/analytics
- [ ] Configure error tracking

## Rollback if Something Breaks

### Netlify Rollback
1. Go to your Netlify dashboard → Deploys
2. Find the last working deploy
3. Click "Publish deploy"
4. Your Page Builder reverts to that version instantly

### Vercel Rollback
1. Go to Deployments tab
2. Find previous working deploy
3. Click "..." → "Promote to Production"

### Git Rollback (Then Redeploy)
```bash
# Revert last commit
git revert HEAD
git push

# Or go back to specific commit
git reset --hard <commit-hash>
git push --force

# Netlify/Vercel will auto-rebuild
````

## Performance After Deploy

Your Page Builder should achieve:

- **Lighthouse Performance**: > 90
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Total Bundle Size**: ~150KB gzipped

### Why It's Fast

1. **Code Splitting**: React/Redux load separately from your app code
2. **Tree-Shaking**: Only used components included
3. **Modern Target**: ES2020+ = smaller, faster code
4. **CDN**: Netlify/Vercel serve from edge locations worldwide
5. **Caching**: Vendor chunks cached for 1 year

### Monitoring Performance

Add to `packages/app/src/main.jsx`:

```javascript
// Track real user performance
if (import.meta.env.PROD) {
  import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    const sendToAnalytics = (metric) => {
      // Log which templates users load slowly
      console.log(metric.name, metric.value);
      // Send to your analytics
    };

    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  });
}
```

---

**Related Docs**:

- [.github/GITHUB_ACTIONS.md](.github/GITHUB_ACTIONS.md) - CI/CD workflows
- [doc/BUILD_AND_DEPLOYMENT.md](doc/BUILD_AND_DEPLOYMENT.md) - Technical build details
- [doc/PERFORMANCE_OPTIMIZATION.md](doc/PERFORMANCE_OPTIMIZATION.md) - Optimization strategies
