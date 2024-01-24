import { JSX } from "solid-js";
import EditorController from "..";
import EditorState from "../EditorState";
import WaitingState from "./WaitingState";
import { getMousePosition } from "../halpers/mouse";
import { Position } from "../../shared/types";

export default class AddingComponentState extends EditorState {
  constructor(
    editor: EditorController,
    event: MouseEvent,
    private content: () => JSX.Element
  ) {
    super(editor);

    this.editor.addingComponent.setPosition(
      this.getRelativeMousePosition(event)
    );
    editor.addingComponent.setContent(() => content);
  }
  get name() {
    return "AddingComponentState";
  }

  handleMouseMove(event: MouseEvent) {
    this.editor.addingComponent.setPosition(
      this.getRelativeMousePosition(event)
    );
  }
  handleMouseUp(event: MouseEvent) {
    this.editor.components.add(
      this.getRelativeMousePosition(event),
      this.content
    );

    this.editor.addingComponent.setContent(undefined);

    this.editor.setState(new WaitingState(this.editor));
  }

  private getRelativeMousePosition(event: MouseEvent): Position {
    const relativeMousePosition = this.editor.getRelativeMousePosition(
      getMousePosition(event)
    );

    return relativeMousePosition;
  }
}
