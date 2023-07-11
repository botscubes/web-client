import { Position } from "../../../../shared/types";

export interface ConnectionAreaStyle {
  componentWidth: number;
  componentHeight: number;
  connectionPointSize: number;
}

export interface ConnectionAreaProps {
  connectionAreaStyle: ConnectionAreaStyle;
  finishConnection: (pointPosition: Position) => void;
}
