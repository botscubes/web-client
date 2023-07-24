import { ComponentData } from "./components/Component";
import { ComponentStyle } from "./components/Component/types";
import { LinePosition } from "./components/Line";

export interface EditorData {
  components: Record<number, ComponentData>;
  componentStyle: ComponentStyle;
  lines: Record<number, LinePosition>;
  line: LinePosition;
  showLine: boolean;
  scale: number;
}

export enum EditorState {
  NONE,
  COMPONENT_MOVEMENT,
  COMPONENT_SELECTED,
  CONNECTION,
  AREA_MOVEMENT,
}
