import { Position } from "~/containers/Editor/shared/types";

export interface ConnectionPointData {
  position?: Position;
  componentId?: number;
}

export interface ConnectionPointHandlers {
  onMouseDown?(event: MouseEvent): void;
  onMouseUp?(event: MouseEvent): void;
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
