import { slider, text } from "../utils/fieldBuilders.js";
import {
  arrayField,
  buttonSchema,
  cardSchema,
  cardSchemaForImageGrid,
  headingContentSchema,
  iconProps,
  imagePropsForGrid,
  marqueePropsComplete,
  mergeSchemas,
  sectionSchema,
  textContentPropsEnhanced,
  textContentSchema,
  titleContentSchema,
} from "../utils/genericSchemaBuilders.js";
import { fontFamilyOptions } from "../utils/index.js";

export const comicSplashRefactoredConfig = {
  id: "comic-splash-refactored",
  name: "Comic Splash",
  description: "Playful comic-book style with bold colors and fun vibes",
  icon: "💥",

  layout: [
    "hero",
    "marquee",
    "comicPanels",
    "features",
    "stats",
    "testimonials",
    "imageGrid",
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
        subtitle: textContentSchema("text", true), // multiline
        button: buttonSchema(),
      }),

      // --------------------------
      // MARQUEE SECTION (Special component)
      // --------------------------
      marquee: marqueePropsComplete(),

      // --------------------------
      // COMIC PANELS (Grid of cards)
      // --------------------------
      comicPanels: mergeSchemas(
        sectionSchema(),
        {
          columns: slider("columns", 1, {
            dynamic: "elements.comicPanels.panels.length",
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
          panels: arrayField("items"),
        },
      ),

      // --------------------------
      // FEATURES SECTION
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
            icon: text("icon"), // emoji or icon identifier
            title: titleContentSchema(),
            content: textContentSchema("text", true),
          }),
          items: arrayField("items"),
        },
      ),

      // --------------------------
      // STATS SECTION
      // --------------------------
      stats: mergeSchemas(
        sectionSchema(),
        {
          columns: slider("columns", 1, {
            dynamic: "elements.stats.items.length",
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
          title: headingContentSchema(),
          card: mergeSchemas(cardSchema(), {
            title: headingContentSchema(), // large number
            content: textContentSchema("text"), // description
          }),
          items: arrayField("items"),
        },
      ),

      // --------------------------
      // TESTIMONIALS SECTION
      // --------------------------
      testimonials: mergeSchemas(
        sectionSchema(),
        {
          columns: slider("columns", 1, {
            dynamic: "elements.testimonials.quotes.length",
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
          title: headingContentSchema(),
          card: mergeSchemas(cardSchema(), {
            icon: iconProps(),
            title: textContentSchema("text", true),
            content: textContentSchema("text"),
          }),
          quotes: arrayField("items"),
        },
      ),

      // --------------------------
      // IMAGE GRID SECTION
      // --------------------------
      imageGrid: mergeSchemas(
        {
          backgroundColor: {
            type: "color",
            label: "backgroundColor",
          },
          padding: {
            type: "select",
            label: "padding",
            options: [
              { value: "40px 20px", label: "compact" },
              { value: "80px 20px", label: "comfort" },
              { value: "120px 20px", label: "spacious" },
            ],
          },
          maxWidth: {
            type: "select",
            label: "maxWidth",
            options: [
              { value: "800px", label: "narrow" },
              { value: "1000px", label: "medium" },
              { value: "1200px", label: "wide" },
              { value: "100%", label: "full" },
            ],
          },
        },
        {
          columns: slider("columns", 1, {
            dynamic: "elements.imageGrid.images.length",
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
          card: mergeSchemas(cardSchemaForImageGrid(), {
            image: imagePropsForGrid(),
          }),
          images: arrayField("items"),
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
          backgroundColor: {
            type: "color",
            label: "backgroundColor",
          },
          padding: {
            type: "select",
            label: "padding",
            options: [
              { value: "20px 20px", label: "compact" },
              { value: "40px 20px", label: "comfort" },
              { value: "60px 20px", label: "spacious" },
            ],
          },
          align: {
            type: "select",
            label: "textAlign",
            options: [
              { value: "left", label: "left" },
              { value: "center", label: "center" },
              { value: "right", label: "right" },
            ],
          },
        },
        {
          text: textContentPropsEnhanced("text"),
          links: arrayField("items"),
        },
      ),
    },
  },

  // Default configuration values
  defaultConfig: {
    page: {
      fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
      title: "My Awesome Page",
      description:
        "Create amazing websites with our fun and playful comic-style template. Perfect for creative projects and portfolios.",
      keywords: "page builder, website, creative, portfolio, comic style",
    },
    elements: {
      hero: {
        backgroundColor: "#FF6B9D",
        padding: "100px 20px",
        maxWidth: "800px",
        align: "center",
        title: {
          text: "💥 BAM! Welcome to Our World! 💥",
          color: "#FFFFFF",
          size: "4rem",
        },
        subtitle: {
          text: "Get ready for an adventure that'll blow your socks off!",
          color: "#FFF5E1",
          size: "1rem",
        },
        button: {
          text: "Let's Go! 🚀",
          color: "#FFD93D",
          textColor: "#2C1810",
          size: "large",
        },
      },
      marquee: {
        text: "⚡ SPECIAL OFFER! ⚡ JOIN TODAY AND GET 50% OFF! ⚡ LIMITED TIME ONLY! ⚡",
        backgroundColor: "#FFD93D",
        textColor: "#2C1810",
        padding: "20px 20px",
        speed: "medium",
      },
      comicPanels: {
        backgroundColor: "#FFF5E1",
        padding: "80px 20px",
        maxWidth: "1000px",
        align: "center",
        columns: 2,
        gap: "20px",
        heading: {
          text: "📖 Our Epic Story 📖",
          size: "2rem",
          weight: "700",
          color: "#2C1810",
        },
        card: {
          backgroundColor: "#FF6B9D",
          padding: "20px",
          align: "center",
          borderRadius: "12px",
          dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
          title: {
            size: "1.25rem",
            weight: "700",
            color: "#FFFFFF",
          },
          content: {
            size: "1rem",
            weight: "400",
            color: "#FFF5E1",
          },
        },
        panels: [
          {
            number: "1",
            backgroundColor: "#FF6B9D",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
            title: {
              text: "The Beginning",
              size: "1.25rem",
              weight: "700",
              color: "#FFFFFF",
            },
            content: {
              text: "It all started with a crazy idea and a dream...",
              size: "1rem",
              weight: "400",
              color: "#FFF5E1",
            },
          },
          {
            number: "2",
            backgroundColor: "#FFD93D",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
            title: {
              text: "The Challenge",
              size: "1.25rem",
              weight: "700",
              color: "#2C1810",
            },
            content: {
              text: "We faced obstacles, but never gave up!",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
          {
            number: "3",
            backgroundColor: "#6BCB77",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
            title: {
              text: "The Victory",
              size: "1.25rem",
              weight: "700",
              color: "#FFFFFF",
            },
            content: {
              text: "Today, we're making dreams come true!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
          {
            number: "4",
            backgroundColor: "#4D96FF",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
            title: {
              text: "Your Turn!",
              size: "1.25rem",
              weight: "700",
              color: "#FFFFFF",
            },
            content: {
              text: "Now it's YOUR time to shine with us!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
        ],
      },
      features: {
        backgroundColor: "#6BCB77",
        padding: "80px 20px",
        maxWidth: "1000px",
        align: "center",
        columns: 3,
        gap: "30px",
        heading: {
          text: "⭐ Super Powers ⭐",
          size: "2rem",
          weight: "700",
          color: "#FFFFFF",
        },
        card: {
          backgroundColor: "transparent",
          padding: "20px",
          align: "center",
          borderRadius: "12px",
          dropShadow: "none",
          title: {
            size: "1.25rem",
            weight: "700",
            color: "#FFD93D",
          },
          content: {
            size: "1rem",
            weight: "400",
            color: "#FFFFFF",
          },
        },
        items: [
          {
            icon: "🎨",
            backgroundColor: "transparent",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "none",
            title: {
              text: "Creative Blast",
              size: "1.25rem",
              weight: "700",
              color: "#FFD93D",
            },
            content: {
              text: "Unleash your creativity with our colorful tools!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
          {
            icon: "⚡",
            backgroundColor: "transparent",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "none",
            title: {
              text: "Lightning Speed",
              size: "1.25rem",
              weight: "700",
              color: "#FFD93D",
            },
            content: {
              text: "Fast as a superhero!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
          {
            icon: "🎪",
            backgroundColor: "transparent",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "none",
            title: {
              text: "Fun Factory",
              size: "1.25rem",
              weight: "700",
              color: "#FFD93D",
            },
            content: {
              text: "Work feels like play when you're with us!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
        ],
      },
      stats: {
        title: {
          text: "By The Numbers",
          size: "2.5rem",
          weight: "700",
          color: "#2C1810",
        },
        backgroundColor: "#FFD93D",
        padding: "120px 20px",
        maxWidth: "1200px",
        align: "center",
        columns: 4,
        gap: "40px",
        card: {
          backgroundColor: "transparent",
          padding: "20px",
          align: "center",
          borderRadius: "0",
          dropShadow: "none",
          title: {
            text: "",
            size: "2.5rem",
            weight: "700",
            color: "#FF6B9D",
          },
          content: {
            text: "",
            size: "1rem",
            weight: "400",
            color: "#2C1810",
          },
        },
        items: [
          {
            title: {
              text: "50K+",
              size: "2.5rem",
              weight: "700",
              color: "#FF6B9D",
            },
            content: {
              text: "Happy Users",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
          {
            title: {
              text: "99.9%",
              size: "2.5rem",
              weight: "700",
              color: "#FF6B9D",
            },
            content: {
              text: "Uptime",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
          {
            title: {
              text: "24/7",
              size: "2.5rem",
              weight: "700",
              color: "#FF6B9D",
            },
            content: {
              text: "Support",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
          {
            title: {
              text: "100%",
              size: "2.5rem",
              weight: "700",
              color: "#FF6B9D",
            },
            content: {
              text: "Awesome",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
        ],
      },
      testimonials: {
        title: {
          text: "💬 What People Are Saying 💬",
          size: "2rem",
          weight: "700",
          color: "#2C1810",
        },
        backgroundColor: "#FFF5E1",
        padding: "80px 20px",
        maxWidth: "1200px",
        align: "center",
        columns: 3,
        gap: "20px",
        card: {
          backgroundColor: "#FFFFFF",
          padding: "25px",
          align: "center",
          borderRadius: "20px",
          dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
          icon: {
            text: "",
          },
          title: {
            text: "",
            size: "1rem",
            weight: "400",
            color: "#2C1810",
          },
          content: {
            text: "",
            size: "0.875rem",
            weight: "700",
            color: "#FF6B9D",
          },
        },
        quotes: [
          {
            icon: {
              text: "😄",
            },
            title: {
              text: "This is AMAZING! Changed my life!",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
            content: {
              text: "Sarah Super",
              size: "0.875rem",
              weight: "700",
              color: "#FF6B9D",
            },
          },
          {
            icon: {
              text: "🤩",
            },
            title: {
              text: "SO MUCH FUN! Can't stop using it!",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
            content: {
              text: "Mike Mighty",
              size: "0.875rem",
              weight: "700",
              color: "#FF6B9D",
            },
          },
          {
            icon: {
              text: "🌟",
            },
            title: {
              text: "My kids LOVE it! Five stars!",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
            content: {
              text: "Jenny Joy",
              size: "0.875rem",
              weight: "700",
              color: "#FF6B9D",
            },
          },
        ],
      },
      imageGrid: {
        heading: {
          text: "Gallery",
          size: "2.5rem",
          weight: "700",
          color: "#FFFFFF",
        },
        backgroundColor: "#4D96FF",
        padding: "80px 20px",
        maxWidth: "1000px",
        columns: 3,
        gap: "20px",
        card: {
          backgroundColor: "#FFFFFF",
          padding: "10px",
          borderRadius: "8px",
          borderWidth: "0",
          borderColor: "transparent",
          dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
          image: {
            url: "",
            alt: "",
            objectFit: "cover",
          },
        },
        images: [
          {
            backgroundColor: "#FFFFFF",
            padding: "10px",
            borderRadius: "8px",
            borderWidth: "0",
            borderColor: "transparent",
            dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
            image: {
              url: "https://cdn.shopify.com/s/files/1/0657/3100/2634/files/Papier-peint-bande-dessinee-Pop-art-WOW-en-rouge_-jaune-et-bleu.jpg?v=1711491794",
              alt: "Fun Design 1",
              objectFit: "cover",
            },
          },
          {
            backgroundColor: "#FFFFFF",
            padding: "10px",
            borderRadius: "8px",
            borderWidth: "0",
            borderColor: "transparent",
            dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
            image: {
              url: "https://static.vecteezy.com/system/resources/previews/008/530/266/non_2x/pop-art-comic-background-free-vector.jpg",
              alt: "Fun Design 2",
              objectFit: "cover",
            },
          },
          {
            backgroundColor: "#FFFFFF",
            padding: "10px",
            borderRadius: "8px",
            borderWidth: "0",
            borderColor: "transparent",
            dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
            image: {
              url: "https://freevector-images.s3.amazonaws.com/uploads/vector/preview/124472/vecteezybackground-pop-art-backgroundAW0622_generated.jpg",
              alt: "Fun Design 3",
              objectFit: "cover",
            },
          },
          {
            backgroundColor: "#FFFFFF",
            padding: "10px",
            borderRadius: "8px",
            borderWidth: "0",
            borderColor: "transparent",
            dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
            image: {
              url: "https://thumbs.dreamstime.com/b/closeup-pop-art-comic-book-style-macro-photography-detailed-textures-vibrant-colors-retro-graphic-design-immerse-yourself-360475282.jpg",
              alt: "Fun Design 4",
              objectFit: "cover",
            },
          },
          {
            backgroundColor: "#FFFFFF",
            padding: "10px",
            borderRadius: "8px",
            borderWidth: "0",
            borderColor: "transparent",
            dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
            image: {
              url: "https://m.media-amazon.com/images/I/61jb-sN5xxL._AC_UF894,1000_QL80_.jpg",
              alt: "Fun Design 5",
              objectFit: "cover",
            },
          },
          {
            backgroundColor: "#FFFFFF",
            padding: "10px",
            borderRadius: "8px",
            borderWidth: "0",
            borderColor: "transparent",
            dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
            image: {
              url: "https://previews.123rf.com/images/pixander/pixander2305/pixander230550160/205105485-surprised-boy-in-pop-art-comic-style-vector-illustration.jpg",
              alt: "Fun Design 6",
              objectFit: "cover",
            },
          },
        ],
      },
      cta: {
        title: {
          text: "Ready to Join the Party? 🎉",
          size: "4rem",
          weight: "700",
          color: "#FFFFFF",
        },
        subtitle: {
          text: "Don't miss out on the fun!",
          size: "1.25rem",
          color: "#FFFFFF",
        },
        button: {
          text: "Count Me In! 🎊",
          url: "#",
          color: "#FFD93D",
          textColor: "#2C1810",
          size: "large",
        },
        backgroundColor: "#FF6B9D",
        padding: "80px 20px",
        maxWidth: "800px",
        align: "center",
      },
      footer: {
        text: {
          text: "© 2026 Comic Splash Co. • Made with 💖 and lots of fun!",
          size: "0.875rem",
          weight: "400",
          style: "normal",
          decoration: "none",
          color: "#FFD93D",
        },
        backgroundColor: "#2C1810",
        padding: "40px 20px",
        align: "center",
      },
    },
  },
};

export default comicSplashRefactoredConfig;
