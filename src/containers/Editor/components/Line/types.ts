import { Position } from "../../shared/types";

export interface LinePosition {
  start: Position;
  end: Position;
}
export interface LineProps {
  position: LinePosition;
  color: string;
}
