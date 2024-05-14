import { Position } from "../../shared/types";
import { LineData } from "../../types";
import EditorController from "../EditorController";
import EditorState from "../EditorState";
import { getMousePosition } from "../halpers/mouse";
import { SourceConnectionData } from "../types";
import WaitingState from "./WaitingState";

export default class ConnectionState extends EditorState {
  constructor(
    editor: EditorController,
    private sourceConnectionData: SourceConnectionData,
    mousePosition: Position,
    private pointColor: string
  ) {
    super(editor);

    this.editor.components.deselectAll();
    this.editor.components.select(sourceConnectionData.componentId);
    this.editor.setUserSelect(false);

    this.editor.line.set({
      color: pointColor,
      position: {
        start: sourceConnectionData.pointPosition,
        end: mousePosition,
      },
    });
    editor.components.showConnectionAreas(
      new Set([sourceConnectionData.componentId])
    );
    const targetComponentId = editor.components
      .component(sourceConnectionData.componentId)
      .controller.getOutputPoint(
        sourceConnectionData.pointId
      ).targetComponentId;
    if (targetComponentId != undefined) {
      this.editor.connections.delete(
        targetComponentId,
        sourceConnectionData.componentId,
        sourceConnectionData.pointId
      );
    }
  }

  get name() {
    return "ConnectionState";
  }

  handleMouseMove(event: MouseEvent) {
    const mousePosition = this.editor.getRelativeMousePosition(
      getMousePosition(event)
    );
    this.editor.line.set((lineData: LineData | undefined) => {
      if (lineData) {
        return {
          ...lineData,
          position: {
            ...lineData.position,
            end: mousePosition,
          },
        };
      }
      return undefined;
    });
  }

  handleMouseUp(_event: MouseEvent) {
    this.editor.components.hideConnectionAreas();
    this.editor.setUserSelect(true);
    this.editor.line.set(undefined);
    this.editor.setState(new WaitingState(this.editor));
  }
  finishConnection(
    componentId: number,
    pointPosition: Position,
    relativePointPosition: Position
  ) {
    this.editor.components.hideConnectionAreas();
    this.editor.setUserSelect(true);
    this.editor.line.set(undefined);

    this.editor.connections.add(
      this.sourceConnectionData,
      {
        componentId: componentId,
        pointPosition: pointPosition,
        relativePointPosition: relativePointPosition,
      },
      this.pointColor
    );
    this.editor.setState(new WaitingState(this.editor));
  }
}
