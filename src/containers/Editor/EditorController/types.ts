import { LinePosition } from "../components/Line";
import { Position } from "../shared/types";

export interface ConnectionData {
  sourceCommandId: number;
  sourceComponentId: number;
  commandConnectionPosition: Position;
  linePosition: LinePosition;
}
