import { For, Show, createSignal, onMount } from "solid-js";
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
  handleZoomIn,
  handleZoomOut,
  getDeleteConnectionHandler,
} from "./eventHandlers";
import { Component } from "./components/Component";
import EditorController from "./EditorController";

import "./Editor.css";
import { useAppState } from "~/AppContext";
import { ComponentData } from "./components/Component";

export default function Editor() {
  //  const zoomSize = 0.05;
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
  const [componentStore, setComponentStore] = createStore<
    Record<number, ComponentData>
  >({});

  //const editorStore = createStore<EditorData>({
  //components: {},
  //    componentStyle: {
  //      width: 100, //px
  //      connectionPointSize: 20, //px
  //      commandHeight: 40, //px
  //      commandIndent: 20,
  //    },
  //    lines: {},
  //    line: {
  //      start: {
  //        x: 0,
  //        y: 0,
  //      },
  //      end: {
  //        x: 0,
  //        y: 0,
  //      },
  //    },
  //    showLine: false,
  //    scale: 1,
  //});
  const appState = useAppState();
  const editor: EditorController = new EditorController(
    {
      componentStore: [componentStore, setComponentStore],
    },
    appState.logger
  );
  //  const [editorState, setEditorState] = createSignal(EditorState.NONE);
  //  const [scale, setScale] = createSignal(1);
  //  let sourceComponentId: number | undefined = undefined;
  //  let sourceCommandId: number | undefined = undefined;
  //  let commandConnectionPosition: Position | undefined = undefined;
  const [showComponentSelection, setShowComponentSelection] =
    createSignal(false);
  return (
    <div
      id="editor-area"
      ref={(editorArea) => {
        editor.setEditorArea(editorArea);
      }}
      data-editor-area
      onMouseMove={[handleMouseMove, editor]}
      onMouseUp={[handleMouseUp, editor]}
      onMouseDown={[handleMouseDown, editor]}
    >
      <div class="fixed-area">
        {
          //<div class="control-buttons">
          //<button onClick={[handleAddComponent, editor]} id="add-button">
          // Add component
          //</button>
          //  <button id="save-button">Get Bot</button>
          //  <button id="save-button">Start Bot</button>
          //  <button id="save-button">Stop Bot</button>
          // </div>
        }
        <div class="scale-buttons events">
          <button onClick={handleZoomIn}> + </button>
          <button onClick={handleZoomOut}> - </button>
        </div>
        <div id="editor-menu-panel" class="events">
          <button id="save-button">Get Bot</button>
          <button id="save-button">Start Bot</button>
          <button id="save-button">Stop Bot</button>
        </div>
        <Show
          when={showComponentSelection()}
          fallback={
            <div>
              <button
                class="events show-panel-btn"
                onClick={() => setShowComponentSelection(true)}
              >
                {"->"}
              </button>
            </div>
          }
        >
          <div id="component-selection-panel" class="events">
            <button
              class="hide-panel-btn"
              onClick={() => {
                setShowComponentSelection(false);
              }}
            >
              {"<-"}
            </button>
            <div class="component">component</div>
          </div>
        </Show>
      </div>
      <div
        class="scaling"
        style={
          {
            //transform: `scale(${editor.getEditorData().scale})`,
          }
        }
      >
        <For each={Object.values(componentStore)}>
          {(component) => {
            console.log(component.id);
            const componentStyle = {
              width: 100, //px
              connectionPointSize: 20, //px
            };
            return (
              <Component
                scale={1} //editor.getEditorData().scale}
                componentData={component}
                componentStyle={componentStyle}
                deleteComponent={getDeleteComponentHandler(editor)}
                selectComponent={getSelectComponentHandler(editor)}
                addSelectedComponent={getAddSelectedComponentHandler(editor)}
                startConnection={getStartConnectionHandler(editor)}
                finishConnection={getFinishConnectionHandler(editor)}
                deleteConnection={getDeleteConnectionHandler(editor)}
                //moveConnection={handleMoveConnection}
                //moveCommandConnection={handleMoveCommandConnection}
              />
            );
          }}
        </For>
        {
          //<Show when={editor.getEditorData().showLine}>
          //  <Line position={editor.getEditorData().line} />
          //</Show>
          //<For each={Object.values(editor.getEditorData().lines)}>
          //  {(line) => <Line position={line} />}
          //</For>
        }
      </div>
    </div>
  );
}
