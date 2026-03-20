import {
  color,
  slider,
  text,
} from '../utils/fieldBuilders.js';
import {
  arrayField,
  buttonSchema,
  cardSchema,
  headingContentSchema,
  logoFieldComplete,
  mergeSchemas,
  sectionSchema,
  textContentPropsEnhanced,
  textContentSchema,
  titleContentSchema,
  typographyProps,
} from '../utils/genericSchemaBuilders.js';
import {
  footerPaddingOptions,
  footerTextSizeOptions,
} from '../utils/index.js';

export const businessProRefactoredConfig = {
  id: "business-pro-refactored",
  name: "Business Pro",
  description:
    "Professional business & portfolio combination with full features",
  icon: "💼",

  layout: ["header", "hero", "about", "features", "projects", "cta", "footer"],

  navLinks: [
    { text: "Home", href: "#" },
    { text: "About", href: "#about" },
    { text: "Services", href: "#features" },
    { text: "Portfolio", href: "#projects" },
    { text: "Contact", href: "#cta" },
  ],

  configSchema: {
    // ============================================
    // PAGE-LEVEL SETTINGS
    // ============================================
    page: {
      fontFamily: {
        type: "select",
        label: "fontFamily",
        options: [
          { value: "Arial, sans-serif", label: "Arial" },
          { value: "Georgia, serif", label: "Georgia" },
          { value: '"Segoe UI", sans-serif', label: "Segoe UI" },
          { value: "system-ui, sans-serif", label: "System" },
          { value: '"Inter", sans-serif', label: "Inter" },
        ],
      },
      title: text("pageTitle"),
    },

    // ============================================
    // ELEMENTS
    // ============================================
    elements: {
      // --------------------------
      // HEADER SECTION
      // --------------------------
      header: mergeSchemas(
        {
          backgroundColor: color("backgroundColor"),
          padding: {
            type: "select",
            label: "padding",
            options: [
              { value: "16px 24px", label: "compact" },
              { value: "20px 24px", label: "comfort" },
              { value: "24px 32px", label: "spacious" },
            ],
          },
          maxWidth: {
            type: "select",
            label: "maxWidth",
            options: [
              { value: "1200px", label: "standard" },
              { value: "1400px", label: "wide" },
              { value: "100%", label: "wider" },
            ],
          },
          align: {
            type: "select",
            label: "alignItems",
            options: [
              { value: "flex-start", label: "left" },
              { value: "center", label: "center" },
              { value: "flex-end", label: "right" },
            ],
          },
        },
        {
          companyName: text("companyName"),
          logo: logoFieldComplete(),
          logoColor: color("logoColor"),
          linkColor: color("linkColor"),
          link: mergeSchemas({
            text: text("linkText"),
            href: text("linkUrl"),
            ...typographyProps("text"),
          }),
          links: arrayField("links"),
          gap: {
            type: "select",
            label: "gap",
            options: [
              { value: "16px", label: "compact" },
              { value: "24px", label: "comfort" },
              { value: "32px", label: "spacious" },
            ],
          },
          titleLevel: {
            type: "select",
            label: "headingLevel",
            options: [
              { value: "1", label: "h1" },
              { value: "2", label: "h2" },
              { value: "3", label: "h3" },
            ],
          },
        },
      ),

      // --------------------------
      // HERO SECTION
      // --------------------------
      hero: mergeSchemas(sectionSchema(), {
        gradientStart: color("gradientStart"),
        gradientEnd: color("gradientEnd"),
        gradientAngle: {
          type: "slider",
          label: "gradientAngle",
          min: -180,
          max: 180,
          step: 5,
        },
        title: titleContentSchema(),
        subtitle: textContentSchema("text", true),
        button: buttonSchema(),
      }),

      // --------------------------
      // ABOUT SECTION
      // --------------------------
      about: mergeSchemas(sectionSchema(), {
        heading: headingContentSchema(),
        content: mergeSchemas(textContentSchema("text", true), {
          maxWidth: {
            type: "select",
            label: "maxWidth",
            options: [
              { value: "600px", label: "small" },
              { value: "700px", label: "medium" },
              { value: "800px", label: "large" },
              { value: "100%", label: "auto" },
            ],
          },
        }),
      }),

      // --------------------------
      // FEATURES SECTION (Grid of cards)
      // --------------------------
      features: mergeSchemas(
        sectionSchema(),
        {
          columns: slider("columns", 1, {
            dynamic: "elements.features.items.length",
          }),
          gap: {
            type: "select",
            label: "gap",
            options: [
              { value: "16px", label: "compact" },
              { value: "24px", label: "comfort" },
              { value: "32px", label: "spacious" },
            ],
          },
        },
        {
          heading: headingContentSchema(),
          card: mergeSchemas(cardSchema(), {
            icon: text("icon"),
            title: titleContentSchema(),
            content: textContentSchema("text", true),
          }),
          items: arrayField("items"),
        },
      ),

      // --------------------------
      // PROJECTS SECTION (Grid of cards)
      // --------------------------
      projects: mergeSchemas(
        sectionSchema(),
        {
          columns: slider("columns", 1, {
            dynamic: "elements.projects.items.length",
          }),
          gap: {
            type: "select",
            label: "gap",
            options: [
              { value: "16px", label: "compact" },
              { value: "24px", label: "comfort" },
              { value: "32px", label: "spacious" },
            ],
          },
        },
        {
          heading: headingContentSchema(),
          card: mergeSchemas(cardSchema(), {
            title: titleContentSchema(),
            content: textContentSchema("text", true),
          }),
          items: arrayField("items"),
        },
      ),

      // --------------------------
      // CTA SECTION
      // --------------------------
      cta: mergeSchemas(sectionSchema(), {
        title: titleContentSchema(),
        subtitle: textContentSchema("text", true),
        button: buttonSchema(),
      }),

      // --------------------------
      // FOOTER SECTION
      // --------------------------
      footer: mergeSchemas(
        {
          backgroundColor: color("backgroundColor"),
          padding: {
            type: "select",
            label: "padding",
            options: footerPaddingOptions,
          },
          align: {
            type: "select",
            label: "alignItems",
            options: [
              { value: "flex-start", label: "left" },
              { value: "center", label: "center" },
              { value: "flex-end", label: "right" },
            ],
          },
        },
        {
          text: mergeSchemas(textContentPropsEnhanced("text"), {
            size: {
              type: "select",
              label: "fontSize",
              options: footerTextSizeOptions,
            },
          }),
        },
      ),
    },
  },

  // ============================================
  // DEFAULT CONFIGURATION
  // ============================================
  defaultConfig: {
    page: {
      fontFamily: '"Inter", sans-serif',
      title: "BusinessPro - Transform Your Digital Presence",
    },
    elements: {
      header: {
        companyName: "BusinessPro",
        logo: {
          type: "text",
          text: "�",
          url: "",
          width: "40px",
          height: "40px",
        },
        backgroundColor: "#ffffff",
        logoColor: "#6366f1",
        linkColor: "#475569",
        link: {
          text: "",
          href: "",
        },
        links: [
          {
            text: "Home",
            href: "#",
            color: "#475569",
            size: "0.95rem",
            weight: "500",
          },
          {
            text: "About",
            href: "#about",
            color: "#475569",
            size: "0.95rem",
            weight: "500",
          },
          {
            text: "Services",
            href: "#features",
            color: "#475569",
            size: "0.95rem",
            weight: "500",
          },
          {
            text: "Portfolio",
            href: "#projects",
            color: "#475569",
            size: "0.95rem",
            weight: "500",
          },
          {
            text: "Contact",
            href: "#cta",
            color: "#6366f1",
            size: "0.95rem",
            weight: "600",
          },
        ],
        padding: "20px 24px",
        gap: "24px",
        maxWidth: "1200px",
        align: "center",
        titleLevel: "1",
      },
      hero: {
        backgroundColor: "#0f172a",
        padding: "140px 24px",
        maxWidth: "1000px",
        align: "center",
        gradientStart: "#6366f1",
        gradientEnd: "#8b5cf6",
        gradientAngle: 45,
        title: {
          text: "Transform Your Vision Into Digital Excellence",
          color: "#ffffff",
          size: "3.5rem",
          weight: "800",
        },
        subtitle: {
          text: "We partner with ambitious businesses to create cutting-edge digital experiences that captivate audiences and drive measurable results",
          color: "#cbd5e1",
          size: "1.25rem",
          weight: "400",
        },
        button: {
          text: "Start Your Project →",
          url: "#about",
          color: "#6366f1",
          textColor: "#ffffff",
          size: "large",
          borderRadius: "12px",
        },
      },
      about: {
        backgroundColor: "#f8fafc",
        padding: "100px 24px",
        maxWidth: "1000px",
        align: "center",
        heading: {
          text: "Building Tomorrow's Digital Leaders",
          color: "#0f172a",
          size: "2.75rem",
          weight: "700",
        },
        content: {
          text: "For over a decade, we've partnered with forward-thinking companies to craft digital experiences that don't just look beautiful—they perform. Our team of strategists, designers, and developers obsess over every detail to ensure your brand stands out in a crowded digital landscape.",
          color: "#475569",
          size: "1.125rem",
          weight: "400",
          maxWidth: "850px",
        },
      },
      features: {
        backgroundColor: "#ffffff",
        padding: "100px 24px",
        maxWidth: "1200px",
        align: "center",
        columns: 3,
        gap: "40px",
        heading: {
          text: "What We Do Best",
          color: "#0f172a",
          size: "2.75rem",
          weight: "700",
        },
        card: {
          backgroundColor: "#f8fafc",
          padding: "40px",
          gap: "20px",
          align: "flex-start",
          borderRadius: "16px",
          dropShadow: "none",
          borderColor: "#e2e8f0",
          borderWidth: "1px",
          icon: "",
          title: {
            color: "#0f172a",
            size: "1.5rem",
            weight: "700",
          },
          content: {
            color: "#64748b",
            size: "1rem",
            weight: "400",
          },
        },
        items: [
          {
            icon: "🎨",
            title: "Brand & Design",
            description:
              "Creating memorable brand identities and stunning interfaces that resonate with your audience",
          },
          {
            icon: "⚡",
            title: "Web Development",
            description:
              "Lightning-fast, scalable websites built with cutting-edge technology and best practices",
          },
          {
            icon: "📈",
            title: "Growth Strategy",
            description:
              "Data-driven strategies that amplify your reach and convert visitors into loyal customers",
          },
        ],
      },
      projects: {
        backgroundColor: "#f8fafc",
        padding: "100px 24px",
        maxWidth: "1200px",
        align: "center",
        columns: 3,
        gap: "40px",
        heading: {
          text: "Success Stories",
          color: "#0f172a",
          size: "2.75rem",
          weight: "700",
        },
        card: {
          backgroundColor: "#ffffff",
          padding: "40px",
          gap: "20px",
          align: "center",
          borderRadius: "16px",
          dropShadow: "medium",
          borderColor: "#e2e8f0",
          borderWidth: "1px",
          title: {
            color: "#0f172a",
            size: "1.5rem",
            weight: "700",
          },
          content: {
            color: "#64748b",
            size: "1rem",
            weight: "400",
          },
        },
        items: [
          {
            title: "TechFlow Platform",
            description:
              "Revolutionized enterprise workflow with AI-powered automation, serving 50K+ users globally",
          },
          {
            title: "GreenEarth Initiative",
            description:
              "Designed a sustainable marketplace connecting eco-conscious brands with mindful consumers",
          },
          {
            title: "HealthSync App",
            description:
              "Built an intuitive wellness app that helped 100K+ users achieve their health goals",
          },
        ],
      },
      cta: {
        backgroundColor: "#6366f1",
        padding: "120px 24px",
        maxWidth: "1000px",
        align: "center",
        title: {
          text: "Let's Build Something Extraordinary Together",
          color: "#ffffff",
          size: "3rem",
          weight: "800",
        },
        subtitle: {
          text: "Join 500+ innovative companies who've transformed their digital presence with us",
          color: "#e0e7ff",
          size: "1.25rem",
          weight: "400",
        },
        button: {
          text: "Get In Touch →",
          url: "#contact",
          color: "#ffffff",
          textColor: "#6366f1",
          size: "large",
          borderRadius: "12px",
        },
      },
      footer: {
        text: {
          text: "© 2026 BusinessPro. Crafted with passion. All rights reserved.",
          color: "#94a3b8",
          size: "0.875rem",
          weight: "400",
          decoration: "none",
        },
        backgroundColor: "#0f172a",
        padding: "40px 24px",
        align: "center",
      },
    },
  },
};

export default businessProRefactoredConfig;
