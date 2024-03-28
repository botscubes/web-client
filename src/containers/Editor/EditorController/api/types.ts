import { Position } from "../../shared/types";

export interface APIComponentData {
  id: number;
  type: string;
  path: string;
  position: Position;
  connectionPoints: Record<string, APIPointData>;
  outputs: Record<string, number>;
  data: Record<string, any>;
}

export enum APIComponentType {
  Start = "start",
  Format = "format",
  Condition = "condition",
  Message = "message",
  TextInput = "textInput",
  Buttons = "buttons",
}

export interface APIAddComponentRequestData {
  type: APIComponentType;
  position: Position;
}

export interface APIAddComponentResponseData {
  id: number;
}

export interface APISetConnectionData extends APISourceComponentOutput {
  targetComponentId: number;
  relativePointPosition: Position;
}

export interface APISourceComponentOutput {
  sourceComponentId: number;
  sourcePointName: string;
}

export interface APIPointData extends APISourceComponentOutput {
  relativePointPosition: Position;
}

export interface APIButtonData {
  text: string;
}
