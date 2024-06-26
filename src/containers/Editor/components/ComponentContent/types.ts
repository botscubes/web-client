import { Position } from "../../shared/types";

export interface ContentPointHandlers {
  onMouseDown: (
    pointId: string,
    clientPosition: Position,
    pointColor: string
  ) => void;
  onMount: (
    pointId: string,
    targetComponentId: number | undefined,
    getPointClientPosition: () => Position,
    pointColor: string
  ) => void;
}

export enum OutputPointType {
  Error = "idIfError",
  Next = "nextComponentId",
  Else = "idIfFalse",
}

export enum OutputPointColor {
  Error = "red",
  Next = "#07b12d",
  Else = "#ffb300",
}
