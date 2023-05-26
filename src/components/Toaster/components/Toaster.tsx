import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import callbackManager from "../utils/callbackManager";
import { createPortal } from "react-dom";
import { ToastId, ToastObject, ToastOptions, ToastPosition } from "../types";
import Toast from "./Toast";

interface ToasterProps extends ToastOptions {
  bottomIsLatest?: boolean;
}

const StyledUl = styled.ul<{ position: ToastPosition }>`
  position: fixed;
  list-style: none;
  padding: 0;
  margin: ${(props) => (props.position.includes("center") ? "0 auto" : 0)};
  top: ${(props) => (props.position.includes("top") ? "1em" : "unset")};
  bottom: ${(props) => (props.position.includes("bottom") ? "1em" : "unset")};
  right: ${(props) => {
    if (props.position.includes("right")) return "1em";
    if (props.position.includes("center")) return 0;
    return "unset";
  }};
  left: ${(props) => {
    if (props.position.includes("left")) return "1em";
    if (props.position.includes("center")) return 0;
    return "unset";
  }};
  width: 300px;
  li {
    &:not(:last-child) {
      margin-bottom: 0.5em;
    }
  }
`;

const Toaster = ({
  type = "wade",
  position = "top-right",
  autoClose = 2000,
  progressBar = true,
  bottomIsLatest = false,
}: ToasterProps) => {
  const [toasts, setToasts] = useState<Map<ToastPosition, ToastObject[]>>(
    new Map<ToastPosition, ToastObject[]>()
  );

  useEffect(() => {
    function addToast(message: string, options?: ToastOptions) {
      const newToast: ToastObject = {
        message: message,
        id: Date.now(),
        type: options?.type || type,
        position: options?.position || position,
        autoClose: options?.autoClose || autoClose,
        state: "valid",
        progressBar:
          options?.progressBar !== undefined
            ? options?.progressBar
            : progressBar,
      };

      const {
        id: newId,
        autoClose: newAutoClose,
        position: newPosition,
      } = newToast;

      setToasts((toasts) => {
        const newToastsMap = new Map(toasts);

        newToastsMap.has(newPosition) || newToastsMap.set(newPosition, []);
        newToastsMap.get(newPosition)!.push(newToast);

        return newToastsMap;
      });

      setTimeout(() => {
        setToasts((toasts) => {
          const newToastsMap = new Map(toasts);

          const staleToast = newToastsMap
            .get(newPosition)
            ?.find((toast) => toast.id === newId);

          if (staleToast) {
            staleToast.state = "stale";
          }

          return newToastsMap;
        });
      }, newAutoClose);
    }

    callbackManager.setAddCallback(addToast);
  }, [position, autoClose, type]);

  const removeToast = useCallback(
    (id: ToastId, position: ToastPosition) => {
      setToasts((toasts) => {
        const newToastsMap = new Map(toasts);
        const newToastList = newToastsMap
          .get(position)
          ?.filter((toast) => toast.id !== id);

        if (newToastList) {
          newToastsMap.set(position, newToastList);
        }

        return newToastsMap;
      });
    },
    [setToasts]
  );

  return createPortal(
    <>
      {Array.from(toasts, (v) => {
        const [position, toastList] = v;

        return (
          toastList.length > 0 && (
            <StyledUl key={`toaster-${position}`} position={position}>
              {(bottomIsLatest ? toastList : [...toastList].reverse()).map(
                (t) => (
                  <Toast key={t.id} {...t} removeToast={removeToast} />
                )
              )}
            </StyledUl>
          )
        );
      })}
    </>,

    document.body
  );
};

export default Toaster;

export function toast(message: string, options?: ToastOptions) {
  return callbackManager.invoke(message, options);
}
