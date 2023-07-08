import { Position } from "../../shared/types";
import { CommandData } from "./components/Command";

export interface ComponentData {
  id: number;
  position: Position;
  commands: Record<number, CommandData>;
  selected: boolean;
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
}
