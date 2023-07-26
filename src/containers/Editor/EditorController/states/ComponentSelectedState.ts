import EditorController from "../EditorController";
import EditorState from "../EditorState";
import WaitingState from "./WaitingState";

export default class ComponentSelectedState implements EditorState {
  constructor(private editorController: EditorController) {}
  handleMouseDown(event: MouseEvent) {
    //
  }
  handleMouseMove(event: MouseEvent) {
    //
  }
  handleMouseUp(event: MouseEvent) {
    this.editorController.deselectComponents();

    this.editorController.setEditorState(
      new WaitingState(this.editorController)
    );
  }
}
