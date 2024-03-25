import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import "./ButtonContent.css";
import { ButtonContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointType } from "../../types";
import { Button } from "./components/Button";
import { For, createSignal } from "solid-js";

export default function ButtonContent(props: ButtonContentProps) {
  const [buttons, setButtons] = createSignal(["button1", "button2"]);
  return (
    <div class="button-content">
      <Content componentName={"Buttons"}>
        <div class="flex-column">
          <Input
            class="component-input"
            value={props.data?.text}
            handlers={props.handlers?.text}
          />
          <For each={buttons()}>
            {(button) => (
              <Button
                text={button}
                class="indent"
                handlers={{
                  outputPoint: props.handlers?.outputPoint,
                }}
              />
            )}
          </For>
          <button
            class="add-button indent"
            onClick={() => {
              setButtons((buttons) => [...buttons, "test"]);
            }}
          >
            +
          </button>
        </div>
      </Content>
    </div>
  );
}
