import React from "react";

export const ModernPortfolio = ({ config }) => {
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
      {/* Hero Section */}
      <section
        data-element="hero"
        style={{
          background: `linear-gradient(135deg, ${elements.hero.gradientStart} 0%, ${elements.hero.gradientEnd} 100%)`,
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            margin: "0 0 20px 0",
            fontWeight: "700",
          }}
        >
          {elements.hero.title}
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            margin: "0 0 30px 0",
            opacity: 0.95,
          }}
        >
          {elements.hero.subtitle}
        </p>
        <button
          style={{
            backgroundColor: elements.hero.buttonColor,
            color: "white",
            border: "none",
            padding: "12px 32px",
            fontSize: "1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {elements.hero.buttonText}
        </button>
      </section>

      {/* About Section */}
      <section
        data-element="about"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "20px",
            color: elements.about.headingColor,
          }}
        >
          {elements.about.heading}
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            color: elements.about.textColor,
          }}
        >
          {elements.about.content}
        </p>
      </section>

      {/* Projects Section */}
      <section
        data-element="projects"
        style={{
          backgroundColor: elements.projects.backgroundColor,
          padding: "60px 20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "40px",
              textAlign: "center",
              color: elements.projects.headingColor,
            }}
          >
            {elements.projects.heading}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {elements.projects.items.map((project, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "30px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                    color: elements.projects.cardTitleColor,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#666",
                  }}
                >
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
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
        <p style={{ margin: 0, fontSize: "0.95rem" }}>{elements.footer.text}</p>
      </footer>
    </div>
  );
};

export const modernPortfolioConfig = {
  id: "modern-portfolio",
  name: "Modern Portfolio",
  description: "Clean and professional portfolio layout",
  preview: "🎨",

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
      hero: {
        title: { type: "text", label: "Hero Title" },
        subtitle: { type: "text", label: "Hero Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        buttonColor: { type: "color", label: "Button Color" },
        gradientStart: { type: "color", label: "Gradient Start" },
        gradientEnd: { type: "color", label: "Gradient End" },
      },
      about: {
        heading: { type: "text", label: "Section Heading" },
        content: { type: "textarea", label: "About Content" },
        headingColor: { type: "color", label: "Heading Color" },
        textColor: { type: "color", label: "Text Color" },
      },
      projects: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        headingColor: { type: "color", label: "Heading Color" },
        cardTitleColor: { type: "color", label: "Card Title Color" },
        items: { type: "projects-list", label: "Projects" },
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
      hero: {
        title: "Hi, I'm Alex Designer",
        subtitle: "Creative Developer & Designer",
        buttonText: "View My Work",
        buttonColor: "#2563eb",
        gradientStart: "#6366f1",
        gradientEnd: "#8b5cf6",
      },
      about: {
        heading: "About Me",
        content:
          "I'm a passionate designer and developer with 5 years of experience creating beautiful, user-friendly digital experiences. I specialize in web design, branding, and interactive experiences.",
        headingColor: "#1a1a1a",
        textColor: "#4a4a4a",
      },
      projects: {
        heading: "Featured Projects",
        backgroundColor: "#f8f9fa",
        headingColor: "#1a1a1a",
        cardTitleColor: "#2563eb",
        items: [
          {
            title: "E-Commerce Platform",
            description: "Modern online shopping experience",
          },
          {
            title: "Brand Identity",
            description: "Complete branding suite for tech startup",
          },
          {
            title: "Mobile App",
            description: "iOS & Android fitness tracking app",
          },
        ],
      },
      footer: {
        text: "© 2026 Alex Designer. All rights reserved.",
        backgroundColor: "#1a1a1a",
        textColor: "#ffffff",
      },
    },
  },
};
