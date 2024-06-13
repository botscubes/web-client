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
  public readonly abilityToAdd: Accessor<boolean>;
  private setButtons: Setter<Array<ButtonData>>;
  private setAbilityToAdd: Setter<boolean>;
  private newButtonId = 1;

  constructor(
    editor: EditorController,
    id: number,
    buttons: Record<string, APIButtonData> = {},
    outputs: Record<string, number> = {}
  ) {
    super(editor, id);

    let arrayOfButtonData: Array<ButtonData> = [];

    for (const [id, data] of Object.entries(buttons)) {
      const i = Number(id);
      if (i >= this.newButtonId) {
        this.newButtonId = i + 1;
      }
      if (id)
        arrayOfButtonData.push({
          id: id,
          text: data.text,
          target: outputs[id],
        });
    }

    // eslint-disable-next-line solid/reactivity
    [this.buttons, this.setButtons] =
      createSignal<Array<ButtonData>>(arrayOfButtonData);

    let ability = true;
    if (this.buttons().length >= 5) {
      ability = false;
    }
    // eslint-disable-next-line solid/reactivity
    [this.abilityToAdd, this.setAbilityToAdd] = createSignal(ability);
  }

  getHandlers(): ButtonContentHandlers {
    return {
      text: {
        onMount: (setter: (str: string) => void) => {},
        onChange: (str: string) => {
          this.updateData({
            text: str,
          });
        },
        onInput: (str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
      buttons: {
        onAdd: () => {
          if (this.buttons().length < 5) {
            this.setButtons((buttons) => [
              ...buttons,
              { id: this.newButtonId.toString(), text: "" },
            ]);
            this.newButtonId++;
            if (this.buttons().length >= 5) {
              this.setAbilityToAdd(false);
            }
          }
        },
        onDelete: (id) => {
          this.setButtons((buttons) => buttons.filter((val) => val.id != id));
          this.updateButtonsOnServer();

          this.deleteOutputPoint(id);
          this.setAbilityToAdd(true);
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
    this.updateData({
      buttons: buttons,
    });
  }
}
