import { Container } from './index';

export default {
  title: "Primitives/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "text",
    },
    padding: {
      control: "text",
    },
  },
};

const ContentBox = () => (
  <div
    style={{
      padding: "2rem",
      backgroundColor: "#e0e7ff",
      border: "2px dashed #6366f1",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    Container Content
  </div>
);

export const Default = {
  render: () => (
    <Container>
      <ContentBox />
    </Container>
  ),
};

export const MaxWidths = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Small (600px)</h4>
        <Container maxWidth="600px">
          <ContentBox />
        </Container>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Medium (900px)</h4>
        <Container maxWidth="900px">
          <ContentBox />
        </Container>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Default (1200px)</h4>
        <Container maxWidth="1200px">
          <ContentBox />
        </Container>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Large (1400px)</h4>
        <Container maxWidth="1400px">
          <ContentBox />
        </Container>
      </div>
    </div>
  ),
};

export const CustomPadding = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>No Padding</h4>
        <Container padding="0">
          <ContentBox />
        </Container>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Small Padding (10px)</h4>
        <Container padding="0 10px">
          <ContentBox />
        </Container>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Default Padding (20px)</h4>
        <Container padding="0 20px">
          <ContentBox />
        </Container>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Large Padding (40px)</h4>
        <Container padding="0 40px">
          <ContentBox />
        </Container>
      </div>
    </div>
  ),
};

export const NestedContainers = {
  render: () => (
    <Container maxWidth="1200px">
      <div
        style={{
          padding: "2rem",
          backgroundColor: "#fef3c7",
          border: "2px solid #f59e0b",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0" }}>Outer Container (1200px)</h3>
        <Container maxWidth="800px">
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "#dbeafe",
              border: "2px solid #3b82f6",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Inner Container (800px)</h4>
            <p style={{ margin: 0 }}>Nested container content</p>
          </div>
        </Container>
      </div>
    </Container>
  ),
};

export const ResponsiveLayout = {
  render: () => (
    <Container maxWidth="1200px" padding="0 20px">
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#e0e7ff",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          Header
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                padding: "1.5rem",
                backgroundColor: "#dbeafe",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Card {i}
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#e0e7ff",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          Footer
        </div>
      </div>
    </Container>
  ),
};

export const ArticleLayout = {
  render: () => (
    <Container maxWidth="800px" padding="40px 20px">
      <article>
        <h1 style={{ marginBottom: "0.5rem" }}>Article Title</h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          Published on March 18, 2026
        </p>
        <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </article>
    </Container>
  ),
};
