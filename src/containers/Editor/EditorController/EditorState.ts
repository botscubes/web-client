import { Position } from "../shared/types";
import type EditorController from "./EditorController";

export default abstract class EditorState {
  constructor(protected editor: EditorController) {}

  get name() {
    return "EditorState";
  }

  handleMouseDown(_event: MouseEvent) {
    //
  }
  handleMouseMove(_event: MouseEvent) {
    //
  }
  handleMouseUp(_event: MouseEvent) {
    //
  }
  selectComponent(_id: number, _mousePosition: Position) {
    //
  }

  startConnection(
    _componentId: number,
    _commandId: number,
    _connectionPosition: Position,
    _relativeConnectionPosition: Position
  ) {
    //
  }
  finishConnection(
    _componentId: number,
    _connectionPosition: Position,
    _relativePointPosition: Position
  ) {}
}
