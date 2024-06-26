import { JSX } from "solid-js";
import { Position } from "../../shared/types";
import { ConnectionPointData } from "../ConnectionPoint/types";

export interface ComponentData {
  id: number;
  position: Position;
  selected: boolean;
  connectionPoints: Record<string, ConnectionPointData>;
  connectionAreaVisible: boolean;
  abilityToDelete: boolean;
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
  finishConnection: (
    componentId: number,
    pointPosition: Position,
    relativePointPosition: Position
  ) => void;
  deleteConnection: (
    targetComponentId: number,
    sourceComponentId: number,
    sourcePointId: string,
    clientPointPositin: Position
  ) => void;
}
