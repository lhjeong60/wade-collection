import React, {
  AnimationEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { entranceFrom, decreaseWidth } from "../utils/animations";
import {
  ToastColor,
  ToastId,
  ToastObject,
  ToastPosition,
  ToastState,
  ToastType,
  AnimationPlayState,
} from "../types";
import ProgressBar from "./ProgressBar";

export interface ToastProps extends ToastObject {
  removeToast: (id: ToastId, position: ToastPosition) => void;
}

const Toast = ({
  id,
  message,
  type,
  position,
  autoClose,
  progressBar,
  pauseOnMouseOver,
  removeToast,
}: ToastProps & {}) => {
  const [pause, setPause] = useState(false);
  const [toastState, setToastState] = useState<ToastState>("ready");

  const animationEndHandler: AnimationEventHandler = useCallback(
    (e) => {
      if (e.animationName === entranceFrom.get(position).name) {
        if (toastState === "ready") {
          setToastState("valid");
        } else if (toastState === "stale") {
          removeToast(id, position);
        }
      }

      if (e.animationName === decreaseWidth.name) {
        if (toastState === "valid") {
          setToastState("stale");
        }
      }
    },
    [toastState, setToastState, removeToast, id, position]
  );

  const onMouseEnterHandler: MouseEventHandler = useCallback(() => {
    setPause(true);
  }, [setPause]);

  const onMouseLeaveHandler: MouseEventHandler = useCallback(() => {
    setPause(false);
  }, [setPause]);

  return (
    <StyledLi
      key={id + (toastState === "ready" ? "" : "__done")}
      state={toastState}
      pause={pause ? "paused" : "running"}
      type={type}
      position={position}
      autoclose={autoClose}
      onAnimationEnd={animationEndHandler}
      onMouseEnter={pauseOnMouseOver ? onMouseEnterHandler : undefined}
      onMouseLeave={pauseOnMouseOver ? onMouseLeaveHandler : undefined}
    >
      {message}
      {progressBar && (
        <ProgressBar
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            left: "0",
          }}
          type={type}
          pause={toastState === "ready" ? true : pause}
          duration={autoClose}
        />
      )}
    </StyledLi>
  );
};

interface StyledLiProps {
  type: ToastType;
  state: ToastState;
  position: ToastPosition;
  autoclose: number;
  pause: AnimationPlayState;
}

const StyledLi = styled.li<StyledLiProps>`
  position: relative;
  color: white;
  list-style: none;
  background-color: ${({ type }) => ToastColor[type]};
  padding: 1.5em;
  border-radius: 5px;
  animation-name: ${({ position }) => entranceFrom.get(position)};
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.07, 1.235, 0.65, 1.11);
  animation-direction: ${({ state }) =>
    state === "ready" ? "normal" : "reverse"};
  animation-fill-mode: forwards;
  animation-delay: ${({ state, autoclose }) =>
    state === "ready" ? "0s" : `${autoclose / 1000}s`};
  animation-play-state: ${({ pause }) => pause};
`;

export default Toast;
