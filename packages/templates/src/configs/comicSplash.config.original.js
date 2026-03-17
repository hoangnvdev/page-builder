import {
  alignOptions,
  borderRadiusOptions,
  buttonSizeOptions,
  cardContentSchema,
  cardSchema,
  cardTitleSchema,
  color,
  contentMaxWidthOptions,
  dropShadowOptions,
  fontFamilyOptions,
  footerPaddingOptions,
  footerTextSizeOptions,
  gapOptions,
  headingSchema,
  headingSizeOptions,
  languageOptions,
  marqueePaddingOptions,
  marqueeSpeedOptions,
  sectionPaddingOptions,
  sectionSchema,
  slider,
  subtitleSizeOptions,
  text,
  textarea,
  textDecorationOptions,
  textSizeOptions,
  weightOptions,
} from "../utils/index.js";

export const comicSplashConfig = {
  id: "comic-splash",
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
    page: {
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: fontFamilyOptions,
      },
      title: {
        type: "text",
        label: "Page Title (Browser Tab)",
      },
      description: {
        type: "textarea",
        label: "Meta Description (SEO)",
      },
      keywords: {
        type: "text",
        label: "Meta Keywords (comma-separated)",
      },
      author: {
        type: "text",
        label: "Author",
      },
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
            { value: "600px", label: "Small" },
            { value: "800px", label: "Medium" },
            { value: "1000px", label: "Large" },
            { value: "100%", label: "Full" },
          ],
        },
        title: {
          text: text("Title"),
          color: color("Title Color"),
          size: {
            type: "select",
            label: "Title Size",
            options: [
              { value: "2rem", label: "Small" },
              { value: "3rem", label: "Medium" },
              { value: "4rem", label: "Large" },
            ],
          },
        },
        subtitle: {
          text: textarea("Subtitle"),
          color: color("Subtitle Color"),
          size: {
            type: "select",
            label: "Subtitle Size",
            options: subtitleSizeOptions,
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
      marquee: {
        text: text("Marquee Text"),
        backgroundColor: color("Background Color"),
        textColor: color("Text Color"),
        padding: {
          type: "select",
          label: "Padding",
          options: marqueePaddingOptions,
        },
        speed: {
          type: "select",
          label: "Animation Speed",
          options: marqueeSpeedOptions,
        },
      },
      comicPanels: {
        ...sectionSchema(),
        columns: slider("Columns", 1, 6),
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
        panels: { type: "array", label: "Comic Panels" },
      },
      features: {
        ...sectionSchema(),
        columns: slider("Columns", 1, 6),
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
        items: { type: "array", label: "Features" },
      },
      stats: {
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
        ...sectionSchema(),
        columns: slider("Columns", 1, 6),
        gap: {
          type: "select",
          label: "Gap Between Cards",
          options: gapOptions,
        },
        card: {
          ...cardSchema(),
          borderRadius: {
            type: "select",
            label: "Border Radius",
            options: [
              { value: "0", label: "None" },
              ...borderRadiusOptions.slice(1),
            ],
          },
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
          content: {
            text: textarea("Textarea"),
            size: {
              type: "select",
              label: "Text Size",
              options: textSizeOptions,
            },
            weight: {
              type: "select",
              label: "Text Weight",
              options: weightOptions,
            },
            color: color("Text Color"),
          },
        },
        items: { type: "array", label: "Stats" },
      },
      testimonials: {
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
        ...sectionSchema(),
        columns: slider("Columns", 1, 4),
        gap: {
          type: "select",
          label: "Gap Between Cards",
          options: [
            { value: "15px", label: "Small" },
            { value: "20px", label: "Medium" },
            { value: "30px", label: "Large" },
          ],
        },
        card: {
          backgroundColor: color("Background Color"),
          padding: {
            type: "select",
            label: "Padding",
            options: [
              { value: "15px", label: "Small" },
              { value: "25px", label: "Medium" },
              { value: "35px", label: "Large" },
            ],
          },
          align: { type: "select", label: "Alignment", options: alignOptions },
          borderRadius: {
            type: "select",
            label: "Border Radius",
            options: [
              { value: "0", label: "None" },
              ...borderRadiusOptions.slice(1),
            ],
          },
          dropShadow: {
            type: "select",
            label: "Drop Shadow",
            options: dropShadowOptions,
          },
          avatar: {
            text: text("Avatar"),
            size: {
              type: "select",
              label: "Size",
              options: [
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
                { value: "xlarge", label: "Extra Large" },
              ],
            },
            backgroundColor: color("Background Color"),
          },
          title: {
            text: textarea("Title"),
            size: {
              type: "select",
              label: "Title Size",
              options: [
                { value: "0.875rem", label: "Small" },
                { value: "1rem", label: "Medium" },
                { value: "1.125rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Title Weight",
              options: weightOptions,
            },
            color: color("Title Color"),
          },
          content: {
            text: text("Textarea"),
            size: {
              type: "select",
              label: "Text Size",
              options: [
                { value: "0.75rem", label: "Small" },
                { value: "0.875rem", label: "Medium" },
                { value: "1rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Text Weight",
              options: weightOptions,
            },
            color: color("Text Color"),
          },
        },
        quotes: { type: "array", label: "Testimonials" },
      },
      imageGrid: {
        label: "Image Grid",
        heading: {
          text: text("Heading"),
          size: {
            type: "select",
            label: "Heading Size",
            options: headingSizeOptions,
          },
          weight: {
            type: "select",
            label: "Heading Weight",
            options: [
              { value: "400", label: "Normal" },
              { value: "600", label: "Semi Bold" },
              { value: "700", label: "Bold" },
            ],
          },
          color: color("Heading Color"),
        },
        ...sectionSchema(),
        columns: slider("Columns", 1, 6),
        gap: {
          type: "select",
          label: "Gap",
          options: [
            { value: "15px", label: "Small" },
            { value: "20px", label: "Medium" },
            { value: "30px", label: "Large" },
          ],
        },
        // Template for individual image items (images.0)
        image: {
          // Card-level properties
          backgroundColor: color("Card Background"),
          padding: {
            type: "select",
            label: "Padding",
            options: [
              { value: "5px", label: "Small" },
              { value: "10px", label: "Medium" },
              { value: "15px", label: "Large" },
            ],
          },
          borderRadius: {
            type: "select",
            label: "Border Radius",
            options: [
              { value: "0px", label: "None" },
              { value: "8px", label: "Small" },
              { value: "12px", label: "Medium" },
              { value: "16px", label: "Large" },
            ],
          },
          dropShadow: {
            type: "select",
            label: "Drop Shadow",
            options: [
              { value: "none", label: "None" },
              { value: "light", label: "Light" },
              { value: "medium", label: "Medium" },
              { value: "heavy", label: "Heavy" },
            ],
          },
          // Nested image properties (images.0.image)
          image: {
            url: text("Image URL"),
            alt: text("Alt Text"),
            fit: {
              type: "select",
              label: "Image Fit",
              options: [
                { value: "cover", label: "Cover" },
                { value: "contain", label: "Contain" },
                { value: "fill", label: "Fill" },
              ],
            },
            aspectRatio: {
              type: "select",
              label: "Aspect Ratio",
              options: [
                { value: "square", label: "Square (1:1)" },
                { value: "portrait", label: "Portrait (3:4)" },
                { value: "landscape", label: "Landscape (16:9)" },
              ],
            },
          },
          // Nested caption properties (images.0.caption)
          caption: {
            text: textarea("Caption"),
            size: {
              type: "select",
              label: "Size",
              options: [
                { value: "0.75rem", label: "Small" },
                { value: "0.875rem", label: "Medium" },
                { value: "1rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Weight",
              options: [
                { value: "400", label: "Normal" },
                { value: "500", label: "Medium" },
                { value: "600", label: "Semi Bold" },
              ],
            },
            color: color("Color"),
            textAlign: {
              type: "select",
              label: "Text Align",
              options: alignOptions,
            },
            backgroundColor: color("Background"),
          },
        },
        images: { type: "array", label: "Images" },
      },
      cta: {
        label: "Call To Action",
        title: {
          text: text("Title"),
          size: {
            type: "select",
            label: "Title Size",
            options: [
              { value: "2rem", label: "Small" },
              { value: "3rem", label: "Medium" },
              { value: "4rem", label: "Large" },
            ],
          },
          weight: {
            type: "select",
            label: "Title Weight",
            options: [
              { value: "400", label: "Normal" },
              { value: "500", label: "Medium" },
              { value: "700", label: "Bold" },
            ],
          },
          color: color("Title Color"),
        },
        subtitle: {
          text: textarea("Subtitle"),
          size: {
            type: "select",
            label: "Subtitle Size",
            options: subtitleSizeOptions,
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
          options: contentMaxWidthOptions,
        },
        align: { type: "select", label: "Alignment", options: alignOptions },
      },
      footer: {
        label: "Footer",
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
            options: [
              { value: "400", label: "Normal" },
              { value: "500", label: "Medium" },
              { value: "700", label: "Bold" },
            ],
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
      fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
      title: "My Awesome Page",
      description:
        "Create amazing websites with our fun and playful comic-style template. Perfect for creative projects and portfolios.",
      keywords: "page builder, website, creative, portfolio, comic style",
      author: "",
      language: "en",
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
        padding: "80px 20px",
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
        numberOfCards: 4,
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
          avatar: {
            text: "",
            size: "large",
            backgroundColor: "transparent",
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
            avatar: {
              text: "😄",
              size: "large",
              backgroundColor: "transparent",
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
            avatar: {
              text: "🤩",
              size: "large",
              backgroundColor: "transparent",
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
            avatar: {
              text: "🌟",
              size: "large",
              backgroundColor: "transparent",
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
        align: "center",
        columns: 3,
        gap: "20px",
        image: {
          backgroundColor: "#FFFFFF",
          padding: "10px",
          borderRadius: "8px",
          dropShadow: "light",
        },
        images: [
          {
            image: {
              url: "",
              alt: "Fun Design 1",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "",
              alt: "Fun Design 2",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "",
              alt: "Fun Design 3",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "",
              alt: "Fun Design 4",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "",
              alt: "Fun Design 5",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "",
              alt: "Fun Design 6",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
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
