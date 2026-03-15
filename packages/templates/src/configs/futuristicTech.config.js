import { color, text, textarea } from "../utils/index.js";

export const futuristicTechConfig = {
  id: "futuristic-tech",
  name: "Futuristic Tech",
  description:
    "Mind-blowing fusion of cyberpunk neon and sci-fi innovation aesthetics",
  icon: "🚀",

  layout: ["hero", "features", "terminal", "about", "stats", "cta", "footer"],

  editableFields_OLD: [
    // Page Settings
    {
      id: "page.fontFamily",
      label: "Font Family",
      type: "select",
      options: [
        { value: '"Orbitron", sans-serif', label: "Orbitron" },
        { value: '"Rajdhani", sans-serif', label: "Rajdhani" },
        { value: '"Exo 2", sans-serif', label: "Exo 2" },
        { value: '"Michroma", sans-serif', label: "Michroma" },
        { value: '"Share Tech Mono", monospace', label: "Share Tech Mono" },
        { value: '"Space Mono", monospace', label: "Space Mono" },
        { value: "system-ui, sans-serif", label: "System" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // ===== HERO =====
    { id: "elements.hero.title", label: "Title", type: "text" },
    { id: "elements.hero.subtitle", label: "Subtitle", type: "textarea" },
    { id: "elements.hero.buttonText", label: "Button Text", type: "text" },
    {
      id: "elements.hero.gradientStart",
      label: "Gradient Start",
      type: "color",
    },
    { id: "elements.hero.gradientEnd", label: "Gradient End", type: "color" },
    {
      id: "elements.hero.gradientAngle",
      label: "Gradient Angle",
      type: "text",
    },
    { id: "elements.hero.titleColor", label: "Title Color", type: "color" },
    {
      id: "elements.hero.subtitleColor",
      label: "Subtitle Color",
      type: "color",
    },
    { id: "elements.hero.buttonColor", label: "Button Color", type: "color" },
    {
      id: "elements.hero.buttonTextColor",
      label: "Button Text Color",
      type: "color",
    },
    { id: "elements.hero.padding", label: "Padding", type: "text" },
    {
      id: "elements.hero.gap",
      label: "Gap",
      type: "slider",
      options: { min: 8, max: 80, step: 4 },
    },
    { id: "elements.hero.maxWidth", label: "Max Width", type: "text" },
    {
      id: "elements.hero.align",
      label: "Alignment",
      type: "select",
      options: [
        { value: "flex-start", label: "Left" },
        { value: "center", label: "Center" },
        { value: "flex-end", label: "Right" },
      ],
    },
    {
      id: "elements.hero.titleLevel",
      label: "Title Heading Level",
      type: "select",
      options: [
        { value: "1", label: "H1" },
        { value: "2", label: "H2" },
        { value: "3", label: "H3" },
      ],
    },
    {
      id: "elements.hero.buttonSize",
      label: "Button Size",
      type: "select",
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
      ],
    },

    // ===== FEATURES =====
    { id: "elements.features.heading", label: "Heading", type: "text" },
    {
      id: "elements.features.items",
      label: "Features List",
      type: "features-list",
    },
    {
      id: "elements.features.backgroundColor",
      label: "Background Color",
      type: "color",
    },
    {
      id: "elements.features.headingColor",
      label: "Heading Color",
      type: "color",
    },
    {
      id: "elements.features.itemTitleColor",
      label: "Feature Title Color",
      type: "color",
    },
    {
      id: "elements.features.itemTextColor",
      label: "Feature Text Color",
      type: "color",
    },
    { id: "elements.features.padding", label: "Padding", type: "text" },
    {
      id: "elements.features.gap",
      label: "Gap",
      type: "slider",
      options: { min: 8, max: 80, step: 4 },
    },
    {
      id: "elements.features.maxWidth",
      label: "Max Width",
      type: "select",
      options: [
        { value: "1200px", label: "1200px" },
        { value: "1400px", label: "1400px" },
        { value: "100%", label: "Full width" },
      ],
    },
    {
      id: "elements.features.columns",
      label: "Columns",
      type: "slider",
      options: { min: 1, max: 4, step: 1 },
    },
    {
      id: "elements.features.headingLevel",
      label: "Heading Level",
      type: "select",
      options: [
        { value: "1", label: "H1" },
        { value: "2", label: "H2" },
        { value: "3", label: "H3" },
      ],
    },
    {
      id: "elements.features.headingAlign",
      label: "Heading Alignment",
      type: "select",
      options: [
        { value: "flex-start", label: "Left" },
        { value: "center", label: "Center" },
        { value: "flex-end", label: "Right" },
      ],
    },

    // ===== TERMINAL =====
    { id: "elements.terminal.heading", label: "Heading", type: "text" },
    {
      id: "elements.terminal.backgroundColor",
      label: "Background Color",
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
    {
      id: "elements.terminal.windowBgColor",
      label: "Window Background Color",
      type: "color",
    },
    { id: "elements.terminal.padding", label: "Padding", type: "text" },
    {
      id: "elements.terminal.gap",
      label: "Gap",
      type: "slider",
      options: { min: 8, max: 80, step: 4 },
    },
    { id: "elements.terminal.maxWidth", label: "Max Width", type: "text" },

    // ===== ABOUT =====
    { id: "elements.about.heading", label: "Heading", type: "text" },
    { id: "elements.about.content", label: "Content", type: "textarea" },
    {
      id: "elements.about.backgroundColor",
      label: "Background Color",
      type: "color",
    },
    {
      id: "elements.about.headingColor",
      label: "Heading Color",
      type: "color",
    },
    { id: "elements.about.textColor", label: "Text Color", type: "color" },
    { id: "elements.about.padding", label: "Padding", type: "text" },
    {
      id: "elements.about.gap",
      label: "Gap",
      type: "slider",
      options: { min: 8, max: 80, step: 4 },
    },
    { id: "elements.about.maxWidth", label: "Max Width", type: "text" },
    {
      id: "elements.about.align",
      label: "Alignment",
      type: "select",
      options: [
        { value: "flex-start", label: "Left" },
        { value: "center", label: "Center" },
        { value: "flex-end", label: "Right" },
      ],
    },
    {
      id: "elements.about.headingLevel",
      label: "Heading Level",
      type: "select",
      options: [
        { value: "1", label: "H1" },
        { value: "2", label: "H2" },
        { value: "3", label: "H3" },
      ],
    },

    // ===== STATS =====
    { id: "elements.stats.heading", label: "Heading", type: "text" },
    {
      id: "elements.stats.backgroundColor",
      label: "Background Color",
      type: "color",
    },
    {
      id: "elements.stats.headingColor",
      label: "Heading Color",
      type: "color",
    },
    {
      id: "elements.stats.numberColor",
      label: "Number Color",
      type: "color",
    },
    {
      id: "elements.stats.labelColor",
      label: "Label Color",
      type: "color",
    },
    { id: "elements.stats.padding", label: "Padding", type: "text" },
    {
      id: "elements.stats.gap",
      label: "Gap",
      type: "slider",
      options: { min: 8, max: 80, step: 4 },
    },
    {
      id: "elements.stats.columns",
      label: "Columns",
      type: "slider",
      options: { min: 2, max: 5, step: 1 },
    },
    {
      id: "elements.stats.headingAlign",
      label: "Heading Alignment",
      type: "select",
      options: [
        { value: "flex-start", label: "Left" },
        { value: "center", label: "Center" },
        { value: "flex-end", label: "Right" },
      ],
    },

    // ===== CTA =====
    { id: "elements.cta.heading", label: "Heading", type: "text" },
    { id: "elements.cta.subheading", label: "Subheading", type: "text" },
    { id: "elements.cta.buttonText", label: "Button Text", type: "text" },
    {
      id: "elements.cta.backgroundColor",
      label: "Background Color",
      type: "color",
    },
    { id: "elements.cta.textColor", label: "Text Color", type: "color" },
    { id: "elements.cta.buttonColor", label: "Button Color", type: "color" },
    {
      id: "elements.cta.buttonTextColor",
      label: "Button Text Color",
      type: "color",
    },
    { id: "elements.cta.padding", label: "Padding", type: "text" },
    {
      id: "elements.cta.gap",
      label: "Gap",
      type: "slider",
      options: { min: 8, max: 80, step: 4 },
    },
    { id: "elements.cta.maxWidth", label: "Max Width", type: "text" },
    {
      id: "elements.cta.align",
      label: "Alignment",
      type: "select",
      options: [
        { value: "flex-start", label: "Left" },
        { value: "center", label: "Center" },
        { value: "flex-end", label: "Right" },
      ],
    },
    {
      id: "elements.cta.titleLevel",
      label: "Heading Level",
      type: "select",
      options: [
        { value: "1", label: "H1" },
        { value: "2", label: "H2" },
        { value: "3", label: "H3" },
      ],
    },
    {
      id: "elements.cta.buttonSize",
      label: "Button Size",
      type: "select",
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
      ],
    },

    // ===== FOOTER =====
    { id: "elements.footer.text", label: "Footer Text", type: "text" },
    {
      id: "elements.footer.backgroundColor",
      label: "Background Color",
      type: "color",
    },
    { id: "elements.footer.textColor", label: "Text Color", type: "color" },
    { id: "elements.footer.padding", label: "Padding", type: "text" },
    {
      id: "elements.footer.align",
      label: "Alignment",
      type: "select",
      options: [
        { value: "flex-start", label: "Left" },
        { value: "center", label: "Center" },
        { value: "flex-end", label: "Right" },
      ],
    },
  ],

  configSchema: {
    page: {
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: [
          { value: '"Orbitron", sans-serif', label: "Orbitron" },
          { value: '"Rajdhani", sans-serif', label: "Rajdhani" },
          { value: '"Exo 2", sans-serif', label: "Exo 2" },
          { value: '"Michroma", sans-serif', label: "Michroma" },
          { value: '"Share Tech Mono", monospace', label: "Share Tech Mono" },
          { value: '"Space Mono", monospace', label: "Space Mono" },
          { value: "system-ui, sans-serif", label: "System" },
        ],
      },
      title: text("Page Title (Browser Tab)"),
      description: textarea("Meta Description (SEO)"),
      keywords: text("Meta Keywords (comma-separated)"),
      author: text("Author"),
      language: {
        type: "select",
        label: "Language",
        options: [
          { value: "en", label: "English" },
          { value: "es", label: "Español" },
          { value: "fr", label: "Français" },
          { value: "de", label: "Deutsch" },
          { value: "it", label: "Italiano" },
          { value: "pt", label: "Português" },
          { value: "ja", label: "日本語" },
          { value: "zh", label: "中文" },
        ],
      },
    },
    elements: {
      hero: {
        title: text("Hero Title"),
        subtitle: textarea("Hero Subtitle"),
        buttonText: text("Button Text"),
        gradientStart: color("Gradient Start"),
        gradientEnd: color("Gradient End"),
        titleColor: color("Title Color"),
        subtitleColor: color("Subtitle Color"),
        buttonColor: color("Button Color"),
        buttonTextColor: color("Button Text Color"),
      },
      features: {
        heading: text("Section Heading"),
        backgroundColor: color("Background Color"),
        headingColor: color("Heading Color"),
        items: { type: "array", label: "Features" },
      },
      terminal: {
        heading: text("Heading"),
        backgroundColor: color("Background Color"),
        promptColor: color("Prompt Color"),
        responseColor: color("Response Color"),
        windowBgColor: color("Window Background"),
        commands: { type: "array", label: "Terminal Commands" },
      },
      about: {
        heading: text("Heading"),
        content: textarea("Content"),
        backgroundColor: color("Background Color"),
        headingColor: color("Heading Color"),
        textColor: color("Text Color"),
      },
      stats: {
        heading: text("Heading"),
        backgroundColor: color("Background Color"),
        headingColor: color("Heading Color"),
        numberColor: color("Number Color"),
        labelColor: color("Label Color"),
        items: { type: "array", label: "Stats Items" },
      },
      cta: {
        heading: text("Heading"),
        subheading: text("Subheading"),
        buttonText: text("Button Text"),
        backgroundColor: color("Background Color"),
        textColor: color("Text Color"),
        buttonColor: color("Button Color"),
        buttonTextColor: color("Button Text Color"),
      },
      footer: {
        text: text("Footer Text"),
        backgroundColor: color("Background Color"),
        textColor: color("Text Color"),
      },
    },
  },

  defaultConfig: {
    page: {
      fontFamily: '"Orbitron", sans-serif',
      title: "Futuristic Tech - Next Generation",
      description:
        "Break through the boundaries of reality with next-generation innovation powered by quantum computing and neural interfaces. The future is here.",
      keywords: "futuristic, technology, innovation, quantum, AI, tech, future",
      author: "",
      language: "en",
    },
    elements: {
      hero: {
        title: "▸ ENTER THE FUTURE ◂",
        subtitle:
          "Break through the boundaries of reality. Experience next-generation innovation powered by quantum computing and neural interfaces. The future isn't coming—it's already here.",
        buttonText: "INITIALIZE SEQUENCE >>",
        gradientStart: "#d946ef",
        gradientEnd: "#06B6D4",
        titleColor: "#00ff9f",
        subtitleColor: "#E0E7FF",
        buttonColor: "#ff0080",
        buttonTextColor: "#0a0a0f",
      },
      features: {
        heading: "// CORE_CAPABILITIES.EXE",
        backgroundColor: "#0f0f1a",
        headingColor: "#00ff9f",
        items: [
          {
            icon: "◈",
            title: "Quantum Processing",
            description:
              "Harness computational power that breaks the laws of physics",
          },
          {
            icon: "▣",
            title: "Neural Interface",
            description:
              "Direct connection between human consciousness and machine intelligence",
          },
          {
            icon: "◈",
            title: "Neon-Speed Network",
            description:
              "Data transfer at the speed of thought through 5D infrastructure",
          },
        ],
      },
      terminal: {
        heading: "> SYSTEM_STATUS.LOG_",
        backgroundColor: "#000000",
        promptColor: "#00ff9f",
        responseColor: "#8b8bff",
        windowBgColor: "#0a0a0f",
        commands: [
          {
            prompt: "$ initializing quantum core...",
            response: "[OK] Core initialized",
          },
          {
            prompt: "$ connecting neural pathways...",
            response: "✓ Neural pathways: CONNECTED",
          },
          {
            prompt: "$ activating neon matrix...",
            response: "✓ Neon matrix: ACTIVE",
          },
          {
            prompt: "$ booting reality engine...",
            response: "✓ Reality engine: ONLINE",
          },
          {
            prompt: "$ system status",
            response: "> System ready. Welcome to the future.",
          },
        ],
      },
      about: {
        heading: "// MISSION_PROTOCOL",
        content:
          "We exist at the intersection of human ingenuity and artificial superintelligence. Our mission transcends conventional boundaries—we're building the neural infrastructure that will power humanity's next evolutionary leap. Through quantum computing, neural interfaces, and reality-bending innovation, we're not just predicting the future—we're coding it into existence.",
        backgroundColor: "#0B1120",
        headingColor: "#06B6D4",
        textColor: "#E0E7FF",
      },
      stats: {
        heading: "> METRICS.REAL_TIME_",
        backgroundColor: "#1a0a2e",
        headingColor: "#00ff9f",
        numberColor: "#ff0080",
        labelColor: "#c4c4ff",
        items: [
          { value: "99.99%", label: "Uptime", color: "#ff0080" },
          { value: "< 1ms", label: "Latency", color: "#ff0080" },
          { value: "10M+", label: "Operations/sec", color: "#ff0080" },
          { value: "∞", label: "Potential", color: "#ff0080" },
        ],
      },
      cta: {
        heading: "// INITIATE_SEQUENCE?",
        subheading:
          "Join the revolution. Connect to the neural network. Become part of tomorrow.",
        buttonText: "JACK IN NOW >>",
        backgroundColor: "#1E293B",
        textColor: "#00ff9f",
        buttonColor: "#d946ef",
        buttonTextColor: "#0a0a0f",
      },
      footer: {
        text: "© 2077 NeoTech Industries • ENCRYPTED • QUANTUM-SECURED • REALITY.V2",
        backgroundColor: "#000000",
        textColor: "#00ff9f",
      },
    },
  },
};
