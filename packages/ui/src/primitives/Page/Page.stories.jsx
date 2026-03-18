import { Page } from './index';

export default {
  title: "Primitives/Page",
  component: Page,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    fontFamily: {
      control: "text",
    },
    backgroundColor: {
      control: "color",
    },
    textColor: {
      control: "color",
    },
    minHeight: {
      control: "text",
    },
  },
};

export const Default = {
  render: () => (
    <Page>
      <div style={{ padding: "2rem" }}>
        <h1>Page Title</h1>
        <p>This is the default page layout with standard styling.</p>
      </div>
    </Page>
  ),
};

export const CustomBackgroundColor = {
  render: () => (
    <Page backgroundColor="#f3f4f6">
      <div style={{ padding: "2rem" }}>
        <h1>Light Gray Background</h1>
        <p>This page has a custom light gray background color.</p>
      </div>
    </Page>
  ),
};

export const DarkTheme = {
  render: () => (
    <Page backgroundColor="#111827" textColor="#f9fafb">
      <div style={{ padding: "2rem" }}>
        <h1>Dark Theme Page</h1>
        <p>
          This page demonstrates a dark theme with custom background and text
          colors.
        </p>
        <button
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Action Button
        </button>
      </div>
    </Page>
  ),
};

export const CustomFontFamily = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Page fontFamily="Georgia, serif">
        <div style={{ padding: "2rem" }}>
          <h2>Serif Font Family</h2>
          <p>
            This page uses Georgia serif font for a classic, traditional look.
          </p>
        </div>
      </Page>
      <Page fontFamily="'Courier New', monospace">
        <div style={{ padding: "2rem" }}>
          <h2>Monospace Font Family</h2>
          <p>
            This page uses Courier New monospace font for a technical
            appearance.
          </p>
        </div>
      </Page>
    </div>
  ),
};

export const FullPageLayout = {
  render: () => (
    <Page backgroundColor="#ffffff">
      <header
        style={{
          padding: "1rem 2rem",
          backgroundColor: "#3b82f6",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Brand</h1>
        <nav style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Home
          </a>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            About
          </a>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Contact
          </a>
        </nav>
      </header>
      <main style={{ padding: "2rem", minHeight: "500px" }}>
        <h2>Main Content Area</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </main>
      <footer
        style={{
          padding: "2rem",
          backgroundColor: "#f3f4f6",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, color: "#6b7280" }}>
          © 2026 Company Name. All rights reserved.
        </p>
      </footer>
    </Page>
  ),
};

export const ColorfulBackground = {
  render: () => (
    <Page
      backgroundColor="#dbeafe"
      style={{
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Gradient Background
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
          Beautiful gradient backgrounds for modern web pages
        </p>
        <button
          style={{
            padding: "1rem 2rem",
            backgroundColor: "white",
            color: "#667eea",
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
    </Page>
  ),
};

export const MinimalLanding = {
  render: () => (
    <Page backgroundColor="#ffffff" fontFamily="'Inter', system-ui, sans-serif">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "4rem", marginBottom: "1rem", fontWeight: "700" }}
        >
          Simple & Clean
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            color: "#6b7280",
            marginBottom: "2rem",
            maxWidth: "600px",
          }}
        >
          A minimal landing page design with centered content
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Primary Action
          </button>
          <button
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "transparent",
              color: "#3b82f6",
              border: "2px solid #3b82f6",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Secondary Action
          </button>
        </div>
      </div>
    </Page>
  ),
};

export const ArticlePage = {
  render: () => (
    <Page backgroundColor="#fafbfc" fontFamily="Georgia, serif">
      <article
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <header style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            The Art of Web Design
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            Published on March 18, 2026 · 5 min read
          </p>
        </header>
        <div style={{ lineHeight: "1.8", fontSize: "1.125rem" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </article>
    </Page>
  ),
};
