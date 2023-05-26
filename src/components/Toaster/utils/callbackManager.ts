import { ToastOptions } from "../types";

type AddCallback = (message: string, options?: ToastOptions) => void;

interface CallbackManager {
  addCallback: AddCallback | null;
  setAddCallback: (callback: AddCallback) => void;
  invoke: AddCallback;
}

const callbackManager: CallbackManager = {
  addCallback: null,
  setAddCallback(callback: AddCallback) {
    this.addCallback = callback;
  },
  invoke(message: string, options?: ToastOptions) {
    if (this.addCallback) {
      this.addCallback(message, options);
    }
  },
};

export default callbackManager;
