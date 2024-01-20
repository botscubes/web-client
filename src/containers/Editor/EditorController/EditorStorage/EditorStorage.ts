import { SetStoreFunction, Store } from "solid-js/store";
import { EditorData } from "../../types";
import { Position } from "../../shared/types";
import { ComponentData } from "../../components/Component";
import cloneDeep from "lodash/cloneDeep";
import { LinePosition } from "../../components/Line";
import { ComponentStorage } from "./ComponentStorage";

export default class EditorStorage {
  private _components: ComponentStorage;
  // key - id, value - mouse shift
  constructor(
    private _editorData: Store<EditorData>,
    setEditorData: SetStoreFunction<EditorData>
  ) {
    this._components = new ComponentStorage(_editorData, setEditorData);
  }

  get components(): ComponentStorage {
    return this._components;
  }
  getEditorData(): Store<EditorData> {
    return this._editorData;
  }
  //  disconnectComponent(
  //    sourceComponentId: number,
  //    sourceCommandId: number,
  //    nextComponentId: number
  //  ): Position {
  //    this.setNextComponentId(sourceComponentId, sourceCommandId, undefined);
  //    this.setEditorData(
  //      "components",
  //      nextComponentId,
  //      "connectionPoints",
  //      (points) => ({
  //        ...points,
  //        [sourceCommandId]: undefined,
  //      })
  //    );
  //    const lineStartPosition = this.editorData.lines[sourceCommandId].start;
  //    this.setEditorData("lines", (lines) => ({
  //      ...lines,
  //      [sourceCommandId]: undefined,
  //    }));
  //    return lineStartPosition;
  //  }
}
