import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface ButtonContentHandlers {
  expression?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface ButtonContentData {
  text?: string;
}

export interface ButtonContentOutputs {
  idIfFalse?: number;
  idIfError?: number;
  nextComponentId?: number;
}

export interface ButtonContentProps {
  outputs?: ButtonContentOutputs;
  data?: ButtonContentData;
  handlers?: ButtonContentHandlers;
}
