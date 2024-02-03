import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { ConditionContent } from "~/containers/Editor/components/ComponentContent/contents/ConditionContent";
import { ConditionController } from "./ConditionController";

export class ConditionComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get content(): () => JSX.Element {
    return () => <ConditionContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new ConditionController(this.editor, id);
    return [
      controller,
      () => <ConditionContent handlers={controller.getHandlers()} />,
    ];
  }
}
