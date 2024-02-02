import { Position } from "../../shared/types";

export interface APIComponent {
  id: number;
  type: string;
  path: string;
  nextComponentId?: number;
  position: Position;
}
