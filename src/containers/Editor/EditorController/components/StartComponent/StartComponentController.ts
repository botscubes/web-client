import { StartContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/StartContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";

export class StartComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<StartContentHandlers>
{
  constructor(editor: EditorController, id: number, nextComponentId?: number) {
    super(editor, id);

    this.bindHandlerToPoints({});
  }

  getHandlers(): StartContentHandlers {
    return {
      outputPoint: this.getPointHandlers(),
    };
  }
}
