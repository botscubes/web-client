import { Position } from "../shared/types";

export interface ConnectionData {
  sourceCommandId: number;
  sourceComponentId: number;
  commandConnectionPosition: Position;
}
