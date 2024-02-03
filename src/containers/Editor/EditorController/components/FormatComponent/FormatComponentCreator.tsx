import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { FormatContent } from "~/containers/Editor/components/ComponentContent/contents/FormatContent";
import { FormatController } from ".";

export class FormatComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get content(): () => JSX.Element {
    return () => <FormatContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new FormatController(this.editor, id);
    return [
      controller,
      () => <FormatContent handlers={controller.getHandlers()} />,
    ];
  }
}
