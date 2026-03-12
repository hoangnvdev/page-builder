# GitHub Actions Setup Guide

This repository includes a GitHub Actions CI/CD pipeline that automatically builds and deploys your app.

## What the Pipeline Does

### On Every Push and Pull Request:

✅ Installs dependencies using pnpm
✅ Builds the application
✅ Verifies build output exists
✅ Uploads build artifacts
✅ Displays bundle size analysis

### On Pull Requests (Optional):

✅ Deploys a preview to Netlify
✅ Adds a comment to the PR with the preview URL

### On Push to Main Branch (Optional):

✅ Deploys to Netlify production

## Setup Instructions

### 1. Enable GitHub Actions

The workflow file is already created at `.github/workflows/ci.yml`. GitHub Actions will automatically run when you push code.

### 2. Basic Build Verification (No Secrets Needed)

The basic build verification works immediately without any configuration. It will:

- Run on all pushes and pull requests
- Verify the build succeeds
- Show bundle sizes

### 3. Optional: Enable Netlify Deployments

If you want GitHub Actions to deploy to Netlify (instead of using Netlify's Git integration), follow these steps:

#### Get Netlify Credentials:

1. **Get Netlify Auth Token:**
   - Go to https://app.netlify.com/user/applications
   - Click "New access token"
   - Give it a name (e.g., "GitHub Actions")
   - Copy the token (you'll only see it once!)

2. **Get Netlify Site ID:**
   - Go to your site on Netlify
   - Site Settings → General → Site details
   - Copy the "Site ID" (API ID)

#### Add Secrets to GitHub:

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these secrets:
   - Name: `NETLIFY_AUTH_TOKEN`, Value: [your Netlify token]
   - Name: `NETLIFY_SITE_ID`, Value: [your Site ID]

#### Modify the Workflow:

The deployment jobs are already configured in `.github/workflows/ci.yml`. Once you add the secrets, they'll work automatically.

To disable deployments (use only build verification):

1. Open `.github/workflows/ci.yml`
2. Remove or comment out the `deploy-preview` and `deploy-production` jobs

## Workflow Details

### Triggers

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

### Jobs

**1. build-and-test**

- Runs on all pushes and PRs
- Tests with Node.js 18.x
- Uses pnpm for package management
- Verifies build output
- Shows bundle size analysis

**2. deploy-preview** (optional)

- Runs only on pull requests
- Requires Netlify secrets
- Creates preview deployment
- Comments on PR with preview URL

**3. deploy-production** (optional)

- Runs only on main branch pushes
- Requires Netlify secrets
- Deploys to production

## Viewing Results

### Check Status:

1. Go to your repository on GitHub
2. Click the "Actions" tab
3. See all workflow runs

### PR Status:

- GitHub will show a green checkmark ✅ if build passes
- Red X ❌ if build fails
- Yellow circle 🟡 while running

### Artifacts:

- Build artifacts are saved for 7 days
- Download them from the Actions run page

## Troubleshooting

### Build Fails on GitHub but Works Locally

**Check Node version:**

```bash
node --version  # Should be 18+
```

**Check pnpm version:**

```bash
pnpm --version
```

**Clear cache and reinstall:**

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Deployment Fails

**Missing secrets:**

- Verify `NETLIFY_AUTH_TOKEN` is set correctly
- Verify `NETLIFY_SITE_ID` is set correctly

**Token expired:**

- Generate a new Netlify token
- Update the GitHub secret

### Workflow Not Running

**Check branch protection:**

- Settings → Branches → Branch protection rules
- Ensure "Require status checks" is enabled

**Check workflow file:**

- Ensure `.github/workflows/ci.yml` exists
- Verify YAML syntax is correct
- Check indentation (use spaces, not tabs)

### Deprecated Actions Error

**Error message:** `This request has been automatically failed because it uses a deprecated version of actions/upload-artifact: v3`

**Solution:** The workflow file has been updated to use `actions/upload-artifact@v4`. If you see this error:

1. Pull the latest changes: `git pull origin main`
2. The workflow uses `@v4` which is the current supported version
3. Re-run the failed workflow from the GitHub Actions tab

All actions in the workflow are now using current versions:
- `actions/checkout@v4` ✅
- `actions/setup-node@v4` ✅
- `actions/upload-artifact@v4` ✅
- `pnpm/action-setup@v2` ✅

## Customization

### Change Node Version

Edit `.github/workflows/ci.yml`:

```yaml
strategy:
  matrix:
    node-version: [20.x] # Change to desired version
```

### Add More Branches

Edit the triggers:

```yaml
on:
  push:
    branches: [main, develop, staging] # Add more branches
```

### Add Tests

Add a test step before build:

```yaml
- name: Run tests
  run: pnpm test
```

### Change Artifact Retention

```yaml
- name: Upload build artifacts
  uses: actions/upload-artifact@v3
  with:
    retention-days: 30 # Change from 7 to desired days
```

## Best Practices

✅ Always run the build verification
✅ Review bundle size changes in PRs
✅ Use branch protection to require passing builds
✅ Keep secrets secure and rotate regularly
✅ Use separate Netlify sites for preview vs. production
✅ Enable PR comments to see preview URLs
✅ Monitor workflow run times and optimize if needed

## Security Notes

⚠️ **Never commit secrets to Git**
⚠️ **Use GitHub Secrets for sensitive data**
⚠️ **Rotate Netlify tokens regularly**
⚠️ **Review workflow logs for exposed data**
⚠️ **Use branch protection on main branch**

## Deployment Strategy

### Recommended: Netlify Git Integration (Simpler)

- Connect Netlify directly to your Git repository
- Netlify builds on every push automatically
- Use GitHub Actions only for build verification

### Alternative: GitHub Actions Deployment (More Control)

- GitHub Actions builds and deploys
- More control over deployment flow
- Can run additional checks before deployment
- Requires Netlify secrets setup

Choose based on your team's needs!
