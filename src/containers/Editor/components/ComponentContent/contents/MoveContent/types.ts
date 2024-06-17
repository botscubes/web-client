import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface MoveContentHandlers {
  source?: InputHandlers;
  destination?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface MoveContentData {
  source?: string;
  destination?: string;
}

export interface MoveContentOutputs {
  idIfError?: number;
  nextComponentId?: number;
}

export interface MoveContentProps {
  outputs?: MoveContentOutputs;
  data?: MoveContentData;
  handlers?: MoveContentHandlers;
}
