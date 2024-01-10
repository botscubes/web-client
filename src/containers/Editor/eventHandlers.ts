import EditorController from "./EditorController";
import { Position } from "./shared/types";

export function handleMouseMove(
  editorController: EditorController,
  event: MouseEvent
) {
  //const editor: HTMLElement = event.currentTarget as HTMLElement;
  //const rect: DOMRect = editor.getBoundingClientRect();
  //const position = {
  //  x: Math.round(editor.scrollLeft + event.clientX - rect.left) / scale(),
  //  y: Math.round(editor.scrollTop + event.clientY - rect.top) / scale(),
  //};

  editorController.handleMouseMove(event);
}

export function handleAddComponent(editorController: EditorController) {
  editorController.addComponent();
}
export function getDeleteComponentHandler(editorController: EditorController) {
  return (id: number) => editorController.deleteComponent(id);
}
export function getAddSelectedComponentHandler(
  editorController: EditorController
) {
  return (id: number) => editorController.addSelectedComponent(id);
}
export function getSelectComponentHandler(editorController: EditorController) {
  return (id: number, mousePosition: Position) =>
    editorController.selectComponent(id, mousePosition);
}
export function getStartConnectionHandler(editorController: EditorController) {
  return (
    componentId: number,
    commandId: number,
    connectionPosition: Position,
    relativeConnectionPosition: Position
  ) =>
    editorController.startConnection(
      componentId,
      commandId,
      connectionPosition,
      relativeConnectionPosition
    );
}
export function getFinishConnectionHandler(editorController: EditorController) {
  return (
    componentId: number,
    conncetionPosition: Position,
    relativePointPosition: Position
  ) =>
    editorController.finishConnection(
      componentId,
      conncetionPosition,
      relativePointPosition
    );
}
export function getDeleteConnectionHandler(editorController: EditorController) {
  return (sourceComponentId: number, sourceCommandId: number) =>
    editorController.deleteConnection(sourceComponentId, sourceCommandId);
}
export function handleMouseUp(
  editorController: EditorController,
  event: MouseEvent
) {
  editorController.handleMouseUp(event);
}
export function handleMouseDown(
  editorController: EditorController,
  event: MouseEvent
) {
  editorController.handleMouseDown(event);
}

export function handleZoomIn() {
  //
}
export function handleZoomOut() {
  //
}
