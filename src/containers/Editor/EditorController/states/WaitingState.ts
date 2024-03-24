import { MouseButton, Position } from "../../shared/types";
import type EditorController from "../EditorController";
import EditorState from "../EditorState";
import ComponentMoveState from "./ComponentMoveState";
import ConnectionState from "./ConnectionState";

export default class WaitingState extends EditorState {
  private mouseDownOverComponent = false;
  constructor(editor: EditorController) {
    super(editor);
  }
  get name() {
    return "WaitingState";
  }
  handleMouseUp(_event: MouseEvent) {
    if (!this.mouseDownOverComponent) {
      this.editor.components.deselectAll();
    }
    this.mouseDownOverComponent = false;
  }
  addSelectedComponent(id: number) {
    if (this.editor.components.isSelected(id)) {
      this.editor.components.deselect(id);
    } else {
      this.editor.components.select(id);
    }

    this.mouseDownOverComponent = true;
  }
  handleMouseMove(_event: MouseEvent) {
    if (this.mouseDownOverComponent) {
      this.editor.setState(new ComponentMoveState(this.editor));
    }
  }
  selectComponent(id: number, mousePosition: Position) {
    if (!this.editor.components.isSelected(id)) {
      this.editor.components.deselectAll();
      this.editor.components.select(id);
    }

    this.editor.components.fixMouseShiftsRelative(
      this.editor.getRelativeMousePosition(mousePosition)
    );
    this.mouseDownOverComponent = true;
  }
  startConnection(componentId: number, pointId: string, position: Position) {
    const connectionData = {
      componentId: componentId,
      pointId: pointId,
      pointPosition: position,
    };

    this.editor.setState(
      new ConnectionState(this.editor, connectionData, position)
    );
  }
}
