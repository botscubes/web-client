import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponent,
  SpecificComponentController,
} from "../../SpecificComponent";
import { FormatContent } from "~/containers/Editor/components/ComponentContent/contents/FormatContent";
import { FormatController } from ".";

export class FormatComponent implements SpecificComponent {
  constructor(private editor: EditorController) {}
  get content(): () => JSX.Element {
    return () => <FormatContent />;
  }
  create(id: number): [SpecificComponentController, () => JSX.Element] {
    const controller = new FormatController();
    return [
      controller,
      () => <FormatContent handlers={controller.getHandlers()} />,
    ];
  }
}
