# Core Template Refactoring Plan

## Overview

All 4 templates are now refactored using generic schema builders. This document outlines the necessary refactoring for related logic, functions, utils, helpers, and UI components to work optimally with these core templates.

## Current State

### ✅ Completed

1. **Templates (4 refactored versions):**
   - `comicSplash.refactored.config.js` - Playful comic-style with panels
   - `refinedClassic.refactored.config.js` - Elegant professional
   - `businessPro.refactored.config.js` - Modern business with advanced header
   - `futuristicTech.refactored.config.js` - Cyberpunk neon theme

2. **Generic Schema Builders:**
   - `sectionSchema()` - Container + layout + visual props
   - `cardSchema()` - Card styling with borders, shadows, padding
   - `buttonSchema()` - Button with text, url, styling
   - `headingContentSchema()` - Heading with typography
   - `textContentSchema()` - Text with typography
   - `titleContentSchema()` - Title with typography
   - `gridLayoutProps()` - Grid columns and gap
   - `mergeSchemas()` - Combine multiple schemas
   - `arrayField()` - Array items marker

3. **Config Mappers:**
   - `mapSectionProps()` - Section-level props
   - `mapHeadingProps()` - Heading text + color + size + weight
   - `mapTextContentProps()` - Text unwrapping
   - `mapButtonProps()` - Button props extraction
   - `mapCardProps()` - Card styling props
   - `mapCardContentProps()` - Card content typography
   - `unwrapArrayItems()` - Flatten nested array objects
   - `mapAlignToFlex()` - Alignment conversion

4. **Component Registry:**
   - All template components registered with propsMappers
   - Handles config transformation to component props

## Issues & Improvements Needed

### 1. **schemaProcessor.js (App Package)** 🔴 High Priority

**Current Issues:**

- `getSingularTemplateName()` hardcoded mappings may be incomplete
- `flattenSchema()` doesn't handle nested object fields (like `logo` with `type`/`text`/`url`)
- May not properly detect nested schemas from generic builders
- Array item selection with maxDepth=0 may hide important nested fields

**Required Changes:**

```javascript
// Update getSingularTemplateName to handle new array structures
const getSingularTemplateName = (arrayName) => {
  const singularMap = {
    panels: "card",
    items: "card",
    quotes: "card",
    images: "image",
    testimonials: "testimonial",
    features: "card",
    projects: "card",
    links: "link", // NEW: for header navigation
    commands: "command", // NEW: for terminal commands
    // Add more as needed
  };
  // ... rest
};

// Improve flattenSchema to handle nested objects without type
// Should detect when a nested object is a "group" vs a field definition
const flattenSchema = (schema, basePath, excludeTypes, maxDepth, parentKey) => {
  // Add special handling for known nested groups:
  // - logo (type/text/url/width/height)
  // - window (backgroundColor/padding/borderRadius/etc)
  // - link (text/href/color/size/weight)

  // If parent key is in knownNe stedGroups, recurse with proper grouping
  const knownNestedGroups = [
    "logo",
    "window",
    "link",
    "button",
    "heading",
    "title",
    "content",
  ];

  if (knownNestedGroups.includes(parentKey)) {
    // These should be flattened as a group
    processObject(value, fieldPath, currentDepth, key);
  }
};
```

### 2. **FormField Component (App Package)** 🟡 Medium Priority

**Current Issues:**

- Only handles flat field types
- Doesn't support nested object editing (e.g., can't edit `logo.type` dropdown then show `logo.text` or `logo.url` conditionally)
- No conditional field rendering based on other field values

**Required Changes:**

- Add support for nested object field groups
- Add conditional field rendering
- Consider adding field grouping/collapsing for better UX

**Example Enhancement:**

```jsx
// Add new field type: "group"
case "group":
  return (
    <Panel className="form-field__group">
      <Label>{translatedLabel}</Label>
      {Object.entries(value).map(([key, fieldDef]) => (
        <FormField
          key={key}
          id={`${id}.${key}`}
          {...fieldDef}
          value={value[key]}
          onChange={(newVal) => onChange({ ...value, [key]: newVal })}
        />
      ))}
    </Panel>
  );

// Add conditional rendering for related fields
// e.g., if logo.type === "image", show logo.url; if "text", show logo.text
```

### 3. **PropertyPanel Component (App Package)** 🟢 Low Priority

**Current State:** Working well but could be improved

**Potential Improvements:**

- Add field grouping/sections for better organization
- Add expand/collapse for nested groups
- Better labeling for array items (e.g., "Link 1", "Link 2" vs "Links 0", "Links 1")
- Add visual separators between field groups

### 4. **PreviewRenderer Component (App Package)** ✅ Good

**Current State:** Working correctly

- Event delegation for element selection
- Proper selected class management
- Background click to deselect

**No changes needed** - already well-structured

### 5. **configMappers.js (Templates Package)** 🟢 Low Priority

**Current State:** Working well with new schemas

**Potential Additions:**

- `mapLogoProps()` - Extract logo type/text/url/dimensions
- `mapLinkProps()` - Extract link text/href/styling
- `mapWindowProps()` - Extract window container styling

**Example:**

```javascript
export const mapLogoProps = (config) => ({
  logoType: config.logo?.type,
  logoText: config.logo?.text,
  logoUrl: config.logo?.url,
  logoWidth: config.logo?.width,
  logoHeight: config.logo?.height,
});

export const mapLinksArrayProps = (links, linkColor) =>
  links?.map((link) => ({
    text: link.text,
    href: link.href,
    color: link.color || linkColor,
    fontSize: link.size,
    fontWeight: link.weight,
  })) || [];
```

### 6. **Template-Specific Components** ✅ Good

**Current State:**

- Header: Enhanced with logo and links array ✅
- Terminal: Updated with window object ✅
- StatsCounter: Fixed alignment ✅
- ItemGrid: Uses mappers correctly ✅

**No major changes needed** - components follow patterns correctly

### 7. **Primitive UI Components (UI Package)** ✅ Good

**Recent Improvements:**

- All text primitives have overflow handling ✅
- Grid and Card components handle equal sizing ✅
- Image component works with logo system ✅

**No changes needed** - primitives are solid

## Implementation Priority

### Phase 1: Critical Fixes (Week 1)

1. ✅ Update `schemaProcessor.js`:
   - Fix `getSingularTemplateName()` for new arrays
   - Improve `flattenSchema()` nested object handling
   - Add better field grouping detection

2. ✅ Test all 4 templates thoroughly:
   - Verify PropertyPanel shows correct fields
   - Verify array item editing works
   - Verify nested fields are accessible

### Phase 2: FormField Enhancements (Week 2)

1. 🔄 Add conditional field rendering
2. 🔄 Add nested object field grouping
3. 🔄 Improve UX with collapsible groups
4. 🔄 Add field dependencies (show/hide based on other fields)

### Phase 3: Polish & Optimization (Week 3)

1. ⏳ Add more configMappers helpers
2. ⏳ Improve PropertyPanel field grouping
3. ⏳ Add better labeling for array items
4. ⏳ Performance optimization if needed

## Testing Checklist

For each template, verify:

- [ ] **Page Settings**: All page-level fields are editable
- [ ] **Section Selection**: Clicking section shows section-level props only
- [ ] **Nested Elements**: Clicking nested elements (like hero.title) shows correct fields
- [ ] **Array Items**: Clicking array items (panels.0, items.1) shows item fields
- [ ] **Deep Nesting**: Array item nested elements (items.0.title) work correctly
- [ ] **Field Types**: All field types render correctly (text, textarea, color, select, toggle, slider)
- [ ] **Nested Objects**: Logo, window, link nested objects are editable
- [ ] **Export**: Exported HTML matches preview exactly
- [ ] **Visual Selection**: Selected elements highlight correctly
- [ ] **Data Persistence**: Config updates persist correctly in state

## Template-Specific Notes

### comicSplash (F0)

- Has `panels` array with nested card structure
- Each panel has title/content/backgroundColor
- Test panel selection and nested field editing

### refinedClassic (F1)

- Has `testimonials` array with quote/author/role
- Has `portfolio` array with title/description/image
- No complex nested structures - simpler testing

### businessPro (F3)

- **NEW**: `logo` nested object (type/text/url/width/height)
- **NEW**: `links` array with text/href/color/size/weight per item
- Has `features` and `projects` arrays with cards
- Test logo type switching (text vs image)
- Test links array editing with styling

### futuristicTech (F2)

- **NEW**: `terminal.window` nested object (backgroundColor/padding/borderRadius/etc)
- **NEW**: `terminal.commands` array with prompt/response per item
- Has `stats` with nested title/card/items structure
- Test terminal window property editing
- Test command array with nested textContent schemas

## Documentation Updates Needed

1. Update `ARCHITECTURE.md` with:
   - Generic schema builder patterns
   - schemaProcessor behavior
   - Field type specifications

2. Create `SCHEMA_PATTERNS.md`:
   - Document all schema builder functions
   - Show examples of proper usage
   - Explain nested object handling

3. Update `COMPONENT_GUIDE.md`:
   - Document new Header capabilities
   - Document Terminal window object
   - Show how to add new array types

## Success Metrics

✅ **Functionality:**

- All 4 templates editable without errors
- All field types working correctly
- Nested structures accessible
- Export matches preview

✅ **Code Quality:**

- No hardcoded template-specific logic in app/
- All templates use shared utilities
- Clear separation of concerns
- Well-documented patterns

✅ **User Experience:**

- Intuitive property editing
- Clear field labeling
- Good visual feedback
- Fast performance

## Next Steps

1. Review this plan and prioritize changes
2. Create GitHub issues for each phase
3. Start with Phase 1 critical fixes
4. Test thoroughly after each change
5. Document learnings and update patterns

---

**Status:** Draft for Review
**Last Updated:** March 17, 2026
**Owner:** Development Team
