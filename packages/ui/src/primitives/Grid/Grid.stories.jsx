import { Grid } from './index';

export default {
  title: "Primitives/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: { type: "number", min: 1, max: 24 },
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
      backgroundColor: "#e0e7ff",
      border: "1px solid #6366f1",
      borderRadius: "4px",
      textAlign: "center",
    }}
    {...props}
  >
    {children}
  </div>
);

export const Default = {
  render: () => (
    <Grid columns={12} gap={16}>
      <Grid.Item span={12}>
        <Box>12 columns (full width)</Box>
      </Grid.Item>
      <Grid.Item span={6}>
        <Box>6 columns</Box>
      </Grid.Item>
      <Grid.Item span={6}>
        <Box>6 columns</Box>
      </Grid.Item>
      <Grid.Item span={4}>
        <Box>4 columns</Box>
      </Grid.Item>
      <Grid.Item span={4}>
        <Box>4 columns</Box>
      </Grid.Item>
      <Grid.Item span={4}>
        <Box>4 columns</Box>
      </Grid.Item>
    </Grid>
  ),
};

export const ThreeColumns = {
  render: () => (
    <Grid columns={3} gap={16}>
      <Grid.Item>
        <Box>Column 1</Box>
      </Grid.Item>
      <Grid.Item>
        <Box>Column 2</Box>
      </Grid.Item>
      <Grid.Item>
        <Box>Column 3</Box>
      </Grid.Item>
    </Grid>
  ),
};

export const FourColumns = {
  render: () => (
    <Grid columns={4} gap={16}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Grid.Item key={i}>
          <Box>Item {i}</Box>
        </Grid.Item>
      ))}
    </Grid>
  ),
};

export const SpanMultipleColumns = {
  render: () => (
    <Grid columns={6} gap={16}>
      <Grid.Item span={6}>
        <Box>Span 6 (full width)</Box>
      </Grid.Item>
      <Grid.Item span={4}>
        <Box>Span 4</Box>
      </Grid.Item>
      <Grid.Item span={2}>
        <Box>Span 2</Box>
      </Grid.Item>
      <Grid.Item span={2}>
        <Box>Span 2</Box>
      </Grid.Item>
      <Grid.Item span={2}>
        <Box>Span 2</Box>
      </Grid.Item>
      <Grid.Item span={2}>
        <Box>Span 2</Box>
      </Grid.Item>
    </Grid>
  ),
};

export const CustomGap = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>No Gap</h3>
        <Grid columns={3} gap={0}>
          <Grid.Item>
            <Box>1</Box>
          </Grid.Item>
          <Grid.Item>
            <Box>2</Box>
          </Grid.Item>
          <Grid.Item>
            <Box>3</Box>
          </Grid.Item>
        </Grid>
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Medium Gap (16px)</h3>
        <Grid columns={3} gap={16}>
          <Grid.Item>
            <Box>1</Box>
          </Grid.Item>
          <Grid.Item>
            <Box>2</Box>
          </Grid.Item>
          <Grid.Item>
            <Box>3</Box>
          </Grid.Item>
        </Grid>
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Large Gap (32px)</h3>
        <Grid columns={3} gap={32}>
          <Grid.Item>
            <Box>1</Box>
          </Grid.Item>
          <Grid.Item>
            <Box>2</Box>
          </Grid.Item>
          <Grid.Item>
            <Box>3</Box>
          </Grid.Item>
        </Grid>
      </div>
    </div>
  ),
};

export const RowSpan = {
  render: () => (
    <Grid columns={3} gap={16}>
      <Grid.Item rowSpan={2}>
        <Box style={{ height: "100%" }}>Row Span 2</Box>
      </Grid.Item>
      <Grid.Item>
        <Box>Item 1</Box>
      </Grid.Item>
      <Grid.Item>
        <Box>Item 2</Box>
      </Grid.Item>
      <Grid.Item>
        <Box>Item 3</Box>
      </Grid.Item>
      <Grid.Item>
        <Box>Item 4</Box>
      </Grid.Item>
    </Grid>
  ),
};

export const ResponsiveLayout = {
  render: () => (
    <Grid columns={12} gap={16}>
      <Grid.Item span={12}>
        <Box>Header - Full Width</Box>
      </Grid.Item>
      <Grid.Item span={3}>
        <Box>Sidebar - 3 cols</Box>
      </Grid.Item>
      <Grid.Item span={9}>
        <Box>Main Content - 9 cols</Box>
      </Grid.Item>
      <Grid.Item span={12}>
        <Box>Footer - Full Width</Box>
      </Grid.Item>
    </Grid>
  ),
};
