import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface CodeContentHandlers {
  code?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface CodeContentData {}

export interface CodeContentOutputs {
  idIfError?: number;
  nextComponentId?: number;
}

export interface CodeContentProps {
  outputs?: CodeContentOutputs;
  data?: CodeContentData;
  handlers?: CodeContentHandlers;
}
