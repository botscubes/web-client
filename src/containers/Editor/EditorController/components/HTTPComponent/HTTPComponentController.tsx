import {
  HTTPContentData,
  HTTPContentHandlers,
} from "~/containers/Editor/components/ComponentContent/contents/HTTPContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";
import HTTPEditingContent from "~/containers/Editor/components/ComponentContent/contents/HTTPContent/HTTPEditingContent";

export class HTTPComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<HTTPContentHandlers>
{
  constructor(
    editor: EditorController,
    id: number,
    private data: HTTPContentData = {}
  ) {
    super(editor, id);
  }

  getHandlers(): HTTPContentHandlers {
    const element = () => (
      <HTTPEditingContent
        data={this.data}
        handlers={{
          onCancel: () => {
            this.editor.editingContent.set(undefined);
          },
          onSave: (data) => {
            this.data = data;
            this.updateData(data);
            this.editor.editingContent.set(undefined);
          },
        }}
      />
    );
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
