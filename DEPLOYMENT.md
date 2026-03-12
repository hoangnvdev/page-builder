# Deployment Guide

## Deploying to Netlify

This app is optimized for deployment on Netlify with the following configurations:

## CI/CD with GitHub Actions

This project includes automated build verification using GitHub Actions. See [.github/GITHUB_ACTIONS.md](.github/GITHUB_ACTIONS.md) for detailed setup instructions.

**What it does:**

- ✅ Automatically verifies builds on every push and pull request
- ✅ Shows bundle size analysis in workflow logs
- ✅ Saves build artifacts for 7 days
- ✅ (Optional) Deploys preview for pull requests
- ✅ (Optional) Deploys to production on main branch

The workflow runs automatically when you push to GitHub - no configuration needed for basic build verification!

### Automatic Deployment from Git

1. **Push Your Code to GitHub/GitLab/Bitbucket**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select your repository

3. **Build Settings** (Auto-detected from `netlify.toml`)
   - **Build command**: `pnpm install && pnpm build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (from `.nvmrc`)

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your app

### Manual Deployment via Netlify CLI

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Build the app**

   ```bash
   pnpm build
   ```

3. **Deploy to Netlify**

   ```bash
   netlify deploy --prod
   ```

4. **Follow the prompts**
   - Authorize Netlify CLI
   - Select/Create a site
   - Set publish directory to `dist`

### What's Included

The build is optimized with:

✅ **Code Splitting**

- React vendor bundle (~143 KB)
- Redux vendor bundle (~22 KB)
- Formik vendor bundle (~31 KB)
- Main app bundle (~106 KB)

✅ **Asset Optimization**

- Minified JavaScript (Terser)
- Minified CSS
- Optimized images
- Hashed filenames for cache busting

✅ **Performance**

- Removed console.logs in production
- Tree-shaking enabled
- Long-term caching for static assets
- SPA redirect rules configured

✅ **Security Headers**

- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

### Build Output

After running `pnpm build`, you'll see:

```
dist/
├── index.html
└── assets/
    ├── css/
    │   └── index-[hash].css
    └── js/
        ├── index-[hash].js
        ├── react-vendor-[hash].js
        ├── redux-vendor-[hash].js
        ├── form-vendor-[hash].js
        └── icons-vendor-[hash].js
```

### Environment Variables

If you need environment variables:

1. Go to Site Settings → Environment variables in Netlify
2. Add your variables
3. Rebuild the site

### Custom Domain

To add a custom domain:

1. Go to Site Settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

### Troubleshooting

**Build fails:**

- Check Node version is 18+
- Ensure all dependencies are in `package.json`
- Review build logs in Netlify dashboard

**404 errors on routes:**

- Verify `netlify.toml` redirects are configured
- Check SPA redirect rule: `/* → /index.html 200`

**Slow builds:**

- Enable build cache in Netlify settings
- Review unnecessary dependencies

### Preview Deployments

Every pull request automatically creates a preview deployment with a unique URL for testing before merging to production.
