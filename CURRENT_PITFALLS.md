# Current Pitfalls and Known Limitations

This document outlines known issues, limitations, and planned improvements for the Page Builder project.

---

## Known Issues

### 1. Conditional Logic in Config Schema

**Current State**: The config schema supports only simple conditional logic (e.g., `field.showIf: { fieldKey: 'value' }`).

**Limitation**: Cannot handle complex AND/OR combinations or nested conditional groups.

**Impact**:

- Limited ability to create dynamic form fields based on multiple conditions
- Cannot implement patterns like "show field A if B equals X AND C equals Y"
- Workarounds require creating separate schema variations

**Planned Fix**:

- Add support for nested conditional groups with `and`/`or` operators
- Implement conditional group syntax: `showIf: { and: [{ field1: 'value1' }, { field2: 'value2' }] }`
- Add visual indicators in PropertyPanel for conditional fields

**Reference**: See [Property Panel Simplification](ref-docs/PROPERTY_PANEL_SIMPLIFICATION.md) for current UX patterns.

---

### 2. Config Mappers for Deeply Nested Structures

**Current State**: Prop mappers (`mapTextContentProps`, `mapButtonProps`, etc.) handle flat and single-level nested structures.

**Limitation**: Does not handle deeply nested array items or complex object hierarchies.

**Impact**:

- Difficult to create templates with multi-level nested data (e.g., accordion with nested tabs)
- Manual unwrapping required for complex structures
- Limited flexibility for advanced templates

**Example Problematic Structure**:

```javascript
{
  sections: [
    {
      tabs: [
        {
          panels: [{ content: { title: { text: "Nested Text" } } }],
        },
      ],
    },
  ];
}
```

**Planned Fix**:

- Extend mapper utilities to handle recursive unwrapping
- Add `mapNestedArrayProps` for multi-level arrays
- Create `deepUnwrap` utility for arbitrary nesting depth
- Document patterns for complex data structures

**Reference**: See [Generic Schema Architecture](ref-docs/GENERIC_SCHEMA_ARCHITECTURE.md) for mapper patterns.

---

### 3. Performance - Field Visibility Memoization

**Current State**: Field visibility calculation depends on entire `tempConfig` object for change detection.

**Limitation**: Large template configs cause re-renders of entire PropertyPanel even when only one field changes.

**Impact**:

- Noticeable lag when editing large templates (8+ sections, 50+ fields)
- Inefficient re-renders when changing unrelated fields
- Higher memory usage due to large dependency arrays

**Example**:

```javascript
// Current approach - depends on entire config
const visibleFields = useMemo(
  () => fields.filter((field) => evaluateCondition(field.showIf, tempConfig)),
  [fields, tempConfig], // Re-runs when ANY part of tempConfig changes
);
```

**Planned Fix**:

- Optimize memoization to track only relevant field dependencies
- Implement granular change detection per field
- Use `useRef` for unchanged portions of config
- Add debouncing for visibility calculations

**Potential Solution**:

```javascript
// Optimized approach - only depend on relevant fields
const visibleFields = useMemo(
  () =>
    fields.filter((field) => {
      const deps = extractDependencies(field.showIf); // e.g., ['variant', 'style']
      return evaluateCondition(field.showIf, pick(tempConfig, deps));
    }),
  [fields, ...relevantFieldKeys], // Only re-run when dependencies change
);
```

**Reference**: See [Performance Optimization](ref-docs/PERFORMANCE_OPTIMIZATION.md) for current optimizations.

---

### 4. Error Boundaries for Nested Components

**Current State**: Error boundaries wrap each template section but not individual nested components.

**Limitation**: Errors in deeply nested components (e.g., a Card inside Features inside a Section) may not be caught at the optimal level.

**Impact**:

- Entire section crashes instead of just the failing component
- Less granular error recovery
- Users lose more work when errors occur

**Example Scenario**:

- Features section has 6 feature cards
- One card has a malformed image URL causing a render error
- Currently: Entire Features section fails
- Ideal: Only that one card fails, others still render

**Planned Fix**:

- Enhance ErrorBoundary to support nested component protection
- Add `ErrorBoundary` at card/item level in array renderers
- Implement partial recovery strategies
- Add error logging to track nested failures

**Reference**: See [ErrorBoundary Architecture](ref-docs/ERROR_BOUNDARY_ARCHITECTURE.md) for current implementation.

---

### 5. Template Schema Versioning

**Current State**: No versioning system for template configs.

**Limitation**: Breaking changes to config structure require manual migration.

**Impact**:

- Old saved templates may break when config schema changes
- No automated migration path for users
- Risk of data loss when updating app

**Example**:

- User saves template with old schema (v1): `title: 'Text'`
- App updates to new schema (v2): `title: { text: 'Text', color: '#000' }`
- User's saved template fails to load or renders incorrectly

**Planned Fix**:

- Add version field to template configs: `schemaVersion: 2`
- Implement migration functions for each version
- Auto-migrate on load with fallback to defaults
- Warn users about incompatible versions

**Proposed Solution**:

```javascript
// Template config
export default {
  id: "business-pro-refactored",
  schemaVersion: 2,
  // ...
};

// Migration system
const migrations = {
  1: (config) => {
    // Migrate v1 → v2
    config.elements.hero.title = { text: config.elements.hero.title };
    return config;
  },
};
```

---

### 6. Limited Undo/Redo Context

**Current State**: Undo/redo tracks full config snapshots with 150-action buffer.

**Limitation**: Cannot undo/redo granular changes within deeply nested structures.

**Impact**:

- Undoing a single character change reverts entire config to previous state
- Cannot undo just one field in a multi-field update
- History can grow large with frequent small edits

**Example**:

- User updates hero title from "Welcome" to "Welcome to Our Site"
- User updates hero subtitle
- Undo reverts BOTH changes, not just subtitle

**Planned Fix**:

- Implement granular action tracking with field-level paths
- Add action types: `UPDATE_FIELD`, `UPDATE_SECTION`, `UPDATE_PAGE`
- Support selective undo/redo by action type
- Compress similar consecutive actions

---

### 7. Export System Limitations

**Current State**: HTML export uses `ReactDOMServer.renderToStaticMarkup()` and extracts CSS from `document.styleSheets`.

**Limitations**:

- Cannot export dynamic JavaScript functionality (though none exists currently)
- CSS extraction relies on stylesheets being loaded in browser
- No CSS minification or optimization
- No image optimization or inlining

**Impact**:

- Exported HTML may be larger than necessary
- External images may break if URLs change
- No dark mode or dynamic styles in export

**Planned Enhancements**:

- Add CSS minification before export
- Implement image optimization and base64 inlining for small images
- Add option to export with external CSS file
- Support multiple export formats (HTML + CSS, HTML only, PDF)

**Reference**: See [Export System](ref-docs/EXPORT_SYSTEM.md) for current implementation.

---

## Future Enhancements

### Short Term (1-2 weeks)

1. **Config Mappers Enhancement**
   - Add support for nested patterns in prop mappers
   - Create utility for recursive unwrapping
   - Document patterns for complex structures

2. **Conditional Logic Improvement**
   - Implement AND/OR operators for `showIf`
   - Add visual indicators for conditional fields in PropertyPanel
   - Add conditional validation rules

3. **Performance Optimization**
   - Optimize field visibility memoization granularity
   - Add debouncing for expensive calculations
   - Profile and optimize hot paths

4. **Better Error Messages**
   - Add user-friendly error messages
   - Implement error recovery suggestions
   - Add error reporting system

### Medium Term (1-2 months)

1. **Nested Conditional Groups**
   - Support complex boolean logic in config schema
   - Add conditional field groups
   - Implement conditional validation

2. **Template Schema Versioning**
   - Add version field to configs
   - Implement migration system
   - Add backward compatibility layer

3. **Enhanced Undo/Redo**
   - Granular action tracking
   - Field-level undo/redo
   - Action compression for better performance

4. **Advanced Property Panel Features**
   - Field help text and tooltips
   - Inline validation with real-time feedback
   - Keyboard shortcuts for common actions

### Long Term (3+ months)

1. **AI-Powered Features**
   - AI field value suggestions
   - Template generation from descriptions
   - Automatic accessibility improvements

2. **Bulk Edit Mode**
   - Edit multiple items in arrays simultaneously
   - Apply changes to multiple sections
   - Batch import/export of content

3. **Template Marketplace**
   - User-submitted templates
   - Template preview and rating system
   - Template categories and search

4. **Advanced Export Options**
   - Export to React components
   - Export to WordPress themes
   - Export to PDF with print styles
   - Export with external CSS files

5. **Collaboration Features**
   - Real-time multi-user editing
   - Comment and annotation system
   - Version control integration

---

## Workarounds for Current Issues

### Complex Conditional Logic

**Issue**: Need to show field based on multiple conditions.
**Workaround**: Use JavaScript in `propsMapper` to conditionally include fields or create separate template variants.

### Deeply Nested Data

**Issue**: Template needs multi-level nested arrays.
**Workaround**: Flatten structure where possible or create custom prop mapper for specific use case.

### Performance with Large Templates

**Issue**: PropertyPanel sluggish with 50+ fields.
**Workaround**:

- Split large sections into smaller ones
- Use `updateConfigLive` for text inputs (doesn't create history)
- Reduce number of conditional fields

### Error Recovery

**Issue**: Entire section crashes on component error.
**Workaround**: Wrap individual components with try-catch in development, fix underlying issues before deployment.

---

## Contributing

If you encounter additional issues or have ideas for improvements:

1. Check this document and [ref-docs/](ref-docs/) for existing documentation
2. Review [HOW_THIS_APP_WORKS.md](HOW_THIS_APP_WORKS.md) for architecture context
3. Open an issue with reproduction steps
4. Submit PRs with tests and documentation

---

## References

- [Architecture Overview](ref-docs/ARCHITECTURE.md)
- [Error Boundary System](ref-docs/ERROR_BOUNDARY_ARCHITECTURE.md)
- [Generic Schema Architecture](ref-docs/GENERIC_SCHEMA_ARCHITECTURE.md)
- [Performance Optimization](ref-docs/PERFORMANCE_OPTIMIZATION.md)
- [Property Panel Simplification](ref-docs/PROPERTY_PANEL_SIMPLIFICATION.md)
- [State Management](ref-docs/STATE_MANAGEMENT.md)
- [Export System](ref-docs/EXPORT_SYSTEM.md)
