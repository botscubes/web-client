import { CodeContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/CodeContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";
import CodeEditor from "~/containers/Editor/components/CodeEditor";

export class CodeComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<CodeContentHandlers>
{
  constructor(
    editor: EditorController,
    id: number,
    private code: string = ""
  ) {
    super(editor, id);
  }

  getHandlers(): CodeContentHandlers {
    const element = () => (
      <CodeEditor
        data={{ code: this.code }}
        handlers={{
          onCancel: () => {
            this.editor.editingContent.set(undefined);
          },
          onSave: (code) => {
            this.code = code;
            this.updateData({
              code: code,
            });
            this.editor.editingContent.set(undefined);
          },
        }}
      />
    );
    return {
      onEditClick: () => {
        this.editor.editingContent.set(() => element);
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
