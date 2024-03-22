import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface FormatContentHandlers {
  formatString?: InputHandlers;
  outputPoint: ContentPointHandlers;
}

export interface FormatContentData {
  formatString?: string;
}

export interface FormatContentOutputs {
  idIfFalse?: number;
  idIfError?: number;
  nextComponentId?: number;
}

export interface FormatContentProps {
  outputs?: FormatContentOutputs;
  data?: FormatContentData;
  handlers?: FormatContentHandlers;
}
