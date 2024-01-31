import { Position } from "../../shared/types";

export function getConnectionPointMouseDownHandler(
  fn: (
    targetComponentId: number,
    sourceComponentId: number,
    sourceCommandId: number,
    clientMousePositin: Position,
    setTargetComponentId: (componentId?: number) => void
  ) => void,
  targetComponentId: number,
  componentId?: number,
  commandId?: number,
  setTargetComponentId?: (componentId?: number) => void
) {
  if (componentId != undefined && commandId != undefined) {
    return (clientPosition: Position) => {
      fn(
        targetComponentId,
        componentId,
        commandId,
        clientPosition,
        setTargetComponentId ? setTargetComponentId : () => {}
      );
    };
  }
  return undefined;
}
