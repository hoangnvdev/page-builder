# Property Panel Simplification

**Date**: March 19, 2026
**Type**: UX Improvement
**Breaking Changes**: None (backward compatible)

---

## OVERVIEW

Simplified the PropertyPanel UX by removing nested FieldGroup collapsible sections. Users now interact with child elements by clicking on them directly in the preview, rather than navigating through nested field groups in the PropertyPanel.

---

## RATIONALE

### Previous Approach ❌

**PropertyPanel showed:**

1. Basic container properties (ungrouped)
2. **Nested FieldGroups** for each sub-content type:
   - Logo Settings ▼ (collapsible)
   - Title Settings ▼ (collapsible)
   - Button Settings ▼ (collapsible)
   - Card Settings ▼ (collapsible)

**Problems:**

- Too many levels of nesting
- Required clicking multiple times to expand groups
- Redundant - users can already click child elements in preview
- Harder to discover what's editable
- More complex codebase

### New Approach ✅

**PropertyPanel shows:**

1. **Only basic container properties** for the selected element
2. Users click on child elements directly in the preview to edit them

**Benefits:**

- ✅ Simpler, cleaner UI
- ✅ Direct manipulation - click what you want to edit
- ✅ Less cognitive load
- ✅ Faster editing workflow
- ✅ Simpler codebase

---

## WHAT CHANGED

### 1. PropertyPanel Component

**File**: `packages/app/src/components/editor/PropertyPanel/index.jsx`

**Removed:**

- FieldGroup import
- `.filter((field) => !field.groupKey)` - no longer needed
- FieldGroup rendering logic (lines 398-454)
- Simplified empty state check

**Before:**

```jsx
{
  /* Render ungrouped fields first */
}
{
  elementFields.fields
    .filter((field) => !field.groupKey)
    .map((field) => <FormField {...field} />);
}

{
  /* Render field groups after */
}
{
  elementFields.groups?.map((group) => (
    <FieldGroup title={group.label} collapsible={group.collapsible}>
      {group.fields.map((field) => (
        <FormField {...field} />
      ))}
    </FieldGroup>
  ));
}
```

**After:**

```jsx
{
  /* Render all fields */
}
{
  elementFields.fields.map((field) => <FormField {...field} />);
}
```

### 2. Schema Processor

**File**: `packages/app/src/utils/schemaProcessor.js`

**Changed:**

- Line 345: `flattenSchemaWithGroups()` → `flattenSchema()`
- No longer returns `groups` array
- All fields returned flat in `fields` array

**Before:**

```javascript
const result = flattenSchemaWithGroups(
  sectionSchema,
  `elements.${sectionId}`,
  ["array"],
  1,
  sectionId,
  currentConfig,
);
return {
  ...result, // Contains { fields, groups }
  label: formatLabel(sectionId),
  basePath: `elements.${sectionId}`,
};
```

**After:**

```javascript
const fields = flattenSchema(
  sectionSchema,
  `elements.${sectionId}`,
  ["array"],
  1,
  sectionId,
  currentConfig,
);
return {
  fields,
  groups: [], // Always empty now
  label: formatLabel(sectionId),
  basePath: `elements.${sectionId}`,
};
```

### 3. FieldGroup Component

**Deleted:**

- `packages/app/src/components/form/FieldGroup/index.jsx`
- `packages/app/src/components/form/FieldGroup/index.scss`
- Entire `FieldGroup` folder

**Reason**: No longer needed - users click child elements directly

---

## USER WORKFLOW

### Example: Editing a Hero Section

**Old Workflow** (removed):

1. Click hero section in preview
2. PropertyPanel shows basic hero props
3. Scroll down to "Title Settings ▼" group
4. Click to expand group
5. Edit title properties
6. Collapse group
7. Scroll to "Button Settings ▼" group
8. Click to expand group
9. Edit button properties

**New Workflow** (current):

1. Click hero section in preview → Edit basic hero props
2. Click title element in preview → Edit title props
3. Click button element in preview → Edit button props

**Result**: 9 steps → 3 steps ✅

---

## EXAMPLE: WHAT YOU SEE NOW

### Selecting a Section (e.g., Hero)

**PropertyPanel shows:**

```
┌─ Edit Hero Section
│
├─ Visible [toggle]
├─ Padding Top [slider]
├─ Padding Bottom [slider]
├─ Background Color [color]
├─ Background Image [text]
├─ Border Top [slider]
├─ Border Bottom [slider]
└─ Border Color [color]
```

**To edit title**: Click title in preview
**To edit button**: Click button in preview
**To edit image**: Click image in preview

### Selecting a Child Element (e.g., Hero Title)

**PropertyPanel shows:**

```
┌─ Edit Hero Title
│
├─ Text [text]
├─ Font Size [slider]
├─ Font Weight [select]
├─ Color [color]
├─ Text Align [select]
└─ Line Height [slider]
```

---

## TECHNICAL DETAILS

### Schema Structure (Unchanged)

Configs still define nested properties the same way:

```javascript
hero: {
  // Basic props (shown when hero selected)
  visible: toggle("visible"),
  paddingTop: slider("paddingTop", 0, 200),
  backgroundColor: color("backgroundColor"),

  // Nested content (edit by clicking in preview)
  title: titleContentSchema("title"),
  button: buttonSchema(),
  image: imagePropsComplete(),
}
```

### What Happens Behind the Scenes

1. **Section selected** (e.g., "hero"):
   - `flattenSchema()` extracts only direct fields
   - `maxDepth: 1` prevents deep recursion
   - Nested objects like `title`, `button` ignored at this level

2. **Child element clicked** (e.g., "hero.title"):
   - Element selection system captures the path
   - `getFieldsForElement()` navigates to that schema node
   - `flattenSchema()` extracts fields from that specific node
   - PropertyPanel updates to show title fields

### Benefits for Developers

- ✅ **Less code**: Removed ~60 lines from PropertyPanel
- ✅ **Simpler logic**: No groupKey filtering, no nested rendering
- ✅ **Easier debugging**: Flat field array, no group tracking
- ✅ **Faster rendering**: Less component nesting
- ✅ **Better maintainability**: One rendering path, not two

---

## BACKWARD COMPATIBILITY

### ✅ No Breaking Changes

- **Configs**: No changes needed - same schema structure works
- **Templates**: All existing templates work without modification
- **Components**: All section components unchanged
- **State**: Config state structure unchanged
- **Export**: HTML export unchanged

### What's Preserved

- ✅ Element selection by clicking preview
- ✅ Array item editing (click items in list)
- ✅ Nested property editing (click nested elements)
- ✅ All form field types
- ✅ All schema builders
- ✅ Dynamic sliders
- ✅ Conditional visibility
- ✅ History (undo/redo)

---

## MIGRATION

### For Existing Projects

**No action required!** Everything works the same, just simpler UI.

### For Custom Components

If you have custom components that relied on FieldGroup:

**Before:**

```jsx
import { FieldGroup } from "@/components/form/FieldGroup";

<FieldGroup title="Settings">
  <FormField {...field1} />
  <FormField {...field2} />
</FieldGroup>;
```

**After:**

```jsx
// Just render fields directly
<FormField {...field1} />
<FormField {...field2} />
```

**Or** make elements clickable:

```jsx
// Make title clickable in component
<div className="editable-title" data-element-id={`${section.id}.title`}>
  <Title {...titleProps} />
</div>
```

---

## TESTING

### What to Test

- [ ] Selecting sections shows basic properties only
- [ ] Clicking child elements in preview switches PropertyPanel
- [ ] Nested elements (title, button, etc.) are clickable
- [ ] Array items are clickable and editable
- [ ] No console errors
- [ ] PropertyPanel renders quickly
- [ ] All form fields work correctly
- [ ] Undo/redo works
- [ ] Export HTML works

### Test Cases

**Test 1**: Edit Hero Section

1. Click hero section → See basic props (padding, background, etc.)
2. Click hero title → See title props (text, size, color, etc.)
3. Click hero button → See button props (text, url, colors, etc.)

**Test 2**: Edit Features Grid

1. Click features section → See grid props (columns, gap, etc.)
2. Click first feature card → See card props (icon, title, description)
3. Click card title → See title props

**Test 3**: Edit Array Items

1. Click header section → See header props
2. Click first navigation link → See link props (text, url, color)
3. Click second navigation link → See different link's props

---

## RELATED FILES

### Modified

- ✅ `packages/app/src/components/editor/PropertyPanel/index.jsx`
- ✅ `packages/app/src/utils/schemaProcessor.js`

### Deleted

- ❌ `packages/app/src/components/form/FieldGroup/index.jsx`
- ❌ `packages/app/src/components/form/FieldGroup/index.scss`

### Updated Documentation

- ✅ `PROPERTY_PANEL_SIMPLIFICATION.md` (this file)
- ✅ `CONFIG_SCHEMA_GUIDE.md` - Removed FieldGroup examples
- ✅ `MIGRATION_GUIDE.md` - Updated PropertyPanel description

### Deprecated Documentation

- ⚠️ `PHASE_2_SUMMARY.md` - Contains old FieldGroup implementation details (historical reference only)

---

## SUMMARY

**What Changed**: Removed nested FieldGroup collapsibles from PropertyPanel

**Why**: Users can already click child elements directly - no need for nested groups

**Impact**: Simpler, faster, cleaner UX with less code

**Breaking Changes**: None - fully backward compatible

**Action Required**: None - works automatically

---

**Happy editing! 🚀**
