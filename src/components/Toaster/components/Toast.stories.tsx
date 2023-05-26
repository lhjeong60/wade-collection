import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Toast from "./Toast";

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: "Wade/Toast",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Base: Story = (args) => <Toast data-testId="Toast-id" {...args} />;
Base.args = {
  id: 12341234,
  autoClose: 3000,
  message: "토스트 다 탔잖슴~",
  position: "top-center",
  state: "valid",
  type: "wade",
  progressBar: true,
};
