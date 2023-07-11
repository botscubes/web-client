import { Position } from "../../../../shared/types";

export interface ConnectionPointStyle {
  size: number;
  position: Position;
  color?: string;
}

export interface ConnectionPointProps {
  class?: string;
  connectionPointStyle: ConnectionPointStyle;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  //startConnection: (commandId: number) => void;
  //finishConnection: (componentId: number) => void;
}
