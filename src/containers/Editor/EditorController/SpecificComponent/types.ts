import { JSX } from "solid-js";
import EditorController from "..";

export class OutputPoint {
  private _targetComponentId?: number = undefined;
  constructor(
    private _id: string,
    private onSetTargetComponentId: (componentId?: number) => void
  ) {}
  get id() {
    return this._id;
  }
  get targetComponentId(): number | undefined {
    return this._targetComponentId;
  }
  set targetComponentId(componentId: number | undefined) {
    this._targetComponentId = componentId;
    this.onSetTargetComponentId(componentId);
  }
}

export abstract class SpecificComponentController {
  constructor(
    private id: number,
    private outputPoints: Record<string, OutputPoint>
  ) {}
  getPoint(id: string): OutputPoint {
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
}

export interface SpecificComponentHandlers<T> {
  getHandlers(): T;
}

export interface SpecificComponent {
  get content(): () => JSX.Element;
  create(id: number): [SpecificComponentController, () => JSX.Element];
}

export enum OutputPointType {
  Error = "Error",
  Next = "Mext",
  Else = "Else",
}
