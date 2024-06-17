import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { MoveContent } from "~/containers/Editor/components/ComponentContent/contents/MoveContent";
import { MoveComponentController } from "./MoveComponentController";
import { APIComponentType } from "../../api/types";

export class MoveComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.Move;
  }
  get content(): () => JSX.Element {
    return () => <MoveContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new MoveComponentController(this.editor, id);
    return [
      controller,
      () => <MoveContent handlers={controller.getHandlers()} />,
    ];
  }
}
