import { SetStoreFunction, Store } from "solid-js/store";
import { EditorStore } from "./types";
import { Position } from "./shared/types";
import { ComponentData } from "./components/Component";
import cloneDeep from "lodash/cloneDeep";

export default class EditorController {
  private id = 0;
  // key - id, value - mouse shift
  private selectedComponents = new Map<number, Position>();
  constructor(
    private editorStore: Store<EditorStore>,
    private setEditorStore: SetStoreFunction<EditorStore>
  ) {}
  getEditorStore(): Store<EditorStore> {
    return this.editorStore;
  }
  addComponent(): number {
    const id: number = this.id;
    this.setEditorStore("components", (components) => {
      return {
        ...components,
        [id]: {
          id: id,
          position: {
            x: 100,
            y: 100,
          },
          commands: {
            [0]: {
              id: 1,
              name: "test0",
            },
            [1]: {
              id: 1,
              name: "test1",
            },
          },
          selected: false,
          connectionPoints: {},
        },
      };
    });
    this.id++;
    return id;
  }
  cloneComponent(id: number): number {
    const component: ComponentData = cloneDeep(this.editorStore.components[id]);
    const newId = this.id;
    component.id = newId;
    this.setEditorStore("components", (components) => {
      return {
        ...components,
        component,
      };
    });
    this.id++;
    return newId;
  }
  setComponentPosition(id: number, position: Position) {
    this.setEditorStore("components", id, (component) => {
      return {
        ...component,
        position: position,
      };
    });
  }
  deleteComponent(id: number) {
    this.selectedComponents.delete(id);
    this.setEditorStore("components", (components) => {
      return { ...components, [id]: undefined };
    });
  }
  componentIsSelected(id: number): boolean {
    return this.selectedComponents.has(id);
  }
  haveSelectedComponents(): boolean {
    return this.selectedComponents.size != 0;
  }
  selectComponent(id: number) {
    this.setEditorStore("components", id, (component) => {
      return {
        ...component,
        selected: true,
      };
    });
    this.selectedComponents.set(id, { x: 0, y: 0 });
  }
  deselectComponent(id: number) {
    this.setEditorStore("components", id, (component) => {
      return {
        ...component,
        selected: false,
      };
    });
    this.selectedComponents.delete(id);
  }
  deselectComponents() {
    for (const id of this.selectedComponents.keys()) {
      this.deselectComponent(id);
    }
  }
  fixMouseShiftsRelativeToComponents(mousePos: Position) {
    for (const id of this.selectedComponents.keys()) {
      const position = this.editorStore.components[id].position;
      const shift: Position = {
        x: mousePos.x - position.x,
        y: mousePos.y - position.y,
      };
      this.selectedComponents.set(id, shift);
    }
  }
  moveComponents(mousePos: Position) {
    for (const [id, position] of this.selectedComponents) {
      this.setComponentPosition(id, {
        x: mousePos.x - position.x,
        y: mousePos.y - position.y,
      });
    }
  }
}
