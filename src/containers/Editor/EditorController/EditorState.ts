import { Position } from "../shared/types";
import type EditorController from "./EditorController";
import ComponentMoveState from "./states/ComponentMoveState";

export default abstract class EditorState {
  constructor(protected editorController: EditorController) {}
  handleMouseDown(event: MouseEvent) {
    //
  }
  handleMouseMove(event: MouseEvent) {
    //
  }
  handleMouseUp(event: MouseEvent) {
    //
  }
  selectComponent(id: number, mousePosition: Position) {
    if (!this.editorController.getEditorStorage().componentIsSelected(id)) {
      this.editorController.getEditorStorage().deselectComponents();
      this.editorController.getEditorStorage().selectComponent(id);
    }

    this.editorController
      .getEditorStorage()
      .fixMouseShiftsRelativeToComponents(
        this.editorController.getRelativeMousePosition(mousePosition)
      );
  }

  startConnection(
    componentId: number,
    commandId: number,
    connectionPosition: Position,
    relativeConnectionPosition: Position
  ) {
    //
  }
}
