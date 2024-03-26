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
    onChangeText?(id: string, name: string): void;
    onMouseEnter?(id: string): void;
  };
}
export function Button(props: ButtonProps) {
  //const [mouseOver, setMouseOver] = createSignal(false);

  let newText = "";
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

      <Show
        when={!props.edit}
        fallback={
          <div
            class="edit"
            onMouseLeave={() => {
              // if (newText == "") {
              //   props.handlers?.onDeleteButton?.(props.data.id);
              // } else if (newText != props.data.id) {
              //   props.handlers?.onChangeName?.(props.name, newText);
              // }
            }}
          >
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
                newText = event.target.value;
              }}
              value={props.data.text}
            />
          </div>
        }
      >
        <button
          class="button"
          onMouseEnter={() => {
            props.handlers?.onMouseEnter?.(props.data.id);
            // newText = props.name;
          }}
        >
          {props.data.text}
        </button>
      </Show>
    </div>
  );
}
