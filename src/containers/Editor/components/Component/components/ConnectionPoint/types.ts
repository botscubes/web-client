import { Position } from "../../../../shared/types";

export interface ConnectionPointStyle {
  size: number;
  position: Position;
  color?: string;
}

export interface ConnectionPointProps {
  class?: string;
  connectionPointStyle: ConnectionPointStyle;
}
