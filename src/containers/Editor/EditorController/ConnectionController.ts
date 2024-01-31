import { SetStoreFunction, Store } from "solid-js/store";
import { LinePosition } from "~/containers/Editor/components/Line";
import { Position } from "~/containers/Editor/shared/types";
import { EditorData } from "~/containers/Editor/types";
import { ComponentStorage } from "./EditorStorage/ComponentStorage";
import LineStorage from "./EditorStorage/LineStorage";
import ComponentController from "./ComponentController";
import { SourceConnectionData, TargetConnectionData } from "./types";

export default class ConnectionController {
  constructor(
    private lines: LineStorage,
    private components: ComponentStorage
  ) {}

  add(
    sourceConnectionData: SourceConnectionData,
    targetConnectionData: TargetConnectionData
  ) {
    this.lines.set(
      sourceConnectionData.componentId,
      sourceConnectionData.pointId,
      {
        start: sourceConnectionData.pointPosition,
        end: targetConnectionData.pointPosition,
      }
    );

    this.components.setNextComponentId(
      sourceConnectionData.componentId,
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
    sourcePointId: number
  ) {
    this.lines.delete(sourceComponentId, sourcePointId);
    this.components.deleteConnectionPoint(
      targetComponentId,
      sourceComponentId,
      sourcePointId
    );
    this.components.setNextComponentId(sourceComponentId, undefined);
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
  getLine(componentId: number, pointId: number): LinePosition {
    return this.lines.get(componentId, pointId);
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
  //
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
