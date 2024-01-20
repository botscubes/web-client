import type EditorController from "../EditorController";
import EditorState from "../EditorState";
import { getMousePosition } from "../halpers/mouse";
import WaitingState from "./WaitingState";

export default class ComponentMoveState extends EditorState {
  constructor(editor: EditorController) {
    super(editor);
  }
  get name() {
    return "ComponentMoveState";
  }

  handleMouseMove(event: MouseEvent) {
    const relativeMousePosition = this._editor.getRelativeMousePosition(
      getMousePosition(event)
    );
    this._editor.components.move(relativeMousePosition);
  }
  handleMouseUp(_event: MouseEvent) {
    this._editor.setState(new WaitingState(this._editor));
  }
}
