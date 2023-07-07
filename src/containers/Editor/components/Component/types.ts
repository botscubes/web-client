import { Position } from "../../shared/types";

export interface ComponentData {
  id: number;
  position: Position;
  selected: boolean;
}

export interface ComponentStyle {
  width: number;
  connectionPointSize: number;
}

export interface ComponentProps {
  component: ComponentData;
  componentStyle: ComponentStyle;
  deleteComponent: (id: number) => void;
  selectComponent: (id: number) => void;
  addSelectedComponent: (id: number) => void;
}
