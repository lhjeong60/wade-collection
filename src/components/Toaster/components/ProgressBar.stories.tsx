import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ProgressBar from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Wade/ProgressBar",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Base: Story = (args) => {
  const [flag, setFlag] = useState<"ready" | "start">("ready");

  const onClick = () => {
    setFlag((f) => (f === "ready" ? "start" : "ready"));
  };

  return (
    <>
      <button onClick={onClick}>start?</button>
      <ProgressBar data-testId="ProgressBar-id" {...args} flag={flag} />
    </>
  );
};
Base.args = {
  duration: 3000,
  flag: "ready",
};
