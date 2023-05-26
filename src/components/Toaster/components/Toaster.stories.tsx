import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Toaster, { toast } from "./Toaster";
import { ToastPosition } from "../types";
import moment from "moment";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1));
}

const list: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: "Wade/Toaster",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Toaster>;

export const Base: Story = (args) => {
  const interval = useRef(0);

  const onClickPosition = (idx: number) => () => {
    toast(moment().format("YYYY-MM-DD hh:mm:ss"), {
      position: list[idx],
    });
  };

  const onClick = () => {
    toast(moment().format("YYYY-MM-DD hh:mm:ss"), {
      position: list[randomInt(0, 5)],
    });
  };

  const onClickStart = () => {
    interval.current = window.setInterval(() => {
      toast(moment().format("YYYY-MM-DD hh:mm:ss"), {
        position: list[randomInt(0, 5)],
      });
    }, 500);
  };

  const onClickStop = () => {
    window.clearInterval(interval.current);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", width: "300px", flexWrap: "wrap" }}>
        <button
          style={{ width: "100px", height: "50px" }}
          onClick={onClickPosition(0)}
        >
          top-left
        </button>
        <button
          style={{ width: "100px", height: "50px" }}
          onClick={onClickPosition(1)}
        >
          top-center
        </button>
        <button
          style={{ width: "100px", height: "50px" }}
          onClick={onClickPosition(2)}
        >
          top-right
        </button>
        <button
          style={{ width: "100px", height: "50px" }}
          onClick={onClickPosition(3)}
        >
          bottom-left
        </button>
        <button
          style={{ width: "100px", height: "50px" }}
          onClick={onClickPosition(4)}
        >
          bottom-center
        </button>
        <button
          style={{ width: "100px", height: "50px" }}
          onClick={onClickPosition(5)}
        >
          bottom-right
        </button>
        <button style={{ width: "100px", height: "50px" }} onClick={onClick}>
          random!
        </button>
        <button
          style={{ width: "100px", height: "50px" }}
          onClick={onClickStart}
        >
          start!
        </button>
        <button
          style={{ width: "100px", height: "50px" }}
          onClick={onClickStop}
        >
          stop!
        </button>
      </div>
      <Toaster data-testId="Toaster-id" {...args} />
    </div>
  );
};
Base.args = {
  autoClose: 3000,
  position: "top-center",
  type: "wade",
  bottomIsLatest: false,
};
