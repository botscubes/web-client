import { Position } from "../../../../shared/types";

export interface ConnectionPointStyle {
  size: number;
  position: Position;
}

export interface ConnectionPointProps {
  connectionPointStyle: ConnectionPointStyle;
}
