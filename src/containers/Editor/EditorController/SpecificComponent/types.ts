import { JSX } from "solid-js";
import { FormatContentHandlers } from "../../components/ComponentContent/contents/FormatContent";
import { FormatController } from "../components/FormatController";
import { ConditionContentHandlers } from "../../components/ComponentContent/contents/ConditionContent";
import { ConditionController } from "../components/ConditionController";

export interface SpecificComponentController {}

export interface SpecificComponentHandlers<T> {
  getHandlers(): T;
}

type Format = {
  controller: typeof FormatController;
  content: (handlers?: FormatContentHandlers) => JSX.Element;
};
type Condition = {
  controller: typeof ConditionController;
  content: (handlers?: ConditionContentHandlers) => JSX.Element;
};

export type SpecificComponent = Format | Condition;
