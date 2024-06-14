import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { ToIntContent } from "~/containers/Editor/components/ComponentContent/contents/ToIntContent";
import { ToIntComponentController } from "./ToIntComponentController";
import { APIComponentType } from "../../api/types";

export class ToIntComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.ToInt;
  }
  get content(): () => JSX.Element {
    return () => <ToIntContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new ToIntComponentController(this.editor, id);
    return [
      controller,
      () => <ToIntContent handlers={controller.getHandlers()} />,
    ];
  }
}
