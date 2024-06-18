import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { FromJSONContent } from "~/containers/Editor/components/ComponentContent/contents/FromJSONContent";
import { FromJSONComponentController } from "./FromJSONComponentController";
import { APIComponentType } from "../../api/types";

export class FromJSONComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.FromJSON;
  }
  get content(): () => JSX.Element {
    return () => <FromJSONContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new FromJSONComponentController(this.editor, id);
    return [
      controller,
      () => <FromJSONContent handlers={controller.getHandlers()} />,
    ];
  }
}
