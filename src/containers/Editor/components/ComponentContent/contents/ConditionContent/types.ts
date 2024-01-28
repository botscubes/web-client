import { InputHandlers } from "../../../Input";

export interface ConditionContentHandlers {
  expression?: InputHandlers;
}

export interface ConditionContentProps {
  handlers?: ConditionContentHandlers;
}
