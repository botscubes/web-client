import { Position } from "../../../../shared/types";

export interface CommandData {
  id: number;
  name: string;
  nextComponentId?: number;
  connectionPosition?: Position;
}

export interface CommandStyle {
  componentWidth: number;
  connectionPointSize: number;
  height: number;
  position: Position;
}

export interface CommandProps {
  commandData: CommandData;
  commandStyle: CommandStyle;
  startConnection: (commandId: number, connectionPosition: Position) => void;
}
