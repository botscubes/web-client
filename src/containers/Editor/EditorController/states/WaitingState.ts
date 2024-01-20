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
    this._editor.components.deselectAll();
  }
  selectComponent(id: number, mousePosition: Position) {
    if (!this._editor.components.isSelected(id)) {
      this._editor.components.deselectAll();
      this._editor.components.select(id);
    }

    this._editor.components.fixMouseShiftsRelative(
      this._editor.getRelativeMousePosition(mousePosition)
    );

    this._editor.setState(new ComponentMoveState(this._editor));
  }
  startConnection(
    componentId: number,
    commandId: number,
    connectionPosition: Position,
    relativeConnectionPosition: Position
  ) {
    const connectionData = {
      sourceCommandId: commandId,
      sourceComponentId: componentId,
      commandConnectionPosition: relativeConnectionPosition,
      linePosition: { start: connectionPosition, end: connectionPosition },
    };

    this._editor.setState(new ConnectionState(this._editor, connectionData));
  }
}
