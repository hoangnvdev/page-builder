# @page-builder/templates

Template library for the Page Builder application.

## Templates

### Modern Portfolio

Clean and professional portfolio layout with:

- Gradient hero section
- About section
- Projects grid
- Footer

### Business Landing

Conversion-focused business page with:

- Header/navigation
- Hero with CTA
- Features section
- Call-to-action section
- Footer

## Usage

```jsx
import {
  ModernPortfolio,
  modernPortfolioConfig,
  BusinessLanding,
  businessLandingConfig,
  templateRegistry,
} from "@page-builder/templates";

// Render a template
<ModernPortfolio config={config} />;

// Access registry
const templates = templateRegistry;
```

## Development

```bash
# Build the package
pnpm build

# Watch mode
pnpm dev
```
