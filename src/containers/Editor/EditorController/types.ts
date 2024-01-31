import { Position } from "../shared/types";

export interface SourceConnectionData {
  componentId: number;
  pointId: string;
  pointPosition: Position;
}

export interface TargetConnectionData {
  componentId: number;
  pointPosition: Position;
  relativePointPosition: Position;
}
