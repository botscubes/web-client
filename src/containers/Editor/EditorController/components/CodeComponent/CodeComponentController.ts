import { CodeContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/CodeContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";

export class CodeComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<CodeContentHandlers>
{
  //private setExpression: (str: string) => void = (_str: string) => {};
  //private expression = "";

  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): CodeContentHandlers {
    return {
      code: {
        onMount: (setter: (str: string) => void) => {
          //setter(str);
        },
        onChange: (str: string) => {
          this.editor.client.updateComponentData(this.getId(), {
            text: str,
          });
        },
        onInput: (str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
