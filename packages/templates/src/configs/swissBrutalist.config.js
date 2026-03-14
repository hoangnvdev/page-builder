export const swissBrutalistConfig = {
  id: "swiss-brutalist",
  name: "Swiss Brutalist",
  description:
    "Bold minimalist design with strong typography and geometric layouts",
  icon: "▓",

  layout: ["hero", "about", "features", "footer"],

  editableFields: [
    // Page Settings
    {
      id: "page.fontFamily",
      label: "Font Family",
      type: "select",
      options: [
        {
          value: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          label: "Helvetica",
        },
        { value: '"Roboto Mono", monospace', label: "Roboto Mono" },
        { value: '"Inter", sans-serif', label: "Inter" },
        { value: "system-ui, sans-serif", label: "System" },
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

    // Footer
    { id: "elements.footer.text", label: "Footer Text", type: "text" },
  ],

  configSchema: {
    page: {
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: [
          {
            value: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            label: "Helvetica",
          },
          { value: '"Roboto Mono", monospace', label: "Roboto Mono" },
          { value: '"Inter", sans-serif', label: "Inter" },
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
      footer: {
        text: { type: "text", label: "Footer Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
      },
    },
  },

  defaultConfig: {
    page: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      backgroundColor: "#FFFFFF",
      textColor: "#000000",
    },
    elements: {
      hero: {
        title: "FORM\nFOLLOWS\nFUNCTION",
        subtitle: "Pure design. No compromise. Maximum impact.",
        buttonText: "EXPLORE",
        backgroundColor: "#FF0000",
        titleColor: "#FFFFFF",
        subtitleColor: "#FFFFFF",
        buttonColor: "#000000",
      },
      about: {
        heading: "PHILOSOPHY",
        content:
          "We strip away the unnecessary. We embrace the grid. We let typography speak. Every element serves a purpose. Every space has meaning. This is design in its purest form.",
        headingColor: "#000000",
        textColor: "#000000",
      },
      features: {
        heading: "PRINCIPLES",
        backgroundColor: "#000000",
        headingColor: "#FFFFFF",
        featureTitleColor: "#FFFFFF",
        featureTextColor: "#CCCCCC",
        items: [
          {
            icon: "□",
            title: "GRID SYSTEM",
            description: "Mathematically precise layouts. Everything aligns.",
          },
          {
            icon: "▭",
            title: "TYPOGRAPHY FIRST",
            description: "Helvetica. Sans-serif. Bold. Clear. Direct.",
          },
          {
            icon: "▬",
            title: "CONTRAST",
            description: "Black. White. Red. Nothing else needed.",
          },
        ],
      },
      footer: {
        text: "© 2026 SWISS DESIGN STUDIO / ALL RIGHTS RESERVED",
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
      },
    },
  },
};
