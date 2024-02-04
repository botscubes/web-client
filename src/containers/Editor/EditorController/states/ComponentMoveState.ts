import type EditorController from "../EditorController";
import EditorState from "../EditorState";
import { getMousePosition } from "../halpers/mouse";
import WaitingState from "./WaitingState";

export default class ComponentMoveState extends EditorState {
  constructor(editor: EditorController) {
    super(editor);

    editor.setUserSelect(false);
  }
  get name() {
    return "ComponentMoveState";
  }

  handleMouseMove(event: MouseEvent) {
    const relativeMousePosition = this.editor.getRelativeMousePosition(
      getMousePosition(event)
    );
    this.editor.components.move(relativeMousePosition);
  }
  handleMouseUp(_event: MouseEvent) {
    this.editor.components.completeMove();
    this.editor.setUserSelect(true);
    this.editor.setState(new WaitingState(this.editor));
  }
}
