export const sciFiTechConfig = {
  id: "sci-fi-tech",
  name: "Sci-Fi Tech",
  description: "Futuristic clean design with innovative tech aesthetics",
  icon: "🚀",

  layout: ["hero", "features", "about", "cta", "footer"],

  editableFields: [
    // Page Settings
    {
      id: "page.fontFamily",
      label: "Font Family",
      type: "select",
      options: [
        { value: '"Exo 2", sans-serif', label: "Exo 2" },
        { value: '"Michroma", sans-serif', label: "Michroma" },
        { value: '"Space Mono", monospace', label: "Space Mono" },
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

    // About
    { id: "elements.about.heading", label: "About Heading", type: "text" },
    { id: "elements.about.content", label: "About Content", type: "textarea" },

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
          { value: '"Exo 2", sans-serif', label: "Exo 2" },
          { value: '"Michroma", sans-serif', label: "Michroma" },
          { value: '"Space Mono", monospace', label: "Space Mono" },
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
      fontFamily: '"Exo 2", sans-serif',
      backgroundColor: "#0B1120",
      textColor: "#E0E7FF",
    },
    elements: {
      hero: {
        title: "The Future is Now",
        subtitle:
          "Harness the power of next-generation technology. Transform possibilities into reality with AI-driven innovation.",
        buttonText: "Launch Platform →",
        gradientStart: "#4F46E5",
        gradientEnd: "#06B6D4",
        titleColor: "#FFFFFF",
        subtitleColor: "#E0E7FF",
        buttonColor: "#06B6D4",
      },
      features: {
        heading: "Advanced Capabilities",
        backgroundColor: "#111827",
        headingColor: "#FFFFFF",
        featureTitleColor: "#06B6D4",
        featureTextColor: "#9CA3AF",
        items: [
          {
            icon: "◈",
            title: "Quantum Processing",
            description: "Next-gen computational power at your fingertips",
          },
          {
            icon: "◈",
            title: "Neural Networks",
            description: "AI-powered intelligence that learns and adapts",
          },
          {
            icon: "◈",
            title: "Cloud Singularity",
            description: "Seamless integration across all dimensions",
          },
        ],
      },
      about: {
        heading: "Innovation Beyond Boundaries",
        content:
          "We're pioneering the technologies that will define tomorrow. Our mission: push the boundaries of what's possible, merge human creativity with artificial intelligence, and build solutions that transcend current limitations. The future isn't something we wait for—it's something we create.",
        headingColor: "#06B6D4",
        textColor: "#E0E7FF",
      },
      cta: {
        heading: "Ready to Evolve?",
        subheading: "Join the pioneers shaping the future of technology",
        buttonText: "Start Your Journey →",
        backgroundColor: "#1E293B",
        textColor: "#FFFFFF",
        buttonColor: "#4F46E5",
        buttonTextColor: "#FFFFFF",
      },
      footer: {
        text: "© 2026 FutureTech Innovations • Advancing Humanity Forward",
        backgroundColor: "#000000",
        textColor: "#06B6D4",
      },
    },
  },
};
