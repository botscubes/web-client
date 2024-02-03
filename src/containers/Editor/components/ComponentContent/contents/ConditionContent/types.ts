import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface ConditionContentHandlers {
  expression?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface ConditionContentProps {
  handlers?: ConditionContentHandlers;
}
