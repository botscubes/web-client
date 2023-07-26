import { Position } from "../../shared/types";
import type EditorController from "../EditorController";
import EditorState from "../EditorState";
import ComponentMoveState from "./ComponentMoveState";
import WaitingState from "./WaitingState";

export default class ComponentSelectedState extends EditorState {
  constructor(editorController: EditorController) {
    super(editorController);
  }

  handleMouseUp(event: MouseEvent) {
    this.editorController.deselectComponents();

    this.editorController.setEditorState(
      new WaitingState(this.editorController)
    );
  }
  selectComponent(id: number, mousePosition: Position) {
    super.selectComponent(id, mousePosition);
    this.editorController.setEditorState(
      new ComponentMoveState(this.editorController)
    );
  }
}
