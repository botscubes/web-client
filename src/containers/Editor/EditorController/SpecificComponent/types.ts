import { JSX } from "solid-js";
import { FormatContentHandlers } from "../../components/ComponentContent/contents/FormatContent";
import { FormatController } from "../components/FormatController";

export type SpecificComponent = {
  controller: typeof FormatController;
  content: (handlers?: FormatContentHandlers) => JSX.Element;
};

export interface SpecificComponentController {}

export interface SpecificComponentHandlers<T> {
  getHandlers(): T;
}
