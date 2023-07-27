import { LinePosition } from "../../components/Line";
import { Position } from "../../shared/types";
import EditorController from "../EditorController";
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
  finishConnection(
    componentId: number,
    connectionPosition: Position,
    relativePointPosition: Position
  ) {
    const editorStorage = this.editorController.getEditorStorage();
    editorStorage.connectComponent(
      this.connectionData.sourceComponentId,
      this.connectionData.sourceCommandId,
      componentId,
      relativePointPosition,
      {
        start: editorStorage.getLinePosition().start,
        end: connectionPosition,
      },
      this.connectionData.commandConnectionPosition
    );

    editorStorage.hideConnectionAreas();
    editorStorage.setShowLine(false);
    this.editorController.setEditorState(
      new WaitingState(this.editorController)
    );
  }
}
