import { createSignal, onMount } from "solid-js";
import Content from "../../Content";
import "../../Content.css";
import { FormatContentProps } from "./types";

export default function FormatContent(props: FormatContentProps) {
  const [formatString, setFormatString] = createSignal("");

  onMount(() => {
    props.handlers?.formatString.onMount(setFormatString);
  });

  return (
    <Content componentName={"Format"}>
      <input
        class="component-input"
        value={formatString()}
        onChange={(event) => {
          setFormatString(event.target.value);
          props.handlers?.formatString.onChange(event.target.value);
        }}
        onInput={(event) => {
          setFormatString(event.target.value);
          props.handlers?.formatString.onInput(event.target.value);
        }}
      />
    </Content>
  );
}
