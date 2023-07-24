import EditorController from "../EditorController";
import { EditorState } from "../EditorState";

export default class WaitingState implements EditorState {
  constructor(private editorController: EditorController) {}
  handleMouseDown(event: MouseEvent) {
    //
  }
  handleMouseMove(event: MouseEvent) {
    //
  }
  handleMouseUp(event: MouseEvent) {
    //
  }
}
