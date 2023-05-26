export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastType = "info" | "success" | "warning" | "error" | "wade";

export type ToastId = number | string;

export type ToastState = "stale" | "valid";

export interface ToastInfo {
  id: ToastId;
  state: ToastState;
}

export interface ToastOptions {
  type?: ToastType;
  position?: ToastPosition;
  autoClose?: number;
  progressBar?: boolean;
}

export interface ToastObject extends ToastInfo, Required<ToastOptions> {
  message: string;
}
