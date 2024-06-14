import { LinePosition } from "~/containers/Editor/components/Line";
import LineStore from "./EditorStorage/LineStore";
import { SourceConnectionData, TargetConnectionData } from "./types";
import EditorController from ".";
import ComponentStore from "./EditorStorage/ComponentStorage/ComponentStore";
import { LineData } from "../types";

export default class ConnectionController {
  constructor(
    private editor: EditorController,
    private lines: LineStore,
    private components: ComponentStore
  ) {}

  async add(
    sourceConnectionData: SourceConnectionData,
    targetConnectionData: TargetConnectionData,
    lineColor: string
  ) {
    const [_, error] = await this.editor.httpRequest(() =>
      this.editor.client.setConnection({
        sourcePointName: sourceConnectionData.pointId,
        sourceComponentId: sourceConnectionData.componentId,
        targetComponentId: targetConnectionData.componentId,
        relativePointPosition: targetConnectionData.relativePointPosition,
      })
    );
    if (error) {
      this.editor.error.set(error);
      return;
    }

    this.lines.set(
      sourceConnectionData.componentId,
      sourceConnectionData.pointId,
      {
        color: lineColor,
        position: {
          start: sourceConnectionData.pointPosition,
          end: targetConnectionData.pointPosition,
        },
      }
    );
    this.components
      .component(sourceConnectionData.componentId)
      .controller.setTargetComponentId(
        sourceConnectionData.pointId,
        targetConnectionData.componentId
      );

    this.components.addConnectionPoint(
      targetConnectionData.componentId,
      sourceConnectionData.componentId,
      sourceConnectionData.pointId,
      targetConnectionData.relativePointPosition
    );
  }

  async delete(
    targetComponentId: number,
    sourceComponentId: number,
    sourcePointId: string
  ) {
    this.lines.delete(sourceComponentId, sourcePointId);
    this.components
      .component(sourceComponentId)
      .controller.setTargetComponentId(sourcePointId, undefined);

    const [_, error] = await this.editor.httpRequest(() =>
      this.editor.client.deleteConnection({
        sourcePointName: sourcePointId,
        sourceComponentId: sourceComponentId,
      })
    );
    if (error) {
      this.editor.error.set(error);
      return;
    }

    this.components.deleteConnectionPoint(
      targetComponentId,
      sourceComponentId,
      sourcePointId
    );
  }

  getLine(componentId: number, pointId: string): LineData {
    return this.lines.get(componentId, pointId);
  }
  getLinePosition(componentId: number, pointId: string): LinePosition {
    return this.lines.get(componentId, pointId).position;
  }

  async deleteAllFromComponent(componentId: number) {
    const component = this.components.get()[componentId];
    if (component) {
      const points = component.controller.getOutputPoints();
      for (const point of points) {
        if (point.targetComponentId != undefined) {
          await this.delete(point.targetComponentId, componentId, point.id);
        }
      }
      for (const point of Object.values(component.connectionPoints)) {
        if (point.componentId != undefined && point.pointId != undefined) {
          await this.delete(componentId, point.componentId, point.pointId);
        }
      }
    }
  }

  setLinesForComponent(componentId: number) {
    const component = this.components.component(componentId);

    for (const point of Object.values(component.connectionPoints)) {
      if (point.componentId != undefined && point.pointId != undefined) {
        const line = this.lines.get(point.componentId, point.pointId);
        this.lines.set(point.componentId, point.pointId, {
          ...line,
          position: {
            ...line.position,
            end: this.editor.getRelativeMousePosition(
              point.getClientPosition?.() ?? { x: 0, y: 0 }
            ),
          },
        });
      }
    }
    const points = component.controller.getOutputPoints();
    for (const point of points) {
      if (point.targetComponentId != undefined) {
        const line = this.lines.get(componentId, point.id);
        this.lines.set(componentId, point.id, {
          ...line,
          position: {
            ...line.position,
            start: this.editor.getRelativeMousePosition(
              point.getClientPosition()
            ),
          },
        });
      }
    }
  }

  addLinesBetweenComponents() {
    for (const component of Object.values(this.components.get())) {
      for (const point of Object.values(component.connectionPoints)) {
        if (point.componentId != undefined && point.pointId != undefined) {
          const outputPoint = this.components
            .component(point.componentId)
            .controller.getOutputPoint(point.pointId);
          this.lines.set(point.componentId, point.pointId, {
            color: outputPoint.color,
            position: {
              start: this.editor.getRelativeMousePosition(
                outputPoint.getClientPosition()
              ),
              end: this.editor.getRelativeMousePosition(
                point.getClientPosition?.() ?? { x: 0, y: 0 }
              ),
            },
          });
        }
      }
    }
  }
}
