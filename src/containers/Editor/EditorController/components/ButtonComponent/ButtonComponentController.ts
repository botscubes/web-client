import { ButtonContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/ButtonContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import { Position } from "~/containers/Editor/shared/types";
import EditorController from "../..";
import { OutputPoint } from "../../SpecificComponent/types";
import { ButtonData } from "~/containers/Editor/components/ComponentContent/contents/ButtonContent/types";
import { Accessor, Setter, createSignal } from "solid-js";
import { APIButtonData } from "../../api/types";

export class ButtonComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<ButtonContentHandlers>
{
  //private setExpression: (str: string) => void = (_str: string) => {};
  //private expression = "";
  public readonly buttons: Accessor<Array<ButtonData>>;
  private setButtons: Setter<Array<ButtonData>>;
  private buttonId = 1;

  constructor(editor: EditorController, id: number) {
    super(editor, id);

    // eslint-disable-next-line solid/reactivity
    [this.buttons, this.setButtons] = createSignal<Array<ButtonData>>([]);
  }

  getHandlers(): ButtonContentHandlers {
    return {
      text: {
        onMount: (setter: (str: string) => void) => {},
        onChange: (str: string) => {
          this.editor.client.updateComponentData(this.getId(), {
            text: str,
          });
        },
        onInput: (str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
      buttons: {
        onAdd: () => {
          this.setButtons((buttons) => [
            ...buttons,
            { id: this.buttonId.toString(), text: "" },
          ]);
          this.buttonId++;
        },
        onDelete: (id) => {
          this.setButtons((buttons) => buttons.filter((val) => val.id != id));
          this.updateButtonsOnServer();
        },
        onChangeText: (id, text) => {
          this.setButtons((buttons) =>
            buttons.map((button) => {
              if (button.id == id) {
                button.text = text;
              }
              return button;
            })
          );
          this.updateButtonsOnServer();
        },
      },
    };
  }
  private updateButtonsOnServer(): void {
    const buttons: Record<string, APIButtonData> = {};
    for (const button of this.buttons()) {
      buttons[button.id] = {
        text: button.text,
      };
    }
    this.editor.client.updateComponentData(this.getId(), {
      buttons: buttons,
    });
  }
}
