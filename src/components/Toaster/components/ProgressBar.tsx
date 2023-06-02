import React, { CSSProperties } from "react";
import { styled } from "styled-components";
import { ToastType, ToastColor, AnimationPlayState } from "../types";
import { decreaseWidth } from "../utils/animations";

interface ProgressBarProps {
  style?: CSSProperties;
  pause: boolean;
  type: ToastType;
  duration: number; //ms
}

const ProgressBar = ({ style, pause, type, duration }: ProgressBarProps) => {
  return (
    <Container style={style}>
      <Bar
        type={type}
        pause={pause ? "paused" : "running"}
        duration={duration}
      />
    </Container>
  );
};

export default ProgressBar;

const Container = styled.div`
  height: 5px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  overflow: hidden;
`;

interface BarProps {
  type: ToastType;
  pause: AnimationPlayState;
  duration: number;
}

const Bar = styled.div<BarProps>`
  height: 100%;
  background-color: ${({ type }) => ToastColor[type]};
  filter: brightness(1.4);
  animation-name: ${decreaseWidth};
  animation-duration: ${({ duration }) => `${duration / 1000}s`};
  animation-timing-function: linear;
  animation-play-state: ${({ pause }) => pause};
  animation-fill-mode: forwards;
`;
