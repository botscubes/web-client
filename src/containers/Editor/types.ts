import { ComponentData } from "./components/Component";

export interface EditorStore {
  components: Record<number, ComponentData>;
}

export enum EditorState {
  NONE,
  MOVING_COMPONENT,
  COMPONENT_SELECTED,
}
