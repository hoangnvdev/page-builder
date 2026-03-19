# Template Thumbnail Screenshots Guide

## 📸 Overview

The template gallery now uses real screenshot thumbnails instead of CSS mockups. This guide explains how to capture and add template screenshots to the project.

## 📁 File Structure

Template screenshots should be placed in:

```
packages/app/src/assets/images/templates/
  ├── business-pro-refactored-thumbnail.png
  ├── comic-splash-refactored-thumbnail.png
  ├── futuristic-tech-refactored-thumbnail.png
  └── refined-classic-refactored-thumbnail.png
```

## 📐 Screenshot Specifications

### Dimensions & Format

- **Aspect Ratio**: 16:10 (recommended)
- **Recommended Size**: 1600x1000px (scales down nicely)
- **Minimum Size**: 800x500px
- **Format**: PNG (for quality) or WebP (for smaller file size)
- **File Size**: Target < 200KB per image (optimize for web)

### Capture Area

Capture the full template from **top** (header) to a good stopping point that shows:

1. ✅ Header/Navigation
2. ✅ Hero section
3. ✅ At least 2-3 main content sections
4. ❌ Don't need to capture footer (unless it's visually important)

## 🎯 How to Capture Screenshots

### Method 1: Using the Browser (Recommended)

1. **Navigate to the template**

   ```bash
   pnpm dev
   # Open http://localhost:3000
   # Select the template you want to screenshot
   ```

2. **Set browser to desktop width**
   - Use Chrome DevTools (F12)
   - Set device to "Responsive"
   - Set width to **1600px** (height will auto-adjust)

3. **Capture the screenshot**
   - **Chrome**: Right-click > "Capture screenshot" or use DevTools screenshot tool
   - **Firefox**: Right-click > "Take a Screenshot" > "Save visible"
   - **Manual**: Use Snipping Tool / Screenshot tools

4. **Crop if needed**
   - Ensure aspect ratio is 16:10
   - Crop to show the best representative view
   - Remove any browser UI elements

### Method 2: Using Playwright/Puppeteer (Automated)

Create a screenshot script (`scripts/capture-templates.js`):

```javascript
const { chromium } = require("playwright");

const templates = [
  "business-pro-refactored",
  "comic-splash-refactored",
  "futuristic-tech-refactored",
  "refined-classic-refactored",
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1000 },
  });

  for (const template of templates) {
    await page.goto(`http://localhost:3000/design?template=${template}`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `packages/app/src/assets/images/templates/${template}-thumbnail.png`,
      fullPage: false,
    });
    console.log(`✅ Captured: ${template}`);
  }

  await browser.close();
})();
```

Run with:

```bash
npm install -D playwright
node scripts/capture-templates.js
```

## 🖼️ Image Optimization

After capturing, optimize images to reduce file size:

### Using ImageOptim (Mac)

```bash
# Drag and drop images into ImageOptim
# Compresses without quality loss
```

### Using TinyPNG/TinyJPG

```bash
# Upload to https://tinypng.com/
# Download optimized versions
```

### Using CLI Tools

```bash
# Install sharp
npm install -g sharp-cli

# Optimize
sharp-cli -i input.png -o optimized.png --quality 85 --format webp
```

### Using VS Code Extension

- Install: "Image Optimizer" extension
- Right-click image > "Optimize Image"

## 📝 Naming Convention

Follow this exact naming pattern:

```
{template-id}-thumbnail.{ext}
```

Examples:

- `business-pro-refactored-thumbnail.png`
- `comic-splash-refactored-thumbnail.webp`
- `futuristic-tech-refactored-thumbnail.png`
- `refined-classic-refactored-thumbnail.png`

⚠️ **Important**: The template ID must match exactly with the `id` property in the template config.

## 🔄 Fallback Behavior

If a thumbnail doesn't exist, the component automatically falls back to:

```
packages/app/src/assets/images/default-image.png
```

This means:

- ✅ No errors if thumbnail is missing
- ✅ Can add thumbnails gradually
- ✅ Default image shows temporarily

## ✅ Checklist for Each Template

- [ ] Capture at 1600x1000px (16:10 ratio)
- [ ] Show header, hero, and 2-3 sections
- [ ] Remove browser chrome/UI
- [ ] Optimize to < 200KB
- [ ] Name correctly: `{template-id}-thumbnail.png`
- [ ] Place in `packages/app/src/assets/images/templates/`
- [ ] Test in browser (should load without errors)
- [ ] Verify hover effect shows overlay correctly

## 🎨 Tips for Great Screenshots

### Do ✅

- Use actual template content (not Lorem ipsum if possible)
- Show the template at its best (populated with good sample content)
- Capture during good scroll position (header + hero visible)
- Use consistent browser width (1600px)
- Show diverse content in sections

### Don't ❌

- Don't include browser UI
- Don't capture with inspector/devtools open
- Don't use low resolution
- Don't show empty/broken states
- Don't include personal/test data

## 🔧 Troubleshooting

### Image not showing?

1. Check filename matches template ID exactly
2. Verify file is in correct directory
3. Check browser console for 404 errors
4. Clear browser cache and reload

### Image looks distorted?

1. Verify aspect ratio is 16:10
2. Check `object-fit: cover` in CSS (should crop nicely)
3. Adjust `object-position` if needed (default: `top`)

### File too large?

1. Use WebP format instead of PNG
2. Optimize with TinyPNG or similar
3. Reduce dimensions slightly (e.g., 1200x750px)
4. Compress with quality 80-85%

## 📊 Quick Reference

| Template ID                  | Screenshot Name                            | Priority |
| ---------------------------- | ------------------------------------------ | -------- |
| `business-pro-refactored`    | `business-pro-refactored-thumbnail.png`    | ⭐⭐⭐   |
| `comic-splash-refactored`    | `comic-splash-refactored-thumbnail.png`    | ⭐⭐⭐   |
| `futuristic-tech-refactored` | `futuristic-tech-refactored-thumbnail.png` | ⭐⭐⭐   |
| `refined-classic-refactored` | `refined-classic-refactored-thumbnail.png` | ⭐⭐⭐   |

## 🚀 Next Steps

1. Start dev server: `pnpm dev`
2. Navigate to each template
3. Capture screenshots following this guide
4. Optimize images
5. Place in `packages/app/src/assets/images/templates/`
6. Refresh gallery page to see results!

---

**Updated**: March 19, 2026
**Related**: [TEMPLATE_GALLERY_UX_IMPROVEMENTS.md](../TEMPLATE_GALLERY_UX_IMPROVEMENTS.md)
