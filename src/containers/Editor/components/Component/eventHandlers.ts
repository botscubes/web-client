export function getConnectionPointMouseDownHandler(
  fn: (sourceComponentId: number, sourceCommandId: number) => void,
  componentId?: number,
  commandId?: number
) {
  if (componentId != undefined && commandId != undefined) {
    return () => {
      fn(componentId, commandId);
    };
  }
  return undefined;
}
