import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface ConditionContentHandlers {
  expression?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface ConditionContentData {}

export interface ConditionContentOutputs {
  idIfFalse?: number;
  idIfError?: number;
}

export interface ConditionContentProps {
  outputs?: ConditionContentOutputs;
  data?: ConditionContentData;
  handlers?: ConditionContentHandlers;
}
