import { SetStoreFunction, Store } from "solid-js/store";
import { LineData } from "../../types";
import { LinePosition } from "../../components/Line";

export default class LineStore {
  constructor(
    private _lines: Store<Record<string, LineData>>,
    private setLines: SetStoreFunction<Record<string, LineData>>
  ) {}

  get(componentId: number, pointId: string): LineData {
    return this._lines[componentId.toString() + " " + pointId.toString()];
  }

  set(componentId: number, pointId: string, lineData: LineData) {
    this.setLines((lines) => ({
      ...lines,
      [componentId.toString() + " " + pointId]: lineData,
    }));
  }

  delete(componentId: number, pointId: string) {
    this.setLines((lines) => ({
      ...lines,
      [componentId.toString() + " " + pointId]: undefined,
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
