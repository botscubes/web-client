import EditorController from "./EditorController";

export interface EditorState {
  handleMouseDown(event: MouseEvent): void;
  handleMouseMove(event: MouseEvent): void;
  handleMouseUp(event: MouseEvent): void;
}
