import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface PhotoContentHandlers {
  path?: InputHandlers;
  name?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface PhotoContentData {
  path?: string;
  name?: string;
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
