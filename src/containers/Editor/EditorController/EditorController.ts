import { Store } from "solid-js/store";
import EditorStorage from "./EditorStorage";
import { EditorData } from "../types";
import { Position } from "../shared/types";
import type { EditorState } from "./EditorState";
import WaitingState from "./states/WaitingState";

export default class EditorController {
  private readonly zoomSize = 0.05;
  private editorState: EditorState = new WaitingState(this);
  constructor(private editorStorage: EditorStorage) {}
  getEditorData(): Store<EditorData> {
    return this.editorStorage.getEditorData();
  }
  addComponent() {
    this.editorStorage.addComponent();
  }
  deleteComponent(id: number) {
    this.editorStorage.deleteComponent(id);
  }

  handleMouseDown(event: MouseEvent) {
    this.editorState.handleMouseDown(event);
  }
  handleMouseMove(event: MouseEvent) {
    this.editorState.handleMouseMove(event);
  }
  handleMouseUp(event: MouseEvent) {
    this.editorState.handleMouseUp(event);
  }

  getMousePosition(event: MouseEvent, scale: number): Position {
    const editor: HTMLElement = event.currentTarget as HTMLElement;
    const rect: DOMRect = editor.getBoundingClientRect();
    return {
      x: Math.round(editor.scrollLeft + event.clientX - rect.left) / scale,
      y: Math.round(editor.scrollTop + event.clientY - rect.top) / scale,
    };
  }
}
