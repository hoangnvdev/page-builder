import { useState } from "react";

import { Input } from "./index";

export default {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "url", "tel"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
};

export const Default = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const WithValue = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Email",
    value: "user@example.com",
    type: "email",
  },
};

export const Required = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Required Field",
    required: true,
    placeholder: "This field is required",
  },
};

export const WithHelper = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Password",
    type: "password",
    helperText: "Must be at least 8 characters",
  },
};

export const WithError = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Email",
    value: "invalid-email",
    type: "email",
    error: "Please enter a valid email address",
  },
};

export const Disabled = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Disabled Input",
    value: "Cannot edit this",
    disabled: true,
  },
};

export const NumberType = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
  },
};

export const AllStates = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("John Doe");
  const [value3, setValue3] = useState("invalid@email");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Input label="Empty" value={value1} onChange={setValue1} />
      <Input
        label="With Value"
        value={value2}
        onChange={setValue2}
        helperText="Helper text example"
      />
      <Input
        label="With Error"
        value={value3}
        onChange={setValue3}
        error="Invalid email format"
      />
      <Input label="Required" required value="" onChange={() => {}} />
      <Input label="Disabled" value="Disabled" onChange={() => {}} disabled />
    </div>
  );
};
