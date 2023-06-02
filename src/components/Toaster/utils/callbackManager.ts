import { ToastOptions } from "../types";

type Callback = (message: string, options?: ToastOptions) => void;

interface CallbackManager {
  callback: Callback | null;
  setCallback: (callback: Callback) => void;
  invoke: Callback;
}

const callbackManager: CallbackManager = {
  callback: null,
  setCallback(callback: Callback) {
    this.callback = callback;
  },
  invoke(message: string, options?: ToastOptions) {
    if (this.callback) {
      this.callback(message, options);
    }
  },
};

export default callbackManager;
