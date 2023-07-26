import { SetStoreFunction, Store } from "solid-js/store";
import { EditorData } from "../types";
import { Position } from "../shared/types";
import { ComponentData } from "../components/Component";
import cloneDeep from "lodash/cloneDeep";
import { LinePosition } from "../components/Line";

export default class EditorStorage {
  private id = 0;
  private commandId = 0;
  // key - id, value - mouse shift
  private selectedComponents = new Map<number, Position>();
  constructor(
    private editorData: Store<EditorData>,
    private setEditorData: SetStoreFunction<EditorData>
  ) {}
  getEditorData(): Store<EditorData> {
    return this.editorData;
  }
  addComponent(): number {
    const id: number = this.id;
    this.setEditorData("components", (components) => {
      return {
        ...components,
        [id]: {
          id: id,
          position: {
            x: 100,
            y: 100,
          },
          commands: {
            [this.commandId]: {
              id: this.commandId++,
              name: "test0",
            },
            [this.commandId]: {
              id: this.commandId++,
              name: "test1",
            },
          },
          selected: false,
          connectionPoints: {},
          connectionAreaVisible: false,
        },
      };
    });
    this.id++;
    return id;
  }
  setShowLine(value: boolean) {
    this.setEditorData("showLine", value);
  }
  cloneComponent(id: number): number {
    const component: ComponentData = cloneDeep(this.editorData.components[id]);
    const newId = this.id;
    component.id = newId;
    this.setEditorData("components", (components) => {
      return {
        ...components,
        component,
      };
    });
    this.id++;
    return newId;
  }
  setComponentPosition(id: number, position: Position) {
    this.setEditorData("components", id, (component) => {
      return {
        ...component,
        position: position,
      };
    });
  }
  deleteComponent(id: number) {
    this.selectedComponents.delete(id);
    this.setEditorData("components", (components) => {
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
    this.setEditorData("components", id, (component) => {
      return {
        ...component,
        selected: true,
      };
    });
    this.selectedComponents.set(id, { x: 0, y: 0 });
  }
  deselectComponent(id: number) {
    this.setEditorData("components", id, (component) => {
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
      const position = this.editorData.components[id].position;
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
  setNextComponentId(
    componentId: number,
    commandId: number,
    nextComponentID?: number
  ) {
    this.setEditorData(
      "components",
      componentId,
      "commands",
      commandId,
      (command) => ({
        ...command,
        nextComponentId: nextComponentID,
      })
    );
  }
  setConnectionAreaVisible(componentId: number, value: boolean) {
    this.setEditorData("components", componentId, (component) => ({
      ...component,
      connectionAreaVisible: value,
    }));
  }
  setLinePosition(
    fn: (position: LinePosition) => LinePosition,
    commandId?: number
  ) {
    if (commandId != undefined) {
      this.setEditorData("lines", commandId, (line) => fn(line));
    } else {
      this.setEditorData("line", (line) => fn(line));
    }
  }
  setCommandConnectionPosition(
    componentId: number,
    commandId: number,
    position: Position
  ) {
    this.setEditorData(
      "components",
      componentId,
      "commands",
      commandId,
      (command) => ({
        ...command,
        connectionPosition: position,
      })
    );
  }
  showConnectionAreas(excludedComponentId: Set<number> = new Set()) {
    for (const component of Object.values(this.editorData.components)) {
      if (!excludedComponentId.has(component.id)) {
        this.setConnectionAreaVisible(component.id, true);
      }
    }
  }
  hideConnectionAreas() {
    for (const component of Object.values(this.editorData.components)) {
      this.setConnectionAreaVisible(component.id, false);
    }
  }

  connectComponent(
    componentId: number,
    commandId: number,
    nextComponentId: number,
    relativePointPosition: Position,
    linePosition: LinePosition,
    commandConnectionPosition: Position
  ) {
    this.setNextComponentId(componentId, commandId, nextComponentId);
    this.setEditorData(
      "components",
      nextComponentId,
      "connectionPoints",
      (points) => ({
        ...points,
        [commandId]: {
          id: commandId,
          position: relativePointPosition,
        },
      })
    );
    this.setEditorData("lines", (lines) => ({
      ...lines,
      [commandId]: linePosition,
    }));
    this.setCommandConnectionPosition(
      componentId,
      commandId,
      commandConnectionPosition
    );
    console.log(this.editorData.components);
  }

  disconnectComponent(componentId: number, commandId: number) {
    this.setNextComponentId(componentId, commandId, undefined);
    this.setEditorData(
      "components",
      componentId,
      "connectionPoints",
      (points) => ({
        ...points,
        [commandId]: undefined,
      })
    );
    this.setEditorData("lines", (lines) => ({
      ...lines,
      [commandId]: undefined,
    }));
  }
}
