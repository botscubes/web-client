import { ButtonContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/ButtonContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import { Position } from "~/containers/Editor/shared/types";
import EditorController from "../..";
import { OutputPoint } from "../../SpecificComponent/types";

export class ButtonComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<ButtonContentHandlers>
{
  //private setExpression: (str: string) => void = (_str: string) => {};
  //private expression = "";

  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): ButtonContentHandlers {
    return {
      expression: {
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
    };
  }
}
