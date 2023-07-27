import { Position } from "../../shared/types";
import type EditorController from "../EditorController";
import EditorState from "../EditorState";
import ComponentMoveState from "./ComponentMoveState";

export default class WaitingState extends EditorState {
  constructor(editorController: EditorController) {
    super(editorController);
  }
  handleMouseUp(event: MouseEvent) {
    this.editorController.deselectComponents();
  }
  selectComponent(id: number, mousePosition: Position) {
    super.selectComponent(id, mousePosition);
    this.editorController.setEditorState(
      new ComponentMoveState(this.editorController)
    );
  }
}
