# User Guide: Generating a New Template

This guide walks you through creating a new template for the Page Builder application. The process involves defining a configuration, creating components (if needed), and registering your template.

---

## Prerequisites

- Understanding of React and JSX
- Familiarity with the Page Builder architecture (see [HOW_THIS_APP_WORKS.md](HOW_THIS_APP_WORKS.md))
- Knowledge of the component registry system

---

## Step 1: Plan Your Template

### Define Template Identity

Choose:

- **ID**: Unique identifier (e.g., `my-template-refactored`)
- **Name**: Display name (e.g., "My Template")
- **Description**: Brief description of the template's purpose
- **Icon**: Emoji or icon for the template gallery

### Plan Section Layout

Decide which sections your template will include and in what order.

**Available Sections**:

- `header` - Navigation header with logo and links
- `hero` - Hero section with title, subtitle, and CTA button
- `about` - Content section with title and paragraphs
- `features` - Grid of feature cards with icons
- `projects` - Project showcase grid
- `portfolio` - Portfolio image grid (Refined Classic)
- `terminal` - Terminal/code display (Futuristic Tech)
- `comicPanels` - Comic-style panels (Comic Splash)
- `marquee` - Scrolling text marquee (Comic Splash)
- `stats` - Statistics counter grid
- `testimonials` - Testimonial cards (two variants: cards or speech bubbles)
- `imageGrid` - Image gallery grid
- `cta` - Call-to-action section
- `footer` - Footer with text and links

**Example Layout**:

```javascript
layout: ["header", "hero", "features", "testimonials", "cta", "footer"];
```

### Choose Visual Style

Define:

- **Color palette**: Primary, secondary, accent colors
- **Typography**: Font families for headings and body text
- **Personality**: Professional, playful, elegant, futuristic, etc.

---

## Step 2: Create Template Configuration

Create a new file: `packages/templates/src/configs/myTemplate.config.js`

### Complete Configuration Example

```javascript
export default {
  // Metadata
  id: "my-template-refactored",
  name: "My Template",
  description: "A beautiful template for modern websites",
  icon: "🎨",

  // Section order
  layout: ["header", "hero", "features", "testimonials", "cta", "footer"],

  // Configuration schema (defines editable fields)
  configSchema: {
    // Page-level settings
    page: {
      title: {
        type: "text",
        label: "Page Title",
      },
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: [
          { value: "system-ui, -apple-system, sans-serif", label: "System UI" },
          { value: "'Inter', sans-serif", label: "Inter" },
          { value: "'Roboto', sans-serif", label: "Roboto" },
        ],
      },
      backgroundColor: {
        type: "color",
        label: "Background Color",
      },
      textColor: {
        type: "color",
        label: "Text Color",
      },
    },

    // Section-specific settings
    elements: {
      header: {
        backgroundColor: { type: "color" },
        logo: {
          text: { type: "text", label: "Logo Text" },
          src: { type: "text", label: "Logo Image URL" },
        },
        links: {
          type: "array",
          label: "Navigation Links",
          items: {
            text: { type: "text" },
            href: { type: "text" },
          },
        },
      },

      hero: {
        backgroundColor: { type: "color" },
        title: {
          text: { type: "text", label: "Hero Title" },
          color: { type: "color" },
          fontSize: { type: "text", label: "Font Size (e.g., 3rem)" },
        },
        subtitle: {
          text: { type: "text", label: "Hero Subtitle" },
          color: { type: "color" },
        },
        button: {
          text: { type: "text", label: "Button Text" },
          href: { type: "text", label: "Button Link" },
          variant: {
            type: "select",
            options: [
              { value: "primary", label: "Primary" },
              { value: "secondary", label: "Secondary" },
            ],
          },
        },
      },

      features: {
        backgroundColor: { type: "color" },
        heading: {
          text: { type: "text", label: "Section Heading" },
          color: { type: "color" },
        },
        items: {
          type: "array",
          label: "Feature Items",
          items: {
            icon: { type: "text", label: "Icon Name (lucide-react)" },
            title: { type: "text" },
            description: { type: "text" },
          },
        },
        columns: { type: "number", label: "Number of Columns" },
        gap: { type: "text", label: "Gap (e.g., 2rem)" },
      },

      testimonials: {
        backgroundColor: { type: "color" },
        heading: {
          text: { type: "text" },
          color: { type: "color" },
        },
        items: {
          type: "array",
          items: {
            text: { type: "text", label: "Testimonial Quote" },
            author: { type: "text", label: "Author Name" },
            role: { type: "text", label: "Author Role" },
          },
        },
      },

      cta: {
        backgroundColor: { type: "color" },
        title: {
          text: { type: "text" },
          color: { type: "color" },
        },
        subtitle: {
          text: { type: "text" },
          color: { type: "color" },
        },
        button: {
          text: { type: "text" },
          variant: {
            type: "select",
            options: [{ value: "primary", label: "Primary" }],
          },
        },
      },

      footer: {
        backgroundColor: { type: "color" },
        text: {
          content: { type: "text", label: "Footer Text" },
          color: { type: "color" },
        },
        links: {
          type: "array",
          items: {
            text: { type: "text" },
            href: { type: "text" },
          },
        },
      },
    },
  },

  // Default values
  defaultConfig: {
    page: {
      title: "My Awesome Website",
      fontFamily: "system-ui, -apple-system, sans-serif",
      backgroundColor: "#ffffff",
      textColor: "#000000",
    },

    elements: {
      header: {
        backgroundColor: "#1e40af",
        logo: {
          text: "MyBrand",
          src: "",
        },
        links: [
          { text: "Home", href: "#home" },
          { text: "Features", href: "#features" },
          { text: "Testimonials", href: "#testimonials" },
          { text: "Contact", href: "#contact" },
        ],
      },

      hero: {
        backgroundColor: "#1e40af",
        title: {
          text: "Welcome to My Template",
          color: "#ffffff",
          fontSize: "3.5rem",
        },
        subtitle: {
          text: "Build amazing websites without code",
          color: "#e0e0e0",
        },
        button: {
          text: "Get Started",
          href: "#features",
          variant: "primary",
        },
      },

      features: {
        backgroundColor: "#f3f4f6",
        heading: {
          text: "Amazing Features",
          color: "#1f2937",
        },
        items: [
          {
            icon: "Zap",
            title: "Lightning Fast",
            description: "Optimized for speed and performance",
          },
          {
            icon: "Shield",
            title: "Secure",
            description: "Built with security best practices",
          },
          {
            icon: "Heart",
            title: "User Friendly",
            description: "Intuitive and easy to use",
          },
        ],
        columns: 3,
        gap: "2rem",
      },

      testimonials: {
        backgroundColor: "#ffffff",
        heading: {
          text: "What Our Clients Say",
          color: "#1f2937",
        },
        items: [
          {
            text: "This page builder is amazing! It saved us so much time.",
            author: "Jane Doe",
            role: "CEO, Company Inc.",
          },
          {
            text: "Incredibly easy to use and the results are professional.",
            author: "John Smith",
            role: "Designer, Studio Co.",
          },
        ],
      },

      cta: {
        backgroundColor: "#1e40af",
        title: {
          text: "Ready to Get Started?",
          color: "#ffffff",
        },
        subtitle: {
          text: "Join thousands of satisfied users today",
          color: "#e0e0e0",
        },
        button: {
          text: "Sign Up Now",
          variant: "primary",
        },
      },

      footer: {
        backgroundColor: "#1f2937",
        text: {
          content: "© 2026 MyBrand. All rights reserved.",
          color: "#9ca3af",
        },
        links: [
          { text: "Privacy Policy", href: "/privacy" },
          { text: "Terms of Service", href: "/terms" },
        ],
      },
    },
  },
};
```

---

## Step 3: Register Your Template

### Import and Register

Edit `packages/templates/src/registries/templateRegistry.js`:

```javascript
import myTemplateConfig from "../configs/myTemplate.config";

// ... existing imports

// Register templates
registerTemplate({ ...businessProConfig });
registerTemplate({ ...comicSplashConfig });
registerTemplate({ ...futuristicTechConfig });
registerTemplate({ ...refinedClassicConfig });

// Add your new template
registerTemplate({ ...myTemplateConfig });
```

### Verify Registration

The `registerTemplate` function:

1. Validates the config structure
2. Adds the template to the template registry
3. Makes it available in the template gallery

---

## Step 4: Test Your Template

### Start Development Server

```bash
pnpm start
```

### Verify Template Appears

1. Navigate to `http://localhost:3000`
2. Check the template gallery
3. Your new template should appear with the icon and name you specified

### Test Customization

1. Select your template
2. Click on sections to edit them
3. Verify property panel shows correct fields
4. Test undo/redo functionality
5. Export to HTML and verify output

---

## Step 5: (Optional) Create Custom Components

If existing sections don't meet your needs, create custom components.

### Create Component Folder

```bash
mkdir packages/templates/src/sections/MyCustomSection
cd packages/templates/src/sections/MyCustomSection
touch index.jsx index.scss
```

### Define Component

`packages/templates/src/sections/MyCustomSection/index.jsx`:

```javascript
import PropTypes from "prop-types";
import "./index.scss";

export function MyCustomSection({ title, items, backgroundColor }) {
  return (
    <section className="my-custom-section" style={{ backgroundColor }}>
      <h2>{title}</h2>
      <div className="items">
        {items.map((item, index) => (
          <div key={index} className="item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

MyCustomSection.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  backgroundColor: PropTypes.string,
};

MyCustomSection.defaultProps = {
  title: "My Custom Section",
  items: [],
  backgroundColor: "#ffffff",
};
```

### Add Styles

`packages/templates/src/sections/MyCustomSection/index.scss`:

```scss
@use "../../variables" as *;

.my-custom-section {
  padding: 4rem 2rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .item {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h3 {
      margin-bottom: 0.5rem;
    }
  }
}
```

### Register Custom Component

Edit `packages/templates/src/registries/componentRegistry.js`:

```javascript
import { MyCustomSection } from "../sections/MyCustomSection";
import { mapSectionProps, unwrapArrayItems, unwrapText } from "../utils";

// ... existing imports

registry.set("myCustomSection", {
  component: MyCustomSection,
  propsMapper: (config) => ({
    title: unwrapText(config.title),
    items: unwrapArrayItems(config.items),
    ...mapSectionProps(config),
  }),
});
```

### Add to Template Layout

Update your template config:

```javascript
layout: ["header", "hero", "myCustomSection", "features", "cta", "footer"],

// ... in configSchema
elements: {
  // ... existing sections
  myCustomSection: {
    backgroundColor: { type: "color" },
    title: { type: "text" },
    items: {
      type: "array",
      items: {
        title: { type: "text" },
        description: { type: "text" },
      },
    },
  },
},

// ... in defaultConfig
elements: {
  // ... existing sections
  myCustomSection: {
    backgroundColor: "#f9fafb",
    title: "My Custom Section",
    items: [
      { title: "Item 1", description: "Description for item 1" },
      { title: "Item 2", description: "Description for item 2" },
    ],
  },
},
```

---

## Best Practices

### 1. Follow Naming Conventions

- **IDs**: kebab-case with `-refactored` suffix (e.g., `my-template-refactored`)
- **Component names**: PascalCase (e.g., `MyCustomSection`)
- **Config keys**: camelCase (e.g., `backgroundColor`, `fontSize`)

### 2. Provide Sensible Defaults

- All fields should have default values in `defaultConfig`
- Defaults should create a visually complete template
- Use realistic placeholder content

### 3. Use Existing Components

- Reuse existing sections whenever possible
- Only create custom components when absolutely necessary
- Leverage the component registry's prop mappers

### 4. Test Thoroughly

- Test all sections in isolation
- Verify property panel updates work correctly
- Test undo/redo for each field
- Export to HTML and validate output
- Test on different screen sizes

### 5. Document Your Template

Add comments in your config file:

```javascript
export default {
  id: "my-template-refactored",
  name: "My Template",
  description: "A professional template for corporate websites",

  // Optimized for business/corporate use cases
  // Color palette: Blue (#1e40af), Gray (#f3f4f6), White (#ffffff)
  // Typography: System UI fonts for maximum compatibility

  layout: [...],
  // ...
};
```

---

## Troubleshooting

### Template Doesn't Appear in Gallery

- Check `templateRegistry.js` - ensure `registerTemplate` is called
- Verify config file exports default object
- Check browser console for errors

### Property Panel Shows Wrong Fields

- Verify section keys match between `layout`, `configSchema`, and `defaultConfig`
- Check component registry has correct `propsMapper`
- Ensure prop types match expected structure

### Sections Don't Render

- Check component registry has mapping for section key
- Verify component is imported correctly
- Check browser console for errors
- Ensure default config has data for all sections in layout

### Export Fails

- Verify all sections render without errors
- Check for missing prop types
- Ensure no dynamic imports in template components
- Verify CSS is properly scoped with SCSS modules

---

## Next Steps

- Study existing templates in `packages/templates/src/configs/`
- Review component registry and prop mappers in `packages/templates/src/utils/`
- Explore error boundary system in `packages/ui/src/components/ErrorBoundary/`
- Read full architecture guide in [HOW_THIS_APP_WORKS.md](HOW_THIS_APP_WORKS.md)

---

## Additional Resources

- [Architecture Overview](ref-docs/ARCHITECTURE.md)
- [Template Collection](ref-docs/TEMPLATE_COLLECTION.md)
- [Component Registry Guide](ref-docs/DYNAMIC_RENDERER.md)
- [Generic Schema Builders](ref-docs/GENERIC_SCHEMA_ARCHITECTURE.md)
