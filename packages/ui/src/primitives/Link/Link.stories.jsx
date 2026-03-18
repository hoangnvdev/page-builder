import { Link } from './index';

export default {
  title: "Primitives/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    underline: {
      control: "boolean",
    },
    external: {
      control: "boolean",
    },
    color: {
      control: "color",
    },
  },
};

export const Default = {
  args: {
    href: "#",
    children: "Default Link",
  },
};

export const WithUnderline = {
  args: {
    href: "#",
    underline: true,
    children: "Underlined Link",
  },
};

export const ExternalLink = {
  args: {
    href: "https://example.com",
    external: true,
    children: "External Link (opens in new tab)",
  },
};

export const CustomColors = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Link href="#" color="#ef4444">
        Red Link
      </Link>
      <Link href="#" color="#f59e0b">
        Orange Link
      </Link>
      <Link href="#" color="#10b981">
        Green Link
      </Link>
      <Link href="#" color="#3b82f6">
        Blue Link
      </Link>
      <Link href="#" color="#8b5cf6">
        Purple Link
      </Link>
    </div>
  ),
};

export const InlineParagraph = {
  render: () => (
    <p style={{ lineHeight: "1.7", maxWidth: "600px" }}>
      This is a paragraph with an{" "}
      <Link href="#" underline>
        inline link
      </Link>{" "}
      that demonstrates how links work within body text. You can also have{" "}
      <Link href="https://example.com" external>
        external links
      </Link>{" "}
      that open in a new tab. Links can also be{" "}
      <Link href="#" color="#ef4444" underline>
        colored
      </Link>{" "}
      to match your design system.
    </p>
  ),
};

export const NavigationLinks = {
  render: () => (
    <nav
      style={{
        display: "flex",
        gap: "2rem",
        padding: "1rem",
        backgroundColor: "#f3f4f6",
        borderRadius: "8px",
      }}
    >
      <Link href="#home">Home</Link>
      <Link href="#about">About</Link>
      <Link href="#services">Services</Link>
      <Link href="#contact">Contact</Link>
    </nav>
  ),
};

export const FooterLinks = {
  render: () => (
    <footer
      style={{
        padding: "2rem",
        backgroundColor: "#111827",
        color: "#fff",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "2rem",
        }}
      >
        <div>
          <h4 style={{ marginBottom: "1rem", color: "#fff" }}>Product</h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link href="#" color="#9ca3af">
              Features
            </Link>
            <Link href="#" color="#9ca3af">
              Pricing
            </Link>
            <Link href="#" color="#9ca3af">
              Documentation
            </Link>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: "1rem", color: "#fff" }}>Company</h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link href="#" color="#9ca3af">
              About Us
            </Link>
            <Link href="#" color="#9ca3af">
              Blog
            </Link>
            <Link href="#" color="#9ca3af">
              Careers
            </Link>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: "1rem", color: "#fff" }}>Legal</h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link href="#" color="#9ca3af">
              Privacy
            </Link>
            <Link href="#" color="#9ca3af">
              Terms
            </Link>
            <Link href="#" color="#9ca3af">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  ),
};

export const Breadcrumbs = {
  render: () => (
    <nav
      aria-label="Breadcrumb"
      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
    >
      <Link href="#" color="#6b7280">
        Home
      </Link>
      <span style={{ color: "#6b7280" }}>/</span>
      <Link href="#" color="#6b7280">
        Products
      </Link>
      <span style={{ color: "#6b7280" }}>/</span>
      <Link href="#" color="#6b7280">
        Electronics
      </Link>
      <span style={{ color: "#6b7280" }}>/</span>
      <span style={{ color: "#111" }}>Laptop</span>
    </nav>
  ),
};

export const SocialMediaLinks = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <span style={{ fontWeight: "500" }}>Follow us:</span>
      <Link href="https://twitter.com" external color="#1DA1F2">
        Twitter
      </Link>
      <Link href="https://facebook.com" external color="#1877F2">
        Facebook
      </Link>
      <Link href="https://linkedin.com" external color="#0A66C2">
        LinkedIn
      </Link>
      <Link href="https://github.com" external color="#333">
        GitHub
      </Link>
    </div>
  ),
};

export const CallToAction = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#eff6ff",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Ready to get started?</h2>
      <p style={{ marginBottom: "1.5rem", color: "#6b7280" }}>
        Join thousands of users already using our platform.
      </p>
      <Link
        href="#signup"
        style={{
          display: "inline-block",
          padding: "0.75rem 2rem",
          backgroundColor: "#3b82f6",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "500",
        }}
      >
        Sign Up Now
      </Link>
    </div>
  ),
};
