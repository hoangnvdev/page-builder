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
    {
      id: "elements.hero.backgroundColor",
      label: "Hero Background",
      type: "color",
    },
    { id: "elements.hero.titleColor", label: "Title Color", type: "color" },
    {
      id: "elements.hero.subtitleColor",
      label: "Subtitle Color",
      type: "color",
    },
    { id: "elements.hero.buttonColor", label: "Button Color", type: "color" },

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
    {
      id: "elements.features.backgroundColor",
      label: "Features Background",
      type: "color",
    },

    // About
    { id: "elements.about.heading", label: "About Heading", type: "text" },
    { id: "elements.about.content", label: "About Content", type: "textarea" },

    // CTA
    { id: "elements.cta.heading", label: "CTA Heading", type: "text" },
    { id: "elements.cta.subheading", label: "CTA Subheading", type: "text" },
    { id: "elements.cta.buttonText", label: "CTA Button Text", type: "text" },

    // Footer
    { id: "elements.footer.text", label: "Footer Text", type: "text" },
    {
      id: "elements.footer.backgroundColor",
      label: "Footer Background",
      type: "color",
    },
  ],

  configSchema: {
    page: {
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: [
          {
            value: '"Comic Sans MS", "Chalkboard SE", cursive',
            label: "Comic",
          },
          { value: '"Bangers", cursive', label: "Bangers" },
          { value: '"Fredoka One", cursive', label: "Fredoka" },
          { value: "system-ui, sans-serif", label: "System" },
        ],
      },
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
        subtitleColor: { type: "color", label: "Subtitle Color" },
        buttonColor: { type: "color", label: "Button Color" },
      },
      features: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        headingColor: { type: "color", label: "Heading Color" },
        featureTitleColor: { type: "color", label: "Feature Title Color" },
        featureTextColor: { type: "color", label: "Feature Text Color" },
        items: { type: "features-list", label: "Features" },
      },
      about: {
        heading: { type: "text", label: "Section Heading" },
        content: { type: "textarea", label: "About Content" },
        headingColor: { type: "color", label: "Heading Color" },
        textColor: { type: "color", label: "Text Color" },
      },
      cta: {
        heading: { type: "text", label: "Heading" },
        subheading: { type: "text", label: "Subheading" },
        buttonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
        buttonColor: { type: "color", label: "Button Color" },
        buttonTextColor: { type: "color", label: "Button Text Color" },
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
        subtitle:
          "Get ready for an adventure that'll blow your socks off! We're here to make your dreams come true with a splash of fun and a whole lot of awesome!",
        buttonText: "Let's Go! 🚀",
        backgroundColor: "#FF6B9D",
        titleColor: "#FFFFFF",
        subtitleColor: "#FFF5E1",
        buttonColor: "#FFD93D",
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
            description: "Unleash your creativity with our colorful tools!",
          },
          {
            icon: "⚡",
            title: "Lightning Speed",
            description: "Fast as a superhero, because ain't nobody got time!",
          },
          {
            icon: "🎪",
            title: "Fun Factory",
            description: "Work feels like play when you're with us!",
          },
        ],
      },
      about: {
        heading: "🌈 Our Story 🌈",
        content:
          "Born from a lightning bolt of inspiration and a cup of magical coffee, we decided to shake things up! We believe work should be fun, colors should be bold, and every day should feel like an adventure comic!",
        headingColor: "#FF6B9D",
        textColor: "#2C1810",
      },
      cta: {
        heading: "Ready to Join the Party? 🎉",
        subheading: "Don't miss out on the fun! Click that button NOW!",
        buttonText: "Count Me In! 🎊",
        backgroundColor: "#4D96FF",
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
