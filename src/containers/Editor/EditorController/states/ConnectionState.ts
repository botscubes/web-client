import { LinePosition } from "../../components/Line";
import { Position } from "../../shared/types";
import EditorController from "../EditorController";
import EditorState from "../EditorState";
import { getMousePosition } from "../halpers/mouse";
import { ConnectionData } from "../types";
import WaitingState from "./WaitingState";

export default class ConnectionState extends EditorState {
  constructor(
    editor: EditorController,
    private connectionData: ConnectionData
  ) {
    super(editor);

    this.editor.setUserSelect(false);

    this.editor.line.set({
      start: connectionData.position,
      end: connectionData.position,
    });
    //  this.editor
    //    .getEditorStorage()
    //    .deleteConnection(
    //      connectionData.sourceComponentId,
    //      connectionData.sourceCommandId
    //    );
    //  this.editorController.setLinePosition(
    //    () => this.connectionData.linePosition
    //  );

    //  this.editorController.getEditorStorage().setShowLine(true);
    //  this.editorController
    //    .getEditorStorage()
    //    .showConnectionAreas(new Set([connectionData.sourceComponentId]));
  }

  get name() {
    return "ConnectionState";
  }

  handleMouseMove(event: MouseEvent) {
    const mousePosition = this.editor.getRelativeMousePosition(
      getMousePosition(event)
    );
    this.editor.line.set((position: LinePosition | undefined) => {
      if (position) {
        return {
          ...position,
          end: mousePosition,
        };
      }
      return undefined;
    });
    //  this.editorController.setLinePosition((position: LinePosition) => ({
    //    ...position,
    //    end: mousePosition,
    //  }));
  }

  handleMouseUp(_event: MouseEvent) {
    //  this.editorController.setShowLine(false);
    //  this.editorController.getEditorStorage().hideConnectionAreas();
    //  this.editorController.setEditorState(
    //    new WaitingState(this.editorController)
    //  );
    this.editor.setUserSelect(true);
    this.editor.line.set(undefined);
    this.editor.setState(new WaitingState(this.editor));
  }
  finishConnection(
    componentId: number,
    connectionPosition: Position,
    relativePointPosition: Position
  ) {
    //    const editorStorage = this.editorController.getEditorStorage();
    //    editorStorage.addConnection(
    //      this.connectionData.sourceComponentId,
    //      this.connectionData.sourceCommandId,
    //      componentId,
    //      relativePointPosition,
    //      {
    //        start: editorStorage.getLinePosition().start,
    //        end: connectionPosition,
    //      },
    //      this.connectionData.commandConnectionPosition
    //    );
    //
    //    editorStorage.hideConnectionAreas();
    //    editorStorage.setShowLine(false);
    //    this.editorController.setEditorState(
    //      new WaitingState(this.editorController)
    //    );
  }
}
