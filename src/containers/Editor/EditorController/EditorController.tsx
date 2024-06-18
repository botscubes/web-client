import { BotStatus, EditorData } from "../types";
import { Position } from "../shared/types";
import type EditorState from "./EditorState";
import WaitingState from "./states/WaitingState";
import { getRelativeMousePosition } from "./halpers/mouse";
import ComponentController from "./ComponentController";
import Logger from "~/logging/Logger";
import AddingComponentState from "./states/AddingComponentState";
import {
  SpecificComponent,
  SpecificComponentCreator,
} from "./SpecificComponent";
import ConnectionController from "./ConnectionController";
import LineStore from "./EditorStorage/LineStore";
import ConnectionState from "./states/ConnectionState";
import { HTTPResponse, checkPromise } from "~/api/HTTPResponse";
import { EditorClient } from "./api/EditorClient";
import ComponentStore from "./EditorStorage/ComponentStorage/ComponentStore";
import { StartComponentController } from "./components/StartComponent";
import { APIComponentData, APIComponentType } from "./api/types";
import { StartContent } from "../components/ComponentContent/contents/StartContent";
import { ConditionComponentController } from "./components/ConditionComponent";
import { ConditionContent } from "../components/ComponentContent/contents/ConditionContent";
import { MessageContent } from "../components/ComponentContent/contents/MessageContent";
import { MessageComponentController } from "./components/MessageComponent";
import { TextInputComponentController } from "./components/TextInputComponent";
import { TextInputContent } from "../components/ComponentContent/contents/TextInputContent";
import { FormatComponentController } from "./components/FormatComponent";
import { FormatContent } from "../components/ComponentContent/contents/FormatContent";
import { ButtonComponentController } from "./components/ButtonComponent";
import { ButtonContent } from "../components/ComponentContent/contents/ButtonContent";
import { CodeComponentController } from "./components/CodeComponent";
import { CodeContent } from "../components/ComponentContent/contents/CodeContent";
import { ToIntComponentController } from "./components/ToIntComponent";
import { ToIntContent } from "../components/ComponentContent/contents/ToIntContent";
import { MoveContent } from "../components/ComponentContent/contents/MoveContent";
import { MoveComponentController } from "./components/MoveComponent";
import { PhotoComponentController } from "./components/PhotoComponent";
import { PhotoContent } from "../components/ComponentContent/contents/PhotoContent";
import { FromJSONComponentController } from "./components/FromJSONComponent";
import { FromJSONContent } from "../components/ComponentContent/contents/FromJSONContent";

export default class EditorController {
  private readonly zoomSize = 0.05;
  private editorState: EditorState = new WaitingState(this);
  private editorArea?: HTMLElement;
  private _components: ComponentController;
  private _connections: ConnectionController;

  constructor(
    private editor: EditorData,
    private _client: EditorClient,
    private logger: Logger
  ) {
    const componentStore = new ComponentStore(...editor.componentStore);
    this._components = new ComponentController(this, componentStore, logger);
    this._connections = new ConnectionController(
      this,
      new LineStore(...editor.lineStore),
      componentStore
    );
  }
  get client() {
    return this._client;
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

  get error() {
    return this.editor.error;
  }

  get editingContent() {
    return this.editor.editingContent;
  }

  async init() {
    this.getBotStatus();
    const [components, error] = await this.httpRequest(() =>
      this._client.getComponents()
    );
    if (error) {
      this.editor.error.set(error);
      return;
    }
    if (components) {
      for (const component of components) {
        let abitityToDelete = true;
        if (component.type == APIComponentType.Start) {
          abitityToDelete = false;
        }
        const specificComponent = this.createSpecificComponent(component);
        if (specificComponent) {
          this.components.add(
            component.id,
            component.position,
            specificComponent,
            {},
            abitityToDelete
          );
          for (const [_, value] of Object.entries(component.connectionPoints)) {
            this.components.addConnectionPoint(
              component.id,
              value.sourceComponentId,
              value.sourcePointName,
              value.relativePointPosition
            );
          }
        } else {
          this.editor.error.set(
            new Error(
              `This type of component does not exist: ${component.type}`
            )
          );
          return;
        }
      }
    }
    this.connections.addLinesBetweenComponents();
  }

  selectComponent(id: number, mousePosition: Position) {
    this.editorState.selectComponent(id, mousePosition);
  }

  setEditorArea(editorArea?: HTMLElement) {
    this.editorArea = editorArea;
  }

  startConnection(
    componentId: number,
    pointId: string,
    clientPosition: Position,
    pointColor: string
  ) {
    this.editorState.startConnection(
      componentId,
      pointId,
      this.getRelativeMousePosition(clientPosition),
      pointColor
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
          pointPosition: line.position.start,
        },
        this.getRelativeMousePosition(clientPosition),
        line.color
      )
    );
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

  startAddingComponent(event: MouseEvent, creator: SpecificComponentCreator) {
    this.setState(new AddingComponentState(this, event, creator));
  }
  zoomIn() {
    this.editor.scale.set((scale) => scale + this.zoomSize);
  }
  zoomOut() {
    this.editor.scale.set((scale) => scale - this.zoomSize);
  }
  private async getBotStatus() {
    const [status, error] = await this.httpRequest(() =>
      this._client.getBotStatus()
    );
    if (error) {
      this.editor.error.set(error);
      return;
    }
    if (status == 1) {
      this.editor.bot.status.set(BotStatus.Running);
    } else {
      this.editor.bot.status.set(BotStatus.Stopped);
    }
  }
  async stopBot() {
    const [_, error] = await this.httpRequest(() => this._client.stopBot());
    if (error) {
      this.editor.error.set(error);
      return;
    }
    this.editor.bot.status.set(BotStatus.Stopped);
  }

  async httpRequest<T>(
    request: () => Promise<HTTPResponse<T>>
  ): Promise<[T | undefined, Error | undefined]> {
    this.editor.setLoading(true);
    try {
      const response = await checkPromise(request(), this.logger);
      if (response.statusUnauthorized()) {
        this.editor.navigate("/signin");
      }
      response.check();
      return [response.data, undefined];
    } catch (e) {
      return [undefined, e as Error];
    } finally {
      this.editor.setLoading(false);
    }
  }
  createSpecificComponent(
    component: APIComponentData
  ): SpecificComponent | undefined {
    switch (component.type) {
      case APIComponentType.Start: {
        const controller = new StartComponentController(this, component.id);

        return [
          controller,
          () => (
            <StartContent
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.Condition: {
        const controller = new ConditionComponentController(this, component.id);

        return [
          controller,
          () => (
            <ConditionContent
              data={component.data}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.Message: {
        const controller = new MessageComponentController(this, component.id);

        return [
          controller,
          () => (
            <MessageContent
              data={component.data}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.Photo: {
        const controller = new PhotoComponentController(this, component.id);

        return [
          controller,
          () => (
            <PhotoContent
              data={{ ...component.data, path: component.path }}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.TextInput: {
        const controller = new TextInputComponentController(this, component.id);

        return [
          controller,
          () => (
            <TextInputContent
              data={component.data}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.Format: {
        const controller = new FormatComponentController(this, component.id);

        return [
          controller,
          () => (
            <FormatContent
              data={component.data}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.ToInt: {
        const controller = new ToIntComponentController(this, component.id);

        return [
          controller,
          () => (
            <ToIntContent
              data={{
                ...component.data,
                destination: component.path,
              }}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.Move: {
        const controller = new MoveComponentController(this, component.id);

        return [
          controller,
          () => (
            <MoveContent
              data={{
                ...component.data,
                destination: component.path,
              }}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.FromJSON: {
        const controller = new FromJSONComponentController(this, component.id);

        return [
          controller,
          () => (
            <FromJSONContent
              data={{
                ...component.data,
                path: component.path,
              }}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.Code: {
        const controller = new CodeComponentController(
          this,
          component.id,
          component.data.code
        );

        return [
          controller,
          () => (
            <CodeContent
              data={component.data}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
            />
          ),
        ];
      }
      case APIComponentType.Buttons: {
        const controller = new ButtonComponentController(
          this,
          component.id,
          component.data.buttons,
          component.outputs
        );

        return [
          controller,
          () => (
            <ButtonContent
              data={{
                text: component.data.text,
                buttons: controller.buttons(),
              }}
              outputs={component.outputs}
              handlers={controller.getHandlers()}
              abilityToAdd={controller.abilityToAdd()}
            />
          ),
        ];
      }
      default: {
        return undefined;
      }
    }
  }
}
