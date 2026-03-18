# Default Image Usage

## Overview

All image components in the page builder now use a consistent default image (`default-image.png`) when no source URL is provided by the user. This eliminates the use of placeholder characters (like `▓`) and provides a better user experience.

## Default Image Location

The default image is stored in **two locations**:

1. **App Package**: `packages/app/src/assets/images/default-image.png`
2. **UI Package**: `packages/ui/assets/images/default-image.png`

The image is duplicated in the UI package because the primitive UI components (`Image`, `Avatar`, `Card`) need direct access to it without depending on the app package.

## Components Using Default Image

### ✅ Primitive UI Components (packages/ui)

#### **Image Component**

```javascript
import defaultImage from "../../assets/images/default-image.png";

<img src={src || defaultImage} alt={alt} />;
```

- **Before**: Showed `▓` placeholder when no `src`
- **After**: Shows default-image.png when no `src`
- **Removed**: `placeholder` prop (no longer needed)

#### **Avatar Component**

```javascript
import defaultImage from "../../assets/images/default-image.png";

{
  src || !children ? (
    <img src={src || defaultImage} alt={alt} />
  ) : (
    <span>{children}</span>
  );
}
```

- **Before**: Showed text placeholder (children) when no `src`
- **After**: Shows default-image.png when no `src` AND no children
- **Kept**: Text placeholder option for emoji avatars

#### **Card.Image Component**

```javascript
import defaultImage from "../../assets/images/default-image.png";

<img src={src || defaultImage} alt={alt} />;
```

- **Before**: Showed children content when no `src`
- **After**: Shows default-image.png when no `src`
- **Removed**: Conditional rendering with children fallback

### ✅ Composed Template Components (packages/templates)

#### **ImageGrid Component**

```javascript
<Image
  src={imgUrl}
  alt={imgAlt}
  fit={imgFit}
  // placeholder prop removed - Image handles default internally
  height="100%"
/>
```

- **Before**: Passed `placeholder={item.placeholder || "▓"}`
- **After**: No placeholder prop needed
- **Benefit**: Cleaner code, consistent defaults

#### **SplitScreen Component**

```javascript
<Image
  src={imageSrc}
  alt={imageAlt}
  fit={imageFit}
  // placeholder and imagePlaceholder props removed
  height="100%"
/>
```

- **Before**: Accepted and passed `imagePlaceholder` prop
- **After**: Removed `imagePlaceholder` from props and PropTypes
- **Benefit**: Simpler API, automatic defaults

## Migration Guide

### For Component Users

**No action needed!** The default image handling is automatic.

```javascript
// Old way (still works, but placeholder prop ignored)
<Image src={userUrl} placeholder="▓" />

// New way (recommended)
<Image src={userUrl} />

// When src is empty/null/undefined, default image shows automatically
<Image src={null} /> // Shows default-image.png
<Image /> // Shows default-image.png
```

### For Component Developers

If creating new components that use images:

```javascript
// ✅ DO: Use Image component (has built-in default)
import { Image } from '@page-builder/ui';

<Image src={userProvidedUrl} alt="..." />

// ✅ DO: Use Avatar component (has built-in default + text fallback)
import { Avatar } from '@page-builder/ui';

<Avatar src={userProvidedUrl} />
<Avatar>JD</Avatar> // Text fallback

// ❌ DON'T: Use raw <img> tag without default
<img src={userProvidedUrl} alt="..." />

// ✅ DO: If using raw <img>, import and use defaultImage
import defaultImage from '@page-builder/ui/assets/images/default-image.png';

<img src={userProvidedUrl || defaultImage} alt="..." />
```

## Benefits

### 1. Consistent User Experience

- All missing images show the same professional default
- No confusing placeholder characters (▓)
- Better visual appearance

### 2. Cleaner Code

- No need to pass placeholder props
- Less conditional rendering
- Simpler component APIs

### 3. Maintainability

- Single source of truth for default images
- Easy to update default image globally
- Clear documentation

## Replacing the Default Image

To use a different default image:

1. **Replace the file** in both locations:

   ```
   packages/app/src/assets/images/default-image.png
   packages/ui/assets/images/default-image.png
   ```

2. **Keep the same filename** (`default-image.png`)

3. **No code changes needed** - all components will automatically use the new image

4. **Recommended specs**:
   - Format: PNG (for transparency support)
   - Size: 400x300px or similar aspect ratio
   - File size: < 50KB for performance
   - Content: Generic, non-specific imagery

## Current Default Image

The current default image is a placeholder that:

- Has a neutral appearance
- Works with any theme/template
- Provides clear visual indication of missing content
- Maintains aspect ratio across different uses

## Removed APIs

The following properties have been **removed** and are now ignored:

### Image Component

- ❌ `placeholder` prop (was: `PropTypes.node`)

### SplitScreen Component

- ❌ `imagePlaceholder` prop (was: `PropTypes.string`)

### ImageGrid Component

- ❌ `item.placeholder` usage (was: passed to Image component)

## Breaking Changes

### None for typical usage

The removal of placeholder props is **non-breaking** because:

- Props are simply ignored if passed (extra props don't cause errors)
- Default behavior is better than old placeholder behavior
- All templates/configs work without changes

### Only affects custom code

If you have custom code that:

- Relied on showing custom placeholder content in Image component
- Used imagePlaceholder in SplitScreen for specific styling
- Expected placeholder character to appear

**Solution**: The Image component now always shows an image (default or provided). If you need custom placeholder behavior, wrap the Image component in your own logic.

## Testing

All image components have been tested to ensure:

- ✅ Default image shows when src is null/undefined/empty
- ✅ Provided src overrides default
- ✅ No console errors or warnings
- ✅ Proper alt text handling
- ✅ Correct styling and aspect ratios
- ✅ Works in all templates (businessPro, comicSplash, etc.)

## Future Enhancements

Potential improvements:

1. **Multiple default images** - Different defaults for different contexts (avatar vs photo vs icon)
2. **Lazy loading** - Load default image only when needed
3. **Image optimization** - Serve appropriate size based on usage
4. **Error states** - Show different image when URL fails to load vs. no URL provided

## Related Documentation

- [Component Architecture](./component-architecture.md)
- [UI Package Structure](./ui-package.md)
- [Asset Management](./asset-management.md)

## Changelog

### 2026-03-16

- ✨ Added default-image.png to app and UI packages
- ♻️ Refactored Image component to use default image
- ♻️ Refactored Avatar component to use default image
- ♻️ Refactored Card.Image to use default image
- 🗑️ Removed placeholder prop from Image component
- 🗑️ Removed imagePlaceholder from SplitScreen component
- 🗑️ Removed placeholder character usage (▓) throughout codebase
- 📝 Created comprehensive documentation

---

**Maintainer Notes:**

- Always use Image/Avatar components instead of raw img tags when user URLs are involved
- Keep both copies of default-image.png in sync when updating
- Test image fallback behavior when making changes to image components
