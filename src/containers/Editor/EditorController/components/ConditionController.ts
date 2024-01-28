import { ConditionContentHandlers } from "../../components/ComponentContent/contents/ConditionContent";
import { SpecificComponentController } from "../SpecificComponent";
import { SpecificComponentHandlers } from "../SpecificComponent/types";

export class ConditionController
  implements
    SpecificComponentHandlers<ConditionContentHandlers>,
    SpecificComponentController
{
  private setExpression: (str: string) => void = (_str: string) => {};
  private expression = "";

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
    };
  }
}
