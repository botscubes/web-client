import { Position } from "./shared/types";

export function handleMouseMove(
  setMousePos: (v: Position) => Position,
  event: MouseEvent
) {
  const editor: HTMLElement = event.currentTarget as HTMLElement;
  const rect: DOMRect = editor.getBoundingClientRect();
  setMousePos({
    x: Math.round(editor.scrollLeft + event.clientX - rect.left),
    y: Math.round(editor.scrollTop + event.clientY - rect.top),
  });
}
