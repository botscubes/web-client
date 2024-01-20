import { cloneDeep } from "lodash";
import { SetStoreFunction, Store } from "solid-js/store";
import { ComponentData } from "~/containers/Editor/components/Component";
import { LinePosition } from "~/containers/Editor/components/Line";
import { Position } from "~/containers/Editor/shared/types";
import { EditorData } from "~/containers/Editor/types";

export default class ComponentStore {
  private id = 0;
  private commandId = 0;

  constructor(
    private editorData: Store<EditorData>,
    private setEditorData: SetStoreFunction<EditorData>
  ) {}

  get() {
    return this.editorData.components;
  }

  add(): number {
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

  clone(id: number): number {
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

  delete(id: number) {
    const component = this.editorData.components[id];

    if (component) {
      //this.selectedComponents.delete(id);
      //    for (const command of Object.values(component.commands)) {
      //       this.deleteConnection(id, command.id);
      //     }
      //     const points = cloneDeep(component.connectionPoints);
      //     for (const point of Object.values(points)) {
      //       if (point.componentId != undefined && point.commandId != undefined)
      //         this.deleteConnection(point.componentId, point.commandId);
      //     }
      this.setEditorData("components", (components) => {
        return { ...components, [id]: undefined };
      });
    }
  }
  setPosition(id: number, position: Position) {
    this.setEditorData("components", id, (component) => {
      return {
        ...component,
        position: position,
      };
    });
  }

  move(selected: Array<[number, Position]>, mousePos: Position) {
    for (const [id, position] of selected) {
      this.setPosition(id, {
        x: mousePos.x - position.x,
        y: mousePos.y - position.y,
      });
      //this.setConnectionLines(id);
    }
  }

  select(id: number) {
    this.setEditorData("components", id, (component) => {
      return {
        ...component,
        selected: true,
      };
    });
  }
  deselect(id: number) {
    this.setEditorData("components", id, (component) => {
      return {
        ...component,
        selected: false,
      };
    });
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
  getCommandConnectionPosition(
    componentId: number,
    commandId: number
  ): Position {
    const commandConnectionPosition =
      this.editorData.components[componentId].commands[commandId]
        .connectionPosition;
    if (commandConnectionPosition) {
      return commandConnectionPosition;
    }
    return { x: 0, y: 0 };
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
}
