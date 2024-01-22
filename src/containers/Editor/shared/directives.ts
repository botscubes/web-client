import { Accessor, Signal } from "solid-js";
import { Size } from "./types";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      resize: [() => Element, (v: any) => Accessor<Signal<Size>>];
    }
  }
}

export function resize(el: Element, value: Accessor<Signal<Size>>) {
  const [_, setField] = value();
  const resizeObserver = new ResizeObserver((entries, _observer) => {
    entries.forEach((entry) => {
      setField({
        width: Math.round(entry.borderBoxSize[0].blockSize),
        height: Math.round(entry.borderBoxSize[0].inlineSize),
      });
    });
  });
  resizeObserver.observe(el);
}
