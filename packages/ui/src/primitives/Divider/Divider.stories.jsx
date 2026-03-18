import { Divider } from './index';

export default {
  title: "Primitives/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["solid", "dashed", "dotted"],
    },
    thickness: {
      control: "text",
    },
    color: {
      control: "color",
    },
  },
};

export const Horizontal = {
  args: {
    orientation: "horizontal",
  },
};

export const Vertical = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", height: "100px" }}>
      <span>Left Content</span>
      <Divider orientation="vertical" style={{ height: "60px" }} />
      <span>Right Content</span>
    </div>
  ),
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Solid</h4>
        <Divider variant="solid" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Dashed</h4>
        <Divider variant="dashed" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Dotted</h4>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
};

export const CustomThickness = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Thin (1px)</h4>
        <Divider thickness="1px" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Medium (2px)</h4>
        <Divider thickness="2px" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Thick (4px)</h4>
        <Divider thickness="4px" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Extra Thick (8px)</h4>
        <Divider thickness="8px" />
      </div>
    </div>
  ),
};

export const CustomColors = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Divider color="#ef4444" thickness="2px" />
      <Divider color="#f59e0b" thickness="2px" />
      <Divider color="#10b981" thickness="2px" />
      <Divider color="#3b82f6" thickness="2px" />
      <Divider color="#8b5cf6" thickness="2px" />
    </div>
  ),
};

export const WithSpacing = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p style={{ margin: 0 }}>Content above divider</p>
      <Divider spacing={32} />
      <p style={{ margin: 0 }}>Content below divider with 32px spacing</p>
    </div>
  ),
};

export const ContentSeparation = {
  render: () => (
    <div>
      <section>
        <h2>Section 1</h2>
        <p>
          This is the first section of content with some example text to
          demonstrate the divider component.
        </p>
      </section>

      <Divider spacing={24} />

      <section>
        <h2>Section 2</h2>
        <p>
          This is the second section, separated from the first by a horizontal
          divider with spacing.
        </p>
      </section>

      <Divider spacing={24} />

      <section>
        <h2>Section 3</h2>
        <p>Another section demonstrating content separation.</p>
      </section>
    </div>
  ),
};

export const VerticalNavigation = {
  render: () => (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#f3f4f6",
        borderRadius: "8px",
      }}
    >
      <a href="#" style={{ textDecoration: "none", color: "#111" }}>
        Home
      </a>
      <Divider orientation="vertical" style={{ height: "20px" }} />
      <a href="#" style={{ textDecoration: "none", color: "#111" }}>
        About
      </a>
      <Divider orientation="vertical" style={{ height: "20px" }} />
      <a href="#" style={{ textDecoration: "none", color: "#111" }}>
        Services
      </a>
      <Divider orientation="vertical" style={{ height: "20px" }} />
      <a href="#" style={{ textDecoration: "none", color: "#111" }}>
        Contact
      </a>
    </nav>
  ),
};

export const CardSections = {
  render: () => (
    <div
      style={{
        maxWidth: "400px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>Card Title</h3>
        <p style={{ margin: 0, color: "#6b7280" }}>Card description text</p>
      </div>

      <Divider />

      <div style={{ padding: "1.5rem" }}>
        <p style={{ margin: 0 }}>Main content area of the card</p>
      </div>

      <Divider />

      <div style={{ padding: "1rem 1.5rem", backgroundColor: "#f9fafb" }}>
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Action Button
        </button>
      </div>
    </div>
  ),
};
