import { Show, createEffect, createSignal } from "solid-js";
import { ContentConnectionPoint } from "../../../../Content";
import {
  ContentPointHandlers,
  OutputPointColor,
  OutputPointType,
} from "../../../../types";
import "./style.css";
import { ButtonData } from "../../types";

export interface ButtonProps {
  data: ButtonData;
  class?: string;
  edit: boolean;
  handlers?: {
    outputPoint?: ContentPointHandlers;
    onDeleteButton?(id: string): void;
    onChangeText?(id: string, text: string): void;
    onMouseEnter?(id: string, text: string): void;
    onInputText?(id: string, text: string): void;
  };
}
export function Button(props: ButtonProps) {
  //const [mouseOver, setMouseOver] = createSignal(false);

  return (
    <div class={"button-component" + (props.class ? " " + props.class : "")}>
      <ContentConnectionPoint
        targetComponentId={props.data.target}
        pointId={props.data.id}
        class="button-point"
        tooltip="next"
        handlers={props.handlers?.outputPoint}
        color={OutputPointColor.Next}
      />

      <Show
        when={!props.edit}
        fallback={
          <div class="edit">
            <button
              onClick={() => {
                props.handlers?.onDeleteButton?.(props.data.id);
              }}
            >
              ✖
            </button>
            <input
              class="button-input"
              onInput={(event) => {
                const text = event.target.value;
                props.handlers?.onInputText?.(props.data.id, text);
              }}
              value={props.data.text}
            />
          </div>
        }
      >
        <button
          class="button"
          onMouseEnter={() => {
            props.handlers?.onMouseEnter?.(props.data.id, props.data.text);
          }}
        >
          {props.data.text}
        </button>
      </Show>
    </div>
  );
}
