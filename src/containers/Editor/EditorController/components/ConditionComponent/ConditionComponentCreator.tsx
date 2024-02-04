import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { ConditionContent } from "~/containers/Editor/components/ComponentContent/contents/ConditionContent";
import { ConditionComponentController } from "./ConditionController";
import { APIComponentType } from "../../api/types";

export class ConditionComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.Condition;
  }
  get content(): () => JSX.Element {
    return () => <ConditionContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new ConditionComponentController(this.editor, id);
    return [
      controller,
      () => <ConditionContent handlers={controller.getHandlers()} />,
    ];
  }
}
