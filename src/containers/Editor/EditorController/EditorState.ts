import { Position } from "../shared/types";
import type EditorController from "./EditorController";

export default abstract class EditorState {
  constructor(protected editor: EditorController) {}

  get name() {
    return "EditorState";
  }

  handleMouseDown(_event: MouseEvent) {}
  handleMouseMove(_event: MouseEvent) {}
  handleMouseUp(_event: MouseEvent) {}
  selectComponent(_id: number, _mousePosition: Position) {}

  addSelectedComponent(_id: number) {}
  startConnection(
    _componentId: number,
    _pointId: string,
    _position: Position
  ) {}
  finishConnection(
    _componentId: number,
    _connectionPosition: Position,
    _relativePointPosition: Position
  ) {}
}
