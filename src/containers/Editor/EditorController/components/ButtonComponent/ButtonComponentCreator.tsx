import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { ButtonContent } from "~/containers/Editor/components/ComponentContent/contents/ButtonContent";
import { ButtonComponentController } from "./ButtonComponentController";
import { APIComponentType } from "../../api/types";

export class ButtonComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.Buttons;
  }
  get content(): () => JSX.Element {
    return () => <ButtonContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new ButtonComponentController(this.editor, id);
    return [
      controller,
      () => <ButtonContent handlers={controller.getHandlers()} />,
    ];
  }
}
