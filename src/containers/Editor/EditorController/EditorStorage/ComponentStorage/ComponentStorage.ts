import { SetStoreFunction, Store } from "solid-js/store";
import { EditorData } from "~/containers/Editor/types";
import ComponentStore from "./ComponentStore";
import { Position } from "~/containers/Editor/shared/types";

export default class ComponentStorage {
  private _components: ComponentStore;

  constructor(
    editorData: Store<EditorData>,
    setEditorData: SetStoreFunction<EditorData>
  ) {
    this._components = new ComponentStore(editorData, setEditorData);
  }

  get() {
    return this._components.get();
  }

  add(): number {
    return this._components.add();
  }

  clone(id: number): number {
    return this._components.clone(id);
  }

  delete(id: number) {
    return this._components.delete(id);
  }

  setPosition(id: number, position: Position) {
    this._components.setPosition(id, position);
  }

  move(selected: Array<[number, Position]>, mousePos: Position) {
    this._components.move(selected, mousePos);
  }

  select(id: number) {
    this._components.select(id);
  }

  deselect(id: number) {
    this._components.deselect(id);
  }
}
