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
    "testimonials",
    "cta",
    "footer",
  ],

  editableFields: [
    // Page Settings
    {
      id: "page.fontFamily",
      label: "Font Family",
      type: "select",
      options: [
        { value: '"Comic Sans MS", "Chalkboard SE", cursive', label: "Comic" },
        { value: '"Bangers", cursive', label: "Bangers" },
        { value: '"Fredoka One", cursive', label: "Fredoka" },
        { value: "system-ui, sans-serif", label: "System" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // Hero
    { id: "elements.hero.title", label: "Hero Title", type: "text" },
    { id: "elements.hero.subtitle", label: "Hero Subtitle", type: "textarea" },
    { id: "elements.hero.buttonText", label: "Button Text", type: "text" },

    // Marquee
    { id: "elements.marquee.text", label: "Marquee Text", type: "text" },

    // Comic Panels
    {
      id: "elements.comicPanels.heading",
      label: "Panels Heading",
      type: "text",
    },
    {
      id: "elements.comicPanels.panels",
      label: "Panels List",
      type: "panels-list",
    },

    // Features
    {
      id: "elements.features.heading",
      label: "Features Heading",
      type: "text",
    },
    {
      id: "elements.features.items",
      label: "Features List",
      type: "features-list",
    },

    // Testimonials
    {
      id: "elements.testimonials.heading",
      label: "Testimonials Heading",
      type: "text",
    },
    {
      id: "elements.testimonials.quotes",
      label: "Quotes List",
      type: "testimonials-list",
    },

    // CTA
    { id: "elements.cta.heading", label: "CTA Heading", type: "text" },
    { id: "elements.cta.subheading", label: "CTA Subheading", type: "text" },
    { id: "elements.cta.buttonText", label: "CTA Button Text", type: "text" },

    // Footer
    { id: "elements.footer.text", label: "Footer Text", type: "text" },
  ],

  configSchema: {
    page: {
      fontFamily: { type: "select", label: "Font Family" },
      backgroundColor: { type: "color", label: "Page Background" },
      textColor: { type: "color", label: "Page Text Color" },
    },
    elements: {
      hero: {
        title: { type: "text", label: "Hero Title" },
        subtitle: { type: "textarea", label: "Hero Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        titleColor: { type: "color", label: "Title Color" },
        buttonColor: { type: "color", label: "Button Color" },
      },
      marquee: {
        text: { type: "text", label: "Announcement Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
      },
      comicPanels: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        panels: { type: "panels-list", label: "Comic Panels" },
      },
      features: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        items: { type: "features-list", label: "Features" },
      },
      testimonials: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        quotes: { type: "testimonials-list", label: "Customer Quotes" },
      },
      cta: {
        heading: { type: "text", label: "Heading" },
        subheading: { type: "text", label: "Subheading" },
        buttonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        buttonColor: { type: "color", label: "Button Color" },
      },
      footer: {
        text: { type: "text", label: "Footer Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
      },
    },
  },

  defaultConfig: {
    page: {
      fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
      backgroundColor: "#FFF5E1",
      textColor: "#2C1810",
    },
    elements: {
      hero: {
        title: "💥 BAM! Welcome to Our World! 💥",
        subtitle: "Get ready for an adventure that'll blow your socks off!",
        buttonText: "Let's Go! 🚀",
        backgroundColor: "#FF6B9D",
        titleColor: "#FFFFFF",
        subtitleColor: "#FFF5E1",
        buttonColor: "#FFD93D",
      },
      marquee: {
        text: "⚡ SPECIAL OFFER! ⚡ JOIN TODAY AND GET 50% OFF! ⚡ LIMITED TIME ONLY! ⚡",
        backgroundColor: "#FFD93D",
        textColor: "#2C1810",
      },
      comicPanels: {
        heading: "📖 Our Epic Story 📖",
        backgroundColor: "#FFF5E1",
        headingColor: "#FF6B9D",
        panels: [
          {
            number: "1",
            title: "The Beginning",
            content: "It all started with a crazy idea and a dream...",
            backgroundColor: "#FF6B9D",
          },
          {
            number: "2",
            title: "The Challenge",
            content: "We faced obstacles, but never gave up!",
            backgroundColor: "#6BCB77",
          },
          {
            number: "3",
            title: "The Victory",
            content: "Today, we're making dreams come true!",
            backgroundColor: "#4D96FF",
          },
          {
            number: "4",
            title: "Your Turn!",
            content: "Now it's YOUR time to shine with us!",
            backgroundColor: "#FFD93D",
          },
        ],
      },
      features: {
        heading: "⭐ Super Powers ⭐",
        backgroundColor: "#6BCB77",
        headingColor: "#FFFFFF",
        featureTitleColor: "#FFD93D",
        featureTextColor: "#2C1810",
        items: [
          {
            icon: "🎨",
            title: "Creative Blast",
            description: "Unleash your creativity!",
          },
          {
            icon: "⚡",
            title: "Lightning Speed",
            description: "Fast as a superhero!",
          },
          {
            icon: "🎪",
            title: "Fun Factory",
            description: "Work feels like play!",
          },
        ],
      },
      testimonials: {
        heading: "💬 What People Are Saying 💬",
        backgroundColor: "#4D96FF",
        headingColor: "#FFFFFF",
        bubbleColor: "#FFFFFF",
        textColor: "#2C1810",
        quotes: [
          {
            text: "This is AMAZING! Changed my life!",
            author: "Sarah Super",
            avatar: "😄",
          },
          {
            text: "SO MUCH FUN! Can't stop using it!",
            author: "Mike Mighty",
            avatar: "🤩",
          },
          {
            text: "My kids LOVE it! Five stars!",
            author: "Jenny Joy",
            avatar: "🌟",
          },
        ],
      },
      cta: {
        heading: "Ready to Join the Party? 🎉",
        subheading: "Don't miss out on the fun!",
        buttonText: "Count Me In! 🎊",
        backgroundColor: "#FF6B9D",
        textColor: "#FFFFFF",
        buttonColor: "#FFD93D",
        buttonTextColor: "#2C1810",
      },
      footer: {
        text: "© 2026 Comic Splash Co. • Made with 💖 and lots of fun!",
        backgroundColor: "#2C1810",
        textColor: "#FFD93D",
      },
    },
  },
};
