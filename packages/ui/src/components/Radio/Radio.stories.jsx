import { useState } from "react";

import RadioGroup from "./index.jsx";

export default {
  title: "Components/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    onChange: { action: "changed" },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },
};

const sizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
];

export const Default = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
  args: {
    id: "size-radio",
    label: "Select Size",
    options: sizeOptions,
  },
};

export const WithSelectedValue = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
  args: {
    id: "color-radio",
    label: "Choose Color",
    options: colorOptions,
    value: "blue",
  },
};

export const HorizontalOrientation = {
  render: (args) => {
    const [value, setValue] = useState("medium");
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
  args: {
    id: "horizontal-radio",
    label: "Size Options",
    options: sizeOptions,
    orientation: "horizontal",
  },
};

export const WithoutLabel = {
  render: (args) => {
    const [value, setValue] = useState("green");
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
  args: {
    id: "no-label-radio",
    options: colorOptions,
  },
};

export const Disabled = {
  render: (args) => {
    const [value, setValue] = useState("large");
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
  args: {
    id: "disabled-radio",
    label: "Disabled Options",
    options: sizeOptions,
    disabled: true,
  },
};

export const ManyOptions = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
  args: {
    id: "many-options-radio",
    label: "Programming Languages",
    options: [
      { value: "javascript", label: "JavaScript" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
      { value: "csharp", label: "C#" },
      { value: "go", label: "Go" },
      { value: "rust", label: "Rust" },
      { value: "typescript", label: "TypeScript" },
    ],
  },
};

export const AllStates = {
  render: () => {
    const [value1, setValue1] = useState("medium");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("blue");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <RadioGroup
          id="state-selected"
          label="With Selection (Vertical)"
          value={value1}
          onChange={setValue1}
          options={sizeOptions}
        />
        <RadioGroup
          id="state-unselected"
          label="No Selection (Horizontal)"
          value={value2}
          onChange={setValue2}
          options={sizeOptions}
          orientation="horizontal"
        />
        <RadioGroup
          id="state-disabled"
          label="Disabled State"
          value={value3}
          onChange={setValue3}
          options={colorOptions}
          disabled={true}
        />
      </div>
    );
  },
};
