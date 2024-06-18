import { PhotoContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/PhotoContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";

export class PhotoComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<PhotoContentHandlers>
{
  //private setExpression: (str: string) => void = (_str: string) => {};
  //private expression = "";

  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): PhotoContentHandlers {
    return {
      name: {
        onMount: (setter: (str: string) => void) => {
          //setter(str);
        },
        onChange: (str: string) => {
          this.updateData({
            name: str,
          });
        },
        onInput: (str: string) => {},
      },
      path: {
        onMount: (setter: (str: string) => void) => {
          //setter(str);
        },
        onChange: (str: string) => {
          this.updatePath(str);
        },
        onInput: (str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
