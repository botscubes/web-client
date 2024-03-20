import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface MessageContentHandlers {
  text?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface MessageContentData {
  text?: string;
}

export interface MessageContentOutputs {
  idIfError?: number;
  nextComponentId?: number;
}

export interface MessageContentProps {
  outputs?: MessageContentOutputs;
  data?: MessageContentData;
  handlers?: MessageContentHandlers;
}
