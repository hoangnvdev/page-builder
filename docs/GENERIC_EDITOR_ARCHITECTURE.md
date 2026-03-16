# Generic Component-Based Editor Architecture

## Overview

The editor has been refactored from template-specific to **primitive-component-based**. This makes it generic, consistent, and maintainable across all templates.

## Key Concepts

### 1. **Component Property Registry** (`utils/componentRegistry.js`)

Each primitive UI component has a standardized set of editable properties:

```javascript
COMPONENT_PROPERTIES = {
  title: {
    fields: [
      { id: 'text', label: 'Text', type: 'textarea' },
      { id: 'level', label: 'Heading Level', type: 'select', ... },
      { id: 'color', label: 'Color', type: 'color' },
      { id: 'align', label: 'Alignment', type: 'select', ... },
    ]
  },
  button: {
    fields: [
      { id: 'text', label: 'Button Text', type: 'text' },
      { id: 'variant', label: 'Variant', type: 'select', ... },
      { id: 'size', label: 'Size', type: 'select', ... },
      { id: 'backgroundColor', label: 'Background Color', type: 'color' },
      { id: 'color', label: 'Text Color', type: 'color' },
    ]
  },
  card: {
    fields: [
      { id: 'backgroundColor', label: 'Background Color', type: 'color' },
      { id: 'padding', label: 'Padding', type: 'text' },
      { id: 'hoverable', label: 'Hoverable Effect', type: 'toggle' },
    ]
  },
  // ... and more!
}
```

### 2. **Dynamic PropertyPanel**

The PropertyPanel now:

- Detects what component type is selected (e.g., "title", "button", "card")
- Looks up its properties in the registry
- Dynamically renders the appropriate form fields

**No more template-specific `editableFields` arrays!**

### 3. **Hierarchical Selection**

Users can now select:

- **Sections** (e.g., "hero", "testimonialCards")
- **Cards** (e.g., "testimonialCards.card-0")
- **Primitives** (e.g., "testimonialCards.card-0.title")

Each level shows its appropriate properties.

## Benefits

### ✅ **Consistency**

- A Button always has the same editable properties, regardless of template
- A Title always has the same options (text, level, color, align)

### ✅ **Maintainability**

- Add a new property to ALL buttons by updating one place in the registry
- No need to update every template's `editableFields` array

### ✅ **Scalability**

- Adding new templates is easier - components automatically get standard properties
- New primitive components just need an entry in the registry

### ✅ **User Experience**

- Users learn once: "Buttons always have these options"
- Predictable and intuitive editing experience

## Component Types Defined

### **Layout Components**

- `section` - Top-level containers
- `container` - Content width containers
- `flex` - Flexbox layouts
- `grid` - Grid layouts

### **Text Components**

- `title` - Headings (H1-H6)
- `subtitle` - Subtitles
- `text` - Body text/paragraphs

### **Interactive Components**

- `button` - Buttons
- `link` - Links

### **Media Components**

- `image` - Images
- `avatar` - User avatars

### **Container Components**

- `card` - Card containers
- `badge` - Status badges

### **Collection Components**

- `itemgrid` - Grid of items
- `testimonialcards` - Testimonial cards grid
- `timeline` - Timeline component

## How It Works

### Step 1: Component gets `data-element` attribute

```jsx
<Card data-element="testimonialCards.card-0">
  <Card.Title data-element="testimonialCards.card-0.title">
    Author Name
  </Card.Title>
</Card>
```

### Step 2: User clicks element

PreviewRenderer detects click, sets `selectedElement` or `selectedSubElement`

### Step 3: PropertyPanel looks up component type

```javascript
const componentProps = getComponentProperties("card"); // or 'title', 'button', etc.
```

### Step 4: Renders dynamic form fields

Based on the component's standard properties from the registry

### Step 5: Updates config

Changes are saved to: `elements.{elementId}.{fieldId}`

## Example: Editing a Button

1. User clicks button with `data-element="hero.button"`
2. System detects it's a **button** type
3. Shows fields:
   - Text
   - Variant (Primary/Secondary/Ghost/Danger)
   - Size (Small/Medium/Large)
   - Background Color
   - Text Color
4. Changes save to `elements.hero.button.{field}`

## Migration Notes

### Old System (Template-Specific):

```javascript
// In template config
editableFields: [
  { id: "elements.hero.buttonText", label: "Button Text", type: "text" },
  { id: "elements.hero.buttonColor", label: "Button Color", type: "color" },
  // ... repeated for every template
];
```

### New System (Generic):

```javascript
// In component registry (ONE place)
button: {
  fields: [
    { id: "text", label: "Button Text", type: "text" },
    { id: "backgroundColor", label: "Background Color", type: "color" },
    { id: "color", label: "Text Color", type: "color" },
    // ... applies to ALL buttons in ALL templates
  ];
}
```

## Next Steps

### For Template Creators:

1. Just add `data-element` attributes to your components
2. Use standard prop names that match the registry
3. Components automatically get editing capabilities

### For Adding New Primitives:

1. Add entry to `COMPONENT_PROPERTIES` in `componentRegistry.js`
2. Define its editable fields
3. That's it! Works everywhere automatically

### For Extending Existing Primitives:

1. Update the component's entry in the registry
2. All instances get the new field automatically

## Architecture Diagram

```
User Clicks Element
        ↓
PreviewRenderer detects click
        ↓
Sets selectedElement / selectedSubElement
        ↓
PropertyPanel reads selection
        ↓
getComponentProperties(elementId)
        ↓
Looks up in COMPONENT_PROPERTIES registry
        ↓
Renders dynamic form fields
        ↓
User edits field
        ↓
Updates config at: elements.{elementId}.{fieldId}
        ↓
Component re-renders with new values
```

## Summary

The new architecture is **primitive-based**, **generic**, and **consistent**. Instead of defining editable fields per template, we define them per component type. This makes the editor truly reusable and maintainable.
