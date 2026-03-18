import { Title } from "../Title/index.jsx";
import { SubTitle } from "./index.jsx";

export default {
  title: "Components/SubTitle",
  component: SubTitle,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: "This is a subtitle component",
  },
};

export const WithTitle = {
  render: () => (
    <div>
      <Title level={1}>Main Title</Title>
      <SubTitle>A descriptive subtitle that provides context</SubTitle>
    </div>
  ),
};

export const CustomStyle = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <Title level={2}>Features</Title>
        <SubTitle style={{ color: "#6b7280" }}>
          Explore the key features of our product
        </SubTitle>
      </div>
      <div>
        <Title level={2}>Pricing</Title>
        <SubTitle style={{ color: "#10b981", fontWeight: "500" }}>
          Flexible plans for every budget
        </SubTitle>
      </div>
      <div>
        <Title level={2}>Contact</Title>
        <SubTitle style={{ color: "#3b82f6", fontStyle: "italic" }}>
          Get in touch with our team
        </SubTitle>
      </div>
    </div>
  ),
};

export const LongSubTitle = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <Title level={1}>Understanding React Components</Title>
      <SubTitle>
        A comprehensive guide to building modern, reusable, and maintainable UI
        components using React and best practices from the industry.
      </SubTitle>
    </div>
  ),
};

export const MultipleSubTitles = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <Title level={1}>Welcome to Our Platform</Title>
        <SubTitle>Build amazing things with our tools</SubTitle>
      </section>
      <section>
        <Title level={2}>Getting Started</Title>
        <SubTitle>Everything you need to begin your journey</SubTitle>
      </section>
      <section>
        <Title level={2}>Documentation</Title>
        <SubTitle>Detailed guides and API references</SubTitle>
      </section>
      <section>
        <Title level={2}>Community</Title>
        <SubTitle>Join thousands of developers worldwide</SubTitle>
      </section>
    </div>
  ),
};

export const HeroSection = {
  render: () => (
    <div
      style={{
        padding: "3rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "0.5rem",
        color: "white",
        textAlign: "center",
      }}
    >
      <Title level={1} style={{ color: "white", marginBottom: "1rem" }}>
        Build Something Amazing
      </Title>
      <SubTitle
        style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.125rem" }}
      >
        The fastest way to create and deploy modern web applications
      </SubTitle>
    </div>
  ),
};
