# Page Builder Documentation

## 📚 Documentation Index

### Architecture & Systems

- **[i18n Architecture](./i18n-architecture.md)** - Comprehensive guide to the internationalization system
  - Single shared i18n instance pattern
  - Package responsibilities
  - Language management
  - Translation namespaces
  - Best practices and common issues

- **[Default Image Usage](./default-image-usage.md)** - How default images work across all components
  - Default image implementation
  - Component usage patterns
  - Migration guide
  - API changes

### Coming Soon

- **Component Architecture** - How components are structured across packages
- **RTL Support** - Right-to-left layout implementation
- **State Management** - Redux store organization
- **Template System** - Creating and managing templates
- **Translation Guidelines** - Writing and maintaining translations

## 🏗️ Architecture Overview

```
page-builder/
├── packages/
│   ├── app/          # Main application (owns i18n instance)
│   ├── templates/    # Template definitions and components
│   └── ui/           # Primitive UI components
└── docs/             # This documentation
```

## 🔑 Key Principles

1. **Single Source of Truth**: App package owns the i18n instance
2. **Shared via Context**: All packages use React Context for i18n
3. **Clean Boundaries**: Each package has clear responsibilities
4. **No Duplication**: Translations live in their respective packages

## 🚀 Quick Start

### Using Translations in Components

```javascript
import { useTranslation } from "react-i18next";

export const MyComponent = () => {
  const { t } = useTranslation();

  return <div>{t("myKey")}</div>;
};
```

### Using Translations in Utilities

```javascript
import { useTranslation } from "react-i18next";
import { getLabel } from "./utils";

export const MyComponent = () => {
  const { i18n } = useTranslation();
  const label = getLabel(i18n, "fieldKey");

  return <div>{label}</div>;
};
```

## 📖 Documentation Standards

All documentation should include:

- Clear examples
- Visual diagrams where applicable
- Common pitfalls and solutions
- Related documentation links
- Changelog with dates

## 🤝 Contributing

When adding new features:

1. **Update relevant documentation**
2. **Add examples and diagrams**
3. **Document common issues**
4. **Update the changelog**

## 📞 Need Help?

- Check the specific documentation files for detailed guides
- Review code examples in the documentation
- Look for similar patterns in existing code

---

Last updated: 2026-03-16
