import { Position } from "../shared/types";

export interface SourceConnectionData {
  componentId: number;
  pointId: number;
  pointPosition: Position;
}

export interface TargetConnectionData {
  componentId: number;
  pointPosition: Position;
  relativePointPosition: Position;
}
