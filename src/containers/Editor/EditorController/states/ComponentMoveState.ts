import EditorController from "../EditorController";
import { EditorState } from "../EditorState";
import CompoentnSelectedState from "./ComponentSelectedState";

export default class ComponentMoveState implements EditorState {
  constructor(private editorController: EditorController) {}
  handleMouseDown(event: MouseEvent) {
    //
  }
  handleMouseMove(event: MouseEvent) {
    const relativeMousePosition =
      this.editorController.getRelativeMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    this.editorController.moveComponents(relativeMousePosition);
  }
  handleMouseUp(event: MouseEvent) {
    this.editorController.setEditorState(
      new CompoentnSelectedState(this.editorController)
    );
  }
}
