import { useState } from "react";

import { ColorPicker } from "./index.jsx";

export default {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "color" },
    onChange: { action: "changed" },
  },
};

export const Default = {
  render: (args) => {
    const [color, setColor] = useState("#3b82f6");
    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={(newColor) => {
          setColor(newColor);
          args.onChange?.(newColor);
        }}
      />
    );
  },
  args: {
    id: "color-picker",
    label: "Pick a Color",
  },
};

export const WithValue = {
  render: (args) => {
    const [color, setColor] = useState(args.value);
    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={(newColor) => {
          setColor(newColor);
          args.onChange?.(newColor);
        }}
      />
    );
  },
  args: {
    id: "color-picker-value",
    label: "Background Color",
    value: "#10b981",
  },
};

export const Required = {
  render: (args) => {
    const [color, setColor] = useState("#ef4444");
    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={(newColor) => {
          setColor(newColor);
          args.onChange?.(newColor);
        }}
      />
    );
  },
  args: {
    id: "color-picker-required",
    label: "Primary Color",
    required: true,
  },
};

export const WithHelper = {
  render: (args) => {
    const [color, setColor] = useState("#8b5cf6");
    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={(newColor) => {
          setColor(newColor);
          args.onChange?.(newColor);
        }}
      />
    );
  },
  args: {
    id: "color-picker-helper",
    label: "Accent Color",
    helperText: "Choose a color that complements your brand",
  },
};

export const WithError = {
  render: (args) => {
    const [color, setColor] = useState("#000000");
    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={(newColor) => {
          setColor(newColor);
          args.onChange?.(newColor);
        }}
      />
    );
  },
  args: {
    id: "color-picker-error",
    label: "Text Color",
    error: "Color must have sufficient contrast",
    required: true,
  },
};

export const Disabled = {
  render: (args) => {
    const [color, setColor] = useState("#6366f1");
    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={(newColor) => {
          setColor(newColor);
          args.onChange?.(newColor);
        }}
      />
    );
  },
  args: {
    id: "color-picker-disabled",
    label: "Locked Color",
    disabled: true,
  },
};

export const WithTransparent = {
  render: (args) => {
    const [color, setColor] = useState("transparent");
    return (
      <div>
        <ColorPicker
          {...args}
          value={color}
          onChange={(newColor) => {
            setColor(newColor);
            args.onChange?.(newColor);
          }}
        />
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: color,
            border: "1px solid #e5e7eb",
            borderRadius: "0.375rem",
          }}
        >
          Preview area with selected color
        </div>
      </div>
    );
  },
  args: {
    id: "color-picker-transparent",
    label: "Background Color",
    helperText: 'Clear the input or type "transparent" for no background',
  },
};

export const AllStates = {
  render: () => {
    const [color1, setColor1] = useState("#3b82f6");
    const [color2, setColor2] = useState("#ef4444");
    const [color3, setColor3] = useState("#000000");
    const [color4, setColor4] = useState("#6366f1");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <ColorPicker
          id="state-default"
          label="Default State"
          value={color1}
          onChange={setColor1}
          helperText="Choose any color"
        />
        <ColorPicker
          id="state-required"
          label="Required State"
          value={color2}
          onChange={setColor2}
          required={true}
        />
        <ColorPicker
          id="state-error"
          label="Error State"
          value={color3}
          onChange={setColor3}
          error="Invalid color selection"
        />
        <ColorPicker
          id="state-disabled"
          label="Disabled State"
          value={color4}
          onChange={setColor4}
          disabled={true}
        />
      </div>
    );
  },
};
