import { MoveContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/MoveContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";

export class MoveComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<MoveContentHandlers>
{
  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): MoveContentHandlers {
    return {
      source: {
        onMount: (_setter: (str: string) => void) => {},
        onChange: (str: string) => {
          this.updateData({
            source: str,
          });
        },
        onInput: (_str: string) => {},
      },
      destination: {
        onMount: (_setter: (str: string) => void) => {},
        onChange: (str: string) => {
          this.updatePath(str);
        },
        onInput: (_str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
