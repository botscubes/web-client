import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { CodeContent } from "~/containers/Editor/components/ComponentContent/contents/CodeContent";
import { CodeComponentController } from "./CodeComponentController";
import { APIComponentType } from "../../api/types";

export class CodeComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.Code;
  }
  get content(): () => JSX.Element {
    return () => <CodeContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new CodeComponentController(this.editor, id);
    return [
      controller,
      () => <CodeContent handlers={controller.getHandlers()} />,
    ];
  }
}
