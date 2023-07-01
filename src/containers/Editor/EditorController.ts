import { SetStoreFunction, Store } from "solid-js/store";
import { EditorStore } from "./types";

export default class EditorController {
  constructor(
    private editorStore: Store<EditorStore>,
    private setEditorStore: SetStoreFunction<EditorStore>
  ) {}
}
