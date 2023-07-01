import { ComponentProps } from "./components/Component";

export interface EditorStore {
  components: Record<number, ComponentProps>;
}
