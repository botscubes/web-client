import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface ConditionContentHandlers {
  expression?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface ConditionContentData {
  expression?: string;
}

export interface ConditionContentOutputs {
  idIfFalse?: number;
  idIfError?: number;
  nextComponentId?: number;
}

export interface ConditionContentProps {
  outputs?: ConditionContentOutputs;
  data?: ConditionContentData;
  handlers?: ConditionContentHandlers;
}
