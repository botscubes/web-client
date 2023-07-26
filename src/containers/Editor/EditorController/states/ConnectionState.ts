import { LinePosition } from "../../components/Line";
import { Position } from "../../shared/types";
import type EditorController from "../EditorController";
import EditorState from "../EditorState";
import { getMousePosition } from "../halpers/mouse";
import { ConnectionData } from "../types";
import WaitingState from "./WaitingState";

export default class ConnectionState extends EditorState {
  constructor(
    editorController: EditorController,
    private connectionData: ConnectionData
  ) {
    super(editorController);
  }

  handleMouseMove(event: MouseEvent) {
    const mousePosition = this.editorController.getRelativeMousePosition(
      getMousePosition(event)
    );
    this.editorController.setLinePosition((position: LinePosition) => ({
      ...position,
      end: mousePosition,
    }));
  }

  handleMouseUp(event: MouseEvent) {
    this.editorController.setShowLine(false);
    this.editorController.setEditorState(
      new WaitingState(this.editorController)
    );
  }
  selectComponent(id: number, mousePosition: Position) {
    //
  }
  startConnection(
    componentId: number,
    commandId: number,
    connectionPosition: Position,
    relativeConnectionPosition: Position
  ) {
    this.editorController.setLinePosition(() => ({
      start: connectionPosition,
      end: connectionPosition,
    }));
    const connectionData = {
      sourceCommandId: commandId,
      sourceComponentId: componentId,
      commandConnectionPosition: relativeConnectionPosition,
    };
    this.editorController
      .getEditorStorage()
      .showConnectionAreas(new Set([componentId]));

    this.editorController.getEditorStorage().setShowLine(true);
    this.editorController.setEditorState(
      new ConnectionState(this.editorController, connectionData)
    );
  }
}
