import { createSignal, createEffect, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { handleMouseMove } from "./events";
import { Component } from "./components/Component";
import EditorController from "./EditorController";
import { EditorState } from "./types";
import "./Editor.css";
import type { Position } from "./shared/types";
import { MouseButton } from "./shared/types";
import { Line, LinePosition } from "./components/Line";
import { ConnectionPointData } from "./components/Component/components/ConnectionPoint/types";

export default function Editor() {
  const zoomSize = 0.05;
  const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });

  const [linePos, setLinePos] = createSignal({
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
  });
  const [showLine, setShowLine] = createSignal(false);

  const [editorStore, setEditorStore] = createStore({
    components: {},
    componentStyle: {
      width: 100, //px
      connectionPointSize: 20, //px
      commandHeight: 40, //px
      commandIndent: 20,
    },
    lines: {},
  });
  const editorController: EditorController = new EditorController(
    editorStore,
    setEditorStore
  );
  const [editorState, setEditorState] = createSignal(EditorState.NONE);
  const [scale, setScale] = createSignal(1);
  let sourceComponentId: number | undefined = undefined;
  let sourceCommandId: number | undefined = undefined;
  let commandConnectionPosition: Position | undefined = undefined;

  const handleAddComponent = () => {
    editorController.deselectComponents();
    const id: number = editorController.addComponent();
    editorController.selectComponent(id);
    setEditorState(EditorState.COMPONENT_SELECTED);
  };
  const handleDeleteComponent = (id: number) => {
    editorController.deleteComponent(id);
  };
  const handleAddSelectedComponent = (id: number) => {
    if (editorController.componentIsSelected(id)) {
      editorController.deselectComponent(id);
    } else {
      editorController.selectComponent(id);
    }
    if (editorController.haveSelectedComponents()) {
      setEditorState(EditorState.COMPONENT_SELECTED);
    } else {
      setEditorState(EditorState.NONE);
    }
  };
  const handleSelectComponent = (id: number) => {
    if (editorState() != EditorState.CONNECTION) {
      if (!editorController.componentIsSelected(id)) {
        editorController.deselectComponents();
        editorController.selectComponent(id);
      }
      editorController.fixMouseShiftsRelativeToComponents(mousePos());

      setEditorState(EditorState.MOVING_COMPONENT);
      console.log("Editor: select component");
    }
  };
  const handleStartConnection = (
    componentId: number,
    commandId: number,
    connectionPosition: Position,
    relativeConnectionPosition: Position
  ) => {
    setLinePos({
      start: connectionPosition,
      end: mousePos(),
    });
    sourceCommandId = commandId;
    sourceComponentId = componentId;
    commandConnectionPosition = relativeConnectionPosition;
    editorController.showConnectionAreas(new Set([componentId]));
    setShowLine(true);
    setEditorState(EditorState.CONNECTION);
    console.log("Editor: start connection");
  };
  const handleFinishConnection = (
    componentId: number,
    conncetionPosition: Position,
    relativePointPosition: Position
  ) => {
    if (
      sourceComponentId != undefined &&
      sourceCommandId != undefined &&
      commandConnectionPosition != undefined
    ) {
      editorController.connectComponent(
        sourceComponentId,
        sourceCommandId,
        componentId,
        relativePointPosition,
        { start: linePos().start, end: conncetionPosition },
        commandConnectionPosition
      );

      editorController.hideConnectionAreas();
      sourceCommandId = undefined;
      sourceComponentId = undefined;
      commandConnectionPosition = undefined;
      setShowLine(false);
      console.log("Editor: finish connection");
    } else {
      console.error("Editor: error finish connection");
    }
  };
  const handleMouseUp = (event: MouseEvent) => {
    if (event.button == MouseButton.LEFT) {
      const target = event.target as HTMLElement;

      if (target.dataset.editorArea != undefined) {
        editorController.deselectComponents();
        setEditorState(EditorState.NONE);
        console.log("Editor: mouse up on Editor");
      }

      if (editorState() == EditorState.MOVING_COMPONENT) {
        setEditorState(EditorState.COMPONENT_SELECTED);
      } else if (editorState() == EditorState.CONNECTION) {
        sourceComponentId = undefined;
        sourceCommandId = undefined;
        editorController.hideConnectionAreas();
        setEditorState(EditorState.NONE);
      }

      setShowLine(false);
    }
  };
  const handleMouseDown = (event: MouseEvent) => {
    //setShowLine(true);
  };
  const handleMoveConnection = (
    commandId: number,
    connectionPostition: Position
  ) => {
    editorController.setLinePosition(commandId, (position) => ({
      ...position,
      end: connectionPostition,
    }));
    //console.log("Editor: move connection");
  };
  const handleMoveCommandConnection = (
    commandId: number,
    connectionPosition: Position
  ) => {
    editorController.setLinePosition(commandId, (position) => ({
      ...position,
      start: connectionPosition,
    }));
  };
  const handleZoomIn = () => {
    setScale((v) => (v < 4 ? v + zoomSize : v));
  };
  const handleZoomOut = () => {
    setScale((v) => (v > 0.3 ? v - zoomSize : v));
  };
  // TODO: move to mousemove event
  createEffect(() => {
    const position: Position = mousePos();
    if (editorState() == EditorState.MOVING_COMPONENT) {
      editorController.moveComponents(position);
    }
    if (showLine()) {
      setLinePos((v) => ({ ...v, end: position }));
    }
  });
  return (
    <div
      id="editor-area"
      data-editor-area
      onMouseMove={[handleMouseMove, [setMousePos, scale]]}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <div class="fixed-area">
        <div class="control-buttons">
          <button onClick={handleAddComponent} id="add-button">
            Add component
          </button>
          <button id="save-button">Get Bot</button>
          <button id="save-button">Start Bot</button>
          <button id="save-button">Stop Bot</button>
        </div>
        <div class="scale-buttons">
          <button onClick={handleZoomIn}> + </button>
          <button onClick={handleZoomOut}> - </button>
        </div>
      </div>
      <div class="scaling" style={{ transform: `scale(${scale()})` }}>
        <For each={Object.values(editorController.getEditorStore().components)}>
          {(component) => {
            console.log(component.id);
            const componentStyle =
              editorController.getEditorStore().componentStyle;
            return (
              <Component
                scale={scale()}
                componentData={component}
                componentStyle={componentStyle}
                deleteComponent={handleDeleteComponent}
                selectComponent={handleSelectComponent}
                addSelectedComponent={handleAddSelectedComponent}
                startConnection={handleStartConnection}
                finishConnection={handleFinishConnection}
                moveConnection={handleMoveConnection}
                moveCommandConnection={handleMoveCommandConnection}
              />
            );
          }}
        </For>
        <Show when={showLine()}>
          <Line position={linePos()} />
        </Show>
        <For each={Object.values(editorController.getEditorStore().lines)}>
          {(line) => <Line position={line} />}
        </For>
      </div>
    </div>
  );
}
