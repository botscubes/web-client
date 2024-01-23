import { JSX } from "solid-js";
import { Position } from "../../shared/types";
import { ConnectionPointData } from "./components/ConnectionPoint/types";

export interface ComponentData {
  id: number;
  position: Position;
  selected: boolean;
  connectionPoints: Record<number, ConnectionPointData>;
  connectionAreaVisible: boolean;
}

export interface ComponentStyle {
  width: number;
  connectionPointSize: number;
}

export interface ComponentProps {
  componentData: ComponentData;
  componentStyle: ComponentStyle;
  children: JSX.Element;
  scale: number;
  deleteComponent: (id: number) => void;
  selectComponent: (id: number, mousePOsition: Position) => void;
  addSelectedComponent: (id: number) => void;
  startConnection: (
    componentId: number,
    commandId: number,
    connectionPosition: Position,
    relativeConnectionPosition: Position
  ) => void;
  finishConnection: (
    componentId: number,
    connectionPosition: Position,
    relativePointPosition: Position
  ) => void;
  deleteConnection: (
    sourceComponentId: number,
    sourceCommandId: number
  ) => void;
  //  moveConnection: (commandId: number, connectionPosition: Position) => void;
  //  moveCommandConnection: (
  //    commandId: number,
  //    connectionPosition: Position
  //  ) => void;
}
