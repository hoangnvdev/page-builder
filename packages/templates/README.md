# @page-builder/templates

A powerful, config-driven template system for the Page Builder application. Features dynamic rendering, component registry, and 18+ reusable template sections.

## Architecture

This package follows a **config-only architecture**:

- Templates are defined by data (config files), not hardcoded JSX
- A dynamic renderer interprets configs and instantiates components
- New templates can be added without changing core logic
- Components are registered in a central registry for lookup

## Templates

### Business Pro

Professional business landing page with modern design:

- Hero section with CTA
- Feature highlights
- Statistics counter
- Testimonial cards
- Call-to-action sections
- Professional footer

### Comic Splash

Creative, comic-style layout with unique visual flair:

- Comic panels layout
- Speech bubble testimonials
- Dynamic marquee effects
- Playful typography
- Engaging animations

### Futuristic Tech

Cutting-edge tech product showcase:

- Terminal-style code display
- Data stream visualizations
- Tech specs presentation
- Modern gradient effects
- Animated components

### Refined Classic

Timeless, elegant design for sophisticated brands:

- Classic typography
- Refined color palette
- Quote blocks
- Timeline presentations
- Elegant image grids

## Template Components

18+ reusable sections available:

- **Hero** - Hero sections with CTAs
- **Header** - Navigation headers
- **Footer** - Page footers with links
- **CallToAction** - CTA sections
- **ContentSection** - Text content blocks
- **ImageGrid** - Responsive image galleries
- **ItemGrid** - Product/service grids
- **ItemCard** - Individual cards
- **TestimonialCards** - Customer testimonials
- **SpeechBubbleTestimonials** - Comic-style testimonials
- **QuoteBlock** - Pull quotes
- **StatsCounter** - Animated statistics
- **Timeline** - Event timelines
- **TechSpecs** - Technical specifications
- **Terminal** - Code/terminal displays
- **DataStream** - Data visualizations
- **Marquee** - Scrolling content
- **ComicPanels** - Comic-style layouts
- **SplitScreen** - Side-by-side layouts

## Usage

```jsx
import {
  DynamicRenderer,
  businessProConfig,
  comicSplashConfig,
  futuristicTechConfig,
  refinedClassicConfig,
} from "@page-builder/templates";
import "@page-builder/templates/dist/style.css";

// Render a template using the dynamic renderer
function Page() {
  return <DynamicRenderer config={businessProConfig} />;
}

// Access individual components
import { Hero, Footer, CallToAction } from "@page-builder/templates";

function CustomPage() {
  return (
    <>
      <Hero {...heroProps} />
      <CallToAction {...ctaProps} />
      <Footer {...footerProps} />
    </>
  );
}
```

## Creating Custom Templates

```jsx
// 1. Create a config file
export default {
  name: "My Custom Template",
  theme: {
    colors: {
      primary: "#007bff",
      secondary: "#6c757d",
    },
  },
  sections: [
    {
      type: "Hero",
      props: {
        title: "Welcome",
        subtitle: "Build amazing pages",
        primaryCTA: { text: "Get Started", link: "/start" },
      },
    },
    {
      type: "ContentSection",
      props: {
        title: "Features",
        content: "...",
      },
    },
    // Add more sections...
  ],
};

// 2. Use with DynamicRenderer
import { DynamicRenderer } from "@page-builder/templates";
import myConfig from "./myConfig";

<DynamicRenderer config={myConfig} />;
```

## Development

```bash
# Build the package (optimized for production)
pnpm build

# Watch mode (for development)
pnpm dev
```

## Documentation

Detailed architecture docs available in `src/docs/`:

- `CONFIG_ONLY_ARCHITECTURE.md` - Config-driven design philosophy
- `DYNAMIC_RENDERER.md` - How the renderer works
- `TEMPLATE_COLLECTION.md` - Template catalog
- `QUICK_REFERENCE.md` - Quick API reference

## Build Optimizations

- **Modern targets**: ES2020+ output
- **Tree-shaking**: Enabled for minimal bundle size
- **External deps**: React, ReactDOM, and @page-builder/ui are externalized
- **ESM + CJS**: Supports both module systems
- **Minification**: esbuild for fast builds
