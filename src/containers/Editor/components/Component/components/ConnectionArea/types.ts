import { Position } from "../../../../shared/types";

export interface ConnectionAreaData {
  visible: boolean;
}

export interface ConnectionAreaStyle {
  componentWidth: number;
  componentHeight: number;
  connectionPointSize: number;
}

export interface ConnectionAreaProps {
  connectionAreaData: ConnectionAreaData;
  connectionAreaStyle: ConnectionAreaStyle;
  finishConnection: (pointPosition: Position) => void;
}
