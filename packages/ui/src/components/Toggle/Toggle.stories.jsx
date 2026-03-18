import { useState } from "react";

import { Toggle } from "./index";

export default {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export const Default = {
  render: (args) => {
    const [checked, setChecked] = useState(args.value || false);
    return <Toggle {...args} value={checked} onChange={setChecked} />;
  },
  args: {},
};

export const WithLabel = {
  render: (args) => {
    const [checked, setChecked] = useState(args.value || false);
    return <Toggle {...args} value={checked} onChange={setChecked} />;
  },
  args: {
    label: "Enable notifications",
  },
};

export const Checked = {
  render: (args) => {
    const [checked, setChecked] = useState(args.value || false);
    return <Toggle {...args} value={checked} onChange={setChecked} />;
  },
  args: {
    value: true,
    label: "Enabled",
  },
};

export const Disabled = {
  render: (args) => {
    const [checked, setChecked] = useState(args.value || false);
    return <Toggle {...args} value={checked} onChange={setChecked} />;
  },
  args: {
    disabled: true,
    label: "Disabled toggle",
  },
};

export const DisabledChecked = {
  render: (args) => {
    const [checked, setChecked] = useState(args.value || false);
    return <Toggle {...args} value={checked} onChange={setChecked} />;
  },
  args: {
    value: true,
    disabled: true,
    label: "Disabled & checked",
  },
};

export const Sizes = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toggle
        size="small"
        label="Small"
        value={checked1}
        onChange={setChecked1}
      />
      <Toggle
        size="medium"
        label="Medium"
        value={checked2}
        onChange={setChecked2}
      />
      <Toggle
        size="large"
        label="Large"
        value={checked3}
        onChange={setChecked3}
      />
    </div>
  );
};

export const AllStates = () => {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toggle label="Unchecked" value={state1} onChange={setState1} />
      <Toggle label="Checked" value={state2} onChange={setState2} />
      <Toggle label="Disabled Unchecked" value={false} disabled />
      <Toggle label="Disabled Checked" value={true} disabled />
    </div>
  );
};
