import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface FromJSONContentHandlers {
  path?: InputHandlers;
  json?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface FromJSONContentData {
  path?: string;
  json?: string;
}

export interface FromJSONContentOutputs {
  idIfError?: number;
  nextComponentId?: number;
}

export interface FromJSONContentProps {
  outputs?: FromJSONContentOutputs;
  data?: FromJSONContentData;
  handlers?: FromJSONContentHandlers;
}
