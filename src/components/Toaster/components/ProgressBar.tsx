import React, { CSSProperties, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { ToastType } from "../types";

interface ProgressBarProps {
  style?: CSSProperties;
  flag: "ready" | "start";
  type: ToastType;
  duration: number; //ms
}

const ProgressBar = ({ style, flag, type, duration }: ProgressBarProps) => {
  return (
    <Container style={style}>
      <Bar
        style={{
          width: flag === "ready" ? "100%" : "0",
        }}
        duration={duration}
      />
    </Container>
  );
};

export default ProgressBar;

const Container = styled.div`
  width: 100%;
  height: 5px;
  background-color: #904cf9;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

interface BarProps {
  duration: number;
}

const Bar = styled.div<BarProps>`
  height: 100%;
  background-color: white;
  transition-property: width;
  transition-duration: ${({ duration }) => `${duration / 1000}s`};
`;
