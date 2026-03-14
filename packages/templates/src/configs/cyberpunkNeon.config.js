export const cyberpunkNeonConfig = {
  id: "cyberpunk-neon",
  name: "Cyberpunk Neon",
  description: "Futuristic dark theme with neon accents and cyberpunk vibes",
  icon: "🌃",

  layout: ["hero", "features", "cta", "footer"],

  editableFields: [
    // Page Settings
    {
      id: "page.fontFamily",
      label: "Font Family",
      type: "select",
      options: [
        { value: '"Orbitron", sans-serif', label: "Orbitron" },
        { value: '"Rajdhani", sans-serif', label: "Rajdhani" },
        { value: '"Share Tech Mono", monospace', label: "Tech Mono" },
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
      id: "elements.hero.gradientStart",
      label: "Gradient Start",
      type: "color",
    },
    { id: "elements.hero.gradientEnd", label: "Gradient End", type: "color" },
    { id: "elements.hero.titleColor", label: "Title Color", type: "color" },
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
          { value: '"Orbitron", sans-serif', label: "Orbitron" },
          { value: '"Rajdhani", sans-serif', label: "Rajdhani" },
          { value: '"Share Tech Mono", monospace', label: "Tech Mono" },
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
        gradientStart: { type: "color", label: "Gradient Start" },
        gradientEnd: { type: "color", label: "Gradient End" },
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
      fontFamily: '"Orbitron", sans-serif',
      backgroundColor: "#0a0a0f",
      textColor: "#00ff9f",
    },
    elements: {
      hero: {
        title: "WELCOME TO THE FUTURE",
        subtitle:
          "Break free from the system. Experience the next generation of digital innovation.",
        buttonText: "JACK IN >>",
        gradientStart: "#d946ef",
        gradientEnd: "#7c3aed",
        titleColor: "#00ff9f",
        subtitleColor: "#c4c4ff",
        buttonColor: "#ff0080",
      },
      features: {
        heading: "> SYSTEM FEATURES_",
        backgroundColor: "#0f0f1a",
        headingColor: "#00ff9f",
        featureTitleColor: "#ff0080",
        featureTextColor: "#8b8bff",
        items: [
          {
            icon: "◢",
            title: "NEURAL INTERFACE",
            description: "Direct connection to your digital consciousness",
          },
          {
            icon: "◣",
            title: "QUANTUM SECURITY",
            description: "Unhackable protection in the digital wasteland",
          },
          {
            icon: "◤",
            title: "NEON SPEED",
            description: "Performance that breaks reality barriers",
          },
        ],
      },
      cta: {
        heading: "// READY TO REBEL?",
        subheading: "Join the underground. The revolution is now.",
        buttonText: "INITIALIZE >>",
        backgroundColor: "#1a0a2e",
        textColor: "#00ff9f",
        buttonColor: "#ff0080",
        buttonTextColor: "#0a0a0f",
      },
      footer: {
        text: "© 2077 NeonCorp • ENCRYPTED • ANONYMOUS • FREE",
        backgroundColor: "#000000",
        textColor: "#00ff9f",
      },
    },
  },
};
