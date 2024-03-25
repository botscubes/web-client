import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { TextInputContent } from "~/containers/Editor/components/ComponentContent/contents/TextInputContent";
import { TextInputComponentController } from "./TextInputComponentController";
import { APIComponentType } from "../../api/types";

export class TextInputComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.TextInput;
  }
  get content(): () => JSX.Element {
    return () => <TextInputContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new TextInputComponentController(this.editor, id);
    return [
      controller,
      () => <TextInputContent handlers={controller.getHandlers()} />,
    ];
  }
}
