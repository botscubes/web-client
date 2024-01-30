import { Position } from "../../shared/types";
import type EditorController from "../EditorController";
import EditorState from "../EditorState";
import ComponentMoveState from "./ComponentMoveState";
import ConnectionState from "./ConnectionState";

export default class WaitingState extends EditorState {
  constructor(editor: EditorController) {
    super(editor);
  }
  get name() {
    return "WaitingState";
  }
  handleMouseUp(_event: MouseEvent) {
    this.editor.components.deselectAll();
  }
  selectComponent(id: number, mousePosition: Position) {
    if (!this.editor.components.isSelected(id)) {
      this.editor.components.deselectAll();
      this.editor.components.select(id);
    }

    this.editor.components.fixMouseShiftsRelative(
      this.editor.getRelativeMousePosition(mousePosition)
    );

    this.editor.setState(new ComponentMoveState(this.editor));
  }
  startConnection(componentId: number, pointId: number, position: Position) {
    const connectionData = {
      componentId: componentId,
      pointId: pointId,
      position: position,
    };

    this.editor.setState(new ConnectionState(this.editor, connectionData));
  }
}
