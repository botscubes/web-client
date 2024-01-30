import { SetStoreFunction, Store } from "solid-js/store";
import SelectedComponents from "./SelectedComponents";
import { ComponentStorage } from "./EditorStorage/ComponentStorage";
import EditorController from ".";
import WaitingState from "./states/WaitingState";
import { Position } from "../shared/types";
import ComponentMoveState from "./states/ComponentMoveState";
import Logger from "~/logging/Logger";
import { ExtendedComponentData } from "./EditorStorage/ComponentStorage/types";
import { SpecificComponent } from "./SpecificComponent";

export default class ComponentController {
  private selectedComponents = new SelectedComponents();
  private components: ComponentStorage;
  constructor(
    private editor: EditorController,
    componentStore: [
      Store<Record<number, ExtendedComponentData>>,
      SetStoreFunction<Record<number, ExtendedComponentData>>,
    ],
    private logger: Logger
  ) {
    this.components = new ComponentStorage(componentStore);
  }

  add(position: Position, component: SpecificComponent) {
    this.deselectAll();

    const id: number = this.components.add(position, component);
    this.components.select(id);
    this.selectedComponents.select(id);
  }
  delete(id: number) {
    this.deselectAll();
    this.components.delete(id);
  }
  move(mousePosition: Position) {
    this.components.move(this.selectedComponents.get(), mousePosition);
  }
  select(id: number) {
    this.selectedComponents.select(id);
    this.components.select(id);
  }
  deselect(id: number) {
    this.components.deselect(id);
    this.selectedComponents.deselect(id);
  }

  deselectAll() {
    for (const id of this.selectedComponents.getKeys()) {
      this.components.deselect(id);
    }
    this.selectedComponents.deselectAll();
  }
  markAsSelected(id: number) {
    if (this.selectedComponents.isSelected(id)) {
      this.deselect(id);
    } else {
      this.select(id);
    }
    if (this.selectedComponents.haveSelected()) {
      this.editor.setState(new ComponentMoveState(this.editor));
    } else {
      this.editor.setState(new WaitingState(this.editor));
    }
  }
  isSelected(id: number): boolean {
    return this.selectedComponents.isSelected(id);
  }
  fixMouseShiftsRelative(mousePos: Position) {
    for (const id of this.selectedComponents.getKeys()) {
      const component = this.components.get()[id];
      if (component) {
        const position = component.position;
        const shift: Position = {
          x: mousePos.x - position.x,
          y: mousePos.y - position.y,
        };
        this.selectedComponents.set(id, shift);
      } else {
        this.logger.error(`Editor: component ${id} not found`);
      }
    }
  }
  showConnectionAreas(excludedComponentId: Set<number> = new Set()) {
    for (const component of Object.values(this.components.get())) {
      if (!excludedComponentId.has(component.id)) {
        this.components.setConnectionAreaVisible(component.id, true);
      }
    }
  }
  hideConnectionAreas() {
    for (const component of Object.values(this.components.get())) {
      this.components.setConnectionAreaVisible(component.id, false);
    }
  }
}
