import { EditorData } from "../types";
import { Position } from "../shared/types";
import type EditorState from "./EditorState";
import WaitingState from "./states/WaitingState";
import { getRelativeMousePosition } from "./halpers/mouse";
import ComponentController from "./ComponentController";
import Logger from "~/logging/Logger";
import AddingComponentState from "./states/AddingComponentState";
import { SpecificComponent } from "./SpecificComponent";
import ConnectionController from "./ConnectionController";
import LineStorage from "./EditorStorage/LineStorage";
import { ComponentStorage } from "./EditorStorage/ComponentStorage";
import ConnectionState from "./states/ConnectionState";
import {
  HTTPResponse,
  checkPromise,
  checkResponsePromise,
} from "~/api/HTTPResponse";
import { useNavigate } from "@solidjs/router";
import { EditorClient } from "./api/EditorClient";

export default class EditorController {
  private readonly zoomSize = 0.05;
  private editorState: EditorState = new WaitingState(this);
  private editorArea?: HTMLElement;
  private _components: ComponentController;
  private _connections: ConnectionController;

  constructor(
    private editor: EditorData,
    private client: EditorClient,
    private logger: Logger
  ) {
    const componentStorage = new ComponentStorage(editor.componentStore);
    this._components = new ComponentController(this, componentStorage, logger);
    this._connections = new ConnectionController(
      this,
      new LineStorage(...editor.lineStore),
      componentStorage
    );
  }

  get connections() {
    return this._connections;
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

  async init() {
    const [data, ok] = await this.HTTPRequest(() =>
      this.client.getComponents()
    );
    console.log(data);
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
    pointId: string,
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
  deleteConnection(
    targetComponentId: number,
    sourceComponentId: number,
    sourcePointId: string,
    clientPosition: Position
  ) {
    const line = this.connections.getLine(sourceComponentId, sourcePointId);

    this.connections.delete(
      targetComponentId,
      sourceComponentId,
      sourcePointId
    );

    this.setState(
      new ConnectionState(
        this,
        {
          componentId: sourceComponentId,
          pointId: sourcePointId,
          pointPosition: line.start,
        },
        this.getRelativeMousePosition(clientPosition)
      )
    );
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
  async HTTPRequest<T>(
    request: () => Promise<HTTPResponse<T>>
  ): Promise<[T | undefined, boolean]> {
    this.editor.setLoading(true);
    try {
      const response = await checkPromise(request(), this.logger);
      if (response.statusUnauthorized()) {
        this.editor.navigate("/signin");
      }
      return [response.data, true];
    } catch (e) {
      return [undefined, false];
    } finally {
      this.editor.setLoading(false);
    }
  }
}
