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
    //this.buttons = get;
    //this.setButtons = set;
  }

  getHandlers(): ButtonContentHandlers {
    return {
      text: {
        onMount: (setter: (str: string) => void) => {
          //this.setExpression = (str: string) => {
          //  setter(str);
          //  this.expression = str;
          //};
        },
        onChange: (str: string) => {
          this.editor.client.updateComponentData(this.getId(), {
            expression: str,
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
        },
        onChangeText: (id, text) => {
          console.log("aaaa");
          if (text == "") {
            this.setButtons((buttons) => buttons.filter((val) => val.id != id));
          }
        },
      },
    };
  }
}
