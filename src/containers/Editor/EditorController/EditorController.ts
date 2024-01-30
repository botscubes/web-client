import { EditorData } from "../types";
import { Position } from "../shared/types";
import type EditorState from "./EditorState";
import WaitingState from "./states/WaitingState";
import { getRelativeMousePosition } from "./halpers/mouse";
import ComponentController from "./ComponentController";
import Logger from "~/logging/Logger";
import { JSX } from "solid-js";
import AddingComponentState from "./states/AddingComponentState";
import { SpecificComponent } from "./SpecificComponent";

export default class EditorController {
  private readonly zoomSize = 0.05;
  private editorState: EditorState = new WaitingState(this);
  private editorArea?: HTMLElement;
  private _components: ComponentController;

  constructor(
    private editor: EditorData,
    private logger: Logger
  ) {
    this._components = new ComponentController(
      this,
      editor.componentStore,
      logger
    );
  }

  get components() {
    return this._components;
  }
  get state() {
    return this.editorState;
  }
  get addingComponent() {
    return this.editor.addingComponent;
  }
  get area() {
    return this.editorArea;
  }
  get setUserSelect() {
    return this.editor.setUserSelect;
  }
  get line() {
    return this.editor.line;
  }

  selectComponent(id: number, mousePosition: Position) {
    this.editorState.selectComponent(id, mousePosition);
  }

  setEditorArea(editorArea?: HTMLElement) {
    this.editorArea = editorArea;
  }
  //  getEditorData(): Store<EditorData> {
  //    return this.editorData;
  //  }

  startConnection(
    componentId: number,
    pointId: number,
    clientPosition: Position
  ) {
    this.editorState.startConnection(
      componentId,
      pointId,
      this.getRelativeMousePosition(clientPosition)
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
    this.logger.info("Editor: state changed to " + state.name);
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
        this.editor.scale.get()
      );
    }
    return relativeMousePosition;
  }

  startAddingComponent(event: MouseEvent, component: SpecificComponent) {
    this.setState(new AddingComponentState(this, event, component));
  }
  // getEditorStorage(): EditorStorage {
  //   return this.editorStorage;
  // }

  zoomIn() {
    this.editor.scale.set((scale) => scale + this.zoomSize);
  }
  zoomOut() {
    this.editor.scale.set((scale) => scale - this.zoomSize);
  }
}
