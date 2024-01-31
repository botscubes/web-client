import { JSX } from "solid-js";
import EditorController from "..";

export interface OutputPoint {
  id: number;
  targetComponentId?: number;
}

export interface SpecificComponentController {
  setId(id: number): void;
  getOutputPoints(): Array<OutputPoint>;
}

export interface SpecificComponentHandlers<T> {
  getHandlers(): T;
}

export interface SpecificComponent {
  get content(): () => JSX.Element;
  create(id: number): [SpecificComponentController, () => JSX.Element];
}

export enum OutputPointType {
  Error = -1,
  Next = 0,
  Else = -2,
}
