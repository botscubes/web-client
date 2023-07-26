import { Store } from "solid-js/store";
import EditorStorage from "./EditorStorage";
import { EditorData } from "../types";
import { Position } from "../shared/types";
import type EditorState from "./EditorState";
import WaitingState from "./states/WaitingState";
import ComponentMoveState from "./states/ComponentMoveState";
import ComponentSelectedState from "./states/ComponentSelectedState";
import { getRelativeMousePosition } from "./halpers/mouse";
import ConnectionState from "./states/ConnectionState";
import { LinePosition } from "../components/Line";
import { ConnectionData } from "./types";

export default class EditorController {
  private readonly zoomSize = 0.05;
  private editorState: EditorState = new WaitingState(this);
  private editorArea?: HTMLElement;
  private connectionData?: ConnectionData;

  constructor(private editorStorage: EditorStorage) {}

  setEditorArea(editorArea?: HTMLElement) {
    this.editorArea = editorArea;
  }
  getEditorData(): Store<EditorData> {
    return this.editorStorage.getEditorData();
  }

  addComponent() {
    this.deselectComponents();
    const id: number = this.editorStorage.addComponent();
    this.editorStorage.selectComponent(id);
    this.setEditorState(new ComponentSelectedState(this));
  }
  deleteComponent(id: number) {
    this.editorStorage.deleteComponent(id);
    this.editorStorage.deselectComponents();
  }
  moveComponents(mousePosition: Position) {
    this.editorStorage.moveComponents(mousePosition);
  }
  selectComponent(id: number, mousePosition: Position) {
    if (!this.editorStorage.componentIsSelected(id)) {
      this.editorStorage.deselectComponents();
      this.editorStorage.selectComponent(id);
    }

    this.editorStorage.fixMouseShiftsRelativeToComponents(
      this.getRelativeMousePosition(mousePosition)
    );

    this.setEditorState(new ComponentMoveState(this));
  }
  deselectComponents() {
    this.editorStorage.deselectComponents();
  }
  addSelectedComponent(id: number) {
    if (this.editorStorage.componentIsSelected(id)) {
      this.editorStorage.deselectComponent(id);
    } else {
      this.editorStorage.selectComponent(id);
    }
    if (this.editorStorage.haveSelectedComponents()) {
      this.setEditorState(new ComponentMoveState(this));
    } else {
      this.setEditorState(new WaitingState(this));
    }
  }
  startConnection(
    componentId: number,
    commandId: number,
    connectionPosition: Position,
    relativeConnectionPosition: Position
  ) {
    console.log("aaaa");
    this.setLinePosition(() => ({
      start: connectionPosition,
      end: connectionPosition,
    }));
    this.connectionData = {
      sourceCommandId: commandId,
      sourceComponentId: componentId,
      commandConnectionPosition: relativeConnectionPosition,
    };
    this.editorStorage.showConnectionAreas(new Set([componentId]));

    this.setShowLine(true);
    this.setEditorState(new ConnectionState(this));
  }
  finishConnection(
    componentId: number,
    conncetionPosition: Position,
    relativePointPosition: Position
  ) {
    //
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
  setEditorState(state: EditorState) {
    this.editorState = state;
  }
  setShowLine(value: boolean) {
    this.editorStorage.setShowLine(value);
  }
  setLinePosition(
    fn: (position: LinePosition) => LinePosition,
    commandId?: number
  ) {
    this.editorStorage.setLinePosition(fn, commandId);
  }
  getRelativeMousePosition(mousePosition: Position): Position {
    let relativeMousePosition = { x: 0, y: 0 };
    if (this.editorArea) {
      relativeMousePosition = getRelativeMousePosition(
        this.editorArea,
        mousePosition,
        this.getEditorData().scale
      );
    }
    return relativeMousePosition;
  }
}
