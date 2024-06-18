import { FromJSONContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/FromJSONContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";

export class FromJSONComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<FromJSONContentHandlers>
{
  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): FromJSONContentHandlers {
    return {
      path: {
        onMount: (_setter: (str: string) => void) => {},
        onChange: (str: string) => {
          this.updatePath(str);
        },
        onInput: (_str: string) => {},
      },
      json: {
        onMount: (_setter: (str: string) => void) => {},
        onChange: (str: string) => {
          this.updateData({
            json: str,
          });
        },
        onInput: (_str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
