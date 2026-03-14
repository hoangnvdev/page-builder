export const businessProConfig = {
  id: "business-pro",
  name: "Business Pro",
  description:
    "Professional business & portfolio combination with full features",
  icon: "💼",

  layout: ["header", "hero", "about", "features", "projects", "cta", "footer"],

  navLinks: [
    { text: "Home", href: "#" },
    { text: "About", href: "#about" },
    { text: "Services", href: "#features" },
    { text: "Portfolio", href: "#projects" },
    { text: "Contact", href: "#cta" },
  ],

  editableFields: [
    // Page Settings
    {
      id: "page.fontFamily",
      label: "Font Family",
      type: "select",
      options: [
        { value: "Arial, sans-serif", label: "Arial" },
        { value: "Georgia, serif", label: "Georgia" },
        { value: '"Segoe UI", sans-serif', label: "Segoe UI" },
        { value: "system-ui, sans-serif", label: "System" },
        { value: '"Inter", sans-serif', label: "Inter" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // ===== HEADER =====
    { id: "elements.header.companyName", label: "Company Name", type: "text" },
    {
      id: "elements.header.backgroundColor",
      label: "Header Background",
      type: "color",
    },
    { id: "elements.header.logoColor", label: "Logo Color", type: "color" },
    { id: "elements.header.linkColor", label: "Link Color", type: "color" },
    { id: "elements.header.padding", label: "Padding", type: "text" },
    {
      id: "elements.header.gap",
      label: "Gap",
      type: "slider",
      options: { min: 0, max: 80, step: 4 },
    },
    {
      id: "elements.header.maxWidth",
      label: "Max Width",
      type: "select",
      options: [
        { value: "1200px", label: "1200px" },
        { value: "1400px", label: "1400px" },
        { value: "100%", label: "Full width" },
      ],
    },
    {
      id: "elements.header.align",
      label: "Alignment",
      type: "select",
      options: [
        { value: "flex-start", label: "Left" },
        { value: "center", label: "Center" },
        { value: "space-between", label: "Space Between" },
      ],
    },
    {
      id: "elements.header.titleLevel",
      label: "Logo Heading Level",
      type: "select",
      options: [
        { value: "1", label: "H1" },
        { value: "2", label: "H2" },
        { value: "3", label: "H3" },
      ],
    },

    // ===== HERO =====
    // Content
    { id: "elements.hero.title", label: "Title", type: "text" },
    { id: "elements.hero.subtitle", label: "Subtitle", type: "textarea" },
    { id: "elements.hero.buttonText", label: "Button Text", type: "text" },

    // Colors
    {
      id: "elements.hero.backgroundColor",
      label: "Background Color",
      type: "color",
    },
    {
      id: "elements.hero.gradientStart",
      label: "Gradient Start (optional)",
      type: "color",
    },
    {
      id: "elements.hero.gradientEnd",
      label: "Gradient End (optional)",
      type: "color",
    },
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

    // Layout
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

    // ===== PROJECTS =====
    { id: "elements.projects.heading", label: "Heading", type: "text" },
    {
      id: "elements.projects.items",
      label: "Projects List",
      type: "projects-list",
    },
    {
      id: "elements.projects.backgroundColor",
      label: "Background Color",
      type: "color",
    },
    {
      id: "elements.projects.headingColor",
      label: "Heading Color",
      type: "color",
    },
    {
      id: "elements.projects.itemTitleColor",
      label: "Project Title Color",
      type: "color",
    },
    {
      id: "elements.projects.itemTextColor",
      label: "Project Text Color",
      type: "color",
    },
    { id: "elements.projects.padding", label: "Padding", type: "text" },
    {
      id: "elements.projects.gap",
      label: "Gap",
      type: "slider",
      options: { min: 8, max: 80, step: 4 },
    },
    {
      id: "elements.projects.maxWidth",
      label: "Max Width",
      type: "select",
      options: [
        { value: "1200px", label: "1200px" },
        { value: "1400px", label: "1400px" },
        { value: "100%", label: "Full width" },
      ],
    },
    {
      id: "elements.projects.columns",
      label: "Columns",
      type: "slider",
      options: { min: 1, max: 4, step: 1 },
    },
    {
      id: "elements.projects.headingLevel",
      label: "Heading Level",
      type: "select",
      options: [
        { value: "1", label: "H1" },
        { value: "2", label: "H2" },
        { value: "3", label: "H3" },
      ],
    },
    {
      id: "elements.projects.headingAlign",
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
          { value: "Arial, sans-serif", label: "Arial" },
          { value: "Georgia, serif", label: "Georgia" },
          { value: '"Segoe UI", sans-serif', label: "Segoe UI" },
          { value: "system-ui, sans-serif", label: "System" },
          { value: '"Inter", sans-serif', label: "Inter" },
        ],
      },
      backgroundColor: { type: "color", label: "Page Background" },
      textColor: { type: "color", label: "Page Text Color" },
    },
    elements: {
      header: {
        companyName: { type: "text", label: "Company Name" },
        backgroundColor: { type: "color", label: "Header Background" },
        logoColor: { type: "color", label: "Logo Color" },
        linkColor: { type: "color", label: "Link Color" },
      },
      hero: {
        title: { type: "text", label: "Hero Title" },
        subtitle: { type: "textarea", label: "Hero Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        gradientStart: { type: "color", label: "Gradient Start" },
        gradientEnd: { type: "color", label: "Gradient End" },
        titleColor: { type: "color", label: "Title Color" },
        subtitleColor: { type: "color", label: "Subtitle Color" },
        buttonColor: { type: "color", label: "Button Color" },
        buttonTextColor: { type: "color", label: "Button Text Color" },
      },
      about: {
        heading: { type: "text", label: "Heading" },
        content: { type: "textarea", label: "Content" },
        backgroundColor: { type: "color", label: "Background Color" },
        headingColor: { type: "color", label: "Heading Color" },
        textColor: { type: "color", label: "Text Color" },
      },
      features: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        headingColor: { type: "color", label: "Heading Color" },
        itemTitleColor: { type: "color", label: "Feature Title Color" },
        itemTextColor: { type: "color", label: "Feature Text Color" },
        items: { type: "features-list", label: "Features" },
      },
      projects: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        headingColor: { type: "color", label: "Heading Color" },
        itemTitleColor: { type: "color", label: "Project Title Color" },
        itemTextColor: { type: "color", label: "Project Text Color" },
        items: { type: "projects-list", label: "Projects" },
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
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#ffffff",
      textColor: "#1a1a1a",
    },
    elements: {
      header: {
        companyName: "BusinessPro",
        backgroundColor: "#ffffff",
        logoColor: "#0066cc",
        linkColor: "#333333",
        padding: "20px",
        gap: 16,
        maxWidth: "1200px",
        align: "space-between",
        titleLevel: 3,
      },
      hero: {
        title: "Grow Your Business & Showcase Your Work",
        subtitle:
          "The professional platform for businesses and creatives to make an impact online",
        buttonText: "Get Started",
        backgroundColor: "#f0f9ff",
        gradientStart: "#6366f1",
        gradientEnd: "#8b5cf6",
        gradientAngle: "135deg",
        titleColor: "#0c4a6e",
        subtitleColor: "#475569",
        buttonColor: "#0066cc",
        buttonTextColor: "#ffffff",
        padding: "100px 20px",
        gap: 24,
        maxWidth: "800px",
        align: "center",
        titleLevel: 1,
        buttonSize: "large",
      },
      about: {
        heading: "About Us",
        content:
          "We're a professional team dedicated to delivering exceptional results. With years of experience and a passion for excellence, we help businesses and individuals achieve their goals through innovative solutions and creative strategies.",
        backgroundColor: "#ffffff",
        headingColor: "#1a1a1a",
        textColor: "#4a4a4a",
        padding: "80px 20px",
        gap: 20,
        maxWidth: "800px",
        align: "flex-start",
        headingLevel: 2,
      },
      features: {
        heading: "Our Services",
        backgroundColor: "#f8f9fa",
        headingColor: "#1a1a1a",
        itemTitleColor: "#0066cc",
        itemTextColor: "#666666",
        padding: "80px 20px",
        gap: 40,
        maxWidth: "1200px",
        columns: 3,
        headingLevel: 2,
        headingAlign: "center",
        items: [
          {
            icon: "⚡",
            title: "Fast Delivery",
            description: "Quick turnaround times without compromising quality",
          },
          {
            icon: "🔒",
            title: "Secure & Reliable",
            description: "Enterprise-grade security and 99.9% uptime",
          },
          {
            icon: "📊",
            title: "Data Insights",
            description: "Powerful analytics to drive informed decisions",
          },
        ],
      },
      projects: {
        heading: "Featured Work",
        backgroundColor: "#ffffff",
        headingColor: "#1a1a1a",
        itemTitleColor: "#2563eb",
        itemTextColor: "#666666",
        padding: "80px 20px",
        gap: 40,
        maxWidth: "1200px",
        columns: 3,
        headingLevel: 2,
        headingAlign: "center",
        items: [
          {
            title: "E-Commerce Platform",
            description: "Full-featured online shopping experience",
          },
          {
            title: "Brand Strategy",
            description: "Complete branding and marketing suite",
          },
          {
            title: "Mobile Application",
            description: "Cross-platform productivity app",
          },
        ],
      },
      cta: {
        heading: "Ready to Start Your Project?",
        subheading: "Join hundreds of satisfied clients who trust us",
        buttonText: "Contact Us Now",
        backgroundColor: "#0066cc",
        textColor: "#ffffff",
        buttonColor: "#ffffff",
        buttonTextColor: "#0066cc",
        padding: "80px 20px",
        gap: 20,
        maxWidth: "600px",
        align: "center",
        titleLevel: 2,
        buttonSize: "large",
      },
      footer: {
        text: "© 2026 BusinessPro. All rights reserved.",
        backgroundColor: "#1a1a1a",
        textColor: "#ffffff",
        padding: "40px 20px",
        align: "center",
      },
    },
  },
};
