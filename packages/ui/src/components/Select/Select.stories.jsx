import { useState } from "react";

import { Select } from "./index";

export default {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
};

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "jp", label: "Japan" },
];

const sizes = [
  { value: "xs", label: "Extra Small" },
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "Extra Large" },
];

export const Default = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Select {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Country",
    placeholder: "Select a country",
    options: countries,
  },
};

export const WithValue = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "us");
    return <Select {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Country",
    value: "us",
    options: countries,
  },
};

export const Required = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Select {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Size",
    required: true,
    placeholder: "Choose a size",
    options: sizes,
  },
};

export const WithHelper = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Select {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Shipping Country",
    helperText: "Select your shipping destination",
    options: countries,
  },
};

export const WithError = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Select {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Country",
    error: "Please select a country",
    options: countries,
  },
};

export const Disabled = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "us");
    return <Select {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Country",
    value: "us",
    disabled: true,
    options: countries,
  },
};

export const AllStates = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("uk");
  const [value3, setValue3] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Select
        label="Empty"
        value={value1}
        onChange={setValue1}
        options={countries}
        placeholder="Select..."
      />
      <Select
        label="With Value"
        value={value2}
        onChange={setValue2}
        options={countries}
        helperText="Your current selection"
      />
      <Select
        label="With Error"
        value={value3}
        onChange={setValue3}
        options={countries}
        error="This field is required"
      />
      <Select
        label="Required"
        value=""
        onChange={() => {}}
        options={countries}
        required
      />
      <Select
        label="Disabled"
        value="ca"
        onChange={() => {}}
        options={countries}
        disabled
      />
    </div>
  );
};
