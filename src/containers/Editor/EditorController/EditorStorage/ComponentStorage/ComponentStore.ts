import { cloneDeep, create } from "lodash";
import { SetStoreFunction, Store } from "solid-js/store";
import { ComponentData } from "~/containers/Editor/components/Component";
import { Position } from "~/containers/Editor/shared/types";
import { ExtendedComponentData } from "./types";
import { SpecificComponent } from "../../SpecificComponent";

export default class ComponentStore {
  private id = 0;

  constructor(
    private componentStore: Store<Record<number, ExtendedComponentData>>,
    private setComponentStore: SetStoreFunction<
      Record<number, ExtendedComponentData>
    >
  ) {}

  get() {
    return this.componentStore;
  }

  add(position: Position, component: SpecificComponent): number {
    const id: number = this.id;
    const [controller, content] = component.create(id);
    this.setComponentStore(
      (
        components: Record<number, ExtendedComponentData>
      ): Record<number, ExtendedComponentData> => ({
        ...components,
        [id]: {
          id: id,
          position: position,
          selected: false,
          connectionPoints: {},
          connectionAreaVisible: false,
          controller: controller,
          content: content,
        },
      })
    );
    this.id++;
    return id;
  }

  clone(id: number): number {
    const component: ComponentData = cloneDeep(this.componentStore[id]);
    const newId = this.id;
    component.id = newId;
    this.setComponentStore((components) => {
      return {
        ...components,
        component,
      };
    });
    this.id++;
    return newId;
  }

  delete(id: number) {
    const component = this.componentStore[id];

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
      this.setComponentStore((components) => {
        return { ...components, [id]: undefined };
      });
    }
  }
  setPosition(id: number, position: Position) {
    this.setComponentStore(id, (component) => {
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
    this.setComponentStore(id, (component) => {
      return {
        ...component,
        selected: true,
      };
    });
  }
  deselect(id: number) {
    this.setComponentStore(id, (component) => {
      return {
        ...component,
        selected: false,
      };
    });
  }

  //  setNextComponentId(
  //    componentId: number,
  //    commandId: number,
  //    nextComponentID?: number
  //  ) {
  //    this.setEditorData(
  //      "components",
  //      componentId,
  //      "commands",
  //      commandId,
  //      (command) => ({
  //        ...command,
  //        nextComponentId: nextComponentID,
  //      })
  //    );
  //  }
  setConnectionAreaVisible(componentId: number, value: boolean) {
    this.setComponentStore(componentId, (component) => ({
      ...component,
      connectionAreaVisible: value,
    }));
  }

  //  setCommandConnectionPosition(
  //    componentId: number,
  //    commandId: number,
  //    position: Position
  //  ) {
  //    this.setEditorData(
  //      "components",
  //      componentId,
  //      "commands",
  //      commandId,
  //      (command) => ({
  //        ...command,
  //        connectionPosition: position,
  //      })
  //    );
  //  }
  // getCommandConnectionPosition(
  //   componentId: number,
  //   commandId: number
  // ): Position {
  //   const commandConnectionPosition =
  //     this.editorData.components[componentId].commands[commandId]
  //       .connectionPosition;
  //   if (commandConnectionPosition) {
  //     return commandConnectionPosition;
  //   }
  //   return { x: 0, y: 0 };
  // }
}
