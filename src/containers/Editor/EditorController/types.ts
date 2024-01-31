import { Position } from "../shared/types";

export interface SourceConnectionData {
  componentId: number;
  pointId: number;
  pointPosition: Position;
  setTargetComponentId(componentId?: number): void;
}

export interface TargetConnectionData {
  componentId: number;
  pointPosition: Position;
  relativePointPosition: Position;
}
