export const sciFiTechConfig = {
  id: "sci-fi-tech",
  name: "Sci-Fi Tech",
  description: "Futuristic clean design with innovative tech aesthetics",
  icon: "🚀",

  layout: [
    "hero",
    "metrics",
    "features",
    "techSpecs",
    "roadmap",
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
        { value: '"Exo 2", sans-serif', label: "Exo 2" },
        { value: '"Orbitron", sans-serif', label: "Orbitron" },
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

    // Metrics
    { id: "elements.metrics.heading", label: "Metrics Heading", type: "text" },
    {
      id: "elements.metrics.backgroundColor",
      label: "Metrics Background",
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

    // Tech Specs
    {
      id: "elements.techSpecs.heading",
      label: "Tech Specs Heading",
      type: "text",
    },
    {
      id: "elements.techSpecs.backgroundColor",
      label: "Tech Specs Background",
      type: "color",
    },

    // Roadmap
    { id: "elements.roadmap.heading", label: "Roadmap Heading", type: "text" },
    {
      id: "elements.roadmap.backgroundColor",
      label: "Roadmap Background",
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
      metrics: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        stats: { type: "array", label: "Metrics Stats" },
      },
      features: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        items: { type: "features-list", label: "Features" },
      },
      techSpecs: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        specs: { type: "array", label: "Tech Specifications" },
      },
      roadmap: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        phases: { type: "array", label: "Roadmap Phases" },
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
      fontFamily: '"Exo 2", sans-serif',
      backgroundColor: "#0B1120",
      textColor: "#E0E7FF",
    },
    elements: {
      hero: {
        title: "The Future is Now",
        subtitle:
          "Harness next-generation technology. Transform possibilities into reality.",
        buttonText: "Launch Platform →",
        gradientStart: "#4F46E5",
        gradientEnd: "#06B6D4",
        titleColor: "#FFFFFF",
        buttonColor: "#06B6D4",
      },
      metrics: {
        heading: "Live Metrics",
        backgroundColor: "#111827",
        stats: [
          {
            value: "99.99%",
            label: "Uptime",
            trend: "+0.01%",
            color: "#06B6D4",
          },
          {
            value: "< 10ms",
            label: "Latency",
            trend: "-5ms",
            color: "#4F46E5",
          },
          {
            value: "1M+",
            label: "Operations/sec",
            trend: "+15%",
            color: "#10B981",
          },
          { value: "256", label: "AI Models", trend: "+12", color: "#8B5CF6" },
        ],
      },
      features: {
        heading: "Advanced Capabilities",
        backgroundColor: "#111827",
        items: [
          {
            icon: "◈",
            title: "Quantum Processing",
            description: "Next-gen computational power",
          },
          {
            icon: "◈",
            title: "Neural Networks",
            description: "AI that learns and adapts",
          },
          {
            icon: "◈",
            title: "Cloud Singularity",
            description: "Seamless integration",
          },
        ],
      },
      techSpecs: {
        heading: "Technical Specifications",
        backgroundColor: "#0B1120",
        specs: [
          { category: "Processing", value: "Quantum Core • 128 qubits" },
          { category: "Memory", value: "1TB Neural Cache • Instant Access" },
          { category: "Network", value: "10Gbps • Zero Latency Protocol" },
          {
            category: "Security",
            value: "Post-Quantum Encryption • Unhackable",
          },
        ],
      },
      roadmap: {
        heading: "Evolution Roadmap",
        backgroundColor: "#1E293B",
        phases: [
          {
            quarter: "Q1 2026",
            title: "Launch",
            status: "completed",
            description: "Platform goes live",
          },
          {
            quarter: "Q2 2026",
            title: "AI Integration",
            status: "in-progress",
            description: "Neural network enhancement",
          },
          {
            quarter: "Q3 2026",
            title: "Quantum Leap",
            status: "planned",
            description: "Quantum processing addition",
          },
          {
            quarter: "Q4 2026",
            title: "Global Scale",
            status: "planned",
            description: "Worldwide deployment",
          },
        ],
      },
      cta: {
        heading: "Ready to Evolve?",
        subheading: "Join pioneers shaping the future",
        buttonText: "Start Your Journey →",
        backgroundColor: "#1E293B",
        buttonColor: "#4F46E5",
      },
      footer: {
        text: "© 2026 FutureTech • Advancing Humanity Forward",
        backgroundColor: "#000000",
        textColor: "#06B6D4",
      },
    },
  },
};
