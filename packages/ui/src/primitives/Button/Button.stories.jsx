import { Button } from './index';

export default {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "export", "danger", "ghost", "icon"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Export = {
  args: {
    variant: "export",
    children: "Export Button",
  },
};

export const Danger = {
  args: {
    variant: "danger",
    children: "Delete",
  },
};

export const Ghost = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="export">Export</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Disabled = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};

export const FullWidth = {
  args: {
    variant: "primary",
    fullWidth: true,
    children: "Full Width Button",
  },
};

export const WithIcon = {
  args: {
    variant: "primary",
    icon: "🚀",
    children: "Launch",
  },
};

export const IconRight = {
  args: {
    variant: "primary",
    icon: "→",
    iconPosition: "right",
    children: "Next",
  },
};

export const IconOnly = {
  args: {
    variant: "icon",
    icon: "⚙️",
    "aria-label": "Settings",
  },
};
