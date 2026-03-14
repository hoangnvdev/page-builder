export const swissBrutalistConfig = {
  id: "swiss-brutalist",
  name: "Swiss Brutalist",
  description: "Bold minimalist design with strong typography",
  icon: "▓",

  layout: [
    "hero",
    "splitScreen",
    "quoteBlock",
    "features",
    "imageGrid",
    "footer",
  ],

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
        { value: '"Arial", sans-serif', label: "Arial" },
        { value: '"Roboto", sans-serif', label: "Roboto" },
        { value: "system-ui, sans-serif", label: "System" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // Hero
    { id: "elements.hero.title", label: "Hero Title", type: "textarea" },
    { id: "elements.hero.subtitle", label: "Hero Subtitle", type: "text" },
    { id: "elements.hero.buttonText", label: "Button Text", type: "text" },
    {
      id: "elements.hero.backgroundColor",
      label: "Hero Background",
      type: "color",
    },
    { id: "elements.hero.titleColor", label: "Title Color", type: "color" },
    { id: "elements.hero.buttonColor", label: "Button Color", type: "color" },

    // Split Screen
    {
      id: "elements.splitScreen.heading",
      label: "Split Screen Heading",
      type: "text",
    },
    {
      id: "elements.splitScreen.content",
      label: "Split Screen Content",
      type: "textarea",
    },
    {
      id: "elements.splitScreen.backgroundColor",
      label: "Split Screen Background",
      type: "color",
    },
    {
      id: "elements.splitScreen.textColor",
      label: "Text Color",
      type: "color",
    },

    // Quote Block
    { id: "elements.quoteBlock.quote", label: "Quote Text", type: "textarea" },
    { id: "elements.quoteBlock.author", label: "Quote Author", type: "text" },
    {
      id: "elements.quoteBlock.backgroundColor",
      label: "Quote Background",
      type: "color",
    },
    {
      id: "elements.quoteBlock.quoteColor",
      label: "Quote Color",
      type: "color",
    },
    {
      id: "elements.quoteBlock.dividerColor",
      label: "Divider Color",
      type: "color",
    },

    // Features
    {
      id: "elements.features.heading",
      label: "Features Heading",
      type: "text",
    },
    {
      id: "elements.features.backgroundColor",
      label: "Features Background",
      type: "color",
    },
    {
      id: "elements.features.items",
      label: "Features List",
      type: "features-list",
    },

    // Image Grid
    {
      id: "elements.imageGrid.heading",
      label: "Image Grid Heading",
      type: "text",
    },
    {
      id: "elements.imageGrid.backgroundColor",
      label: "Image Grid Background",
      type: "color",
    },

    // Footer
    { id: "elements.footer.text", label: "Footer Text", type: "text" },
    {
      id: "elements.footer.backgroundColor",
      label: "Footer Background",
      type: "color",
    },
    {
      id: "elements.footer.textColor",
      label: "Footer Text Color",
      type: "color",
    },
  ],

  configSchema: {
    page: {
      fontFamily: { type: "select", label: "Font Family" },
      backgroundColor: { type: "color", label: "Page Background" },
      textColor: { type: "color", label: "Page Text Color" },
    },
    elements: {
      hero: {
        title: { type: "textarea", label: "Hero Title" },
        subtitle: { type: "text", label: "Hero Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        titleColor: { type: "color", label: "Title Color" },
        buttonColor: { type: "color", label: "Button Color" },
      },
      splitScreen: {
        heading: { type: "text", label: "Heading" },
        content: { type: "textarea", label: "Content" },
        imagePosition: { type: "select", label: "Image Position" },
        imagePlaceholder: { type: "text", label: "Image Placeholder" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
      },
      quoteBlock: {
        quote: { type: "textarea", label: "Quote Text" },
        author: { type: "text", label: "Author" },
        backgroundColor: { type: "color", label: "Background Color" },
        quoteColor: { type: "color", label: "Quote Color" },
        dividerColor: { type: "color", label: "Divider Color" },
      },
      features: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        items: { type: "features-list", label: "Features" },
      },
      imageGrid: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        images: { type: "array", label: "Images" },
        columns: { type: "number", label: "Columns" },
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
        subtitle: "Pure design. No compromise.",
        buttonText: "EXPLORE",
        backgroundColor: "#FF0000",
        titleColor: "#FFFFFF",
        buttonColor: "#000000",
      },
      splitScreen: {
        imagePosition: "left",
        imagePlaceholder: "▓▓▓▓▓▓▓▓",
        heading: "PRECISION",
        content:
          "Every element serves a purpose. Every space has meaning. This is design stripped to its essence.",
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
      },
      quoteBlock: {
        quote: "LESS IS MORE",
        author: "MIES VAN DER ROHE",
        backgroundColor: "#000000",
        quoteColor: "#FFFFFF",
        dividerColor: "#FF0000",
      },
      features: {
        heading: "PRINCIPLES",
        backgroundColor: "#000000",
        items: [
          {
            icon: "□",
            title: "GRID SYSTEM",
            description: "Mathematical precision",
          },
          {
            icon: "▭",
            title: "TYPOGRAPHY",
            description: "Helvetica. Bold. Clear.",
          },
          { icon: "▬", title: "CONTRAST", description: "Black. White. Red." },
        ],
      },
      imageGrid: {
        heading: "WORK",
        images: [
          { placeholder: "▓▓▓", alt: "Project 1" },
          { placeholder: "▓▓▓", alt: "Project 2" },
          { placeholder: "▓▓▓", alt: "Project 3" },
          { placeholder: "▓▓▓", alt: "Project 4" },
        ],
        backgroundColor: "#F5F5F5",
        columns: 2,
      },
      footer: {
        text: "© 2026 SWISS DESIGN STUDIOS",
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
      },
    },
  },
};
