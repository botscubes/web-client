import { Position } from "../../../../shared/types";

export interface ConnectionAreaData {
  visible: boolean;
}

export interface ConnectionAreaStyle {
  componentWidth: number;
  componentHeight: number;
  connectionPointSize: number;
  scale: number;
}

export interface ConnectionAreaProps {
  data: ConnectionAreaData;
  styles: ConnectionAreaStyle;
  handlers: {
    finishConnection: (pointPosition: Position) => void;
  };
}
