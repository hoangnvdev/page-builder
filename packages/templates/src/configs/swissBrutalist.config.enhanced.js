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
