import { Title } from './index.jsx';

export default {
  title: "Primitives/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
    },
  },
};

export const Default = {
  args: {
    children: "This is a title component",
  },
};

export const AllLevels = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Title level={1}>Heading Level 1</Title>
      <Title level={2}>Heading Level 2</Title>
      <Title level={3}>Heading Level 3</Title>
      <Title level={4}>Heading Level 4</Title>
      <Title level={5}>Heading Level 5</Title>
      <Title level={6}>Heading Level 6</Title>
    </div>
  ),
};

export const Level1 = {
  args: {
    level: 1,
    children: "Main Page Title",
  },
};

export const Level2 = {
  args: {
    level: 2,
    children: "Section Title",
  },
};

export const Level3 = {
  args: {
    level: 3,
    children: "Subsection Title",
  },
};

export const WithCustomStyle = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Title level={1} style={{ color: "#3b82f6" }}>
        Blue Title
      </Title>
      <Title level={2} style={{ color: "#10b981", textAlign: "center" }}>
        Centered Green Title
      </Title>
      <Title
        level={3}
        style={{ color: "#ef4444", textDecoration: "underline" }}
      >
        Underlined Red Title
      </Title>
    </div>
  ),
};

export const PageStructure = {
  render: () => (
    <article>
      <Title level={1}>Article Title</Title>
      <p style={{ margin: "1rem 0", color: "#6b7280" }}>
        Published on March 18, 2026
      </p>
      <Title level={2}>Introduction</Title>
      <p style={{ marginBottom: "1rem" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Title level={2}>Main Content</Title>
      <Title level={3}>First Point</Title>
      <p style={{ marginBottom: "1rem" }}>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </p>
      <Title level={3}>Second Point</Title>
      <p style={{ marginBottom: "1rem" }}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
      </p>
      <Title level={2}>Conclusion</Title>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
    </article>
  ),
};
