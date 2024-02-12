import { SetStoreFunction, Store } from "solid-js/store";
import SelectedComponents from "./SelectedComponents";
import { ComponentStorage } from "./EditorStorage/ComponentStorage";
import EditorController from ".";
import WaitingState from "./states/WaitingState";
import { Position } from "../shared/types";
import ComponentMoveState from "./states/ComponentMoveState";
import Logger from "~/logging/Logger";
import { ExtendedComponentData } from "./EditorStorage/ComponentStorage/types";
import {
  SpecificComponent,
  SpecificComponentCreator,
} from "./SpecificComponent";
import ComponentStore from "./EditorStorage/ComponentStorage/ComponentStore";
import { ConnectionPointData } from "../components/ConnectionPoint/types";

export default class ComponentController {
  private selectedComponents = new SelectedComponents();
  constructor(
    private editor: EditorController,
    private components: ComponentStore,
    private logger: Logger
  ) {}

  component(id: number) {
    return this.components.component(id);
  }
  get() {
    return this.components.get();
  }
  async create(position: Position, creator: SpecificComponentCreator) {
    this.deselectAll();

    const [data, error] = await this.editor.httpRequest(() =>
      this.editor.client.addComponent({
        type: creator.type,
        position: position,
      })
    );
    if (error) {
      this.editor.error.set(error);
      return;
    }
    if (data) {
      const id = data.id;
      this.components.add(id, position, creator.create(id));
      this.components.select(id);
      this.selectedComponents.select(id);
    }
  }

  add(
    id: number,
    position: Position,
    component: SpecificComponent,
    connectonPoints: Record<string, ConnectionPointData> = {},
    abilityToDelete: boolean = true
  ) {
    this.components.add(
      id,
      position,
      component,
      connectonPoints,
      abilityToDelete
    );
  }

  async delete(id: number) {
    await this.editor.connections.deleteAllFromComponent(id);
    this.deselectAll();

    const [_, error] = await this.editor.httpRequest(() =>
      this.editor.client.deleteComponent(id)
    );
    if (error) {
      this.editor.error.set(error);
      return;
    }
    this.components.delete(id);
  }
  move(mousePosition: Position) {
    for (const [id, position] of this.selectedComponents.get()) {
      this.components.move(id, position, mousePosition);
      this.editor.connections.setLinesForComponent(id);
    }
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
  async completeMove() {
    for (let [id, _] of this.selectedComponents.get()) {
      const position = this.components.component(id).position;
      const [_, error] = await this.editor.httpRequest(() =>
        this.editor.client.setComponentPosition(id, position)
      );
      if (error) {
        this.editor.error.set(error);
        return;
      }
    }
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
}
