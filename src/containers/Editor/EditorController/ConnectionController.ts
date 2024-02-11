import { LinePosition } from "~/containers/Editor/components/Line";
import { ComponentStorage } from "./EditorStorage/ComponentStorage";
import LineStore from "./EditorStorage/LineStore";
import { SourceConnectionData, TargetConnectionData } from "./types";
import EditorController from ".";
import ComponentStore from "./EditorStorage/ComponentStorage/ComponentStore";

export default class ConnectionController {
  constructor(
    private editor: EditorController,
    private lines: LineStore,
    private components: ComponentStore
  ) {}

  async add(
    sourceConnectionData: SourceConnectionData,
    targetConnectionData: TargetConnectionData
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
        start: sourceConnectionData.pointPosition,
        end: targetConnectionData.pointPosition,
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

  delete(
    targetComponentId: number,
    sourceComponentId: number,
    sourcePointId: string
  ) {
    this.lines.delete(sourceComponentId, sourcePointId);
    this.components
      .component(sourceComponentId)
      .controller.setTargetComponentId(sourcePointId, undefined);

    this.components.deleteConnectionPoint(
      targetComponentId,
      sourceComponentId,
      sourcePointId
    );
    //  const linePosition = this.editorStorage.getLinePosition(sourceCommandId);
    //  const commandConnectionPosition: Position =
    //    this.editorStorage.getCommandConnectionPosition(
    //      sourceComponentId,
    //      sourceCommandId
    //    );
    //  this.setEditorState(
    //    new ConnectionState(this, {
    //      sourceComponentId: sourceComponentId,
    //      sourceCommandId: sourceCommandId,
    //      commandConnectionPosition: commandConnectionPosition,
    //      linePosition: linePosition,
    //    })
    //  );
  }

  getLine(componentId: number, pointId: string): LinePosition {
    return this.lines.get(componentId, pointId);
  }

  deleteAllFromComponent(componentId: number) {
    const component = this.components.get()[componentId];
    if (component) {
      const points = component.controller.getOutputPoints();
      for (const point of points) {
        if (point.targetComponentId != undefined) {
          this.delete(point.targetComponentId, componentId, point.id);
        }
      }
      for (const point of Object.values(component.connectionPoints)) {
        if (point.componentId != undefined && point.pointId != undefined) {
          this.delete(componentId, point.componentId, point.pointId);
        }
      }
    }
  }

  //  add(
  //    componentId: number,
  //    commandId: number,
  //    nextComponentId: number,
  //    relativePointPosition: Position,
  //    linePosition: LinePosition,
  //    commandConnectionPosition: Position
  //  ) {
  //    this.setNextComponentId(componentId, commandId, nextComponentId);
  //    this.setEditorData(
  //      "components",
  //      nextComponentId,
  //      "connectionPoints",
  //      (points) => ({
  //        ...points,
  //        [commandId]: {
  //          componentId: componentId,
  //          commandId: commandId,
  //          position: relativePointPosition,
  //        },
  //      })
  //    );
  //    this.setEditorData("lines", (lines) => ({
  //      ...lines,
  //      [commandId]: linePosition,
  //    }));
  //    this.setCommandConnectionPosition(
  //      componentId,
  //      commandId,
  //      commandConnectionPosition
  //    );
  //  }
  //
  //  deleteConnection(componentId: number, commandId: number) {
  //    this.deleteLine(commandId);
  //    const command = this.editorData.components[componentId].commands[commandId];
  //
  //    if (command && command.nextComponentId != undefined) {
  //      this.setEditorData(
  //        "components",
  //        command.nextComponentId,
  //        "connectionPoints",
  //        (connectionPoints) => ({
  //          ...connectionPoints,
  //          [command.id]: undefined,
  //        })
  //      );
  //    }
  //    this.setNextComponentId(componentId, commandId, undefined);
  //  }

  setLinesForComponent(componentId: number) {
    const component = this.components.component(componentId);

    for (const point of Object.values(component.connectionPoints)) {
      if (point.componentId != undefined && point.pointId != undefined) {
        const linePosition = this.lines.get(point.componentId, point.pointId);
        this.lines.set(point.componentId, point.pointId, {
          ...linePosition,
          end: this.editor.getRelativeMousePosition(point.getClientPosition()),
        });
      }
    }
    const points = component.controller.getOutputPoints();
    for (const point of points) {
      if (point.targetComponentId != undefined) {
        const linePosition = this.lines.get(componentId, point.id);
        this.lines.set(componentId, point.id, {
          ...linePosition,
          start: this.editor.getRelativeMousePosition(
            point.getClientPosition()
          ),
        });
      }
    }
  }
  //  setConnectionLines(componentId: number) {
  //    const component = this.editorData.components[componentId];
  //    if (component) {
  //      for (const point of Object.values(component.connectionPoints)) {
  //        if (point.commandId != undefined) {
  //          const pointPosition = {
  //            x:
  //              component.position.x +
  //              point.position.x +
  //              this.editorData.componentStyle.connectionPointSize / 2,
  //            y:
  //              component.position.y +
  //              point.position.y +
  //              this.editorData.componentStyle.connectionPointSize / 2,
  //          };
  //          this.setLinePosition(
  //            (position: LinePosition) => ({
  //              ...position,
  //              end: pointPosition,
  //            }),
  //            point.commandId
  //          );
  //        }
  //      }
  //      for (const command of Object.values(component.commands)) {
  //        if (
  //          command.nextComponentId != undefined &&
  //          command.connectionPosition
  //        ) {
  //          const commandPointPosition = {
  //            x: command.connectionPosition.x + component.position.x,
  //            y: command.connectionPosition.y + component.position.y,
  //          };
  //
  //          this.setLinePosition(
  //            (position: LinePosition) => ({
  //              ...position,
  //              start: commandPointPosition,
  //            }),
  //            command.id
  //          );
  //        }
  //      }
  //    }
  //  }
}
