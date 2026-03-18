import { useState } from "react";

import { Slider } from "./index";

export default {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    step: {
      control: { type: "number" },
    },
    disabled: {
      control: "boolean",
    },
    showValue: {
      control: "boolean",
    },
  },
};

export const Default = {
  render: (args) => {
    const [value, setValue] = useState(args.value || 50);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Volume",
  },
};

export const WithValue = {
  render: (args) => {
    const [value, setValue] = useState(args.value || 75);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Brightness",
    showValue: true,
    value: 75,
  },
};

export const CustomRange = {
  render: (args) => {
    const [value, setValue] = useState(args.value || 25);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Font Size",
    min: 12,
    max: 72,
    step: 2,
    showValue: true,
    value: 25,
  },
};

export const WithLabels = {
  render: (args) => {
    const [value, setValue] = useState(args.value || 2);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Difficulty",
    min: 0,
    max: 4,
    step: 1,
    labels: ["Very Easy", "Easy", "Medium", "Hard", "Expert"],
    value: 2,
  },
};

export const Disabled = {
  render: (args) => {
    const [value, setValue] = useState(args.value || 60);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Locked Setting",
    value: 60,
    disabled: true,
    showValue: true,
  },
};

export const AllStates = () => {
  const [value1, setValue1] = useState(30);
  const [value2, setValue2] = useState(70);
  const [value3, setValue3] = useState(2);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Slider label="Basic" value={value1} onChange={setValue1} />
      <Slider
        label="With Value Display"
        value={value2}
        onChange={setValue2}
        showValue
      />
      <Slider
        label="With Labels"
        min={0}
        max={4}
        step={1}
        value={value3}
        onChange={setValue3}
        labels={["XS", "S", "M", "L", "XL"]}
      />
      <Slider label="Disabled" value={50} onChange={() => {}} disabled />
    </div>
  );
};
