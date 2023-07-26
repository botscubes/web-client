import { Position } from "../../shared/types";

export function getRelativeMousePosition(
  htmlElement: HTMLElement,
  mousePosition: Position,
  scale: number
): Position {
  const rect: DOMRect = htmlElement.getBoundingClientRect();
  return {
    x: Math.round(htmlElement.scrollLeft + mousePosition.x - rect.left) / scale,
    y: Math.round(htmlElement.scrollTop + mousePosition.y - rect.top) / scale,
  };
}
export function getMousePosition(event: MouseEvent): Position {
  return {
    x: event.clientX,
    y: event.clientY,
  };
}
