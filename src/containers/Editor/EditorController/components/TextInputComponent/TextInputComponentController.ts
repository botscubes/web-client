import { TextInputContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/TextInputContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";

export class TextInputComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<TextInputContentHandlers>
{
  //private setExpression: (str: string) => void = (_str: string) => {};
  //private expression = "";

  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): TextInputContentHandlers {
    return {
      outputPoint: this.getPointHandlers(),
    };
  }
}
