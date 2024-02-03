import { StartContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/StartContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import { Position } from "~/containers/Editor/shared/types";
import EditorController from "../..";

export class StartComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<StartContentHandlers>
{
  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): StartContentHandlers {
    return {
      outputPoint: this.getPointHandlers(),
    };
  }
}
