# Template Collection Overview

**Last Updated**: March 20, 2026

## 🎨 4 Distinct Templates - Each with Unique Personality

The Page Builder includes **4 professionally designed templates**, each with a completely different aesthetic and personality to provide users with diverse options for their websites.

---

## 📋 Full Template List

### 1. 💼 **Business Pro** (`business-pro-refactored`)

**Style:** Professional, conversion-focused business landing page
**Best for:** B2B companies, SaaS products, corporate sites, professional services
**Colors:** Blue gradients (#1e40af), white, clean grays
**Typography:** Helvetica, Inter, system fonts (professional sans-serif)
**Vibe:** Trustworthy, modern, efficient, corporate
**Layout:** `header → hero → about → features → projects → cta → footer` (7 sections)

**Sections:**

- Header with logo and navigation links
- Hero with gradient background and CTA button
- About section with content
- Features grid (3 columns)
- Projects showcase grid
- Call-to-action section
- Footer with links and copyright

**Default Content:**

- Hero: "Transform Your Business with Professional Solutions"
- Features: Business-focused benefits
- CTA: "Ready to Get Started?"

---

### 2. 💥 **Comic Splash** (`comic-splash-refactored`)

**Style:** Fun, playful, cartoon-inspired with bold colors
**Best for:** Creative agencies, kids products, fun brands, indie games, entertainment
**Colors:** Hot pink (#FF6B9D), sunshine yellow (#FFD93D), lime green (#6BCB77), bright blue (#4D96FF)
**Typography:** Comic Sans, Bangers, Fredoka (playful fonts)
**Vibe:** Energetic, joyful, explosive, FUN!
**Layout:** `hero → marquee → comicPanels → features → stats → testimonials → imageGrid → cta → footer` (9 sections)

**Unique Features:**

- Animated scrolling marquee
- Comic-style panels with speech bubbles
- Speech bubble testimonials (vs standard cards)
- Image gallery grid

**Sections:**

- Hero with animated effects
- Scrolling marquee with repeated text
- Comic-style panels (2x2 grid)
- Features grid with fun icons
- Stats counter with big numbers
- Testimonial speech bubbles
- Image gallery grid (3 columns)
- Call-to-action
- Footer

**Default Content:**

- Hero: "💥 BAM! Welcome to Our World! 💥"
- Features: "⭐ Super Powers ⭐" with fun icons
- CTA: "Ready to Join the Party? 🎉"

---

### 3. 🚀 **Futuristic Tech** (`futuristic-tech-refactored`)

**Style:** Cutting-edge tech product showcase with cyberpunk/sci-fi aesthetic
**Best for:** Tech companies, AI products, SaaS, innovation labs, startups, software
**Colors:** Deep space blue, cyan, indigo, neon accents
**Typography:** Exo, Rajdhani, Space Mono (futuristic/tech fonts)
**Vibe:** Innovative, clean, forward-thinking, cutting-edge, technical
**Layout:** `hero → features → terminal → about → stats → cta → footer` (7 sections)

**Unique Features:**

- Terminal component with code/command display
- Neon glow effects
- Tech-inspired typography

**Sections:**

- Hero with tech styling
- Features showcase with tech icons
- Terminal/code display window
- About section with technical content
- Stats counter (metrics/KPIs)
- Call-to-action with tech theme
- Footer

**Default Content:**

- Hero: "The Future of Technology Starts Here"
- Terminal: System output and code snippets
- Stats: Technical metrics and achievements

---

### 4. ♔ **Refined Classic** (`refined-classic-refactored`)

**Style:** Timeless elegance with sophisticated typography and classic design
**Best for:** Luxury brands, law firms, restaurants, hotels, heritage brands, premium services, creative portfolios
**Colors:** Cream (#FAF8F3), Brown (#8B7355), Gold accent (#D4AF37), Dark neutrals
**Typography:** Garamond, Playfair Display, Cormorant (elegant serif fonts)
**Vibe:** Sophisticated, timeless, luxurious, refined, heritage
**Layout:** `hero → about → features → portfolio → stats → testimonials → cta → footer` (8 sections)

**Unique Features:**

- Portfolio image grid (3 columns)
- Diamond (◆) icons for features
- Sophisticated typography with large serifs

**Sections:**

- Hero with large elegant typography
- About section with rich content ("Philosophy & Heritage")
- Features grid with diamond icons
- Portfolio image grid
- Stats counter
- Testimonial cards (standard layout)
- Call-to-action
- Footer with heritage-style text

**Default Content:**

- Hero: "Refined Excellence Timeless Distinction"
- About: "Philosophy & Heritage"
- Features: "Pillars of Excellence" with diamond icons (◆)
- CTA: "Begin Your Journey"
- Footer: "© MMXXVI • Heritage Since 1895 • A Legacy of Distinction"

---

## 🎯 Template Comparison

| Template        | Primary Colors           | Font Style      | Mood            | Sections | Complexity  | Unique Features                |
| --------------- | ------------------------ | --------------- | --------------- | -------- | ----------- | ------------------------------ |
| Business Pro    | Blue, White, Gray        | Sans-serif      | Professional    | 7        | Medium      | Projects showcase              |
| Comic Splash    | Multi-color bright       | Comic/Playful   | Fun & Energetic | 9        | Highest     | Marquee, Comic panels, Bubbles |
| Futuristic Tech | Space Blue, Cyan, Indigo | Tech/Futuristic | Innovative      | 7        | Medium-High | Terminal component             |
| Refined Classic | Cream, Brown, Gold       | Serif/Elegant   | Sophisticated   | 8        | Medium      | Portfolio grid, Diamond icons  |

---

## 🎨 Template Categories

### **Professional/Corporate**

- Business Pro (modern corporate)

### **Creative/Fun**

- Comic Splash (playful, entertainment)

### **Tech/Innovation**

- Futuristic Tech (cutting-edge, sci-fi)

### **Traditional & Timeless**

- Refined Classic (luxury, heritage, sophisticated)

---

## 🚀 Usage

All templates are automatically available in the template gallery. Users can:

1. Browse templates in the gallery view
2. Click to preview a template
3. Select a template to start editing
4. Customize sections, colors, typography, and content
5. Export to production-ready HTML

---

## 📁 File Locations

**Template Configs**: `packages/templates/src/configs/`

- `businessPro.config.js`
- `comicSplash.config.js`
- `futuristicTech.config.js`
- `refinedClassic.config.js`

**Section Components**: `packages/templates/src/sections/`

- CallToAction, ComicPanels, ContentSection, Footer, Header, Hero
- ImageGrid, ItemGrid, Marquee, SpeechBubbleTestimonials
- StatsCounter, Terminal, TestimonialCards

**Registry**: `packages/templates/src/registries/`

- `templateRegistry.js` - Template registration
- `componentRegistry.js` - Component mapping and prop transformation

---

## 🔧 Adding New Templates

To add a new template, see [USER_GUIDE_NEW_TEMPLATE.md](../USER_GUIDE_NEW_TEMPLATE.md) for step-by-step instructions.

```javascript
import { templateRegistry } from "@page-builder/templates";

// Returns 7 templates
console.log(templateRegistry.length); // 7

// Access specific template
import {
  comicSplashConfig,
  cyberpunkNeonConfig,
} from "@page-builder/templates";
```

---

## ✨ Key Differences

Each template now has:

1. **Unique Color Palettes** - No two look alike
2. **Distinct Typography** - From Comic Sans to Helvetica to Orbitron
3. **Different Layouts** - Varied element ordering
4. **Themed Content** - Content that matches the vibe
5. **Personality** - Each feels completely different

**Before:** 2 similar templates (both "modern professional")
**After:** 7 diverse templates spanning playful → rebellious → minimal → elegant → futuristic

---

## 📊 Bundle Impact

- **Before:** ~47KB (2 templates)
- **After:** ~78KB (7 templates)
- **Per template:** ~6KB average
- **Impact:** Reasonable for 3.5x more templates

---

## 🎉 Result

Users now have **real variety** - from cute comic book styles to dark cyberpunk, from minimal brutalist to elegant traditional. Each template brings a completely fresh aesthetic!
