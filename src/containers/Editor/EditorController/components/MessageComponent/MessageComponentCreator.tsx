import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { MessageContent } from "~/containers/Editor/components/ComponentContent/contents/MessageContent";
import { MessageComponentController } from "./MessageController";
import { APIComponentType } from "../../api/types";

export class MessageComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.Message;
  }
  get content(): () => JSX.Element {
    return () => <MessageContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new MessageComponentController(this.editor, id);
    return [
      controller,
      () => <MessageContent handlers={controller.getHandlers()} />,
    ];
  }
}
