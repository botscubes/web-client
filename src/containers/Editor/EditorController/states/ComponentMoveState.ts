import type EditorController from "../EditorController";
import EditorState from "../EditorState";
import { getMousePosition } from "../halpers/mouse";
import WaitingState from "./WaitingState";

export default class ComponentMoveState extends EditorState {
  constructor(editorController: EditorController) {
    super(editorController);
  }

  handleMouseMove(event: MouseEvent) {
    const relativeMousePosition =
      this.editorController.getRelativeMousePosition(getMousePosition(event));
    this.editorController.moveComponents(relativeMousePosition);
  }
  handleMouseUp(event: MouseEvent) {
    this.editorController.setEditorState(
      new WaitingState(this.editorController)
    );
  }
}
