import { JSX } from "solid-js";
import EditorController from "..";
import { Position } from "../../shared/types";
import { ContentPointHandlers } from "../../components/ComponentContent";

export class OutputPoint {
  private _targetComponentId?: number = undefined;
  constructor(
    private _id: string,
    private _getClientPosition: () => Position
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
      onMouseDown: (pointId: string, clientPosition: Position) => {
        this._editor.startConnection(this.getId(), pointId, clientPosition);
      },
      onMount: (pointId: string, getPointClientPosition: () => Position) => {
        this.outputPoints[pointId] = new OutputPoint(
          pointId,
          getPointClientPosition
        );
      },
    };
  }
  setHandlerWhenSettingTargetComponentId(
    pointId: number,
    handler: (componentId?: number) => void
  ) {
    this.handlers[pointId] = handler;
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
}

export interface SpecificComponentHandlers<T> {
  getHandlers(): T;
}

export type SpecificComponent = [
  SpecificComponentController,
  () => JSX.Element,
];

export interface SpecificComponentCreator {
  get content(): () => JSX.Element;
  create(id: number): SpecificComponent;
}

export enum OutputPointType {
  Error = "Error",
  Next = "Mext",
  Else = "Else",
}
