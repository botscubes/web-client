import { HTTPContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/HTTPContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";

export class HTTPComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<HTTPContentHandlers>
{
  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): HTTPContentHandlers {
    const element = () => <div />;
    return {
      onEditClick: () => {
        this.editor.editingContent.set({
          componentId: this.getId(),
          content: element,
        });
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
