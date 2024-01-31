import { Position } from "~/containers/Editor/shared/types";

export interface ConnectionPointData {
  position?: Position;
  componentId?: number;
  pointId?: string;
  getClientPosition: () => Position;
  setHandlerOnGetClientPosition(handler: () => Position): void;
}

export interface ConnectionPointHandlers {
  onMount?(getClientPosition: () => Position): void;
  onMouseDown?(clientPosition: Position): void;
  onMouseUp?(clientPosition: Position): void;
}

export interface ConnectionPointStyle {
  size?: number;
  color?: string;
  hiding?: boolean;
}

export interface ConnectionPointProps {
  class?: string;
  data?: ConnectionPointData;
  style?: ConnectionPointStyle;
  handlers?: ConnectionPointHandlers;
  tooltip?: string;
  //startConnection: (commandId: number) => void;
  //finishConnection: (componentId: number) => void;
}
