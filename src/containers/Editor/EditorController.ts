import { Store } from "solid-js/store";
import EditorStorage from "./EditorStorage";
import { EditorData } from "./types";

export default class EditorController {
  private readonly zoomSize = 0.05;
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
}
