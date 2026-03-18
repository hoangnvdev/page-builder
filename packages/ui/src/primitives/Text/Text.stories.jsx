import { Text } from './index';

export default {
  title: "Primitives/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "bold"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    as: {
      control: "select",
      options: ["p", "span", "div"],
    },
  },
};

export const Default = {
  args: {
    children: "This is a text component with default styling.",
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Text size="small">Small text - Perfect for captions and metadata</Text>
      <Text size="medium">Medium text - Default body text size</Text>
      <Text size="large">Large text - For emphasis and lead paragraphs</Text>
    </div>
  ),
};

export const Weights = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Text weight="light">Light weight text</Text>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const Alignment = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Text align="left">Left aligned text (default)</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
      <Text align="justify">
        Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </Text>
    </div>
  ),
};

export const CustomColor = {
  args: {
    color: "#3b82f6",
    children: "Custom colored text",
  },
};

export const AsSpan = {
  render: () => (
    <div>
      <Text as="span" weight="bold">
        Inline text using span
      </Text>{" "}
      <Text as="span">can be combined with other inline elements</Text>
    </div>
  ),
};

export const Combinations = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Text size="large" weight="bold" align="center">
        Large, Bold, Centered
      </Text>
      <Text size="small" weight="light" color="#6b7280">
        Small, Light, Gray
      </Text>
      <Text size="medium" weight="medium" color="#ef4444">
        Medium, Medium weight, Red
      </Text>
    </div>
  ),
};
