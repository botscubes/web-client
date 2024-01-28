import { JSX } from "solid-js";
import { FormatContentHandlers } from "../../components/ComponentContent/contents/FormatContent";
import { FormatController } from "../components/FormatController";

export interface SpecificComponentController {}

export interface SpecificComponentHandlers<T> {
  getHandlers(): T;
}

export type SpecificComponent = {
  controller: typeof FormatController;
  content: (handlers?: FormatContentHandlers) => JSX.Element;
};
