import { Position } from "~/containers/Editor/shared/types";
import { InputHandlers } from "../../../Input";

export interface ConditionContentHandlers {
  expression?: InputHandlers;
  points?: {
    error?: {
      onMouseDown?: (clientPosition: Position) => void;
      onMount?: (getPointClientPosition: () => Position) => void;
    };
  };
}

export interface ConditionContentProps {
  handlers?: ConditionContentHandlers;
}
