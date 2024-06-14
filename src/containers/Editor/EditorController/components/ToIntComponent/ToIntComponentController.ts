import { ToIntContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/ToIntContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import { Position } from "~/containers/Editor/shared/types";
import EditorController from "../..";
import { OutputPoint } from "../../SpecificComponent/types";

export class ToIntComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<ToIntContentHandlers>
{
  //private setExpression: (str: string) => void = (_str: string) => {};
  //private expression = "";

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
          this.updateData({
            destination: str,
          });
        },
        onInput: (_str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
