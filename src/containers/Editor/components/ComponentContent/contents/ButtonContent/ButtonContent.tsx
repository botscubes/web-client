import { Content } from "../../Content";
import "../../Content.css";
import "./ButtonContent.css";
import { ButtonContentProps } from "./types";
import { Input } from "../../../Input";
import { Button } from "./components/Button";
import { For, createSignal } from "solid-js";

export default function ButtonContent(props: ButtonContentProps) {
  const [editButton, setEditButton] = createSignal<
    | {
        id: string;
        text: string;
      }
    | undefined
  >(undefined);
  return (
    <div
      class="button-content"
      onMouseLeave={() => {
        let button = editButton();
        if (button != undefined) {
          props.handlers?.buttons?.onChangeText?.(button.id, button.text);
        }
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
                  onChangeText: (id, text) => {
                    props.handlers?.buttons?.onChangeText?.(id, text);
                  },
                  onMouseEnter: (id, text) => {
                    const button = editButton();
                    if (button != undefined) {
                      props.handlers?.buttons?.onChangeText?.(
                        button.id,
                        button.text
                      );
                    }
                    setEditButton({ id, text });
                  },
                  onInputText: (id, text) => {
                    if (id == editButton()?.id) {
                      setEditButton({
                        id: id,
                        text: text,
                      });
                    }
                  },
                }}
                edit={editButton()?.id == button.id}
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
