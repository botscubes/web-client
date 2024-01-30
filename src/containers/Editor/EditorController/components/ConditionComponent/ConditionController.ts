import { ConditionContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/ConditionContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import { Position } from "~/containers/Editor/shared/types";

export class ConditionController
  implements
    SpecificComponentHandlers<ConditionContentHandlers>,
    SpecificComponentController
{
  private setExpression: (str: string) => void = (_str: string) => {};
  private expression = "";

  constructor() {} //   private component: ComponentData //   private editor: EditorController,

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
      points: {
        error: {
          onMouseDown: (clientPosition: Position) => {},
        },
      },
    };
  }
}
