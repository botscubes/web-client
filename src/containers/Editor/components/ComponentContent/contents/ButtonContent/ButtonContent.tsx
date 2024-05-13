import { Content } from "../../Content";
import "../../Content.css";
import "./ButtonContent.css";
import { ButtonContentProps } from "./types";
import { Input } from "../../../Input";
import { Button } from "./components/Button";
import { For, Show, createSignal } from "solid-js";

export default function ButtonContent(props: ButtonContentProps) {
  const [editButton, setEditButton] = createSignal<
    | {
        id: string;
        text: string;
        oldText: string;
      }
    | undefined
  >(undefined);
  return (
    <div
      class="button-content"
      onMouseLeave={() => {
        let button = editButton();

        if (button != undefined) {
          if (button.text == "") {
            props.handlers?.buttons?.onDelete?.(button.id);
          } else {
            if (button.oldText != button.text)
              props.handlers?.buttons?.onChangeText?.(button.id, button.text);
          }
        }
        setEditButton(undefined);
      }}
    >
      <Content componentName={"Buttons"}>
        <div class="flex-column">
          <Input
            class="component-input blue-input"
            placeholder="Enter text"
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

                  onMouseEnter: (id, text) => {
                    const button = editButton();
                    if (button != undefined) {
                      if (button.text == "") {
                        props.handlers?.buttons?.onDelete?.(button.id);
                      } else {
                        if (button?.oldText != button.text) {
                          props.handlers?.buttons?.onChangeText?.(
                            button.id,
                            button.text
                          );
                        }
                      }
                    }
                    setEditButton({ id, text, oldText: text });
                  },
                  onInputText: (id, text) => {
                    if (id == editButton()?.id) {
                      setEditButton((button) => ({
                        id: id,
                        text: text,
                        oldText: button ? button.oldText : "",
                      }));
                    }
                  },
                }}
                edit={editButton()?.id == button.id}
              />
            )}
          </For>
          <Show when={props.abilityToAdd}>
            <button
              class="add-button indent"
              onClick={() => {
                props.handlers?.buttons?.onAdd?.();
              }}
            >
              +
            </button>
          </Show>
        </div>
      </Content>
    </div>
  );
}
