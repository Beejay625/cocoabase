import type { HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "appkit-button": HTMLAttributes<HTMLElement>;
    }
  }
}

export {};

