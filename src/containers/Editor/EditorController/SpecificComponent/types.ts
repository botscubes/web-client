import { JSX } from "solid-js";
import EditorController from "..";

export interface SpecificComponentController {}

export interface SpecificComponentHandlers<T> {
  getHandlers(): T;
}

export interface SpecificComponent {
  get content(): () => JSX.Element;
  create(id: number): [SpecificComponentController, () => JSX.Element];
}
