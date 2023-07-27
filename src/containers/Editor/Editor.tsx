import { createSignal, createEffect, For, Show, onMount, on } from "solid-js";
import { createStore } from "solid-js/store";
import {
  handleMouseMove,
  handleAddComponent,
  getDeleteComponentHandler,
  getAddSelectedComponentHandler,
  getSelectComponentHandler,
  getStartConnectionHandler,
  getFinishConnectionHandler,
  handleMouseUp,
  handleMouseDown,
  handleMoveConnection,
  handleMoveCommandConnection,
  handleZoomIn,
  handleZoomOut,
} from "./eventHandlers";
import { Component } from "./components/Component";
import EditorController from "./EditorController";
import { EditorState } from "./types";
import type { Position } from "./shared/types";
import EditorStorage from "./EditorController/EditorStorage";
import { MouseButton } from "./shared/types";
import { Line, LinePosition } from "./components/Line";
import { ConnectionPointData } from "./components/Component/components/ConnectionPoint/types";

import "./Editor.css";

export default function Editor() {
  //  const zoomSize = 0.05;
  let editorArea: HTMLDivElement | undefined;
  //  let [fixedPosition, setFixedPosition] = createSignal({
  //    x: 0,
  //    y: 0,
  //  });
  //  let [fixedScrollPosition, setFixedScrollPosition] = createSignal({
  //    x: 0,
  //    y: 0,
  //  });
  // const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });

  //const [linePos, setLinePos] = createSignal({});
  // const [showLine, setShowLine] = createSignal(false);

  const [editorData, setEditorData] = createStore({
    components: {},
    componentStyle: {
      width: 100, //px
      connectionPointSize: 20, //px
      commandHeight: 40, //px
      commandIndent: 20,
    },
    lines: {},
    line: {
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 0,
        y: 0,
      },
    },
    showLine: false,
    scale: 1,
  });
  const editorController: EditorController = new EditorController(
    new EditorStorage(editorData, setEditorData)
  );
  onMount(() => {
    editorController.setEditorArea(editorArea);
  });
  //  const [editorState, setEditorState] = createSignal(EditorState.NONE);
  //  const [scale, setScale] = createSignal(1);
  //  let sourceComponentId: number | undefined = undefined;
  //  let sourceCommandId: number | undefined = undefined;
  //  let commandConnectionPosition: Position | undefined = undefined;

  return (
    <div
      id="editor-area"
      ref={editorArea}
      data-editor-area
      onMouseMove={[handleMouseMove, editorController]}
      onMouseUp={[handleMouseUp, editorController]}
      onMouseDown={[handleMouseDown, editorController]}
    >
      <div class="fixed-area">
        <div class="control-buttons">
          <button
            onClick={[handleAddComponent, editorController]}
            id="add-button"
          >
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
      <div
        class="scaling"
        style={{
          transform: `scale(${editorController.getEditorData().scale})`,
        }}
      >
        <For each={Object.values(editorController.getEditorData().components)}>
          {(component) => {
            console.log(component.id);
            const componentStyle =
              editorController.getEditorData().componentStyle;
            return (
              <Component
                scale={editorController.getEditorData().scale}
                componentData={component}
                componentStyle={componentStyle}
                deleteComponent={getDeleteComponentHandler(editorController)}
                selectComponent={getSelectComponentHandler(editorController)}
                addSelectedComponent={getAddSelectedComponentHandler(
                  editorController
                )}
                startConnection={getStartConnectionHandler(editorController)}
                finishConnection={getFinishConnectionHandler(editorController)}
                //moveConnection={handleMoveConnection}
                //moveCommandConnection={handleMoveCommandConnection}
              />
            );
          }}
        </For>
        <Show when={editorController.getEditorData().showLine}>
          <Line position={editorController.getEditorData().line} />
        </Show>
        <For each={Object.values(editorController.getEditorData().lines)}>
          {(line) => <Line position={line} />}
        </For>
      </div>
    </div>
  );
}
