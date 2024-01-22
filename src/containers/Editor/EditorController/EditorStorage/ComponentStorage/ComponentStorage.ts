import { SetStoreFunction, Store } from "solid-js/store";
import { EditorData } from "~/containers/Editor/types";
import ComponentStore from "./ComponentStore";
import { Position } from "~/containers/Editor/shared/types";
import { JSX } from "solid-js";
import { ComponentData } from "~/containers/Editor/components/Component";

export default class ComponentStorage {
  private _components: ComponentStore;

  constructor(
    componentStore: [
      Store<Record<number, ComponentData>>,
      SetStoreFunction<Record<number, ComponentData>>,
    ]
  ) {
    this._components = new ComponentStore(...componentStore);
  }

  get() {
    return this._components.get();
  }

  add(content: () => JSX.Element): number {
    return this._components.add(content);
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
