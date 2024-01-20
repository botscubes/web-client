import { SetStoreFunction, Store } from "solid-js/store";
import { EditorData } from "../../types";
import { LinePosition } from "../../components/Line";

export default class LineStore {
  constructor(
    private editorData: Store<EditorData>,
    private setEditorData: SetStoreFunction<EditorData>
  ) {}

  setPosition(
    fn: (position: LinePosition) => LinePosition,
    commandId?: number
  ) {
    if (commandId != undefined) {
      this.setEditorData("lines", commandId, (line) => fn(line));
    } else {
      this.setEditorData("line", (line) => fn(line));
    }
  }
  getPosition(commandId?: number): LinePosition {
    if (commandId != undefined) {
      return this.editorData.lines[commandId];
    }
    return this.editorData.line;
  }
  delete(commandId: number) {
    this.setEditorData("lines", (lines) => ({
      ...lines,
      [commandId]: undefined,
    }));
  }

  setShowLine(value: boolean) {
    this.setEditorData("showLine", value);
  }
}
