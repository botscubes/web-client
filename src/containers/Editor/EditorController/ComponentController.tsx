import { SetStoreFunction, Store } from "solid-js/store";
import SelectedComponents from "./SelectedComponents";
import { ComponentStorage } from "./EditorStorage/ComponentStorage";
import EditorController from ".";
import WaitingState from "./states/WaitingState";
import { Position } from "../shared/types";
import ComponentMoveState from "./states/ComponentMoveState";
import Logger from "~/logging/Logger";
import { ExtendedComponentData } from "./EditorStorage/ComponentStorage/types";
import { JSX } from "solid-js";

export default class ComponentController {
  private selectedComponents = new SelectedComponents();
  private storage: ComponentStorage;
  constructor(
    private editor: EditorController,
    componentStore: [
      Store<Record<number, ExtendedComponentData>>,
      SetStoreFunction<Record<number, ExtendedComponentData>>,
    ],
    private logger: Logger
  ) {
    this.storage = new ComponentStorage(componentStore);
  }

  add(position: Position, content: () => JSX.Element) {
    this.deselectAll();
    const id: number = this.storage.add(position, content);
    this.storage.select(id);
    this.selectedComponents.select(id);
  }
  delete(id: number) {
    this.deselectAll();
    this.storage.delete(id);
  }
  move(mousePosition: Position) {
    this.storage.move(this.selectedComponents.get(), mousePosition);
  }
  select(id: number) {
    this.selectedComponents.select(id);
    this.storage.select(id);
  }
  deselect(id: number) {
    this.storage.deselect(id);
    this.selectedComponents.deselect(id);
  }

  deselectAll() {
    for (const id of this.selectedComponents.getKeys()) {
      this.storage.deselect(id);
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
      const component = this.storage.get()[id];
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
}
