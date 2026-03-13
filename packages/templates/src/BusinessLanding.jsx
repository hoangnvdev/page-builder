import React from "react";

import PropTypes from "prop-types";

export const BusinessLanding = ({ config }) => {
  const { page, elements } = config;

  return (
    <div
      style={{
        fontFamily: page.fontFamily,
        backgroundColor: page.backgroundColor,
        minHeight: "100vh",
        color: page.textColor,
      }}
    >
      {/* Header/Navigation */}
      <header
        data-element="header"
        style={{
          backgroundColor: elements.header.backgroundColor,
          padding: "20px 40px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1.5rem",
              color: elements.header.logoColor,
            }}
          >
            {elements.header.companyName}
          </h1>
          <nav style={{ display: "flex", gap: "20px" }}>
            <a
              href="#"
              style={{
                color: elements.header.linkColor,
                textDecoration: "none",
              }}
            >
              Home
            </a>
            <a
              href="#"
              style={{
                color: elements.header.linkColor,
                textDecoration: "none",
              }}
            >
              Features
            </a>
            <a
              href="#"
              style={{
                color: elements.header.linkColor,
                textDecoration: "none",
              }}
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero/CTA Section */}
      <section
        data-element="hero"
        style={{
          backgroundColor: elements.hero.backgroundColor,
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "3.5rem",
              margin: "0 0 20px 0",
              fontWeight: "700",
              color: elements.hero.titleColor,
            }}
          >
            {elements.hero.title}
          </h2>
          <p
            style={{
              fontSize: "1.3rem",
              margin: "0 0 40px 0",
              color: elements.hero.subtitleColor,
            }}
          >
            {elements.hero.subtitle}
          </p>
          <button
            style={{
              backgroundColor: elements.hero.ctaButtonColor,
              color: "white",
              border: "none",
              padding: "16px 48px",
              fontSize: "1.1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {elements.hero.ctaButtonText}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        data-element="features"
        style={{
          padding: "80px 20px",
          backgroundColor: elements.features.backgroundColor,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "2.5rem",
              marginBottom: "50px",
              textAlign: "center",
              color: elements.features.headingColor,
            }}
          >
            {elements.features.heading}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "40px",
            }}
          >
            {elements.features.items.map((feature, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "15px",
                  }}
                >
                  {feature.icon}
                </div>
                <h4
                  style={{
                    fontSize: "1.3rem",
                    marginBottom: "10px",
                    color: elements.features.featureTitleColor,
                  }}
                >
                  {feature.title}
                </h4>
                <p
                  style={{
                    fontSize: "1rem",
                    color: elements.features.featureTextColor,
                    lineHeight: "1.6",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-element="cta"
        style={{
          backgroundColor: elements.cta.backgroundColor,
          color: elements.cta.textColor,
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "2.5rem",
            margin: "0 0 20px 0",
          }}
        >
          {elements.cta.heading}
        </h3>
        <p
          style={{
            fontSize: "1.2rem",
            margin: "0 0 30px 0",
            opacity: 0.9,
          }}
        >
          {elements.cta.subheading}
        </p>
        <button
          style={{
            backgroundColor: elements.cta.buttonColor,
            color: elements.cta.buttonTextColor,
            border: "none",
            padding: "14px 40px",
            fontSize: "1.1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {elements.cta.buttonText}
        </button>
      </section>

      {/* Footer */}
      <footer
        data-element="footer"
        style={{
          backgroundColor: elements.footer.backgroundColor,
          color: elements.footer.textColor,
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0 }}>{elements.footer.text}</p>
      </footer>
    </div>
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
