import { Position } from "../../shared/types";

export function getConnectionPointMouseDownHandler(
  fn: (
    targetComponentId: number,
    sourceComponentId: number,
    sourceCommandId: number,
    clientMousePositin: Position
  ) => void,
  targetComponentId: number,
  componentId?: number,
  commandId?: number
) {
  if (componentId != undefined && commandId != undefined) {
    return (clientPosition: Position) => {
      fn(targetComponentId, componentId, commandId, clientPosition);
    };
  }
  return undefined;
}
