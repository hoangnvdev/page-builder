# Page Builder - GitHub Actions CI/CD

**Last Updated**: March 20, 2026

## Overview

This document explains how GitHub Actions is configured for the Page Builder project. The workflows handle building the monorepo, running tests, and deploying to Netlify.

## Workflow Configuration

### CI Workflow: `.github/workflows/ci.yml`

This workflow is triggered on every push and pull request to the `main` and `dev` branches.

#### Workflow Steps

1. **Install Dependencies**

   ```bash
   pnpm install
   ```

2. **Build Packages**
   - `@page-builder/ui`
   - `@page-builder/templates`
   - `@page-builder/app`

3. **Run Tests**

   ```bash
   pnpm test
   ```

4. **Upload Artifacts**
   - Saves the built app for manual testing.

5. **Deploy to Netlify** (Optional)
   - Deploys to Netlify if secrets are configured.

#### Triggers

```yaml
on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]
```

## Deployment Secrets

To enable Netlify deployment from GitHub Actions, add the following secrets in your repository settings:

- **NETLIFY_AUTH_TOKEN**: Your Netlify personal access token.
- **NETLIFY_SITE_ID**: The Site ID of your Netlify project.
