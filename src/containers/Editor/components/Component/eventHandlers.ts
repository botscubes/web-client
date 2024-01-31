import { Position } from "../../shared/types";

export function getConnectionPointMouseDownHandler(
  fn: (
    targetComponentId: number,
    sourceComponentId: number,
    sourcePointId: string,
    clientMousePositin: Position
  ) => void,
  targetComponentId: number,
  componentId?: number,
  pointId?: string
) {
  if (componentId != undefined && pointId != undefined) {
    return (clientPosition: Position) => {
      fn(targetComponentId, componentId, pointId, clientPosition);
    };
  }
  return undefined;
}
