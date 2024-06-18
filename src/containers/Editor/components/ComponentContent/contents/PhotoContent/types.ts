import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface PhotoContentHandlers {
  path?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface PhotoContentData {
  path?: string;
}

export interface PhotoContentOutputs {
  idIfError?: number;
  nextComponentId?: number;
}

export interface PhotoContentProps {
  outputs?: PhotoContentOutputs;
  data?: PhotoContentData;
  handlers?: PhotoContentHandlers;
}
