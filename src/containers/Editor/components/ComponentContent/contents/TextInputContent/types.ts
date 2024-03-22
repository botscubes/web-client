import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface TextInputContentHandlers {
  text?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface TextInputContentData {}

export interface TextInputContentOutputs {
  idIfError?: number;
  nextComponentId?: number;
}

export interface TextInputContentProps {
  outputs?: TextInputContentOutputs;
  data?: TextInputContentData;
  handlers?: TextInputContentHandlers;
}
