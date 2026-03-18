import { Badge } from './index';

export default {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger", "info"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
};

export const Default = {
  args: {
    variant: "default",
    children: "Default",
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Success = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Warning = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Danger = {
  args: {
    variant: "danger",
    children: "Danger",
  },
};

export const Info = {
  args: {
    variant: "info",
    children: "Info",
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Badge size="small" variant="primary">
        Small
      </Badge>
      <Badge size="medium" variant="primary">
        Medium
      </Badge>
      <Badge size="large" variant="primary">
        Large
      </Badge>
    </div>
  ),
};

export const CustomColors = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge color="#fff" backgroundColor="#8b5cf6">
        Purple
      </Badge>
      <Badge color="#fff" backgroundColor="#ec4899">
        Pink
      </Badge>
      <Badge color="#000" backgroundColor="#fbbf24">
        Gold
      </Badge>
      <Badge color="#fff" backgroundColor="#14b8a6">
        Teal
      </Badge>
    </div>
  ),
};

export const WithIcons = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge variant="success">✓ Completed</Badge>
      <Badge variant="warning">⚠ Warning</Badge>
      <Badge variant="danger">✕ Error</Badge>
      <Badge variant="info">ℹ Info</Badge>
    </div>
  ),
};

export const StatusIndicators = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>Build Status:</span>
        <Badge variant="success" size="small">
          Passing
        </Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>Version:</span>
        <Badge variant="info" size="small">
          v2.1.0
        </Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>Environment:</span>
        <Badge variant="warning" size="small">
          Staging
        </Badge>
      </div>
    </div>
  ),
};
