# App Package Refactoring Summary

**Date**: March 19, 2026
**Package**: `@page-builder/app`

## Overview

This document outlines the structural improvements made to the app package to improve code organization, follow standard conventions, and reduce file complexity.

## Changes Made

### 1. Constants Extraction

**Problem**: The `componentRegistry.js` file contained a large 684-line `COMPONENT_PROPERTIES` constant mixed with utility functions, making the file unwieldy (723 lines total).

**Solution**:

- Created `src/constants/componentProperties.js` to house the `COMPONENT_PROPERTIES` export
- Refactored `src/utils/componentRegistry.js` to import the constant and contain only utility functions
- Updated exports in `src/utils/index.js` to maintain backward compatibility

**Impact**:

- `componentRegistry.js`: 723 lines → 48 lines (93% reduction)
- Better separation of concerns (data vs. logic)
- Improved maintainability

**Files Changed**:

- ✅ Created: `src/constants/componentProperties.js` (684 lines)
- ✅ Updated: `src/utils/componentRegistry.js` (48 lines)
- ✅ Updated: `src/utils/index.js` (export path adjustment)

### 2. Helpers Consolidation

**Problem**: The `helpers/` folder existed outside of `src/`, requiring a custom Vite alias (`@helpers`) and breaking standard project conventions.

**Solution**:

- Moved `helpers/object.js` → `src/utils/object.js`
- Updated all imports from `@helpers` → `@/utils`
- Removed `@helpers` alias from `vite.config.js`
- Exported utilities from `src/utils/index.js`

**Impact**:

- Eliminated non-standard directory structure
- Removed custom Vite alias configuration
- Consistent import patterns across the codebase

**Files Changed**:

- ✅ Moved: `helpers/object.js` → `src/utils/object.js`
- ✅ Deleted: `helpers/` folder
- ✅ Updated: `src/hooks/useFieldHandlers.js`
- ✅ Updated: `src/components/editor/PropertyPanel/index.jsx`
- ✅ Updated: `src/components/editor/PreviewRenderer/index.jsx`
- ✅ Updated: `src/utils/index.js`
- ✅ Updated: `vite.config.js`

### 3. Assets Consolidation

**Problem**: Assets were duplicated across two locations:

- `assets/images/` (5 images: 4 flags + default-image.png)
- `src/assets/images/` (4 images: 4 flags only)

**Solution**:

- Moved `default-image.png` from `assets/images/` → `src/assets/images/`
- Updated import in `Card` component to use `@/assets` alias
- Deleted duplicate `assets/` folder

**Impact**:

- Single source of truth for static assets
- Cleaner project structure
- Standard Vite asset handling

**Files Changed**:

- ✅ Moved: `assets/images/default-image.png` → `src/assets/images/default-image.png`
- ✅ Updated: `src/components/layout/Card/index.jsx`
- ✅ Deleted: `assets/` folder

## Updated Project Structure

```
packages/app/
├── src/
│   ├── assets/             # Static assets (consolidated)
│   │   └── images/         # All application images
│   ├── components/
│   ├── constants/          # Application constants (NEW)
│   │   └── componentProperties.js
│   ├── contexts/
│   ├── hooks/
│   ├── locales/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── utils/              # All utility functions (expanded)
│   │   ├── componentRegistry.js    # Utility functions only
│   │   ├── exportHTML.jsx
│   │   ├── object.js              # Moved from helpers/
│   │   ├── processTemplateConfig.js
│   │   ├── rtl.js
│   │   └── index.js
│   ├── App.jsx
│   ├── i18n.js
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js          # Simplified (removed @helpers alias)
└── package.json
```

## Vite Configuration Changes

### Before

```javascript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "src"),
    "@helpers": path.resolve(__dirname, "helpers"),  // REMOVED
  },
}
```

### After

```javascript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "src"),
  },
}
```

## Import Pattern Changes

### Constants

```javascript
// Before
import { COMPONENT_PROPERTIES } from "@/utils";

// After (still works - re-exported)
import { COMPONENT_PROPERTIES } from "@/utils";
```

### Utilities

```javascript
// Before
import { setNestedValue } from "@helpers";

// After
import { setNestedValue } from "@/utils";
```

### Assets

```javascript
// Before
const defaultImage = new URL(
  "../../assets/images/default-image.png",
  import.meta.url,
).href;

// After
import defaultImageSrc from "@/assets/images/default-image.png";
```

## Verification

Build verification completed successfully:

```bash
cd packages/app && pnpm build
# ✓ 1611 modules transformed
# ✓ built in 452ms
```

All imports resolved correctly with no errors.

## Migration Guide

If you have pending branches or work-in-progress:

1. **Update imports from `@helpers`:**

   ```bash
   # Find all usages
   grep -r "@helpers" src/

   # Replace with @/utils
   sed -i '' 's/@helpers/@\/utils/g' src/**/*.{js,jsx}
   ```

2. **Update asset imports:**
   - Use `@/assets/images/` for all image imports
   - Remove references to root `assets/` folder

3. **No changes needed for:**
   - `COMPONENT_PROPERTIES` usage (re-exported from utils)
   - Component registry functions (same API)

## Benefits

1. **Improved Maintainability**: Large constant file split into focused modules
2. **Standard Structure**: All source code under `src/`, no custom aliases
3. **Better Organization**: Clear separation of constants, utilities, and assets
4. **Reduced Complexity**: Smaller, focused files easier to understand and modify
5. **Consistent Patterns**: Single `@` alias for all internal imports

## Related Documentation

- Updated: `packages/app/README.md` - Project structure section
- No changes needed: Other packages (ui, templates) already follow proper structure
