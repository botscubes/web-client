import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface ConditionContentHandlers {
  expression?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface ConditionContentData {
  idIfFalse?: number;
}

export interface ConditionContentProps {
  data?: ConditionContentData;
  handlers?: ConditionContentHandlers;
}
