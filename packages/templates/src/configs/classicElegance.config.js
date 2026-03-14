export const classicEleganceConfig = {
  id: "classic-elegance",
  name: "Classic Elegance",
  description: "Timeless sophistication with traditional design principles",
  icon: "♔",

  layout: ["hero", "about", "features", "cta", "footer"],

  editableFields: [
    // Page Settings
    {
      id: "page.fontFamily",
      label: "Font Family",
      type: "select",
      options: [
        { value: 'Garamond, "Times New Roman", serif', label: "Garamond" },
        { value: '"Playfair Display", Georgia, serif', label: "Playfair" },
        { value: '"Cormorant Garamond", serif', label: "Cormorant" },
        { value: "Georgia, serif", label: "Georgia" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // Hero
    { id: "elements.hero.title", label: "Hero Title", type: "text" },
    { id: "elements.hero.subtitle", label: "Hero Subtitle", type: "textarea" },
    { id: "elements.hero.buttonText", label: "Button Text", type: "text" },

    // About
    { id: "elements.about.heading", label: "About Heading", type: "text" },
    { id: "elements.about.content", label: "About Content", type: "textarea" },

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

    // CTA
    { id: "elements.cta.heading", label: "CTA Heading", type: "text" },
    { id: "elements.cta.subheading", label: "CTA Subheading", type: "text" },
    { id: "elements.cta.buttonText", label: "CTA Button Text", type: "text" },

    // Footer
    { id: "elements.footer.text", label: "Footer Text", type: "text" },
  ],

  configSchema: {
    page: {
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: [
          { value: 'Garamond, "Times New Roman", serif', label: "Garamond" },
          { value: '"Playfair Display", Georgia, serif', label: "Playfair" },
          { value: '"Cormorant Garamond", serif', label: "Cormorant" },
          { value: "Georgia, serif", label: "Georgia" },
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
      about: {
        heading: { type: "text", label: "Section Heading" },
        content: { type: "textarea", label: "About Content" },
        headingColor: { type: "color", label: "Heading Color" },
        textColor: { type: "color", label: "Text Color" },
      },
      features: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        headingColor: { type: "color", label: "Heading Color" },
        featureTitleColor: { type: "color", label: "Feature Title Color" },
        featureTextColor: { type: "color", label: "Feature Text Color" },
        items: { type: "features-list", label: "Features" },
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
      fontFamily: 'Garamond, "Times New Roman", serif',
      backgroundColor: "#FAF8F3",
      textColor: "#2B2B2B",
    },
    elements: {
      hero: {
        title: "Distinguished Excellence Since 1895",
        subtitle:
          "A legacy of refinement, craftsmanship, and timeless quality that transcends generations.",
        buttonText: "Discover Our Heritage",
        backgroundColor: "#8B7355",
        titleColor: "#FAF8F3",
        subtitleColor: "#F5F1E8",
        buttonColor: "#D4AF37",
      },
      about: {
        heading: "Our Distinguished History",
        content:
          "For over a century, we have upheld the finest traditions of excellence and service. Our commitment to quality, attention to detail, and dedication to our craft have remained unwavering through the ages. Every piece we create tells a story of heritage, passion, and timeless elegance.",
        headingColor: "#8B7355",
        textColor: "#2B2B2B",
      },
      features: {
        heading: "Hallmarks of Excellence",
        backgroundColor: "#F5F1E8",
        headingColor: "#8B7355",
        featureTitleColor: "#2B2B2B",
        featureTextColor: "#5A5A5A",
        items: [
          {
            icon: "◆",
            title: "Artisan Craftsmanship",
            description:
              "Handcrafted with meticulous attention to every detail",
          },
          {
            icon: "◆",
            title: "Heritage & Tradition",
            description: "Time-honored methods passed through generations",
          },
          {
            icon: "◆",
            title: "Premium Quality",
            description: "Only the finest materials, sourced with care",
          },
        ],
      },
      cta: {
        heading: "Experience Timeless Elegance",
        subheading: "Join our distinguished clientele and discover excellence",
        buttonText: "Request Consultation",
        backgroundColor: "#2B2B2B",
        textColor: "#FAF8F3",
        buttonColor: "#D4AF37",
        buttonTextColor: "#2B2B2B",
      },
      footer: {
        text: "© MMXXVI • Established 1895 • A Tradition of Excellence",
        backgroundColor: "#8B7355",
        textColor: "#FAF8F3",
      },
    },
  },
};
