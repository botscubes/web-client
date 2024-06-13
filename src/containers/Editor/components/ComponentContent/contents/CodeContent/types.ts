import { ContentPointHandlers } from "../..";

export interface CodeContentHandlers {
  outputPoint: ContentPointHandlers;
  onEditClick: () => void;
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
