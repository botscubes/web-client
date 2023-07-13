import { Position } from "./shared/types";

export function handleMouseMove(
  [setMousePos, scale]: [(v: Position) => Position, () => number],
  event: MouseEvent
) {
  const editor: HTMLElement = event.currentTarget as HTMLElement;
  const rect: DOMRect = editor.getBoundingClientRect();
  setMousePos({
    x: Math.round(editor.scrollLeft + event.clientX - rect.left) / scale(),
    y: Math.round(editor.scrollTop + event.clientY - rect.top) / scale(),
  });
}
