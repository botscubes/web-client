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
        index: number;
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
            const buttons = props.data?.buttons;
            if (buttons) {
              if (buttons[button.index].text != button.text)
                props.handlers?.buttons?.onChangeText?.(button.id, button.text);
            }
          }
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
            {(button, index) => (
              <Button
                data={button}
                class="indent"
                handlers={{
                  outputPoint: props.handlers?.outputPoint,
                  onDeleteButton: (id) => {
                    props.handlers?.buttons?.onDelete?.(id);
                  },

                  onMouseEnter: (id, text) => {
                    const ebutton = editButton();
                    if (ebutton != undefined) {
                      if (ebutton.text == "") {
                        props.handlers?.buttons?.onDelete?.(ebutton.id);
                      } else {
                        const buttons = props.data?.buttons;
                        if (buttons) {
                          if (buttons[ebutton.index].text != ebutton.text) {
                            props.handlers?.buttons?.onChangeText?.(
                              ebutton.id,
                              ebutton.text
                            );
                          }
                        }
                      }
                    }
                    setEditButton({ id, text, index: index() });
                  },
                  onInputText: (id, text) => {
                    if (id == editButton()?.id) {
                      setEditButton({
                        id: id,
                        text: text,
                        index: index(),
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
