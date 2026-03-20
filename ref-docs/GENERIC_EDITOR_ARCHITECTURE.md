# Generic Component-Based Editor Architecture

**Last Updated**: March 20, 2026

## Overview

The editor uses a **generic, component-based architecture** where editable properties are defined by component type, not by template. This makes the editor consistent, maintainable, and scalable across all templates.

## Key Concepts

### 1. **Component Property Registry**

**Location**: `packages/app/src/utils/componentRegistry.js`

Each primitive UI component has a standardized set of editable properties:

```javascript
COMPONENT_PROPERTIES = {
  title: {
    fields: [
      { id: "text", label: "Text", type: "textarea" },
      {
        id: "level",
        label: "Heading Level",
        type: "select",
        options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      },
      { id: "color", label: "Color", type: "color" },
      {
        id: "align",
        label: "Alignment",
        type: "select",
        options: ["left", "center", "right"],
      },
      { id: "fontSize", label: "Font Size", type: "text" },
    ],
  },
  button: {
    fields: [
      { id: "text", label: "Button Text", type: "text" },
      {
        id: "variant",
        label: "Variant",
        type: "select",
        options: ["primary", "secondary", "outline"],
      },
      {
        id: "size",
        label: "Size",
        type: "select",
        options: ["small", "medium", "large"],
      },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "color", label: "Text Color", type: "color" },
      { id: "href", label: "Link URL", type: "text" },
    ],
  },
  card: {
    fields: [
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      { id: "borderRadius", label: "Border Radius", type: "text" },
      { id: "hoverable", label: "Hoverable Effect", type: "toggle" },
    ],
  },
  // ... 27+ component types defined
};
```

### 2. **Dynamic PropertyPanel**

**Location**: `packages/app/src/components/editor/PropertyPanel/`

The PropertyPanel dynamically renders form fields based on selected component:

- Detects what component type is selected (e.g., "title", "button", "card")
- Looks up properties in the registry
- Dynamically renders appropriate form fields
- Updates config on change

**No template-specific `editableFields` arrays needed!**

### 3. **Hierarchical Selection**

Users can select and edit at multiple levels:

- **Page Level**: Global settings (title, fonts, colors)
- **Section Level**: Section properties (backgroundColor, padding, alignment)
- **Element Level**: Individual component properties (text, color, size)

**Selection Pattern**: `elementId.propertyPath`

Examples:

- `hero` - Hero section
- `hero.title` - Hero title component
- `testimonials.items[0]` - First testimonial item
- `features.items[1].icon` - Icon of second feature

## Benefits

### ✅ **Consistency**

- A Button always has the same editable properties, regardless of template
- A Title always has the same options (text, level, color, align)
- Predictable editing experience across all templates

### ✅ **Maintainability**

- Add a new property to ALL buttons by updating one place in the registry
- No need to update every template's config schema
- Single source of truth for component properties

### ✅ **Scalability**

- Adding new templates is easier - components automatically get standard properties
- New primitive components just need an entry in the registry
- Templates focus on layout and content, not editor configuration

### ✅ **User Experience**

- Users learn once: "Buttons always have these options"
- Intuitive and predictable editing
- Direct manipulation: click what you want to edit

## Component Types Defined

### **Layout Components** (Container properties)

- `section` - Top-level page sections
- `container` - Content width containers
- `flex` - Flexbox layouts
- `grid` - Grid layouts

**Properties**: backgroundColor, padding, maxWidth, align, gap

### **Typography Components**

- `title` - Headings (H1-H6)
- `subtitle` - Secondary headings
- `text` - Body text/paragraphs

**Properties**: text, color, fontSize, fontWeight, align, level (for titles)

### **Interactive Components**

- `button` - Call-to-action buttons
- `link` - Text links

**Properties**: text, href, variant, size, backgroundColor, color

### **Media Components**

- `image` - Images
- `logo` - Logo images

**Properties**: src, alt, width, height

### **Display Components**

- `card` - Card containers
- `badge` - Status badges
- `icon` - Icons from Lucide React

**Properties**: varies by type (backgroundColor, padding, borderRadius, etc.)

### **Section Components** (Template-specific)

- `hero` - Hero sections
- `features` - Feature grids (uses ItemGrid)
- `testimonials` - Testimonial displays
- `footer` - Page footers
- `header` - Navigation headers
- `cta` - Call-to-action sections
- `stats` - Statistics counters
- `terminal` - Code/terminal display (Futuristic Tech)
- `comicPanels` - Comic panels (Comic Splash)
- `marquee` - Scrolling text (Comic Splash)

**Properties**: Section-specific properties + standard container properties

## How It Works

### Step 1: Component Rendering with Data Attributes

```jsx
<Card data-element="testimonials.items[0]" data-component-type="card">
  <Card.Title
    data-element="testimonials.items[0].title"
    data-component-type="title"
  >
    John Doe
  </Card.Title>
</Card>
```

### Step 2: User Clicks Element

**PreviewRenderer** detects click and extracts:

- `elementId` from `data-element` attribute
- `componentType` from `data-component-type` attribute

Sets `selectedElement` in Redux state

### Step 3: PropertyPanel Looks Up Component Type

```javascript
const componentProps = getComponentProperties(componentType);
// Returns field definitions for that component type
```

### Step 4: Renders Dynamic Form Fields

Based on component's standard properties from registry:

```jsx
{
  componentProps.fields.map((field) => (
    <FormField
      key={field.id}
      {...field}
      value={getNestedValue(currentConfig, elementPath, field.id)}
      onChange={(newValue) => updateField(elementPath, field.id, newValue)}
    />
  ));
}
```

### Step 5: Updates Configuration

Changes are saved to Redux and localStorage:

```javascript
dispatch(
  updateElementConfig({
    elementId: "hero",
    config: {
      ...existingConfig,
      title: { ...existingConfig.title, text: "New Title" },
    },
  }),
);
```

## Architecture Flow

```
User Clicks Element
       ↓
PreviewRenderer detects click
       ↓
Extract elementId + componentType from data attributes
       ↓
Update Redux: selectedElement
       ↓
PropertyPanel receives selectedElement
       ↓
Look up componentType in COMPONENT_PROPERTIES
       ↓
Render form fields dynamically
       ↓
User changes field value
       ↓
Update Redux: updateElementConfig
       ↓
Save to localStorage (debounced)
       ↓
Template re-renders with new config
```

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
