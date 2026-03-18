import { Flex } from './index';

export default {
  title: "Primitives/Flex",
  component: Flex,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
    },
    wrap: {
      control: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
    },
    justify: {
      control: "select",
      options: [
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    align: {
      control: "select",
      options: ["stretch", "flex-start", "center", "flex-end", "baseline"],
    },
    gap: {
      control: { type: "number", min: 0, max: 100 },
    },
  },
};

const Box = ({ children, ...props }) => (
  <div
    style={{
      padding: "1rem",
      backgroundColor: "#dbeafe",
      border: "1px solid #3b82f6",
      borderRadius: "4px",
      minWidth: "60px",
      textAlign: "center",
    }}
    {...props}
  >
    {children}
  </div>
);

export const Default = {
  render: () => (
    <Flex gap={16}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
};

export const Column = {
  render: () => (
    <Flex direction="column" gap={16}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
};

export const JustifyContent = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Flex Start</h4>
        <Flex justify="flex-start" gap={16}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Center</h4>
        <Flex justify="center" gap={16}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Flex End</h4>
        <Flex justify="flex-end" gap={16}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Space Between</h4>
        <Flex justify="space-between">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Space Around</h4>
        <Flex justify="space-around">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Space Evenly</h4>
        <Flex justify="space-evenly">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
    </div>
  ),
};

export const AlignItems = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Flex Start</h4>
        <Flex
          align="flex-start"
          gap={16}
          style={{ height: "100px", border: "1px dashed #ccc" }}
        >
          <Box>1</Box>
          <Box style={{ height: "60px" }}>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Center</h4>
        <Flex
          align="center"
          gap={16}
          style={{ height: "100px", border: "1px dashed #ccc" }}
        >
          <Box>1</Box>
          <Box style={{ height: "60px" }}>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Flex End</h4>
        <Flex
          align="flex-end"
          gap={16}
          style={{ height: "100px", border: "1px dashed #ccc" }}
        >
          <Box>1</Box>
          <Box style={{ height: "60px" }}>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Stretch</h4>
        <Flex
          align="stretch"
          gap={16}
          style={{ height: "100px", border: "1px dashed #ccc" }}
        >
          <Box style={{ height: "auto" }}>1</Box>
          <Box style={{ height: "auto" }}>2</Box>
          <Box style={{ height: "auto" }}>3</Box>
        </Flex>
      </div>
    </div>
  ),
};

export const Wrap = {
  render: () => (
    <Flex wrap="wrap" gap={16} style={{ maxWidth: "300px" }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Box key={i}>Item {i}</Box>
      ))}
    </Flex>
  ),
};

export const CenteredContent = {
  render: () => (
    <Flex
      justify="center"
      align="center"
      style={{ height: "200px", border: "1px dashed #ccc" }}
    >
      <Box>Perfectly Centered</Box>
    </Flex>
  ),
};

export const Vertical = {
  render: () => (
    <Flex vertical gap={16}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
};

export const ResponsiveNavbar = {
  render: () => (
    <Flex
      justify="space-between"
      align="center"
      gap={16}
      style={{
        padding: "1rem",
        backgroundColor: "#f3f4f6",
        borderRadius: "4px",
      }}
    >
      <Box style={{ fontWeight: "bold" }}>Logo</Box>
      <Flex gap={16}>
        <Box>Home</Box>
        <Box>About</Box>
        <Box>Contact</Box>
      </Flex>
    </Flex>
  ),
};

export const CardLayout = {
  render: () => (
    <Flex gap={16} wrap="wrap">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Box key={i} style={{ width: "150px", height: "100px" }}>
          Card {i}
        </Box>
      ))}
    </Flex>
  ),
};
