/**
 * Refined Classic Template - Refactored with Generic Schema Builders
 *
 * Demonstrates elegant simplicity using:
 * - Container props for sections
 * - Content props for typography
 * - Composite schemas for reusable patterns
 */

import { color, text, textarea } from "../utils/fieldBuilders.js";
import {
  arrayField,
  avatarProps,
  buttonSchema,
  cardSchema,
  gridLayoutProps,
  headingContentSchema,
  imageProps,
  mergeSchemas,
  sectionSchema,
  textContentSchema,
  titleContentSchema,
} from "../utils/genericSchemaBuilders.js";
import {
  fontFamilyOptions,
  footerPaddingOptions,
  footerTextSizeOptions,
  languageOptions,
  textDecorationOptions,
} from "../utils/index.js";

export const refinedClassicRefactoredConfig = {
  id: "refined-classic-refactored",
  name: "Refined Classic (Refactored)",
  description:
    "Timeless elegance meets bold typography for sophisticated distinction",
  icon: "♔",

  layout: [
    "hero",
    "about",
    "features",
    "portfolio",
    "stats",
    "testimonials",
    "process",
    "cta",
    "footer",
  ],

  configSchema: {
    // ============================================
    // PAGE-LEVEL SETTINGS
    // ============================================
    page: {
      fontFamily: {
        type: "select",
        label: "fontFamily",
        options: fontFamilyOptions,
      },
      title: text("pageTitle"),
      description: textarea("metaDescription"),
      keywords: text("metaKeywords"),
      author: text("author"),
      language: {
        type: "select",
        label: "language",
        options: languageOptions,
      },
    },

    // ============================================
    // ELEMENTS
    // ============================================
    elements: {
      // --------------------------
      // HERO SECTION
      // --------------------------
      hero: mergeSchemas(sectionSchema(), {
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
      features: mergeSchemas(sectionSchema(), gridLayoutProps(4), {
        heading: headingContentSchema(),
        card: mergeSchemas(cardSchema(), {
          icon: text("icon"),
          title: mergeSchemas(titleContentSchema(), {
            text: text("title"),
          }),
          content: mergeSchemas(textContentSchema("text", true), {
            text: textarea("description"),
          }),
        }),
        items: arrayField("items"),
      }),

      // --------------------------
      // PORTFOLIO SECTION (Image Grid)
      // --------------------------
      portfolio: mergeSchemas(sectionSchema(), gridLayoutProps(6), {
        heading: headingContentSchema(),
        image: imageProps(),
        images: arrayField("items"),
      }),

      // --------------------------
      // STATS SECTION
      // --------------------------
      stats: mergeSchemas(sectionSchema(), gridLayoutProps(6), {
        title: headingContentSchema(),
        card: mergeSchemas(cardSchema(), {
          title: headingContentSchema(),
          content: textContentSchema("text"),
        }),
        items: arrayField("items"),
      }),

      // --------------------------
      // TESTIMONIALS SECTION
      // --------------------------
      testimonials: mergeSchemas(sectionSchema(), gridLayoutProps(4), {
        title: headingContentSchema(),
        card: mergeSchemas(cardSchema(), {
          avatar: avatarProps(),
          title: textContentSchema("text", true),
          content: textContentSchema("text"),
        }),
        quotes: arrayField("items"),
      }),

      // --------------------------
      // PROCESS SECTION (Timeline)
      // --------------------------
      process: mergeSchemas(sectionSchema(), {
        heading: headingContentSchema(),
        items: arrayField("items"),
      }),

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
          text: mergeSchemas(textContentSchema("text"), {
            size: {
              type: "select",
              label: "fontSize",
              options: footerTextSizeOptions,
            },
            decoration: {
              type: "select",
              label: "textAlign",
              options: textDecorationOptions,
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
      fontFamily: 'Garamond, "Times New Roman", serif',
      title: "Artisan Furniture Atelier - Handcrafted Legacy",
      description:
        "Bespoke furniture crafted by hand using traditional techniques. Each piece designed to become tomorrow's heirloom, built with solid hardwoods and timeless joinery.",
      keywords:
        "furniture, handcrafted, bespoke, artisan, woodworking, heirloom, custom",
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
          text: "Crafted by Hand\nCherished for Generations",
          color: "#FAF8F3",
          size: "3rem",
          weight: "600",
        },
        subtitle: {
          text: "Where solid walnut meets dovetail joints and brass inlays shine with the patina of true craftsmanship. Each piece begins as rough timber and emerges as tomorrow's antique.",
          color: "#F5F1E8",
          size: "1.125rem",
          weight: "400",
        },
        button: {
          text: "View Collection",
          url: "#about",
          color: "#D4AF37",
          textColor: "#2B2B2B",
          size: "medium",
          borderRadius: "4px",
        },
      },
      about: {
        backgroundColor: "#FFFFFF",
        padding: "80px 24px",
        maxWidth: "900px",
        align: "center",
        heading: {
          text: "The Atelier Story",
          color: "#8B7355",
          size: "2.5rem",
          weight: "600",
        },
        content: {
          text: "In our workshop, the rhythm of hand planes and the scent of fresh-cut hardwood tell a story older than electricity. Four generations of master craftsmen have gathered here, passing down techniques that modern machinery can't replicate. We select each board for its character—the subtle grain patterns, the natural edges that honor the tree's journey. Every mortise and tenon joint is cut by hand, every surface finished with patience. This isn't furniture for a season. This is furniture your great-grandchildren will gather around, tracing the same wood grain with their fingers that you do today.",
          color: "#2B2B2B",
          size: "1rem",
          weight: "400",
          maxWidth: "800px",
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
          text: "Our Craft Principles",
          color: "#2B2B2B",
          size: "2.5rem",
          weight: "600",
        },
        card: {
          backgroundColor: "transparent",
          padding: "24px",
          gap: "10px",
          align: "center",
          borderRadius: "0px",
          dropShadow: "none",
          borderColor: "transparent",
          borderWidth: "0",
          title: {
            text: "",
            color: "#2B2B2B",
            size: "1.5rem",
            weight: "600",
          },
          content: {
            text: "",
            color: "#2B2B2B",
            size: "1rem",
            weight: "400",
          },
        },
        items: [
          {
            icon: "◆",
            title: {
              text: "No Power Tools",
            },
            content: {
              text: "Traditional hand tools ensure precision modern machines miss",
            },
          },
          {
            icon: "▭",
            title: {
              text: "Live Edge Philosophy",
            },
            content: {
              text: "We honor the tree's natural beauty in every curve and grain pattern",
            },
          },
          {
            icon: "◆",
            title: {
              text: "Lifetime Promise",
            },
            content: {
              text: "Furniture designed to outlive trends and welcome great-grandchildren",
            },
          },
        ],
      },
      portfolio: {
        backgroundColor: "#2B2B2B",
        padding: "80px 24px",
        maxWidth: "1200px",
        align: "center",
        columns: 3,
        gap: "24px",
        heading: {
          text: "Gallery of Craftsmanship",
          color: "#D4AF37",
          size: "2.5rem",
          weight: "600",
        },
        image: {
          backgroundColor: "#8B7355",
          padding: "12px",
          borderRadius: "0px",
          dropShadow: "0 4px 8px rgba(0,0,0,0.3)",
        },
        images: [
          {
            image: {
              url: "",
              alt: "Handcrafted Walnut Dining Table",
              fit: "cover",
              aspectRatio: "landscape",
            },
            caption: {
              text: "Live-Edge Dining Table",
              size: "0.875rem",
              weight: "400",
              color: "#FAF8F3",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "",
              alt: "Oak Bookshelf with Brass Details",
              fit: "cover",
              aspectRatio: "landscape",
            },
            caption: {
              text: "Custom Bookshelf",
              size: "0.875rem",
              weight: "400",
              color: "#FAF8F3",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "",
              alt: "Cherry Wood Rocking Chair",
              fit: "cover",
              aspectRatio: "landscape",
            },
            caption: {
              text: "Heirloom Rocking Chair",
              size: "0.875rem",
              weight: "400",
              color: "#FAF8F3",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
        ],
      },
      stats: {
        backgroundColor: "#F5F1E8",
        padding: "80px 24px",
        maxWidth: "1200px",
        align: "center",
        columns: 4,
        gap: "32px",
        title: {
          text: "By The Numbers",
          size: "2.5rem",
          weight: "600",
          color: "#2B2B2B",
        },
        card: {
          backgroundColor: "transparent",
          padding: "20px",
          align: "center",
          borderRadius: "0",
          dropShadow: "none",
        },
        items: [
          {
            title: {
              text: "100+",
              size: "2.5rem",
              weight: "600",
              color: "#8B7355",
            },
            content: {
              text: "Hours Per Piece",
              size: "1rem",
              weight: "400",
              color: "#2B2B2B",
            },
          },
          {
            title: {
              text: "4",
              size: "2.5rem",
              weight: "600",
              color: "#8B7355",
            },
            content: {
              text: "Generations",
              size: "1rem",
              weight: "400",
              color: "#2B2B2B",
            },
          },
          {
            title: {
              text: "0",
              size: "2.5rem",
              weight: "600",
              color: "#8B7355",
            },
            content: {
              text: "Power Tools",
              size: "1rem",
              weight: "400",
              color: "#2B2B2B",
            },
          },
          {
            title: {
              text: "∞",
              size: "2.5rem",
              weight: "600",
              color: "#8B7355",
            },
            content: {
              text: "Years to Last",
              size: "1rem",
              weight: "400",
              color: "#2B2B2B",
            },
          },
        ],
      },
      testimonials: {
        backgroundColor: "#FFFFFF",
        padding: "80px 24px",
        maxWidth: "1200px",
        align: "center",
        columns: 3,
        gap: "24px",
        title: {
          text: "Voices of Appreciation",
          size: "2.5rem",
          weight: "600",
          color: "#2B2B2B",
        },
        card: {
          backgroundColor: "#F5F1E8",
          padding: "32px",
          align: "center",
          borderRadius: "0px",
          dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
        quotes: [
          {
            avatar: {
              text: "E.M.",
              size: "large",
              backgroundColor: "#8B7355",
            },
            title: {
              text: "Each piece tells a story. The joinery is museum-quality, and the natural grain selection is simply breathtaking. This isn't furniture—it's functional art.",
              size: "0.9375rem",
              weight: "400",
              color: "#2B2B2B",
            },
            content: {
              text: "Eleanor Morrison, Interior Designer",
              size: "0.875rem",
              weight: "600",
              color: "#8B7355",
            },
          },
          {
            avatar: {
              text: "J.H.",
              size: "large",
              backgroundColor: "#8B7355",
            },
            title: {
              text: "I've inherited pieces from my grandfather. Now I commission pieces for my grandchildren. This is furniture that bridges generations.",
              size: "0.9375rem",
              weight: "400",
              color: "#2B2B2B",
            },
            content: {
              text: "James Hartford, Collector",
              size: "0.875rem",
              weight: "600",
              color: "#8B7355",
            },
          },
          {
            avatar: {
              text: "S.K.",
              size: "large",
              backgroundColor: "#8B7355",
            },
            title: {
              text: "Watching them select the wood, seeing each tool stroke—it's like witnessing alchemy. Worth every moment of the wait.",
              size: "0.9375rem",
              weight: "400",
              color: "#2B2B2B",
            },
            content: {
              text: "Sarah Kim, Homeowner",
              size: "0.875rem",
              weight: "600",
              color: "#8B7355",
            },
          },
        ],
      },
      process: {
        backgroundColor: "#8B7355",
        padding: "80px 24px",
        maxWidth: "900px",
        align: "flex-start",
        heading: {
          text: "The Making of an Heirloom",
          color: "#FAF8F3",
          size: "2.5rem",
          weight: "600",
        },
        items: [
          {
            title: "Selection",
            description:
              "We walk the mill together, examining each board for character, grain pattern, and story. The wood chooses you as much as you choose it.",
          },
          {
            title: "Design",
            description:
              "Hand-drawn plans honor both your vision and the wood's natural tendencies. No two pieces are identical—each design is as unique as the tree it came from.",
          },
          {
            title: "Crafting",
            description:
              "100+ hours of hand-tool work. Mortise and tenon joints, hand-cut dovetails, surfaces planed to silk. This is where patience becomes permanence.",
          },
          {
            title: "Finishing",
            description:
              "Seven coats of hand-rubbed oil, each layer revealing depth in the grain. We finish each piece as if our great-grandchildren will judge our work—because they will.",
          },
        ],
      },
      cta: {
        backgroundColor: "#2B2B2B",
        padding: "80px 24px",
        maxWidth: "750px",
        align: "center",
        title: {
          text: "Commission Your Heirloom",
          size: "2.5rem",
          weight: "600",
          color: "#FAF8F3",
        },
        subtitle: {
          text: "Let us craft something extraordinary. Your vision, our mastery, built to last centuries.",
          size: "1.125rem",
          weight: "400",
          color: "#FAF8F3",
        },
        button: {
          text: "Schedule Workshop Visit",
          url: "#contact",
          color: "#D4AF37",
          textColor: "#2B2B2B",
          size: "medium",
          borderRadius: "4px",
        },
      },
      footer: {
        backgroundColor: "#8B7355",
        padding: "40px",
        align: "center",
        text: {
          text: "© MMXXVI • Master Craftsmen Since 1924 • Where Wood Becomes Legacy",
          size: "0.875rem",
          weight: "400",
          color: "#FAF8F3",
        },
      },
    },
  },
};

export default refinedClassicRefactoredConfig;
