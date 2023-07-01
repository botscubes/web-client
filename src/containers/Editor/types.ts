import { ComponentData } from "./components/Component";

export interface EditorStore {
  components: Record<number, ComponentData>;
}
