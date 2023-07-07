import { ComponentData } from "./components/Component";
import { ComponentStyle } from "./components/Component/types";

export interface EditorStore {
  components: Record<number, ComponentData>;
  componentStyle: ComponentStyle;
}

export enum EditorState {
  NONE,
  MOVING_COMPONENT,
  COMPONENT_SELECTED,
}
