import { Position } from "../../../../shared/types";

export interface ConnectionPointData {
  position: Position;
  id?: number;
}

export interface ConnectionPointStyle {
  size: number;
  color?: string;
}

export interface ConnectionPointProps {
  class?: string;
  connectionPointData: ConnectionPointData;
  connectionPointStyle: ConnectionPointStyle;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  //startConnection: (commandId: number) => void;
  //finishConnection: (componentId: number) => void;
}
