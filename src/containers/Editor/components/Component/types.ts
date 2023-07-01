import { Position } from "../../shared/types";

export interface ComponentData {
  id: number;
  position: Position;
}

export interface ComponentProps {
  component: ComponentData;
  deleteComponent: (id: number) => void;
}
