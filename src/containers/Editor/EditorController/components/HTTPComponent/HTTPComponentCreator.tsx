import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { HTTPContent } from "~/containers/Editor/components/ComponentContent/contents/HTTPContent";
import { HTTPComponentController } from "./HTTPComponentController";
import { APIComponentType } from "../../api/types";

export class HTTPComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.HTTP;
  }
  get content(): () => JSX.Element {
    return () => <HTTPContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new HTTPComponentController(this.editor, id);
    return [
      controller,
      () => <HTTPContent handlers={controller.getHandlers()} />,
    ];
  }
}
