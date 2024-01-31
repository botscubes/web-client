import { SetStoreFunction, Store } from "solid-js/store";
import ComponentStore from "./ComponentStore";
import { Position } from "~/containers/Editor/shared/types";
import { ExtendedComponentData } from "./types";
import { SpecificComponent } from "../../SpecificComponent";

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

  add(position: Position, component: SpecificComponent): number {
    return this.components.add(position, component);
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
  setConnectionAreaVisible(id: number, value: boolean) {
    this.components.setConnectionAreaVisible(id, value);
  }

  setNextComponentId(componentId: number, nextComponentId?: number) {
    this.components.setNextComponentId(componentId, nextComponentId);
  }

  addConnectionPoint(
    componentId: number,
    sourceComponentId: number,
    sourcePointId: string,
    relativePointPosition: Position
  ) {
    this.components.addConnectionPoint(
      componentId,
      sourceComponentId,
      sourcePointId,
      relativePointPosition
    );
  }

  deleteConnectionPoint(
    componentId: number,
    sourceComponentId: number,
    sourcePointId: string
  ) {
    this.components.deleteConnectionPoint(
      componentId,
      sourceComponentId,
      sourcePointId
    );
  }
}
