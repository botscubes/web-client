import { SetStoreFunction, Store } from "solid-js/store";
import { EditorData } from "../../types";
import { LinePosition } from "../../components/Line";
import { Accessor, Setter } from "solid-js";

export default class LineStorage {
  constructor(
    private _lines: Store<Record<string, LinePosition>>,
    private setLines: SetStoreFunction<Record<string, LinePosition>>
  ) {}

  get(componentId: number, pointId: number): LinePosition {
    return this._lines[componentId.toString() + " " + pointId.toString()];
  }

  set(componentId: number, pointId: number, linePosition: LinePosition) {
    this.setLines((lines) => ({
      ...lines,
      [componentId.toString() + " " + pointId.toString()]: linePosition,
    }));
  }

  delete(componentId: number, pointId: number) {
    this.setLines((lines) => ({
      ...lines,
      [componentId.toString() + " " + pointId.toString()]: undefined,
    }));
  }
  //  setPosition(
  //    fn: (position: LinePosition) => LinePosition,
  //    commandId?: number
  //  ) {
  //    if (commandId != undefined) {
  //      this.setEditorData("lines", commandId, (line) => fn(line));
  //    } else {
  //      this.setEditorData("line", (line) => fn(line));
  //    }
  //  }
  //  getPosition(commandId?: number): LinePosition {
  //    if (commandId != undefined) {
  //      return this.editorData.lines[commandId];
  //    }
  //    return this.editorData.line;
  //  }
  //  delete(commandId: number) {
  //    this.setEditorData("lines", (lines) => ({
  //      ...lines,
  //      [commandId]: undefined,
  //    }));
  //  }
  //
  //  setShowLine(value: boolean) {
  //    this.setEditorData("showLine", value);
  //  }
}
