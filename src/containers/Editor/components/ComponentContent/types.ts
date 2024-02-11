import { Position } from "../../shared/types";

export interface ContentPointHandlers {
  onMouseDown: (pointId: string, clientPosition: Position) => void;
  onMount: (
    pointId: string,
    targetComponentId: number | undefined,
    getPointClientPosition: () => Position
  ) => void;
}

export enum OutputPointType {
  Error = "IdIfError",
  Next = "nextComponentId",
  Else = "idIfFalse",
}
