import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponent,
  SpecificComponentController,
} from "../../SpecificComponent";
import { ConditionContent } from "~/containers/Editor/components/ComponentContent/contents/ConditionContent";
import { ConditionController } from "./ConditionController";

export class ConditionComponent implements SpecificComponent {
  constructor(private editor: EditorController) {}
  get content(): () => JSX.Element {
    return () => <ConditionContent />;
  }
  create(id: number): [SpecificComponentController, () => JSX.Element] {
    const controller = new ConditionController();
    return [
      controller,
      () => <ConditionContent handlers={controller.getHandlers()} />,
    ];
  }
}
