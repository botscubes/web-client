import { createSignal, onMount } from "solid-js";

export interface InputHandlers {
  onMount?(setter: (str: string) => void): void;
  onChange?(str: string): void;
  onInput?(str: string): void;
}

export interface InputProps {
  handlers?: InputHandlers;
  value?: string;
  class: string;
}

export function Input(props: InputProps) {
  // eslint-disable-next-line solid/reactivity
  const s = props.value ? props.value : "";
  const [str, setStr] = createSignal(s);

  onMount(() => {
    props.handlers?.onMount?.(setStr);
  });

  return (
    <input
      class={props.class}
      value={str()}
      onChange={(event) => {
        setStr(event.target.value);
        props.handlers?.onChange?.(event.target.value);
      }}
      onInput={(event) => {
        setStr(event.target.value);
        props.handlers?.onInput?.(event.target.value);
      }}
    />
  );
}
