import { Position } from "~/containers/Editor/shared/types";
import { InputHandlers } from "../../../Input";
import { ContentPointHandlers } from "../..";

export interface StartContentHandlers {
  outputPoint: ContentPointHandlers;
}

export interface StartContentProps {
  handlers?: StartContentHandlers;
}
