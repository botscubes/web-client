import { Position } from "../../shared/types";
import { CommandData } from "./components/Command";
import { ConnectionPointData } from "./components/ConnectionPoint/types";

export interface ComponentData {
  id: number;
  position: Position;
  commands: Record<number, CommandData>;
  selected: boolean;
  connectionPoints: Record<number, ConnectionPointData>;
  connectionAreaVisible: boolean;
}

export interface ComponentStyle {
  width: number;
  connectionPointSize: number;
  commandHeight: number;
  commandIndent: number;
}

export interface ComponentProps {
  componentData: ComponentData;
  componentStyle: ComponentStyle;
  deleteComponent: (id: number) => void;
  selectComponent: (id: number) => void;
  addSelectedComponent: (id: number) => void;
  startConnection: (
    componentId: number,
    commandId: number,
    connectionPosition: Position
  ) => void;
  finishConnection: (
    componentId: number,
    connectionPosition: Position,
    relativePointPosition: Position
  ) => void;
  moveConnection: (commandId: number, destinationPosition: Position) => void;
}
