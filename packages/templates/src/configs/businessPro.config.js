import { color, text, textarea } from "../utils/index.js";

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

  editableFields_OLD: [
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
      header: {
        companyName: text("Company Name"),
        backgroundColor: color("Header Background"),
        logoColor: color("Logo Color"),
        linkColor: color("Link Color"),
      },
      hero: {
        title: text("Hero Title"),
        subtitle: textarea("Hero Subtitle"),
        buttonText: text("Button Text"),
        backgroundColor: color("Background Color"),
        gradientStart: color("Gradient Start"),
        gradientEnd: color("Gradient End"),
        titleColor: color("Title Color"),
        subtitleColor: color("Subtitle Color"),
        buttonColor: color("Button Color"),
        buttonTextColor: color("Button Text Color"),
      },
      about: {
        heading: text("Heading"),
        content: textarea("Content"),
        backgroundColor: color("Background Color"),
        headingColor: color("Heading Color"),
        textColor: color("Text Color"),
      },
      features: {
        heading: text("Section Heading"),
        backgroundColor: color("Background Color"),
        headingColor: color("Heading Color"),
        items: { type: "array", label: "Features" },
      },
      projects: {
        heading: text("Section Heading"),
        backgroundColor: color("Background Color"),
        headingColor: color("Heading Color"),
        items: { type: "array", label: "Projects" },
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
      fontFamily: "system-ui, sans-serif",
      title: "BusinessPro - Professional Website",
      description:
        "Showcase your business and creative work with a professional, modern website. Perfect for businesses, agencies, and professionals.",
      keywords: "business, professional, corporate, portfolio, services",
      author: "",
      language: "en",
    },
    elements: {
      header: {
        companyName: "BusinessPro",
        backgroundColor: "#ffffff",
        logoColor: "#0066cc",
        linkColor: "#333333",
      },
      hero: {
        title: "Grow Your Business & Showcase Your Work",
        subtitle:
          "The professional platform for businesses and creatives to make an impact online",
        buttonText: "Get Started",
        backgroundColor: "#f0f9ff",
        gradientStart: "#6366f1",
        gradientEnd: "#8b5cf6",
        titleColor: "#0c4a6e",
        subtitleColor: "#475569",
        buttonColor: "#0066cc",
        buttonTextColor: "#ffffff",
      },
      about: {
        heading: "About Us",
        content:
          "We're a professional team dedicated to delivering exceptional results. With years of experience and a passion for excellence, we help businesses and individuals achieve their goals through innovative solutions and creative strategies.",
        backgroundColor: "#ffffff",
        headingColor: "#1a1a1a",
        textColor: "#4a4a4a",
      },
      features: {
        heading: "Our Services",
        backgroundColor: "#f8f9fa",
        headingColor: "#1a1a1a",
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
      },
      footer: {
        text: "© 2026 BusinessPro. All rights reserved.",
        backgroundColor: "#1a1a1a",
        textColor: "#ffffff",
      },
    },
  },
};
