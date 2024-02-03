import { Position } from "../../shared/types";

export interface ContentPointHandlers {
  onMouseDown: (pointId: string, clientPosition: Position) => void;
  onMount: (pointId: string, getPointClientPosition: () => Position) => void;
}
