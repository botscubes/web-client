import { MessageContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/MessageContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import EditorController from "../..";

export class MessageComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<MessageContentHandlers>
{
  //private setExpression: (str: string) => void = (_str: string) => {};
  //private expression = "";

  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): MessageContentHandlers {
    return {
      text: {
        onMount: (setter: (str: string) => void) => {
          //setter(str);
        },
        onChange: (str: string) => {
          this.editor.client.updateComponentData(this.getId(), {
            text: str,
          });
        },
        onInput: (str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
