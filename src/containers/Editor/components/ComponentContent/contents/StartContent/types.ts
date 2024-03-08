import { Position } from "~/containers/Editor/shared/types";
import { InputHandlers } from "../../../Input";
import { ContentPointHandlers } from "../..";

export interface StartContentHandlers {
  outputPoint: ContentPointHandlers;
}

export interface StartContentData {}
export interface StartContentOutputs {
  nextComponentId?: number;
}

export interface StartContentProps {
  outputs?: StartContentOutputs;
  data?: StartContentData;
  handlers?: StartContentHandlers;
}
