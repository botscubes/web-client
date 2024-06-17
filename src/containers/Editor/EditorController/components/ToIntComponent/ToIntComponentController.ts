import { ToIntContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/ToIntContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";

export class ToIntComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<ToIntContentHandlers>
{
  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): ToIntContentHandlers {
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
