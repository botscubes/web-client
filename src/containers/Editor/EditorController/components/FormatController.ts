import { FormatContentHandlers } from "../../components/ComponentContent/contents/FormatContent";
import { SpecificComponentController } from "../SpecificComponent";
import { SpecificComponentHandlers } from "../SpecificComponent/types";

export class FormatController
  implements
    SpecificComponentHandlers<FormatContentHandlers>,
    SpecificComponentController
{
  private setFormatString: (str: string) => void = (_str: string) => {};
  private formatString = "";

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
