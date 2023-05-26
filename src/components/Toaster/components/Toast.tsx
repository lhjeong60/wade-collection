import React, {
  AnimationEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { entranceFrom, fadeIn } from "../utils/anmations";
import {
  ToastId,
  ToastObject,
  ToastPosition,
  ToastState,
  ToastType,
} from "../types";
import ProgressBar from "./ProgressBar";

export interface ToastProps extends ToastObject {
  removeToast: (id: ToastId, position: ToastPosition) => void;
}

interface StyledLiProps {
  type: ToastType;
  state: ToastState;
  position: ToastPosition;
}

const Toast = ({
  id,
  state,
  message,
  type,
  position,
  autoClose,
  progressBar,
  removeToast,
}: ToastProps & {}) => {
  const [progressStart, setProgressStart] = useState(false);

  useEffect(() => {
    setProgressStart(true);
  }, [setProgressStart]);

  const animationEndHandler: AnimationEventHandler = useCallback(
    (e) => {
      if (
        state === "stale" &&
        e.animationName === entranceFrom.get(position).name
      ) {
        removeToast(id, position);
      }
    },
    [state, id, position, removeToast]
  );

  return (
    <StyledLi
      key={id + (state === "stale" ? "__stale" : "")}
      state={state}
      type={type}
      position={position}
      onAnimationEnd={animationEndHandler}
    >
      {message}
      {progressBar && (
        <ProgressBar
          style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}
          type={type}
          flag={progressStart ? "start" : "ready"}
          duration={autoClose}
        />
      )}
    </StyledLi>
  );
};

const AbsoluteProgressBar = styled(ProgressBar)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledLi = styled.li<StyledLiProps>`
  position: relative;
  color: white;
  list-style: none;
  background-color: ${({ type }) => {
    switch (type) {
      case "info":
        return "blue";
      case "success":
        return "green";
      case "warning":
        return "yellow";
      case "error":
        return "red";
      case "wade":
        return "#904CF9";
    }
  }};
  padding: 1.5em;
  border-radius: 5px;
  animation-name: ${fadeIn}, ${({ position }) => entranceFrom.get(position)};
  animation-duration: 0.4s;
  animation-timing-function: ease, cubic-bezier(0.07, 1.235, 0.65, 1.11);
  animation-direction: ${(props) =>
    props.state === "stale" ? "reverse" : "normal"};
  animation-fill-mode: forwards;
`;

export default Toast;
