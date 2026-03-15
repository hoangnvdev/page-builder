export const refinedClassicConfig = {
  id: "refined-classic",
  name: "Refined Classic",
  description:
    "Timeless elegance meets bold typography for sophisticated distinction",
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
        {
          value: '"Helvetica Neue", Helvetica, sans-serif',
          label: "Helvetica",
        },
        { value: '"Roboto Mono", monospace', label: "Roboto Mono" },
        { value: '"Inter", sans-serif', label: "Inter" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

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
          { value: 'Garamond, "Times New Roman", serif', label: "Garamond" },
          { value: '"Playfair Display", Georgia, serif', label: "Playfair" },
          { value: '"Cormorant Garamond", serif', label: "Cormorant" },
          {
            value: '"Helvetica Neue", Helvetica, sans-serif',
            label: "Helvetica",
          },
          { value: '"Roboto Mono", monospace', label: "Roboto Mono" },
          { value: '"Inter", sans-serif', label: "Inter" },
        ],
      },
      title: {
        type: "text",
        label: "Page Title (Browser Tab)",
      },
      description: {
        type: "textarea",
        label: "Meta Description (SEO)",
      },
      keywords: {
        type: "text",
        label: "Meta Keywords (comma-separated)",
      },
      author: {
        type: "text",
        label: "Author",
      },
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
        title: { type: "text", label: "Hero Title" },
        subtitle: { type: "textarea", label: "Hero Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
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
      title: "Refined Classic - Timeless Elegance",
      description:
        "Experience classical sophistication with modern precision. A timeless design for those who appreciate heritage craftsmanship and elegance.",
      keywords: "classic, elegant, sophisticated, timeless, premium, luxury",
      author: "",
      language: "en",
    },
    elements: {
      hero: {
        title: "Refined Excellence\nTimeless Distinction",
        subtitle:
          "Where classical sophistication meets contemporary precision. A harmonious blend of heritage craftsmanship and modern design principles, crafted for those who appreciate true quality.",
        buttonText: "Discover More",
        backgroundColor: "#8B7355",
        gradientStart: "",
        gradientEnd: "",
        gradientAngle: "135deg",
        titleColor: "#FAF8F3",
        subtitleColor: "#F5F1E8",
        buttonColor: "#D4AF37",
        buttonTextColor: "#2B2B2B",
        padding: "120px 20px",
        gap: 28,
        maxWidth: "900px",
        align: "center",
        titleLevel: 1,
        buttonSize: "large",
      },
      about: {
        heading: "Philosophy & Heritage",
        content:
          "Our approach marries time-honored traditions with bold contemporary thinking. We believe in the power of grid-based design, where every element has purpose and every space carries meaning. Through meticulous attention to typography, proportion, and negative space, we create experiences that feel both classic and unmistakably modern. This is design at its most refined—stripped of excess, rich in substance.",
        backgroundColor: "#FFFFFF",
        headingColor: "#8B7355",
        textColor: "#2B2B2B",
        padding: "100px 20px",
        gap: 24,
        maxWidth: "850px",
        align: "flex-start",
        headingLevel: 2,
      },
      features: {
        heading: "Pillars of Excellence",
        backgroundColor: "#F5F1E8",
        headingColor: "#2B2B2B",
        itemTitleColor: "#8B7355",
        itemTextColor: "#5A5A5A",
        padding: "100px 20px",
        gap: 50,
        maxWidth: "1200px",
        columns: 3,
        headingLevel: 2,
        headingAlign: "center",
        items: [
          {
            icon: "◆",
            title: "Artisan Craftsmanship",
            description:
              "Handcrafted with precision, guided by generations of expertise",
          },
          {
            icon: "▭",
            title: "Systematic Design",
            description:
              "Grid-based layouts ensuring mathematical harmony and balance",
          },
          {
            icon: "◆",
            title: "Premium Materials",
            description:
              "Only the finest components, sourced with uncompromising standards",
          },
        ],
      },
      cta: {
        heading: "Begin Your Journey",
        subheading:
          "Experience the perfect union of classical refinement and contemporary precision",
        buttonText: "Request Consultation",
        backgroundColor: "#2B2B2B",
        textColor: "#FAF8F3",
        buttonColor: "#D4AF37",
        buttonTextColor: "#2B2B2B",
        padding: "100px 20px",
        gap: 24,
        maxWidth: "750px",
        align: "center",
        titleLevel: 2,
        buttonSize: "large",
      },
      footer: {
        text: "© MMXXVI • Heritage Since 1895 • A Legacy of Distinction",
        backgroundColor: "#8B7355",
        textColor: "#FAF8F3",
        padding: "40px 20px",
        align: "center",
      },
    },
  },
};
