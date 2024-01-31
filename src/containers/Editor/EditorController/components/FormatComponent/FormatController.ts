import { FormatContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/FormatContent";
import {
  OutputPoint,
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent/types";
import EditorController from "../..";

export class FormatController
  extends SpecificComponentController
  implements SpecificComponentHandlers<FormatContentHandlers>
{
  private setFormatString: (str: string) => void = (_str: string) => {};
  private formatString = "";

  constructor(
    private editor: EditorController,
    id: number
  ) {
    super(id, {});
  }

  getHandlers(): FormatContentHandlers {
    return {
      formatString: {
        onMount: (setter: (str: string) => void) => {
          this.setFormatString = (str: string) => {
            setter(str);
            this.formatString = str;
          };
        },
        onChange: (_str: string) => {},
        onInput: (_str: string) => {},
      },
    };
  }
}
