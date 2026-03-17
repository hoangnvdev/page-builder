# RTL (Right-to-Left) Support Implementation

## 🎯 Overview

Bidirectional (BiDi) layout support has been added to the page-builder application. The system automatically detects RTL languages and applies appropriate text direction and layout mirroring.

## 📁 Files Created

### 1. RTL Utility Module

**`packages/app/src/utils/rtl.js`**

- `RTL_LANGUAGES` - Array of RTL language codes (ar, he, fa, ur)
- `isRTL(languageCode)` - Check if a language is RTL
- `getDirection(languageCode)` - Get 'rtl' or 'ltr' direction
- `applyDirection(languageCode)` - Apply direction to document

### 2. RTL Provider Component

**`packages/app/src/components/RTLProvider/index.jsx`**

- Listens to i18n language changes
- Automatically updates `dir` and `lang` attributes on `<html>`
- Wrapped around the entire app in `App.jsx`

### 3. Global RTL Styles

**`packages/app/src/main.jsx`**

- `[dir="rtl"]` selector for RTL-specific styles
- Mirrors flex directions, positioning, and layout
- Handles toolbar, dropdowns, and common UI elements

### 4. i18n Configuration

**`packages/app/src/i18n.js`**

- `LANGUAGE_CONFIG` - Metadata for all languages including RTL support
- Future-ready for Arabic, Hebrew, Persian, Urdu

## 🚀 How It Works

1. **Language Change** → User selects a language via LanguageSwitcher
2. **RTL Detection** → RTLProvider detects if language is RTL
3. **DOM Update** → `<html dir="rtl" lang="ar">` applied automatically
4. **CSS Activation** → `[dir="rtl"]` styles activate
5. **Layout Mirrors** → UI flips to RTL layout

## ✅ Current Status

**LTR Languages (Working):**

- ✅ English (`en`) - 🇺🇸
- ✅ Vietnamese (`vi`) - 🇻🇳

**RTL Languages (Ready to add):**

- ⏳ Arabic (`ar`) - 🇸🇦 (flag image available, needs translations)
- ⏳ Hebrew (`he`) - (needs flag and translations)

## 📝 Testing RTL Support

### Without RTL Language Translations

You can test RTL layout now by forcing direction in browser console:

```javascript
// Force RTL mode
document.documentElement.setAttribute("dir", "rtl");

// Back to LTR
document.documentElement.setAttribute("dir", "ltr");
```

### With Arabic Language (Future)

Once Arabic translations are added:

1. Add Arabic to LanguageSwitcher
2. Select Arabic from dropdown
3. Layout automatically mirrors to RTL

## 🎨 RTL Layout Changes

When RTL is active:

- Text flows from right to left
- Toolbar buttons flip (left becomes right)
- Dropdowns open from right edge
- Mobile toggle button moves to left side
- Flex containers reverse direction
- Margins and paddings mirror

## 🔧 Adding Component RTL Support

For custom components, use the `[dir="rtl"]` selector:

```scss
.my-component {
  padding-left: 1rem;
  text-align: left;

  [dir="rtl"] & {
    padding-left: 0;
    padding-right: 1rem;
    text-align: right;
  }
}
```

Or use CSS logical properties (recommended):

```scss
.my-component {
  padding-inline-start: 1rem; // Automatically mirrors in RTL
  text-align: start; // Left in LTR, right in RTL
}
```

## 📚 Resources

- [MDN: CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [RTL Styling Best Practices](https://rtlstyling.com/)
- [i18next RTL Guide](https://www.i18next.com/principles/rtl)

## 🎯 Next Steps

To fully enable RTL languages:

1. **Add Arabic translations** (ar-AR.js files for all 3 packages)
2. **Update LanguageSwitcher** with Arabic option
3. **Test RTL layout** across all pages
4. **Adjust component-specific RTL styles** if needed
5. **Consider other RTL languages** (Hebrew, Persian, Urdu)
