import { FormatContentHandlers } from "~/containers/Editor/components/ComponentContent/contents/FormatContent";
import {
  SpecificComponentController,
  SpecificComponentHandlers,
} from "../../SpecificComponent/types";
import EditorController from "../..";

export class FormatController
  implements
    SpecificComponentHandlers<FormatContentHandlers>,
    SpecificComponentController
{
  private setFormatString: (str: string) => void = (_str: string) => {};
  private formatString = "";

  constructor(
    private editor: EditorController,
    private id: number
  ) {}

  setId(id: number) {
    this.id = id;
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
