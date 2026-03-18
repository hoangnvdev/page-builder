import { Section } from './index';

export default {
  title: "Primitives/Section",
  component: Section,
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: "text",
    },
    backgroundColor: {
      control: "color",
    },
    as: {
      control: "select",
      options: ["section", "div", "article", "aside"],
    },
  },
};

export const Default = {
  render: () => (
    <Section>
      <h2>Section Title</h2>
      <p>This is the default section with standard padding.</p>
    </Section>
  ),
};

export const CustomPadding = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Section padding="20px">
        <h3>Small Padding (20px)</h3>
        <p>This section has minimal padding.</p>
      </Section>
      <Section padding="40px 20px">
        <h3>Medium Padding (40px vertical, 20px horizontal)</h3>
        <p>This section has moderate padding.</p>
      </Section>
      <Section padding="80px 20px">
        <h3>Large Padding (80px vertical, 20px horizontal)</h3>
        <p>This section has generous padding (default).</p>
      </Section>
      <Section padding="120px 20px">
        <h3>Extra Large Padding (120px vertical, 20px horizontal)</h3>
        <p>This section has extra large padding.</p>
      </Section>
    </div>
  ),
};

export const CustomBackgrounds = {
  render: () => (
    <div>
      <Section backgroundColor="#ffffff">
        <div style={{ textAlign: "center" }}>
          <h2>White Background</h2>
          <p>Clean and minimal section with white background.</p>
        </div>
      </Section>
      <Section backgroundColor="#f3f4f6">
        <div style={{ textAlign: "center" }}>
          <h2>Light Gray Background</h2>
          <p>Subtle gray background for visual separation.</p>
        </div>
      </Section>
      <Section backgroundColor="#dbeafe">
        <div style={{ textAlign: "center" }}>
          <h2>Light Blue Background</h2>
          <p>Soft blue background for emphasis.</p>
        </div>
      </Section>
      <Section backgroundColor="#111827" style={{ color: "white" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Dark Background</h2>
          <p>Dark section for contrast and drama.</p>
        </div>
      </Section>
    </div>
  ),
};

export const HeroSection = {
  render: () => (
    <Section
      backgroundColor="#3b82f6"
      padding="120px 20px"
      style={{ color: "white" }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Welcome to Our Platform
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: 0.9 }}>
          Build amazing web experiences with our powerful tools
        </p>
        <button
          style={{
            padding: "1rem 2rem",
            backgroundColor: "white",
            color: "#3b82f6",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </div>
    </Section>
  ),
};

export const FeaturesSection = {
  render: () => (
    <Section backgroundColor="#f9fafb" padding="80px 20px">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          Features
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                padding: "2rem",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "1rem" }}>Feature {i}</h3>
              <p style={{ color: "#6b7280" }}>
                Description of the feature and its benefits for users.
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  ),
};

export const TestimonialSection = {
  render: () => (
    <Section backgroundColor="#eff6ff" padding="80px 20px">
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
          What Our Users Say
        </h2>
        <blockquote
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            color: "#374151",
            marginBottom: "2rem",
            lineHeight: "1.6",
          }}
        >
          "This product has completely transformed the way we work. Highly
          recommended!"
        </blockquote>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "600",
            }}
          >
            JD
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontWeight: "600", margin: 0 }}>John Doe</p>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>
              CEO, Company Inc.
            </p>
          </div>
        </div>
      </div>
    </Section>
  ),
};

export const CTASection = {
  render: () => (
    <Section
      backgroundColor="#10b981"
      padding="80px 20px"
      style={{ color: "white" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Ready to Get Started?
        </h2>
        <p style={{ fontSize: "1.125rem", marginBottom: "2rem", opacity: 0.9 }}>
          Join thousands of users already using our platform to build amazing
          things.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            style={{
              padding: "1rem 2rem",
              backgroundColor: "white",
              color: "#10b981",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Sign Up Free
          </button>
          <button
            style={{
              padding: "1rem 2rem",
              backgroundColor: "transparent",
              color: "white",
              border: "2px solid white",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </Section>
  ),
};

export const ContentSection = {
  render: () => (
    <Section padding="80px 20px">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Beautiful Design
            </h2>
            <p
              style={{
                color: "#6b7280",
                lineHeight: "1.7",
                marginBottom: "1.5rem",
              }}
            >
              Create stunning web pages with our intuitive design tools. No
              coding required - just drag, drop, and customize.
            </p>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Learn More
            </button>
          </div>
          <div
            style={{
              height: "300px",
              backgroundColor: "#e5e7eb",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9ca3af",
            }}
          >
            Image Placeholder
          </div>
        </div>
      </div>
    </Section>
  ),
};

export const SemanticElements = {
  render: () => (
    <div>
      <Section as="header" backgroundColor="#f3f4f6" padding="40px 20px">
        <div style={{ textAlign: "center" }}>
          <h3>Rendered as &lt;header&gt;</h3>
          <p>This section uses semantic HTML header element.</p>
        </div>
      </Section>
      <Section as="article" padding="60px 20px">
        <div style={{ textAlign: "center" }}>
          <h3>Rendered as &lt;article&gt;</h3>
          <p>This section uses semantic HTML article element.</p>
        </div>
      </Section>
      <Section as="aside" backgroundColor="#fef3c7" padding="60px 20px">
        <div style={{ textAlign: "center" }}>
          <h3>Rendered as &lt;aside&gt;</h3>
          <p>This section uses semantic HTML aside element.</p>
        </div>
      </Section>
    </div>
  ),
};
