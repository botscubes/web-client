import { ConditionContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/ConditionContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import { Position } from "~/containers/Editor/shared/types";
import EditorController from "../..";
import { OutputPoint } from "../../SpecificComponent/types";

export class ConditionComponentController
  extends SpecificComponentController
  implements SpecificComponentHandlers<ConditionContentHandlers>
{
  private setExpression: (str: string) => void = (_str: string) => {};
  private expression = "";

  constructor(editor: EditorController, id: number) {
    super(editor, id);
  }

  getHandlers(): ConditionContentHandlers {
    return {
      expression: {
        onMount: (setter: (str: string) => void) => {
          this.setExpression = (str: string) => {
            setter(str);
            this.expression = str;
          };
        },
        onChange: (_str: string) => {},
        onInput: (_str: string) => {},
      },
      outputPoint: this.getPointHandlers(),
    };
  }
}
