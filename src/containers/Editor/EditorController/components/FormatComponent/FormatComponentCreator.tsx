import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { FormatContent } from "~/containers/Editor/components/ComponentContent/contents/FormatContent";
import { FormatComponentController } from "./FormatComponentController";
import { APIComponentType } from "../../api/types";

export class FormatComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.Format;
  }
  get content(): () => JSX.Element {
    return () => <FormatContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new FormatComponentController(this.editor, id);
    return [
      controller,
      () => <FormatContent handlers={controller.getHandlers()} />,
    ];
  }
}
