import { ConditionContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/ConditionContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent";
import { Position } from "~/containers/Editor/shared/types";
import EditorController from "../..";
import { OutputPoint, OutputPointType } from "../../SpecificComponent/types";

export class ConditionController
  extends SpecificComponentController
  implements SpecificComponentHandlers<ConditionContentHandlers>
{
  private setExpression: (str: string) => void = (_str: string) => {};
  private expression = "";

  constructor(
    private editor: EditorController,
    id: number
  ) {
    super(id, {
      [OutputPointType.Error]: new OutputPoint(
        OutputPointType.Error,
        (_componentId?: number) => {}
      ),
    });
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
      points: {
        error: {
          onMouseDown: (clientPosition: Position) => {
            this.editor.startConnection(
              this.getId(),
              this.getPoint(OutputPointType.Error).id,
              clientPosition
            );
          },
        },
      },
    };
  }
}
