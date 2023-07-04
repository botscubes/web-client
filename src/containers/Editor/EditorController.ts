import { SetStoreFunction, Store, produce } from "solid-js/store";
import { EditorStore } from "./types";
import { Position } from "./shared/types";

export default class EditorController {
  private id = 0;
  private selectedComponents = new Set<number>();
  constructor(
    private editorStore: Store<EditorStore>,
    private setEditorStore: SetStoreFunction<EditorStore>
  ) {}
  getEditorStore(): Store<EditorStore> {
    return this.editorStore;
  }
  addComponent() {
    this.setEditorStore("components", (components) => {
      return {
        ...components,
        [this.id]: {
          id: this.id,
          position: {
            x: 100,
            y: 100,
          },
          selected: false,
        },
      };
    });
    this.id++;
  }
  deleteComponent(id: number) {
    this.setEditorStore("components", (components) => {
      return { ...components, [id]: undefined };
    });
  }
  selectComponent(id: number) {
    this.setEditorStore("components", id, (component) => {
      return {
        ...component,
        selected: true,
      };
    });
    this.selectedComponents.add(id);
  }
  deselectComponent(id: number) {
    this.setEditorStore("components", id, (component) => {
      return {
        ...component,
        selected: false,
      };
    });
    this.selectedComponents.add(id);
  }
  deselectComponents() {
    for (const id of this.selectedComponents) {
      this.deselectComponent(id);
    }
    this.selectedComponents.clear();
  }
  moveComponents(mouse_pos: Position) {}
}
