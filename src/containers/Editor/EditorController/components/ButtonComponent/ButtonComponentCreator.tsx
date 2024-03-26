import { JSX, createSignal } from "solid-js";
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
    return () => (
      <ButtonContent
        data={{
          buttons: [
            {
              id: "1",
              text: "button1",
            },
            {
              id: "2",
              text: "button2",
            },
          ],
        }}
      />
    );
  }
  create(id: number): SpecificComponent {
    const controller = new ButtonComponentController(this.editor, id);
    return [
      controller,
      () => (
        <ButtonContent
          handlers={controller.getHandlers()}
          data={{ buttons: controller.buttons() }}
        />
      ),
    ];
  }
}
