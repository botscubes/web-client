import { Position } from "../../shared/types";

export interface APIComponentData {
  id: number;
  type: string;
  path: string;
  nextComponentId?: number;
  position: Position;
}

export enum APIComponentType {
  Start = "start",
  Format = "format",
  Condition = "condition",
}
