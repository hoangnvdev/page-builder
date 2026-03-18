# Writing Stories Guide

This guide explains how to write stories for UI components in this library.

## Story File Structure

Each component should have a `.stories.jsx` file alongside its main component file:

```
src/components/Button/
├── index.jsx
├── index.scss
└── Button.stories.jsx
```

## Basic Story Template

```jsx
import { ComponentName } from "./index";

export default {
  title: "Components/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
  argTypes: {
    // Define controls for props
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

// Simple story using args
export const Default = {
  args: {
    children: "Click me",
    variant: "primary",
  },
};

// Story with template (for stateful components)
const Template = (args) => {
  const [value, setValue] = useState(args.value || "");

  return <ComponentName {...args} value={value} onChange={setValue} />;
};

export const WithState = Template.bind({});
WithState.args = {
  label: "Input",
};

// Custom story with JSX
export const CustomExample = () => (
  <div>
    <ComponentName variant="primary">Example 1</ComponentName>
    <ComponentName variant="secondary">Example 2</ComponentName>
  </div>
);
```

## Story Naming Conventions

- **Default** - The most basic usage
- **WithX** - Story demonstrating a specific feature (WithIcon, WithLabel)
- **AllVariants** - Shows all variant options together
- **AllStates** - Shows all state combinations
- **Sizes** - Demonstrates size variations
- **Custom** - Specific use case examples

## ArgTypes

Configure controls for props:

```jsx
argTypes: {
  // Select dropdown
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'danger'],
  },

  // Boolean toggle
  disabled: {
    control: 'boolean',
  },

  // Number slider
  size: {
    control: { type: 'range', min: 12, max: 48, step: 4 },
  },

  // Text input
  label: {
    control: 'text',
  },

  // Color picker
  color: {
    control: 'color',
  },

  // Radio buttons
  alignment: {
    control: 'radio',
    options: ['left', 'center', 'right'],
  },
}
```

## Stateful Components

For components with state (like inputs), use a Template:

```jsx
const Template = (args) => {
  const [value, setValue] = useState(args.value || "");

  return <Input {...args} value={value} onChange={setValue} />;
};

export const Interactive = Template.bind({});
Interactive.args = {
  label: "Name",
  placeholder: "Enter your name",
};
```

## Multiple Instances

Show multiple variations in one story:

```jsx
export const AllVariants = () => (
  <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
  </div>
);
```

## With Icons

Import icons from lucide-react:

```jsx
import { Plus, Download, Trash2 } from "lucide-react";

export const WithIcon = {
  args: {
    children: "Download",
    icon: <Download size={18} />,
  },
};
```

## Best Practices

1. **Start Simple** - Begin with a Default story showing basic usage
2. **Cover Variants** - Show all available variants/states
3. **Interactive Examples** - Use Templates for stateful components
4. **Meaningful Args** - Provide sensible default args
5. **Group Related Stories** - Use consistent naming
6. **Add Descriptions** - Use JSDoc comments to document props
7. **Test Edge Cases** - Include disabled, error, empty states

## Documentation

Enable autodocs by adding the tag:

```jsx
export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"], // Auto-generates docs page
};
```

## Testing Stories

Stories can be used for visual regression testing and interaction testing:

```jsx
import { expect } from "@storybook/test";
import { within, userEvent } from "@storybook/testing-library";

export const Clickable = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
```

## Running Stories

Development:

```bash
pnpm storybook
```

Build:

```bash
pnpm build-storybook
```

## Tips

- Use story args for simple demonstrations
- Use Templates for interactive components
- Use custom JSX for complex layouts
- Group similar stories together
- Test your stories in different viewports
- Check accessibility with the a11y addon
