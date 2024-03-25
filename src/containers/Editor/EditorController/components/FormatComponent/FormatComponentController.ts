import { FormatContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/FormatContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import { Position } from "~/containers/Editor/shared/types";
import EditorController from "../..";
import { OutputPoint } from "../../SpecificComponent/types";

export class FormatComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<FormatContentHandlers>
{
  //private setExpression: (str: string) => void = (_str: string) => {};
  //private expression = "";

  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): FormatContentHandlers {
    return {
      formatString: {
        onMount: (setter: (str: string) => void) => {
          //this.setExpression = (str: string) => {
          //  setter(str);
          //  this.expression = str;
          //};
        },
        onChange: (str: string) => {
          this.editor.client.updateComponentData(this.getId(), {
            formatString: str,
          });
        },
        onInput: (str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
