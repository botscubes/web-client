import { ComponentData } from "./components/Component";
import { ComponentStyle } from "./components/Component/types";
import { LinePosition } from "./components/Line";

export interface EditorStore {
  components: Record<number, ComponentData>;
  componentStyle: ComponentStyle;
  lines: Record<number, LinePosition>;
}

export enum EditorState {
  NONE,
  MOVING_COMPONENT,
  COMPONENT_SELECTED,
  CONNECTION,
}
