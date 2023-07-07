import { Position } from "../../../../shared/types";

export interface ConnectionPointData {
  size: number;
  position: Position;
}

export interface ConnectionPointProps {
  data: ConnectionPointData;
}
