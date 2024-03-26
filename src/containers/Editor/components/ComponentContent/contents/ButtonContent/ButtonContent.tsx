import { Content } from "../../Content";
import "../../Content.css";
import "./ButtonContent.css";
import { ButtonContentProps } from "./types";
import { Input } from "../../../Input";
import { Button } from "./components/Button";
import { For, createSignal } from "solid-js";

export default function ButtonContent(props: ButtonContentProps) {
  const [editButton, setEditButton] = createSignal<string | undefined>(
    undefined
  );
  return (
    <div
      class="button-content"
      onMouseLeave={() => {
        setEditButton(undefined);
      }}
    >
      <Content componentName={"Buttons"}>
        <div class="flex-column">
          <Input
            class="component-input"
            value={props.data?.text}
            handlers={props.handlers?.text}
          />
          <For each={props.data?.buttons}>
            {(button) => (
              <Button
                data={button}
                class="indent"
                handlers={{
                  outputPoint: props.handlers?.outputPoint,
                  onDeleteButton: (id) => {
                    props.handlers?.buttons?.onDelete?.(id);
                  },
                  onChangeText: (id, name) => {
                    props.handlers?.buttons?.onChangeText?.(id, name);
                  },
                  onMouseEnter: (id) => {
                    setEditButton(id);
                  },
                }}
                edit={editButton() == button.id}
              />
            )}
          </For>
          <button
            class="add-button indent"
            onClick={() => {
              props.handlers?.buttons?.onAdd?.();
            }}
          >
            +
          </button>
        </div>
      </Content>
    </div>
  );
}
