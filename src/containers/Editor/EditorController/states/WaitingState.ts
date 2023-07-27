import { Position } from "../../shared/types";
import type EditorController from "../EditorController";
import EditorState from "../EditorState";
import ComponentMoveState from "./ComponentMoveState";
import ConnectionState from "./ConnectionState";

export default class WaitingState extends EditorState {
  constructor(editorController: EditorController) {
    super(editorController);
  }
  handleMouseUp(event: MouseEvent) {
    this.editorController.deselectComponents();
  }
  selectComponent(id: number, mousePosition: Position) {
    if (!this.editorController.getEditorStorage().componentIsSelected(id)) {
      this.editorController.getEditorStorage().deselectComponents();
      this.editorController.getEditorStorage().selectComponent(id);
    }

    this.editorController
      .getEditorStorage()
      .fixMouseShiftsRelativeToComponents(
        this.editorController.getRelativeMousePosition(mousePosition)
      );
    this.editorController.setEditorState(
      new ComponentMoveState(this.editorController)
    );
  }
  startConnection(
    componentId: number,
    commandId: number,
    connectionPosition: Position,
    relativeConnectionPosition: Position
  ) {
    this.editorController
      .getEditorStorage()
      .deleteConnection(componentId, commandId);

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
