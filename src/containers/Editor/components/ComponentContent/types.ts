import { Position } from "../../shared/types";

export interface ContentPointHandlers {
  onMouseDown: (pointId: string, clientPosition: Position) => void;
  onMount: (pointId: string, getPointClientPosition: () => Position) => void;
}

export enum OutputPointType {
  Error = "Error",
  Next = "Mext",
  Else = "Else",
}