export const classicEleganceConfig = {
  id: "classic-elegance",
  name: "Classic Elegance",
  description: "Timeless sophistication with traditional design",
  icon: "♔",

  layout: [
    "hero",
    "timeline",
    "about",
    "gallery",
    "testimonials",
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
        { value: 'Garamond, "Times New Roman", serif', label: "Garamond" },
        { value: '"Baskerville", serif', label: "Baskerville" },
        { value: '"Playfair Display", serif', label: "Playfair Display" },
        { value: "system-ui, sans-serif", label: "System" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // Hero
    { id: "elements.hero.title", label: "Hero Title", type: "text" },
    { id: "elements.hero.subtitle", label: "Hero Subtitle", type: "text" },
    { id: "elements.hero.buttonText", label: "Button Text", type: "text" },
    {
      id: "elements.hero.backgroundColor",
      label: "Hero Background",
      type: "color",
    },
    { id: "elements.hero.titleColor", label: "Title Color", type: "color" },
    { id: "elements.hero.buttonColor", label: "Button Color", type: "color" },

    // Timeline
    {
      id: "elements.timeline.heading",
      label: "Timeline Heading",
      type: "text",
    },
    {
      id: "elements.timeline.backgroundColor",
      label: "Timeline Background",
      type: "color",
    },
    { id: "elements.timeline.lineColor", label: "Line Color", type: "color" },
    { id: "elements.timeline.dotColor", label: "Dot Color", type: "color" },

    // About
    { id: "elements.about.heading", label: "About Heading", type: "text" },
    { id: "elements.about.content", label: "About Content", type: "textarea" },
    {
      id: "elements.about.headingColor",
      label: "Heading Color",
      type: "color",
    },
    { id: "elements.about.textColor", label: "Text Color", type: "color" },

    // Gallery
    { id: "elements.gallery.heading", label: "Gallery Heading", type: "text" },
    {
      id: "elements.gallery.backgroundColor",
      label: "Gallery Background",
      type: "color",
    },

    // Testimonials
    {
      id: "elements.testimonials.heading",
      label: "Testimonials Heading",
      type: "text",
    },
    {
      id: "elements.testimonials.backgroundColor",
      label: "Testimonials Background",
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
        subtitle: { type: "text", label: "Hero Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        titleColor: { type: "color", label: "Title Color" },
        buttonColor: { type: "color", label: "Button Color" },
      },
      timeline: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        lineColor: { type: "color", label: "Line Color" },
        dotColor: { type: "color", label: "Dot Color" },
        milestones: { type: "array", label: "Timeline Milestones" },
      },
      about: {
        heading: { type: "text", label: "Section Heading" },
        content: { type: "textarea", label: "About Content" },
        headingColor: { type: "color", label: "Heading Color" },
        textColor: { type: "color", label: "Text Color" },
      },
      gallery: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        images: { type: "array", label: "Gallery Images" },
      },
      testimonials: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        quotes: { type: "array", label: "Testimonials" },
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
      fontFamily: 'Garamond, "Times New Roman", serif',
      backgroundColor: "#FAF8F3",
      textColor: "#2B2B2B",
    },
    elements: {
      hero: {
        title: "Distinguished Excellence Since 1895",
        subtitle: "A legacy of refinement and timeless quality",
        buttonText: "Discover Our Heritage",
        backgroundColor: "#8B7355",
        titleColor: "#FAF8F3",
        buttonColor: "#D4AF37",
      },
      timeline: {
        heading: "Our Heritage",
        backgroundColor: "#F5F1E8",
        milestones: [
          {
            year: "1895",
            title: "Founded",
            description: "Established in London with a vision for excellence",
          },
          {
            year: "1920",
            title: "Royal Warrant",
            description: "Appointed supplier to the Royal Family",
          },
          {
            year: "1965",
            title: "International",
            description: "Expanded to serve clientele worldwide",
          },
          {
            year: "2026",
            title: "Today",
            description: "Continuing our tradition of unparalleled quality",
          },
        ],
        lineColor: "#D4AF37",
        dotColor: "#8B7355",
      },
      about: {
        heading: "Our Distinguished History",
        content:
          "For over a century, we have upheld the finest traditions of excellence and service...",
        headingColor: "#8B7355",
        textColor: "#2B2B2B",
      },
      gallery: {
        heading: "Our Craftsmanship",
        images: [
          { caption: "Handcrafted Details", placeholder: "Elegant Image 1" },
          { caption: "Premium Materials", placeholder: "Elegant Image 2" },
          { caption: "Timeless Design", placeholder: "Elegant Image 3" },
        ],
        backgroundColor: "#FFFFFF",
      },
      testimonials: {
        heading: "What Our Clients Say",
        backgroundColor: "#F5F1E8",
        quotes: [
          {
            text: "Exceptional quality and service. A treasured partnership for over 30 years.",
            author: "Lady Catherine Winchester",
            title: "Private Client",
            avatar: "👤",
          },
          {
            text: "The attention to detail is extraordinary. Simply unmatched.",
            author: "Sir James Thornton",
            title: "Collector",
            avatar: "👤",
          },
        ],
      },
      cta: {
        heading: "Experience Timeless Elegance",
        subheading: "Join our distinguished clientele",
        buttonText: "Request Consultation",
        backgroundColor: "#2B2B2B",
        buttonColor: "#D4AF37",
      },
      footer: {
        text: "© MMXXVI • Established 1895 • A Tradition of Excellence",
        backgroundColor: "#8B7355",
        textColor: "#FAF8F3",
      },
    },
  },
};
