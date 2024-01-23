import { SetStoreFunction, Store } from "solid-js/store";
import ComponentStore from "./ComponentStore";
import { Position } from "~/containers/Editor/shared/types";
import { ComponentData } from "~/containers/Editor/components/Component";
import { JSX } from "solid-js";
import { ExtendedComponentData } from "./types";

export default class ComponentStorage {
  private components: ComponentStore;

  constructor(
    componentStore: [
      Store<Record<number, ExtendedComponentData>>,
      SetStoreFunction<Record<number, ExtendedComponentData>>,
    ]
  ) {
    this.components = new ComponentStore(...componentStore);
  }

  get() {
    return this.components.get();
  }

  add(content: () => JSX.Element): number {
    return this.components.add(content);
  }

  clone(id: number): number {
    return this.components.clone(id);
  }

  delete(id: number) {
    return this.components.delete(id);
  }

  setPosition(id: number, position: Position) {
    this.components.setPosition(id, position);
  }

  move(selected: Array<[number, Position]>, mousePos: Position) {
    this.components.move(selected, mousePos);
  }

  select(id: number) {
    this.components.select(id);
  }

  deselect(id: number) {
    this.components.deselect(id);
  }
}
