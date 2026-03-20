# Template Config Reference Guide

This document describes the generic, reusable patterns used in template configurations. Use this as a reference when creating new template configs.

## Config Structure

Every template config should have these three main parts:

```javascript
export default {
  id: "unique-template-id",
  name: "Template Display Name",
  description: "Brief description",
  icon: "🎨",

  layout: ["section1", "section2", ...],
  configSchema: { /* nested structure */ },
  defaultConfig: { /* nested default values */ }
};
```

### 1. Layout Array

Lists the section IDs in order of appearance:

```javascript
layout: ["hero", "features", "testimonials", "cta", "footer"];
```

### 2. Config Schema

Defines the structure and field types. **No editableFields array needed** - the schema IS the source of truth.

### 3. Default Config

Contains actual default values matching the schema structure.

---

## Generic Field Types

### Text Fields

```javascript
// Schema
fieldName: {
  type: "text";
}

// Default
fieldName: "Default text value";
```

### Textarea Fields

```javascript
// Schema
fieldName: {
  type: "textarea";
}

// Default
fieldName: "Longer text content...";
```

### Color Fields

```javascript
// Schema
fieldName: {
  type: "color";
}

// Default
fieldName: "#FF6B9D";
```

### Select Fields

```javascript
// Schema
fieldName: {
  type: "select",
  options: [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" }
  ]
}

// Default
fieldName: "medium"
```

### Slider Fields

```javascript
// Schema
fieldName: {
  type: "slider",
  min: 0,
  max: 3,
  step: 1,
  labels: ["None", "Light", "Medium", "Strong"]
}

// Default
fieldName: 1
```

### Toggle Fields

```javascript
// Schema
fieldName: {
  type: "toggle";
}

// Default
fieldName: true;
```

---

## Reusable Patterns

### 1. Page-Level Settings

```javascript
configSchema: {
  page: {
    fontFamily: {
      type: "select",
      options: [
        { value: "system-ui, sans-serif", label: "System" },
        // ... more fonts
      ]
    },
    backgroundColor: { type: "color" },
    textColor: { type: "color" }
  },
  elements: { /* sections here */ }
}

defaultConfig: {
  page: {
    fontFamily: "system-ui, sans-serif",
    backgroundColor: "#ffffff",
    textColor: "#000000"
  },
  elements: { /* section defaults */ }
}
```

### 2. Section-Level Fields (Standard Pattern)

Every section typically has these base fields:

```javascript
sectionName: {
  backgroundColor: { type: "color" },
  padding: {
    type: "select",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" }
    ]
  },
  maxWidth: {
    type: "select",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" }
    ]
  },
  align: {
    type: "select",
    options: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" }
    ]
  },
  // ... section-specific fields
}
```

**Defaults:**

```javascript
sectionName: {
  backgroundColor: "#ffffff",
  padding: "medium",
  maxWidth: "medium",
  align: "center",
  // ... section-specific defaults
}
```

### 3. Text Content Pattern (Title/Subtitle/Paragraph)

```javascript
title: {
  text: { type: "text" },
  fontSize: {
    type: "select",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" }
    ]
  },
  fontWeight: {
    type: "select",
    options: [
      { value: "thin", label: "Thin" },
      { value: "normal", label: "Normal" },
      { value: "bold", label: "Bold" }
    ]
  },
  textColor: { type: "color" },
  textAlign: {
    type: "select",
    options: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" }
    ]
  }
}
```

**Defaults:**

```javascript
title: {
  text: "Default Title",
  fontSize: "large",
  fontWeight: "bold",
  textColor: "#000000",
  textAlign: "center"
}
```

### 4. Button Pattern

```javascript
button: {
  text: { type: "text" },
  url: { type: "text" },  // Optional - for CTA buttons
  fontSize: {
    type: "select",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" }
    ]
  },
  fontWeight: {
    type: "select",
    options: [
      { value: "thin", label: "Thin" },
      { value: "normal", label: "Normal" },
      { value: "bold", label: "Bold" }
    ]
  },
  fontColor: { type: "color" },
  backgroundColor: { type: "color" },
  borderRadius: {
    type: "slider",
    min: 0,
    max: 3,
    step: 1,
    labels: ["Flat", "Less Rounded", "Rounded", "More Rounded"]
  }
}
```

**Defaults:**

```javascript
button: {
  text: "Click Me",
  fontSize: "medium",
  fontWeight: "bold",
  fontColor: "#ffffff",
  backgroundColor: "#FF6B9D",
  borderRadius: 1
}
```

### 5. Card-Based Section Pattern

For sections with multiple cards (features, testimonials, stats, etc.):

```javascript
sectionName: {
  // Standard section fields
  backgroundColor: { type: "color" },
  padding: { type: "select", options: [...] },
  maxWidth: { type: "select", options: [...] },
  align: { type: "select", options: [...] },

  // Grid layout
  columns: {
    type: "slider",
    min: 1,
    max: 4,
    step: 1
  },
  gap: {
    type: "select",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" }
    ]
  },
  numberOfCards: {
    type: "slider",
    min: 1,
    max: 6,
    step: 1
  },

  // Card template
  card: {
    // Container styling
    shape: {  // Optional - for fun designs
      type: "select",
      options: [
        { value: "square", label: "Square" },
        { value: "circle", label: "Circle" },
        { value: "cloud", label: "Cloud (Fun)" }
      ]
    },
    borderRadius: {
      type: "slider",
      min: 0,
      max: 3,
      step: 1,
      labels: ["Flat", "Less Rounded", "Rounded", "More Rounded"]
    },
    backgroundColor: { type: "color" },
    padding: { type: "select", options: [...] },
    rotate: {
      type: "slider",
      min: -20,
      max: 20,
      step: 10,
      labels: ["Tilt Left", "Balance", "Tilt Right"]
    },
    dropShadow: {
      type: "select",
      options: [
        { value: "none", label: "No Shadow" },
        { value: "light", label: "Light Shadow" },
        { value: "thick", label: "Thick Shadow" }
      ]
    },

    // Card content (customize per section type)
    title: { /* text pattern */ },
    content: { /* text pattern */ },
    button: { /* button pattern */ }
  },

  // Array of items
  items: { type: "array" }  // Or panels, quotes, images, etc.
}
```

**Defaults for Card Section:**

```javascript
sectionName: {
  backgroundColor: "#f5f5f5",
  padding: "large",
  maxWidth: "large",
  align: "center",
  columns: 3,
  gap: "medium",
  numberOfCards: 3,

  card: {
    borderRadius: 1,
    backgroundColor: "#ffffff",
    padding: "medium",
    rotate: 0,
    dropShadow: "light",

    title: {
      text: "Card Title",
      fontSize: "medium",
      fontWeight: "bold",
      textColor: "#000000",
      textAlign: "center"
    },
    content: {
      text: "Card content...",
      fontSize: "medium",
      textColor: "#666666",
      textAlign: "left"
    }
  },

  items: [
    { /* item 1 data */ },
    { /* item 2 data */ },
    { /* item 3 data */ }
  ]
}
```

### 6. Icon/Avatar Pattern

```javascript
icon: {  // or avatar
  text: { type: "text" },  // Emoji or text character
  size: {
    type: "select",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" }
    ]
  },
  backgroundColor: { type: "color" }  // Optional background
}
```

**Defaults:**

```javascript
icon: {
  text: "✨",
  size: "medium",
  backgroundColor: "#f5f5f5"
}
```

### 7. Image Pattern

```javascript
image: {
  url: { type: "text" },
  alt: { type: "text" },
  fit: {
    type: "select",
    options: [
      { value: "cover", label: "Cover (Fill)" },
      { value: "contain", label: "Contain (Fit)" },
      { value: "fill", label: "Fill (Stretch)" }
    ]
  },
  aspectRatio: {
    type: "select",
    options: [
      { value: "square", label: "Square (1:1)" },
      { value: "landscape", label: "Landscape (16:9)" },
      { value: "portrait", label: "Portrait (4:5)" },
      { value: "auto", label: "Auto" }
    ]
  }
}
```

**Defaults:**

```javascript
image: {
  url: "https://picsum.photos/400/300",
  alt: "Image description",
  fit: "cover",
  aspectRatio: "landscape"
}
```

---

## Special Effects

### Glow Effect (for Stats/Numbers)

```javascript
glowEffect: {
  type: "select",
  options: [
    { value: "none", label: "No Glow" },
    { value: "light", label: "Light Glow" },
    { value: "strong", label: "Strong Glow" }
  ]
}
```

### Hover Effect (for Images/Cards)

```javascript
hoverEffect: {
  type: "select",
  options: [
    { value: "none", label: "None" },
    { value: "zoom", label: "Zoom In" },
    { value: "lift", label: "Lift Up" }
  ]
}
```

### Animation Speed (for Marquees)

```javascript
speed: {
  type: "select",
  options: [
    { value: "slow", label: "Slow" },
    { value: "medium", label: "Medium" },
    { value: "fast", label: "Fast" }
  ]
}
```

---

## Size Value Standards

### Use User-Friendly Labels (NOT Technical Terms!)

❌ **Don't use:** H1, H2, H3, px values, rem, technical terms
✅ **Do use:** Small, Medium, Large, Normal

### Standard Size Options

**For Text/Titles:**

- `small`, `medium`, `large`

**For Padding/Spacing:**

- `small`, `medium`, `large`

**For Max Width:**

- `small`, `medium`, `large`

**For Height:**

- `short`, `normal`, `tall`

**For Font Weight:**

- `thin`, `normal`, `bold`

**For Font Decoration:**

- `normal`, `underlined`, `italic`

**For Alignment:**

- `left`, `center`, `right`

**For Border Radius (with slider):**

- `0` = "Flat"
- `1` = "Less Rounded"
- `2` = "Rounded"
- `3` = "More Rounded"

---

## Section Type Examples

### 1. Hero Section (Simple)

```javascript
hero: {
  backgroundColor: { type: "color" },
  padding: { type: "select", options: [...] },
  maxWidth: { type: "select", options: [...] },
  align: { type: "select", options: [...] },

  title: { text, fontSize, fontWeight, textColor },
  subtitle: { text, fontSize, textColor },
  button: { text, fontSize, color, textColor }
}
```

### 2. Marquee Section (Animation)

```javascript
marquee: {
  text: { type: "text" },
  backgroundColor: { type: "color" },
  textColor: { type: "color" },
  padding: { type: "select", options: [...] },
  speed: {
    type: "select",
    options: [
      { value: "slow", label: "Slow" },
      { value: "medium", label: "Medium" },
      { value: "fast", label: "Fast" }
    ]
  }
}
```

### 3. Features Section (Cards with Icons)

```javascript
features: {
  // Section-level fields
  backgroundColor, padding, maxWidth, align,
  columns, gap, numberOfCards,

  // Card template
  card: {
    // Container
    borderRadius, backgroundColor, padding, rotate, dropShadow,

    // Icon
    icon: { text, size },
    iconColor: { type: "color" },

    // Content
    title: { text, fontSize, fontWeight, textColor, textAlign },
    content: { text, maxWidth, height, padding, textAlign },
    button: { /* optional */ }
  },

  // Items array
  items: []
}
```

### 4. Stats Section (Cards with Glow)

```javascript
stats: {
  // Section-level fields
  backgroundColor, padding, maxWidth, align,
  columns, gap, numberOfCards,

  // Card template
  card: {
    // Container
    borderRadius, backgroundColor, padding, rotate, dropShadow,

    // Value (displayed as title)
    title: {
      text, fontSize, fontWeight, textColor, textAlign,
      glowEffect: {
        type: "select",
        options: [
          { value: "none", label: "No Glow" },
          { value: "light", label: "Light Glow" },
          { value: "strong", label: "Strong Glow" }
        ]
      }
    },

    // Label (displayed as content)
    content: { text, fontSize, textColor, textAlign }
  },

  items: []
}
```

### 5. Testimonials Section (Cards with Shapes)

```javascript
testimonials: {
  // Section-level fields
  backgroundColor, padding, maxWidth, align,
  columns, gap, numberOfCards,

  // Card template
  card: {
    // Container
    shape: {
      type: "select",
      options: [
        { value: "square", label: "Square" },
        { value: "circle", label: "Circle" },
        { value: "cloud", label: "Cloud (Fun)" }
      ]
    },
    borderRadius, backgroundColor, padding, rotate, dropShadow,

    // Avatar
    avatar: { text, size, backgroundColor },

    // Quote
    content: { text, fontSize, textColor, textAlign },

    // Author
    author: { text, fontSize, fontWeight, textColor, textAlign }
  },

  quotes: []
}
```

### 6. Image Grid Section (Cards with Hover)

```javascript
imageGrid: {
  // Section-level fields
  backgroundColor, padding, maxWidth, align,
  columns, gap, numberOfCards,

  // Card template
  card: {
    // Container
    shape, borderRadius, backgroundColor, padding, rotate, dropShadow,
    hoverEffect: {
      type: "select",
      options: [
        { value: "none", label: "None" },
        { value: "zoom", label: "Zoom In" },
        { value: "lift", label: "Lift Up" }
      ]
    },

    // Image
    image: { url, alt, fit, aspectRatio },

    // Optional caption
    caption: { text, fontSize, textColor, textAlign, backgroundColor }
  },

  images: []
}
```

### 7. CTA Section (Call to Action)

```javascript
cta: {
  backgroundColor, padding, maxWidth, align,

  title: { text, fontSize, fontWeight, textColor },
  subtitle: { text, fontSize, textColor },
  button: {
    text,
    url: { type: "text" },  // Important: CTA buttons need URLs!
    fontSize, fontWeight, color, textColor, borderRadius
  }
}
```

### 8. Footer Section (Minimal)

```javascript
footer: {
  text: { type: "text" },
  textColor: { type: "color" },
  fontSize: {
    type: "select",
    options: [
      { value: "small", label: "Small" },
      { value: "normal", label: "Normal" },
      { value: "large", label: "Large" }
    ]
  },
  fontWeight: { type: "select", options: [...] },
  fontDecoration: {
    type: "select",
    options: [
      { value: "normal", label: "Normal" },
      { value: "underlined", label: "Underlined" },
      { value: "italic", label: "Italic" }
    ]
  },
  padding: { type: "select", options: [...] },
  height: {
    type: "select",
    options: [
      { value: "short", label: "Short" },
      { value: "normal", label: "Normal" },
      { value: "tall", label: "Tall" }
    ]
  },
  backgroundColor: { type: "color" },
  align: { type: "select", options: [...] }
}
```

---

## Quick Start: Creating a New Template

1. **Copy the structure:**
   - Start with `layout`, `configSchema`, and `defaultConfig`
   - NO `editableFields` array needed!

2. **Choose section types:**
   - Use patterns from this guide (hero, features, stats, etc.)

3. **Customize field labels:**
   - Keep labels user-friendly and non-technical
   - Use consistent size values (small/medium/large)

4. **Add special features:**
   - Glow effects for stats
   - Hover effects for images
   - Animation speeds for marquees
   - Shape options for fun designs

5. **Define default values:**
   - Match schema structure exactly
   - Use realistic defaults
   - For card sections, define `items` array with sample data

---

## Key Principles

1. **No Technical Jargon:** Users don't understand "H1" or "16px" - use "Small", "Medium", "Large"
2. **Consistent Patterns:** Reuse the same patterns across different sections
3. **Schema is Source of Truth:** Don't duplicate in editableFields array
4. **Nested Structure:** Keep related fields together (card.title, card.content, card.button)
5. **User-Friendly Options:** Provide descriptive labels for all select options
6. **Sensible Defaults:** Start with good-looking defaults that users can customize

---

## Example: Minimal Template Config

```javascript
export default {
  id: "simple-landing",
  name: "Simple Landing Page",
  description: "A clean, simple landing page template",
  icon: "📄",

  layout: ["hero", "features", "cta", "footer"],

  configSchema: {
    page: {
      fontFamily: {
        type: "select",
        options: [{ value: "system-ui, sans-serif", label: "System" }],
      },
      backgroundColor: { type: "color" },
      textColor: { type: "color" },
    },
    elements: {
      hero: {
        backgroundColor: { type: "color" },
        padding: {
          type: "select",
          options: [
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ],
        },
        title: {
          text: { type: "text" },
          fontSize: {
            type: "select",
            options: [
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ],
          },
          textColor: { type: "color" },
        },
      },
      // ... more sections
    },
  },

  defaultConfig: {
    page: {
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#ffffff",
      textColor: "#000000",
    },
    elements: {
      hero: {
        backgroundColor: "#f5f5f5",
        padding: "large",
        title: {
          text: "Welcome",
          fontSize: "large",
          textColor: "#000000",
        },
      },
      // ... more sections
    },
  },
};
```
