export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastType = "info" | "success" | "warning" | "error" | "wade";

export const ToastColor = {
  info: "#0090e0",
  success: "#34c240",
  warning: "#ffcc00",
  error: "#cc3300",
  wade: "#904CF9",
};

export type ToastId = number | string;

export type ToastState = "ready" | "valid" | "stale";

export type AnimationPlayState = "paused" | "running";

export interface ToastInfo {
  id: ToastId;
}

export interface ToastOptions {
  type?: ToastType;
  position?: ToastPosition;
  autoClose?: number;
  progressBar?: boolean;
  pauseOnMouseOver?: boolean;
}

export interface ToastObject extends ToastInfo, Required<ToastOptions> {
  message: string;
}
