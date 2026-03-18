import { useState } from "react";

import { Textarea } from "./index";

export default {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    rows: {
      control: { type: "range", min: 2, max: 20, step: 1 },
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
    return <Textarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Description",
    placeholder: "Enter your description...",
  },
};

export const WithValue = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Textarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Bio",
    value:
      "I am a software developer passionate about building great user experiences.",
  },
};

export const Required = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Textarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Comments",
    required: true,
    placeholder: "This field is required",
  },
};

export const WithHelper = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Textarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Notes",
    helperText: "Maximum 500 characters",
    rows: 6,
  },
};

export const WithError = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Textarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Message",
    value: "Too short",
    error: "Message must be at least 10 characters",
  },
};

export const Disabled = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Textarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Read Only",
    value: "This content cannot be edited",
    disabled: true,
  },
};

export const CustomRows = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return <Textarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Large Text Area",
    rows: 10,
    placeholder: "Lots of space for writing...",
  },
};

export const AllStates = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("Some content here");
  const [value3, setValue3] = useState("Invalid content");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Textarea label="Empty" value={value1} onChange={setValue1} />
      <Textarea
        label="With Value"
        value={value2}
        onChange={setValue2}
        helperText="Helper text example"
      />
      <Textarea
        label="With Error"
        value={value3}
        onChange={setValue3}
        error="Content is invalid"
      />
      <Textarea label="Required" required value="" onChange={() => {}} />
      <Textarea
        label="Disabled"
        value="Cannot edit"
        onChange={() => {}}
        disabled
      />
    </div>
  );
};
