import EditorController from "./EditorController";
import { Position } from "./shared/types";

export function handleMouseMove(event: MouseEvent) {
  const editor: HTMLElement = event.currentTarget as HTMLElement;
  const rect: DOMRect = editor.getBoundingClientRect();
  //  setMousePos({
  //    x: Math.round(editor.scrollLeft + event.clientX - rect.left) / scale(),
  //    y: Math.round(editor.scrollTop + event.clientY - rect.top) / scale(),
  //  });
}

export function handleAddComponent(editorController: EditorController) {
  editorController.addComponent();
}
export function handleDeleteComponent(editorController: EditorController) {
  return (id: number) => editorController.deleteComponent(id);
}
export function handleAddSelectedComponent(id: number) {
  //
}
export function handleSelectComponent(id: number) {
  //
}
export function handleStartConnection(
  componentId: number,
  commandId: number,
  connectionPosition: Position,
  relativeConnectionPosition: Position
) {
  //
}
export function handleFinishConnection(
  componentId: number,
  conncetionPosition: Position,
  relativePointPosition: Position
) {
  //
}
export function handleMouseUp(event: MouseEvent) {
  //
}
export function handleMouseDown(event: MouseEvent) {
  //
}
export function handleMoveConnection(
  commandId: number,
  connectionPostition: Position
) {
  //console.log("Editor: move connection");
}
export function handleMoveCommandConnection(
  commandId: number,
  connectionPosition: Position
) {
  //
}
export function handleZoomIn() {
  //
}
export function handleZoomOut() {
  //
}
