# i18n Architecture Documentation

## Overview

The page builder uses a **centralized i18n architecture** with a single shared i18next instance managed by the app package. All packages (app, templates, ui) share this instance through React Context, ensuring consistent translations and synchronized language changes across the entire application.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    App Package (@page-builder/app)      │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  src/i18n.js - Single i18n Instance             │   │
│  │                                                   │   │
│  │  import i18n from 'i18next'                      │   │
│  │  import { locales } from '@page-builder/ui'     │   │
│  │  import { locales } from '@page-builder/templates'│  │
│  │                                                   │   │
│  │  i18n.use(initReactI18next).init({              │   │
│  │    resources: {                                  │   │
│  │      en: { ...appEn, ...templatesEn, ui: uiEn } │   │
│  │      vi: { ...appVi, ...templatesVi, ui: uiVi } │   │
│  │      ja: { ...appJa, ...templatesJa, ui: uiJa } │   │
│  │      ar: { ...appAr, ...templatesAr, ui: uiAr } │   │
│  │    }                                             │   │
│  │  })                                              │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │  src/main.jsx - Root Provider                   │   │
│  │                                                   │   │
│  │  <I18nextProvider i18n={i18n}>                  │   │
│  │    <App />                                       │   │
│  │  </I18nextProvider>                             │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        ↓                                     ↓
┌──────────────────────┐        ┌──────────────────────┐
│  UI Package          │        │  Templates Package   │
│  (@page-builder/ui)  │        │  (@page-builder/     │
│                      │        │   templates)         │
│  ✅ Exports JSON     │        │  ✅ Exports JSON     │
│     locale files     │        │     locale files     │
│                      │        │                      │
│  ✅ Components use   │        │  ✅ Utils accept     │
│     useTranslation() │        │     i18n parameter   │
│     hook             │        │                      │
│                      │        │  ✅ Components use   │
│  ❌ NO local i18n    │        │     useTranslation() │
│     instance         │        │     hook             │
│                      │        │                      │
│                      │        │  ❌ NO local i18n    │
│                      │        │     instance         │
└──────────────────────┘        └──────────────────────┘
```

## Package Responsibilities

### 📦 App Package

**Owns:** Single i18n instance, language management, provider setup

**Files:**

- `src/i18n.js` - Initializes and configures i18next
- `src/main.jsx` - Wraps app with `I18nextProvider`
- `src/locales/*.json` - App-specific translations
- `src/components/LanguageSwitcher` - UI for changing language

**Responsibilities:**

1. Create and initialize the i18n instance
2. Import locale files from all packages
3. Merge translations into namespaced structure
4. Configure language detection (localStorage, cookie, query params)
5. Provide i18n to entire app via React Context
6. Manage language switching logic

### 📦 UI Package

**Owns:** Primitive component translations (placeholders, labels)

**Files:**

- `src/locales/*.json` - UI component translations (4 languages)
- `src/components/**/index.jsx` - Components using `useTranslation()`
- `src/index.js` - Exports locale files

**Responsibilities:**

1. Export locale JSON files (en-EN, vn-VN, ja-JP, ar-AR)
2. Components use `useTranslation()` hook for translations
3. Provide default placeholders with translation fallbacks
4. Allow placeholder overrides via props

**Example:**

```javascript
import { useTranslation } from "react-i18next";

export const Input = ({ placeholder, ...props }) => {
  const { t } = useTranslation();

  return (
    <input placeholder={placeholder || t("ui.input.placeholder")} {...props} />
  );
};
```

### 📦 Templates Package

**Owns:** Template-specific translations (field labels, options, defaults)

**Files:**

- `src/locales/*.json` - Template translations (4 languages)
- `src/helpers/translationHelpers.js` - Utility functions accepting i18n
- `src/index.js` - Exports locale files

**Responsibilities:**

1. Export locale JSON files (en-EN, vn-VN, ja-JP, ar-AR)
2. Provide translation utilities that accept i18n instance
3. Components use `useTranslation()` hook when needed
4. Maintain template metadata translations

**Example:**

```javascript
import { useTranslation } from "react-i18next";
import { getTranslatedFieldLabel } from "./helpers/translationHelpers";

export const MyComponent = ({ fieldKey }) => {
  const { i18n } = useTranslation();
  const label = getTranslatedFieldLabel(i18n, fieldKey);
  // ...
};
```

## Translation Key Namespaces

### App Namespace (Root)

```
editor.*
export.*
propertyPanel.*
formField.*
loading.*
preview.*
templateCard.*
templateGallery.*
routes.*
```

### Templates Namespace (Root)

```
fields.*
options.*
nav.*
templates.*
```

### UI Namespace (`ui.*`)

```
ui.input.placeholder
ui.textarea.placeholder
ui.select.placeholder
ui.colorPicker.placeholder
```

## Language Support

| Language   | Code | Direction | Status      |
| ---------- | ---- | --------- | ----------- |
| English    | en   | LTR       | ✅ Complete |
| Vietnamese | vi   | LTR       | ✅ Complete |
| Japanese   | ja   | LTR       | ✅ Complete |
| Arabic     | ar   | RTL       | ✅ Complete |

## Usage Patterns

### ✅ Correct: React Components

```javascript
import { useTranslation } from "react-i18next";

export const MyComponent = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t("someKey")}</h1>
      <p>Current language: {i18n.language}</p>
    </div>
  );
};
```

### ✅ Correct: Utility Functions

```javascript
// translationHelpers.js
export const getLabel = (i18n, key) => {
  return i18n.t(`fields.${key}`);
};

// Usage in component
import { useTranslation } from "react-i18next";
import { getLabel } from "../helpers/translationHelpers";

export const MyComponent = () => {
  const { i18n } = useTranslation();
  const label = getLabel(i18n, "myField");
  // ...
};
```

### ❌ Wrong: Creating Local i18n Instances

```javascript
// ❌ DON'T DO THIS
import i18n from "i18next";

i18n.init({
  /* ... */
});

export const getLabel = (key) => {
  return i18n.t(key); // Uses separate instance!
};
```

### ❌ Wrong: Importing i18n Directly

```javascript
// ❌ DON'T DO THIS
import i18n from "@/i18n";

export const getLabel = (key) => {
  return i18n.t(key); // Bypasses React Context!
};
```

## Language Change Flow

```
User clicks language button
         ↓
LanguageSwitcher calls i18n.changeLanguage('vi')
         ↓
i18next updates internal state
         ↓
React Context notifies all subscribers
         ↓
All components using useTranslation() re-render
         ↓
✅ UI components show new translations
✅ App components show new translations
✅ Template components show new translations
```

## Adding New Languages

1. **Create locale files in all packages:**

   ```
   packages/app/src/locales/[lang-LANG].json
   packages/ui/src/locales/[lang-LANG].json
   packages/templates/src/locales/[lang-LANG].json
   ```

2. **Export from UI and Templates packages:**

   ```javascript
   // packages/ui/src/index.js
   export { default as localesNewLang } from "./locales/new-LANG.json";

   // packages/templates/src/index.js
   export { default as localesNewLang } from "./locales/new-LANG.json";
   ```

3. **Import and merge in app i18n:**

   ```javascript
   // packages/app/src/i18n.js
   import { localesNewLang as uiNewLang } from "@page-builder/ui";
   import { localesNewLang as templatesNewLang } from "@page-builder/templates";
   import newLang from "./locales/new-LANG.json";

   const mergedNewLangTranslations = {
     ...newLang,
     ...templatesNewLang,
     ui: uiNewLang,
   };

   i18n.init({
     resources: {
       // ...
       newLang: {
         translation: mergedNewLangTranslations,
       },
     },
   });
   ```

4. **Add to LANGUAGE_CONFIG:**

   ```javascript
   export const LANGUAGE_CONFIG = {
     // ...
     newLang: { dir: "ltr", name: "New Language" },
   };
   ```

5. **Update LanguageSwitcher component**

## Best Practices

### ✅ DO

- Use `useTranslation()` hook in React components
- Pass i18n instance to utility functions as parameter
- Keep translations in JSON files
- Namespace translations by package/domain
- Use string concatenation over interpolation for reliability
- Test RTL layouts for RTL languages

### ❌ DON'T

- Create multiple i18n instances
- Import i18n directly outside React context
- Hardcode translatable strings
- Mix translation keys between namespaces
- Use complex interpolation patterns
- Forget to add translations for all supported languages

## Common Issues & Solutions

### Issue: Translations not updating on language change

**Cause:** Using a local i18n instance instead of context

**Solution:** Use `useTranslation()` hook:

```javascript
// ❌ Wrong
import i18n from "./i18n";
const text = i18n.t("key");

// ✅ Correct
const { t } = useTranslation();
const text = t("key");
```

### Issue: "Translation key not found" warnings

**Cause:** Key doesn't exist in locale file or wrong namespace

**Solution:** Check namespace and key path:

```javascript
// For UI components
t("ui.input.placeholder");

// For app translations
t("editor.toolbar.backButton");

// For template translations
t("fields.fontFamily");
```

### Issue: Utility function can't access translations

**Cause:** Function doesn't receive i18n instance

**Solution:** Pass i18n as parameter:

```javascript
// ❌ Wrong
export const getLabel = (key) => i18n.t(key);

// ✅ Correct
export const getLabel = (i18n, key) => i18n.t(key);

// Usage
const { i18n } = useTranslation();
const label = getLabel(i18n, "myKey");
```

## File Structure

```
packages/
├── app/
│   └── src/
│       ├── i18n.js                    # ✅ Single i18n instance
│       ├── main.jsx                   # ✅ Provides i18n via context
│       ├── locales/
│       │   ├── en-EN.json
│       │   ├── vn-VN.json
│       │   ├── ja-JP.json
│       │   └── ar-AR.json
│       └── components/
│           └── LanguageSwitcher/      # Language selection UI
│
├── ui/
│   └── src/
│       ├── index.js                   # Exports locale files
│       ├── locales/
│       │   ├── en-EN.json            # UI translations
│       │   ├── vn-VN.json
│       │   ├── ja-JP.json
│       │   └── ar-AR.json
│       └── components/
│           ├── Input/                 # Uses useTranslation()
│           ├── Textarea/
│           ├── Select/
│           └── ColorPicker/
│
└── templates/
    └── src/
        ├── index.js                   # Exports locale files
        ├── locales/
        │   ├── en-EN.json            # Template translations
        │   ├── vn-VN.json
        │   ├── ja-JP.json
        │   └── ar-AR.json
        ├── helpers/
        │   ├── componentHelpers.js   # Component helper functions
        │   └── translationHelpers.js  # Accepts i18n parameter
        └── utils/
            ├── fieldBuilders.js
            └── schemaBuilders.js
```

## Related Documentation

- [RTL Support](./rtl-support.md)
- [Component Structure](./component-architecture.md)
- [Translation Guidelines](./translation-guidelines.md)

## Changelog

### 2026-03-16

- ♻️ Refactored to single i18n instance architecture
- 🗑️ Removed unused `ui/src/i18n.js`
- 🗑️ Removed unused `templates/src/i18n.js`
- ✨ Updated translationHelpers to accept i18n parameter
- 📝 Created comprehensive documentation

---

**Maintainer Notes:**

- Always use the shared i18n instance via React Context
- Never create additional i18n instances in packages
- Keep translations in JSON files for easy management
- Test language switching thoroughly after changes
