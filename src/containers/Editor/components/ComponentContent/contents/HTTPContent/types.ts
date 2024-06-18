import { ContentPointHandlers } from "../..";

export interface HTTPContentHandlers {
  outputPoint: ContentPointHandlers;
  onEditClick: () => void;
}

export interface HTTPContentData {}

export interface HTTPContentOutputs {
  idIfError?: number;
  nextComponentId?: number;
}

export interface HTTPContentProps {
  outputs?: HTTPContentOutputs;
  data?: HTTPContentData;
  handlers?: HTTPContentHandlers;
}
