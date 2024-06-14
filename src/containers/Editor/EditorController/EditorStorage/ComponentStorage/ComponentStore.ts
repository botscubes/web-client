import { SetStoreFunction, Store } from "solid-js/store";
import { Position } from "~/containers/Editor/shared/types";
import { ExtendedComponentData } from "./types";
import { SpecificComponent } from "../../SpecificComponent";
import { ConnectionPointData } from "~/containers/Editor/components/ConnectionPoint/types";

export default class ComponentStore {
  constructor(
    private componentStore: Store<Record<number, ExtendedComponentData>>,
    private setComponentStore: SetStoreFunction<
      Record<number, ExtendedComponentData>
    >
  ) {}

  get() {
    return this.componentStore;
  }
  component(id: number) {
    return this.componentStore[id];
  }

  add(
    id: number,
    position: Position,
    component: SpecificComponent,
    connectionPoints: Record<string, ConnectionPointData> = {},
    possibilityToDelete: boolean = true
  ) {
    const [controller, content] = component;
    this.setComponentStore(
      (
        components: Record<number, ExtendedComponentData>
      ): Record<number, ExtendedComponentData> => ({
        ...components,
        [id]: {
          id: id,
          position: position,
          selected: false,
          connectionPoints: connectionPoints,
          connectionAreaVisible: false,
          controller: controller,
          content: content,
          abilityToDelete: possibilityToDelete,
        },
      })
    );
  }

  delete(id: number) {
    const component = this.componentStore[id];

    if (component) {
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

  move(id: number, position: Position, mousePos: Position) {
    this.setPosition(id, {
      x: mousePos.x - position.x,
      y: mousePos.y - position.y,
    });
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

  setConnectionAreaVisible(componentId: number, value: boolean) {
    this.setComponentStore(componentId, (component) => ({
      ...component,
      connectionAreaVisible: value,
    }));
  }

  addConnectionPoint(
    componentId: number,
    sourceComponentId: number,
    sourcePointId: string,
    relativePointPosition: Position
  ) {
    this.setComponentStore(componentId, "connectionPoints", (points) => ({
      ...points,
      [sourceComponentId.toString() + " " + sourcePointId]: {
        componentId: sourceComponentId,
        pointId: sourcePointId,
        position: relativePointPosition,
        getClientPosition: () => ({ x: 0, y: 0 }),
        setHandlerOnGetClientPosition: (handler: () => Position) => {
          this.setComponentStore(
            componentId,
            "connectionPoints",
            sourceComponentId.toString() + " " + sourcePointId,
            (point) => ({
              ...point,
              getClientPosition: handler,
            })
          );
        },
      },
    }));
  }

  deleteConnectionPoint(
    componentId: number,
    sourceComponentId: number,
    sourcePointId: string
  ) {
    this.setComponentStore(componentId, "connectionPoints", (points) => ({
      ...points,
      [sourceComponentId.toString() + " " + sourcePointId]: undefined,
    }));
  }
}
