import { Position } from "../../shared/types";
import EditorController from "../EditorController";
import EditorState from "../EditorState";
import { ConnectionData } from "../types";
import WaitingState from "./WaitingState";

export default class ConnectionState implements EditorState {
  constructor(private editorController: EditorController) {}

  handleMouseDown(event: MouseEvent) {
    //
  }
  handleMouseMove(event: MouseEvent) {
    //
  }
  handleMouseUp(event: MouseEvent) {
    this.editorController.setShowLine(false);
    this.editorController.setEditorState(
      new WaitingState(this.editorController)
    );
  }
  //  startConnection(
  //    componentId: number,
  //    commandId: number,
  //    connectionPosition: Position,
  //    relativeConnectionPosition: Position
  //  ) {
  //    this.editorController.setLinePosition(() => ({
  //      start: connectionPosition,
  //      end: connectionPosition,
  //    }));
  //    this.connectionData = {
  //      sourceCommandId: commandId,
  //      sourceComponentId: componentId,
  //      commandConnectionPosition: relativeConnectionPosition,
  //    };
  //    this.editorController
  //      .getEditorStorage()
  //      .showConnectionAreas(new Set([componentId]));
  //
  //    this.editorController.getEditorStorage().setShowLine(true);
  //    this.editorController.setEditorState(
  //      new ConnectionState(this.editorController)
  //    );
  //  }
  //  selectComponent(id: number, mousePosition: Position) {
  //    //
  //  }
}
