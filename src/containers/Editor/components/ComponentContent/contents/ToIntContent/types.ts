import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface ToIntContentHandlers {
  source?: InputHandlers;
  destination?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface ToIntContentData {
  source?: string;
  destination?: string;
}

export interface ToIntContentOutputs {
  idIfError?: number;
  nextComponentId?: number;
}

export interface ToIntContentProps {
  outputs?: ToIntContentOutputs;
  data?: ToIntContentData;
  handlers?: ToIntContentHandlers;
}
