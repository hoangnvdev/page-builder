import {
  alignOptions,
  buttonSizeOptions,
  cardContentSchema,
  cardSchema,
  cardTitleSchema,
  color,
  contentMaxWidthOptions,
  fontFamilyOptions,
  footerPaddingOptions,
  footerTextSizeOptions,
  gapOptions,
  headingSchema,
  headingSizeOptions,
  languageOptions,
  sectionPaddingOptions,
  sectionSchema,
  slider,
  text,
  textarea,
  textDecorationOptions,
  textSizeOptions,
  weightOptions,
} from "../utils/index.js";

export const refinedClassicConfig = {
  id: "refined-classic",
  name: "Refined Classic",
  description:
    "Timeless elegance meets bold typography for sophisticated distinction",
  icon: "♔",

  layout: ["hero", "about", "features", "cta", "footer"],

  configSchema: {
    page: {
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: fontFamilyOptions,
      },
      title: text("Page Title (Browser Tab)"),
      description: textarea("Meta Description (SEO)"),
      keywords: text("Meta Keywords (comma-separated)"),
      author: text("Author"),
      language: {
        type: "select",
        label: "Language",
        options: languageOptions,
      },
    },
    elements: {
      hero: {
        ...sectionSchema(),
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "800px", label: "Medium" },
            { value: "900px", label: "Large" },
            { value: "1200px", label: "Extra Large" },
            { value: "100%", label: "Full" },
          ],
        },
        title: {
          text: text("Title"),
          color: color("Title Color"),
          size: {
            type: "select",
            label: "Title Size",
            options: headingSizeOptions,
          },
        },
        subtitle: {
          text: textarea("Subtitle"),
          color: color("Subtitle Color"),
          size: {
            type: "select",
            label: "Subtitle Size",
            options: textSizeOptions,
          },
        },
        button: {
          text: text("Button Text"),
          color: color("Button Background Color"),
          textColor: color("Button Text Color"),
          size: {
            type: "select",
            label: "Button Size",
            options: buttonSizeOptions,
          },
        },
      },
      about: {
        ...sectionSchema(),
        heading: headingSchema(),
        content: {
          text: textarea("Content"),
          color: color("Text Color"),
          maxWidth: {
            type: "select",
            label: "Max Width",
            options: contentMaxWidthOptions,
          },
          align: {
            type: "select",
            label: "Text Alignment",
            options: alignOptions,
          },
        },
      },
      features: {
        ...sectionSchema(),
        columns: slider("Columns", 1, 4),
        gap: {
          type: "select",
          label: "Gap Between Cards",
          options: gapOptions,
        },
        heading: headingSchema(),
        card: {
          ...cardSchema(),
          title: cardTitleSchema(),
          content: cardContentSchema(),
        },
        items: {
          type: "array",
          label: "Features",
          icon: text("Icon"),
          title: {
            text: text("Title"),
          },
          content: {
            text: textarea("Description"),
          },
        },
      },
      cta: {
        label: "Call To Action",
        title: {
          text: text("Title"),
          size: {
            type: "select",
            label: "Title Size",
            options: headingSizeOptions,
          },
          weight: {
            type: "select",
            label: "Title Weight",
            options: weightOptions,
          },
          color: color("Title Color"),
        },
        subtitle: {
          text: textarea("Subtitle"),
          size: {
            type: "select",
            label: "Subtitle Size",
            options: textSizeOptions,
          },
          color: color("Subtitle Color"),
        },
        button: {
          text: text("Button Text"),
          url: text("Button URL"),
          color: color("Button Background Color"),
          textColor: color("Button Text Color"),
          size: {
            type: "select",
            label: "Button Size",
            options: buttonSizeOptions,
          },
        },
        backgroundColor: color("Background Color"),
        padding: {
          type: "select",
          label: "Padding",
          options: sectionPaddingOptions,
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "600px", label: "Small" },
            { value: "750px", label: "Medium" },
            { value: "900px", label: "Large" },
            { value: "100%", label: "Full" },
          ],
        },
        align: { type: "select", label: "Alignment", options: alignOptions },
      },
      footer: {
        text: {
          text: text("Text"),
          size: {
            type: "select",
            label: "Text Size",
            options: footerTextSizeOptions,
          },
          weight: {
            type: "select",
            label: "Text Weight",
            options: weightOptions,
          },
          decoration: {
            type: "select",
            label: "Text Decoration",
            options: textDecorationOptions,
          },
          color: color("Text Color"),
        },
        backgroundColor: color("Background Color"),
        padding: {
          type: "select",
          label: "Padding",
          options: footerPaddingOptions,
        },
        align: { type: "select", label: "Alignment", options: alignOptions },
      },
    },
  },

  defaultConfig: {
    page: {
      fontFamily: 'Garamond, "Times New Roman", serif',
      title: "Refined Classic - Timeless Elegance",
      description:
        "Experience classical sophistication with modern precision. A timeless design for those who appreciate heritage craftsmanship and elegance.",
      keywords: "classic, elegant, sophisticated, timeless, premium, luxury",
      author: "",
      language: "en",
    },
    elements: {
      hero: {
        backgroundColor: "#8B7355",
        padding: "120px 24px",
        maxWidth: "900px",
        align: "center",
        title: {
          text: "Refined Excellence\nTimeless Distinction",
          color: "#FAF8F3",
          size: "3rem",
        },
        subtitle: {
          text: "Where classical sophistication meets contemporary precision. A harmonious blend of heritage craftsmanship and modern design principles, crafted for those who appreciate true quality.",
          color: "#F5F1E8",
          size: "1.125rem",
        },
        button: {
          text: "Discover More",
          color: "#D4AF37",
          textColor: "#2B2B2B",
          size: "medium",
        },
      },
      about: {
        backgroundColor: "#FFFFFF",
        padding: "80px 24px",
        maxWidth: "900px",
        align: "center",
        heading: {
          text: "Philosophy & Heritage",
          color: "#8B7355",
          size: "2.5rem",
          weight: "600",
        },
        content: {
          text: "Our approach marries time-honored traditions with bold contemporary thinking. We believe in the power of grid-based design, where every element has purpose and every space carries meaning. Through meticulous attention to typography, proportion, and negative space, we create experiences that feel both classic and unmistakably modern. This is design at its most refined—stripped of excess, rich in substance.",
          color: "#2B2B2B",
          maxWidth: "800px",
          align: "flex-start",
        },
      },
      features: {
        backgroundColor: "#F5F1E8",
        padding: "80px 24px",
        maxWidth: "1200px",
        align: "center",
        columns: 3,
        gap: "32px",
        heading: {
          text: "Pillars of Excellence",
          color: "#2B2B2B",
          size: "2.5rem",
          weight: "600",
        },
        card: {
          backgroundColor: "transparent",
          padding: "24px",
          align: "center",
          borderRadius: "0px",
          dropShadow: "none",
          title: {
            color: "#2B2B2B",
            size: "1.5rem",
            weight: "600",
          },
          content: {
            color: "#2B2B2B",
            size: "1rem",
          },
        },
        items: [
          {
            icon: "◆",
            title: {
              text: "Artisan Craftsmanship",
            },
            content: {
              text: "Handcrafted with precision, guided by generations of expertise",
            },
          },
          {
            icon: "▭",
            title: {
              text: "Systematic Design",
            },
            content: {
              text: "Grid-based layouts ensuring mathematical harmony and balance",
            },
          },
          {
            icon: "◆",
            title: {
              text: "Premium Materials",
            },
            content: {
              text: "Only the finest components, sourced with uncompromising standards",
            },
          },
        ],
      },
      cta: {
        backgroundColor: "#2B2B2B",
        padding: "80px 24px",
        maxWidth: "750px",
        align: "center",
        title: {
          text: "Begin Your Journey",
          size: "2.5rem",
          weight: "600",
          color: "#FAF8F3",
        },
        subtitle: {
          text: "Experience the perfect union of classical refinement and contemporary precision",
          size: "1.125rem",
          color: "#FAF8F3",
        },
        button: {
          text: "Request Consultation",
          url: "#contact",
          color: "#D4AF37",
          textColor: "#2B2B2B",
          size: "medium",
        },
      },
      footer: {
        backgroundColor: "#8B7355",
        padding: "40px",
        align: "center",
        text: {
          text: "© MMXXVI • Heritage Since 1895 • A Legacy of Distinction",
          size: "0.875rem",
          weight: "400",
          color: "#FAF8F3",
        },
      },
    },
  },
};
