import { Position } from "../../shared/types";

export interface ComponentData {
  id: number;
  position: Position;
  selected: boolean;
}

export interface ComponentProps {
  component: ComponentData;
  deleteComponent: (id: number) => void;
  selectComponent: (id: number) => void;
  addSelectedComponent: (id: number) => void;
}
