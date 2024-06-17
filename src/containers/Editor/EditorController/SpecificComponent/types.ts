import { JSX } from "solid-js";
import { Position } from "../../shared/types";
import { SpecificComponentController } from ".";
import { APIComponentType } from "../api/types";

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

export interface SpecificComponentHandlers<T> {
  getHandlers(): T;
}

export type SpecificComponent = [
  SpecificComponentController,
  () => JSX.Element,
];

export interface SpecificComponentCreator {
  get type(): APIComponentType;
  get content(): () => JSX.Element;
  create(id: number): SpecificComponent;
}
