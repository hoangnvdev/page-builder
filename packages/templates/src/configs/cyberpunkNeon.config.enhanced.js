export const cyberpunkNeonConfig = {
  id: "cyberpunk-neon",
  name: "Cyberpunk Neon",
  description: "Futuristic dark theme with neon accents and cyberpunk vibes",
  icon: "🌃",

  layout: [
    "hero",
    "terminal",
    "stats",
    "features",
    "dataStream",
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
        { value: '"Orbitron", sans-serif', label: "Orbitron" },
        { value: '"Share Tech Mono", monospace', label: "Share Tech Mono" },
        { value: '"Rajdhani", sans-serif', label: "Rajdhani" },
        { value: "system-ui, sans-serif", label: "System" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // Hero
    { id: "elements.hero.title", label: "Hero Title", type: "text" },
    { id: "elements.hero.subtitle", label: "Hero Subtitle", type: "textarea" },
    { id: "elements.hero.buttonText", label: "Button Text", type: "text" },
    { id: "elements.hero.titleColor", label: "Title Color", type: "color" },
    { id: "elements.hero.buttonColor", label: "Button Color", type: "color" },

    // Terminal
    {
      id: "elements.terminal.heading",
      label: "Terminal Heading",
      type: "text",
    },
    {
      id: "elements.terminal.backgroundColor",
      label: "Terminal Background",
      type: "color",
    },
    {
      id: "elements.terminal.promptColor",
      label: "Prompt Color",
      type: "color",
    },
    {
      id: "elements.terminal.responseColor",
      label: "Response Color",
      type: "color",
    },

    // Stats
    { id: "elements.stats.heading", label: "Stats Heading", type: "text" },
    {
      id: "elements.stats.backgroundColor",
      label: "Stats Background",
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

    // Data Stream
    {
      id: "elements.dataStream.heading",
      label: "Data Stream Heading",
      type: "text",
    },
    {
      id: "elements.dataStream.backgroundColor",
      label: "Data Stream Background",
      type: "color",
    },
    {
      id: "elements.dataStream.textColor",
      label: "Data Stream Text Color",
      type: "color",
    },

    // CTA
    { id: "elements.cta.heading", label: "CTA Heading", type: "text" },
    { id: "elements.cta.subheading", label: "CTA Subheading", type: "text" },
    { id: "elements.cta.buttonText", label: "CTA Button Text", type: "text" },
    {
      id: "elements.cta.backgroundColor",
      label: "CTA Background",
      type: "color",
    },
    { id: "elements.cta.buttonColor", label: "Button Color", type: "color" },

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
        title: { type: "text", label: "Hero Title" },
        subtitle: { type: "textarea", label: "Hero Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        gradientStart: { type: "color", label: "Gradient Start" },
        gradientEnd: { type: "color", label: "Gradient End" },
        titleColor: { type: "color", label: "Title Color" },
        buttonColor: { type: "color", label: "Button Color" },
      },
      terminal: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        promptColor: { type: "color", label: "Prompt Color" },
        responseColor: { type: "color", label: "Response Color" },
        commands: { type: "array", label: "Terminal Commands" },
      },
      stats: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        items: { type: "array", label: "Stats Items" },
      },
      features: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        items: { type: "features-list", label: "Features" },
      },
      dataStream: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
        lines: { type: "array", label: "Data Lines" },
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
      fontFamily: '"Orbitron", sans-serif',
      backgroundColor: "#0a0a0f",
      textColor: "#00ff9f",
    },
    elements: {
      hero: {
        title: "WELCOME TO THE FUTURE",
        subtitle: "Break free from the system. Experience next-gen innovation.",
        buttonText: "JACK IN >>",
        gradientStart: "#d946ef",
        gradientEnd: "#7c3aed",
        titleColor: "#00ff9f",
        buttonColor: "#ff0080",
      },
      terminal: {
        heading: "> SYSTEM_INITIALIZE...",
        commands: [
          {
            prompt: "$ connect --server mainframe",
            response: "Connection established...",
          },
          {
            prompt: "$ status --check",
            response: "All systems operational. Welcome, User.",
          },
          {
            prompt: "$ help",
            response: "Ready for your commands. Type anything.",
          },
        ],
        backgroundColor: "#0f0f1a",
        promptColor: "#00ff9f",
        responseColor: "#8b8bff",
      },
      stats: {
        heading: "// SYSTEM METRICS",
        backgroundColor: "#000000",
        items: [
          { value: "99.9%", label: "UPTIME", color: "#00ff9f" },
          { value: "10K+", label: "USERS_CONNECTED", color: "#ff0080" },
          { value: "< 50ms", label: "RESPONSE_TIME", color: "#d946ef" },
          { value: "256-BIT", label: "ENCRYPTION", color: "#7c3aed" },
        ],
      },
      features: {
        heading: "> CORE_FEATURES_",
        backgroundColor: "#0f0f1a",
        items: [
          {
            icon: "◢",
            title: "NEURAL INTERFACE",
            description: "Direct consciousness link",
          },
          {
            icon: "◣",
            title: "QUANTUM SECURITY",
            description: "Unhackable protection",
          },
          {
            icon: "◤",
            title: "NEON SPEED",
            description: "Reality-breaking performance",
          },
        ],
      },
      dataStream: {
        heading: "// DATA_FLOW",
        lines: [
          "0x7F3A9B2E...",
          "ENCRYPT::256BIT",
          "NODE_STATUS:ACTIVE",
          "SYNC::COMPLETE",
        ],
        backgroundColor: "#1a0a2e",
        textColor: "#00ff9f",
      },
      cta: {
        heading: "// READY TO REBEL?",
        subheading: "Join the underground. The revolution is now.",
        buttonText: "INITIALIZE >>",
        backgroundColor: "#1a0a2e",
        buttonColor: "#ff0080",
      },
      footer: {
        text: "© 2077 NeonCorp • ENCRYPTED • ANONYMOUS",
        backgroundColor: "#000000",
        textColor: "#00ff9f",
      },
    },
  },
};
