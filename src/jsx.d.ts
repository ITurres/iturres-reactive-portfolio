// jsx.d.ts
import React from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends React.HTMLAttributes<T> {
    // ?additional attributes here if needed.
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // ?HTML elements and their attributes
      div: React.HTMLProps<HTMLDivElement>;
      button: React.HTMLProps<HTMLButtonElement>;
      // ?Add more as needed
    }
  }
}
