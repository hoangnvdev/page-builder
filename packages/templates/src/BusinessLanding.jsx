import PropTypes from "prop-types";

import { Page } from "@page-builder/ui";

import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ItemGrid } from "./components/ItemGrid";

export const BusinessLanding = ({ config }) => {
  const { page, elements } = config;

  const navLinks = [
    { text: "Home", href: "#" },
    { text: "Features", href: "#" },
    { text: "Contact", href: "#" },
  ];

  return (
    <Page
      fontFamily={page.fontFamily}
      backgroundColor={page.backgroundColor}
      textColor={page.textColor}
    >
      <Header
        companyName={elements.header.companyName}
        backgroundColor={elements.header.backgroundColor}
        logoColor={elements.header.logoColor}
        linkColor={elements.header.linkColor}
        links={navLinks}
      />

      <Hero
        title={elements.hero.title}
        subtitle={elements.hero.subtitle}
        buttonText={elements.hero.ctaButtonText}
        backgroundColor={elements.hero.backgroundColor}
        titleColor={elements.hero.titleColor}
        subtitleColor={elements.hero.subtitleColor}
        buttonColor={elements.hero.ctaButtonColor}
      />

      <ItemGrid
        heading={elements.features.heading}
        items={elements.features.items}
        backgroundColor={elements.features.backgroundColor}
        headingColor={elements.features.headingColor}
        itemTitleColor={elements.features.featureTitleColor}
        itemTextColor={elements.features.featureTextColor}
        dataElement="features"
      />

      <CallToAction
        heading={elements.cta.heading}
        subheading={elements.cta.subheading}
        buttonText={elements.cta.buttonText}
        backgroundColor={elements.cta.backgroundColor}
        textColor={elements.cta.textColor}
        buttonColor={elements.cta.buttonColor}
        buttonTextColor={elements.cta.buttonTextColor}
      />

      <Footer
        text={elements.footer.text}
        backgroundColor={elements.footer.backgroundColor}
        textColor={elements.footer.textColor}
      />
    </Page>
  );
};

BusinessLanding.propTypes = {
  config: PropTypes.shape({
    page: PropTypes.shape({
      fontFamily: PropTypes.string,
      backgroundColor: PropTypes.string,
      textColor: PropTypes.string,
    }).isRequired,
    elements: PropTypes.object.isRequired,
  }).isRequired,
};

export const businessLandingConfig = {
  id: "business-landing",
  name: "Business Landing",
  description: "Conversion-focused business page",
  icon: "💼",

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
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // Header
    { id: "elements.header.companyName", label: "Company Name", type: "text" },
    {
      id: "elements.header.backgroundColor",
      label: "Header Background",
      type: "color",
    },
    { id: "elements.header.logoColor", label: "Logo Color", type: "color" },
    { id: "elements.header.linkColor", label: "Link Color", type: "color" },

    // Hero
    { id: "elements.hero.title", label: "Hero Title", type: "text" },
    { id: "elements.hero.subtitle", label: "Hero Subtitle", type: "textarea" },
    {
      id: "elements.hero.ctaButtonText",
      label: "Hero Button Text",
      type: "text",
    },
    {
      id: "elements.hero.backgroundColor",
      label: "Hero Background",
      type: "color",
    },
    {
      id: "elements.hero.titleColor",
      label: "Hero Title Color",
      type: "color",
    },
    {
      id: "elements.hero.subtitleColor",
      label: "Hero Subtitle Color",
      type: "color",
    },
    {
      id: "elements.hero.ctaButtonColor",
      label: "Hero Button Color",
      type: "color",
    },

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
    {
      id: "elements.cta.backgroundColor",
      label: "CTA Background",
      type: "color",
    },
    {
      id: "elements.cta.buttonColor",
      label: "CTA Button Color",
      type: "color",
    },

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
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: [
          { value: "Arial, sans-serif", label: "Arial" },
          { value: "Georgia, serif", label: "Georgia" },
          { value: '"Segoe UI", sans-serif', label: "Segoe UI" },
          { value: "system-ui, sans-serif", label: "System" },
        ],
      },
      backgroundColor: {
        type: "color",
        label: "Page Background",
      },
      textColor: {
        type: "color",
        label: "Page Text Color",
      },
    },
    elements: {
      header: {
        companyName: { type: "text", label: "Company Name" },
        backgroundColor: { type: "color", label: "Background Color" },
        logoColor: { type: "color", label: "Logo Color" },
        linkColor: { type: "color", label: "Link Color" },
      },
      hero: {
        title: { type: "text", label: "Main Title" },
        subtitle: { type: "text", label: "Subtitle" },
        ctaButtonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        titleColor: { type: "color", label: "Title Color" },
        subtitleColor: { type: "color", label: "Subtitle Color" },
        ctaButtonColor: { type: "color", label: "Button Color" },
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
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#ffffff",
      textColor: "#1a1a1a",
    },
    elements: {
      header: {
        companyName: "TechFlow",
        backgroundColor: "#ffffff",
        logoColor: "#0066cc",
        linkColor: "#333333",
      },
      hero: {
        title: "Grow Your Business Faster",
        subtitle:
          "The all-in-one platform for managing your business operations",
        ctaButtonText: "Get Started Free",
        backgroundColor: "#f0f9ff",
        titleColor: "#0c4a6e",
        subtitleColor: "#475569",
        ctaButtonColor: "#0066cc",
      },
      features: {
        heading: "Why Choose Us",
        backgroundColor: "#ffffff",
        headingColor: "#1a1a1a",
        featureTitleColor: "#0066cc",
        featureTextColor: "#666666",
        items: [
          {
            icon: "⚡",
            title: "Fast & Reliable",
            description: "Lightning-fast performance you can count on",
          },
          {
            icon: "🔒",
            title: "Secure",
            description: "Enterprise-grade security for your peace of mind",
          },
          {
            icon: "📊",
            title: "Analytics",
            description: "Powerful insights to drive your decisions",
          },
        ],
      },
      cta: {
        heading: "Ready to Get Started?",
        subheading: "Join thousands of businesses already using our platform",
        buttonText: "Start Your Free Trial",
        backgroundColor: "#0066cc",
        textColor: "#ffffff",
        buttonColor: "#ffffff",
        buttonTextColor: "#0066cc",
      },
      footer: {
        text: "© 2026 TechFlow. All rights reserved.",
        backgroundColor: "#1a1a1a",
        textColor: "#ffffff",
      },
    },
  },
};
