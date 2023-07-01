import { SetStoreFunction, Store, produce } from "solid-js/store";
import { EditorStore } from "./types";

export default class EditorController {
  private id = 0;
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
        },
      };
    });
    this.id++;
  }
  deleteComponent(id: number) {
    this.setEditorStore(
      "components",
      produce((components) => {
        delete components[id];
      })
    );
  }
}
