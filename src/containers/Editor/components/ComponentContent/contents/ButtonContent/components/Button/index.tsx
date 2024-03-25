import { Show, createSignal } from "solid-js";
import { ContentConnectionPoint } from "../../../../Content";
import {
  ContentPointHandlers,
  OutputPointColor,
  OutputPointType,
} from "../../../../types";
import "./style.css";

export interface ButtonProps {
  text: string;
  class?: string;
  handlers?: {
    outputPoint?: ContentPointHandlers;
    onDeleteButton?(name: string): void;
    onOnChangeName?(oldName: string, newName: string): void;
  };
}
export function Button(props: ButtonProps) {
  const [mouseOver, setMouseOver] = createSignal(false);
  return (
    <div class={"button-component" + (props.class ? " " + props.class : "")}>
      <ContentConnectionPoint
        targetComponentId={undefined}
        pointId={OutputPointType.Next}
        class="button-point"
        tooltip="next"
        handlers={props.handlers?.outputPoint}
        color={OutputPointColor.Next}
      />
      <Show when={mouseOver()}>
        <button
          onMouseLeave={() => {
            setMouseOver(false);
          }}
        >
          ✖
        </button>
      </Show>
      <Show
        when={!mouseOver()}
        fallback={
          <input
            class="button-input"
            onMouseLeave={() => {
              setMouseOver(false);
            }}
            onChange={(event) => {
              const value = event.target.value;
            }}
          />
        }
      >
        <button
          class="button"
          onMouseEnter={() => {
            setMouseOver(true);
          }}
        >
          {props.text}
        </button>
      </Show>
    </div>
  );
}
