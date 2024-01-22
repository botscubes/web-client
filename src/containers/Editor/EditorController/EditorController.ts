import { SetStoreFunction, Store } from "solid-js/store";
import EditorStorage from "./EditorStorage";
import { EditorData } from "../types";
import { Position } from "../shared/types";
import type EditorState from "./EditorState";
import WaitingState from "./states/WaitingState";
import ComponentMoveState from "./states/ComponentMoveState";
//import ComponentSelectedState from "./states/ComponentSelectedState";
import { getRelativeMousePosition } from "./halpers/mouse";
import ConnectionState from "./states/ConnectionState";
import { LinePosition } from "../components/Line";
import { ConnectionData } from "./types";
import SelectedComponents from "./SelectedComponents";
import ComponentController from "./ComponentController";
import Logger from "~/logging/Logger";

export default class EditorController {
  //private readonly zoomSize = 0.05;
  private editorState: EditorState = new WaitingState(this);
  private editorArea?: HTMLElement;
  private _components: ComponentController;

  constructor(
    private _editor: EditorData,
    private _logger: Logger
  ) {
    this._components = new ComponentController(
      this,
      _editor.componentStore,
      _logger
    );
  }

  get components() {
    return this._components;
  }
  get state() {
    return this.editorState;
  }

  selectComponent(id: number, mousePosition: Position) {
    this.editorState.selectComponent(id, mousePosition);
  }

  setEditorArea(editorArea?: HTMLElement) {
    this.editorArea = editorArea;
  }
  //  getEditorData(): Store<EditorData> {
  //    return this._editorData;
  //  }

  startConnection(
    componentId: number,
    commandId: number,
    connectionPosition: Position,
    relativeConnectionPosition: Position
  ) {
    this.editorState.startConnection(
      componentId,
      commandId,
      connectionPosition,
      relativeConnectionPosition
    );
  }
  finishConnection(
    componentId: number,
    connectionPosition: Position,
    relativePointPosition: Position
  ) {
    this.editorState.finishConnection(
      componentId,
      connectionPosition,
      relativePointPosition
    );
  }
  //  deleteConnection(sourceComponentId: number, sourceCommandId: number) {
  //    const linePosition = this.editorStorage.getLinePosition(sourceCommandId);
  //    const commandConnectionPosition: Position =
  //      this.editorStorage.getCommandConnectionPosition(
  //        sourceComponentId,
  //        sourceCommandId
  //      );
  //    this.setEditorState(
  //      new ConnectionState(this, {
  //        sourceComponentId: sourceComponentId,
  //        sourceCommandId: sourceCommandId,
  //        commandConnectionPosition: commandConnectionPosition,
  //        linePosition: linePosition,
  //      })
  //    );
  //  }
  handleMouseDown(event: MouseEvent) {
    this.editorState.handleMouseDown(event);
  }
  handleMouseMove(event: MouseEvent) {
    this.editorState.handleMouseMove(event);
  }
  handleMouseUp(event: MouseEvent) {
    this.editorState.handleMouseUp(event);
  }
  setState(state: EditorState) {
    this._logger.info("Editor: state changed to " + state.name);
    this.editorState = state;
  }
  // setShowLine(value: boolean) {
  //   this.editorStorage.setShowLine(value);
  // }
  // setLinePosition(
  //   fn: (position: LinePosition) => LinePosition,
  //   commandId?: number
  // ) {
  //   this.editorStorage.setLinePosition(fn, commandId);
  // }
  getRelativeMousePosition(mousePosition: Position): Position {
    let relativeMousePosition = { x: 0, y: 0 };
    if (this.editorArea) {
      relativeMousePosition = getRelativeMousePosition(
        this.editorArea,
        mousePosition,
        1 //this.getEditorData().scale
      );
    }
    return relativeMousePosition;
  }
  // getEditorStorage(): EditorStorage {
  //   return this.editorStorage;
  // }
}
