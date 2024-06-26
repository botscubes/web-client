import EditorController from "..";
import { Position } from "../../shared/types";
import { ContentPointHandlers } from "../../components/ComponentContent";

export class OutputPoint {
  constructor(
    private _id: string,
    private _targetComponentId: number | undefined,
    private _getClientPosition: () => Position,
    private _color: string
  ) {}
  get id() {
    return this._id;
  }
  get targetComponentId(): number | undefined {
    return this._targetComponentId;
  }
  set targetComponentId(componentId: number | undefined) {
    this._targetComponentId = componentId;
  }
  getClientPosition(): Position {
    return this._getClientPosition();
  }
  get color(): string {
    return this._color;
  }
}

export abstract class SpecificComponentController {
  private outputPoints: Record<string, OutputPoint> = {};
  private handlers: Record<string, (componentId?: number) => void> = {};
  constructor(
    private _editor: EditorController,
    private id: number
  ) {}
  get editor() {
    return this._editor;
  }
  getOutputPoint(id: string): OutputPoint {
    return this.outputPoints[id];
  }
  setId(id: number) {
    this.id = id;
  }
  getId(): number {
    return this.id;
  }
  getOutputPoints(): Array<OutputPoint> {
    return Object.values(this.outputPoints);
  }
  getPointHandlers(): ContentPointHandlers {
    return {
      onMouseDown: (
        pointId: string,
        clientPosition: Position,
        pointColor: string
      ) => {
        this._editor.startConnection(
          this.getId(),
          pointId,
          clientPosition,
          pointColor
        );
      },
      onMount: (
        pointId: string,
        targetComponentId: number | undefined,
        getPointClientPosition: () => Position,
        pointColor: string
      ) => {
        this.outputPoints[pointId] = new OutputPoint(
          pointId,
          targetComponentId,
          getPointClientPosition,
          pointColor
        );
      },
    };
  }
  deleteOutputPoint(pointId: string) {
    const point = this.getOutputPoint(pointId);
    if (point && point.targetComponentId) {
      this.editor.connections.delete(
        point.targetComponentId,
        this.id,
        point.id
      );
    }
    this.editor.connections.setLinesForComponent(this.id);
    delete this.outputPoints[pointId];
  }
  bindHandlerToPoints(
    handlers: Record<number, (componentId?: number) => void>
  ) {
    for (const [pointId, handler] of Object.entries(handlers)) {
      this.handlers[pointId] = handler;
    }
  }
  setTargetComponentId(pointId: string, componentId?: number) {
    const outputPoint = this.outputPoints[pointId];
    if (outputPoint) {
      outputPoint.targetComponentId = componentId;
      const handler = this.handlers[pointId];
      if (handler) {
        handler(componentId);
      }
    }
  }
  async updateData(data: any) {
    const [_, error] = await this.editor.httpRequest(() =>
      this.editor.client.updateComponentData(this.getId(), data)
    );
    if (error) {
      this.editor.error.set(error);
    }
  }
  async updatePath(path: string) {
    const [_, error] = await this.editor.httpRequest(() =>
      this.editor.client.updateComponentPath(this.getId(), path)
    );
    if (error) {
      this.editor.error.set(error);
    }
  }
}
