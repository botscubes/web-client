import { For, JSX, Show, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import {
  handleMouseMove,
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
import FormatContent from "./components/ComponentContent/contents/FormatContent";
import { ExtendedComponentData } from "./EditorController/EditorStorage/ComponentStorage/types";

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
    Record<number, ExtendedComponentData>
  >({});
  const [addingComponentContent, setAddingComponentContent] = createSignal<
    (() => JSX.Element) | undefined
  >(undefined);
  const [addingComponentPosition, setAddingComponentPosition] = createSignal({
    x: 0,
    y: 0,
  });
  const [userSelect, setUserSelect] = createSignal(true);
  const [scale, setScale] = createSignal(1);
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
      addingComponent: {
        setContent: setAddingComponentContent,
        setPosition: setAddingComponentPosition,
      },
      setUserSelect: setUserSelect,
      scale: {
        get: scale,
        set: setScale,
      },
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
  const componentList = [() => <FormatContent />];
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
      style={{
        "user-select": !userSelect() ? "none" : undefined,
      }}
    >
      <div class="fixed-area no-events">
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
          <button onClick={() => editor.zoomIn()}> + </button>
          <button onClick={() => editor.zoomOut()}> - </button>
        </div>
        <div id="editor-menu-panel" class="events">
          <button id="save-button">Get Bot</button>
          <button id="save-button">Start Bot</button>
          <button id="save-button">Stop Bot</button>
        </div>
        <Show
          when={showComponentSelection()}
          fallback={
            <button
              class="events show-panel-btn"
              onClick={() => setShowComponentSelection(true)}
            >
              {"->"}
            </button>
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
            <div class="component-list">
              <For each={componentList}>
                {(component) => (
                  <div
                    class="component reduce"
                    onMouseDown={(event: MouseEvent) => {
                      editor.startAddingComponent(event, component);
                    }}
                  >
                    <div class="no-events">{component()}</div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
        <Show when={addingComponentContent()}>
          <div
            class="scaling"
            style={{
              transform: `scale(${scale()})`,
            }}
          >
            <div
              class="component absolute adding-component"
              style={{
                top: addingComponentPosition().y + "px",
                left: addingComponentPosition().x + "px",
              }}
            >
              {addingComponentContent()?.()}
            </div>
          </div>
        </Show>
      </div>
      <div
        class="scaling"
        style={{
          transform: `scale(${scale()})`,
        }}
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
                scale={scale()} //editor.getEditorData().scale}
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
              >
                {component.content()}
              </Component>
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
