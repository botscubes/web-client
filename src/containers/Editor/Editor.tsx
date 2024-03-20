import { For, JSX, Show, createEffect, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import {
  handleMouseMove,
  getDeleteComponentHandler,
  getAddSelectedComponentHandler,
  getSelectComponentHandler,
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
import {
  FormatContent,
  FormatContentHandlers,
} from "./components/ComponentContent/contents/FormatContent";
import { ExtendedComponentData } from "./EditorController/EditorStorage/ComponentStorage/types";
import { SpecificComponentCreator } from "./EditorController/SpecificComponent";
import {
  ConditionContent,
  ConditionContentHandlers,
} from "./components/ComponentContent/contents/ConditionContent";
import { FormatComponentCreator } from "./EditorController/components/FormatComponent";
import { ConditionComponentCreator } from "./EditorController/components/ConditionComponent";
import { Line, LinePosition } from "./components/Line";
import { EditorProps } from "./types";
import { EditorClient } from "./EditorController/api/EditorClient";
import { useNavigate } from "@solidjs/router";
import { MessageComponentCreator } from "./EditorController/components/MessageComponent";

export default function Editor(props: EditorProps) {
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
  const [line, setLine] = createSignal<LinePosition | undefined>(undefined);
  const [lines, setLines] = createStore<Record<string, LinePosition>>({});
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<Error | undefined>();
  const [errors, setErrors] = createSignal<Array<Error>>([]);
  createEffect(() => {
    if (error()) {
      const err = error() as Error;
      setErrors((errors) => [...errors, err]);

      setTimeout(() => {
        setErrors((errors) => errors.filter((error) => error != err));
      }, 5000);
    }
  });
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

  // eslint-disable-next-line solid/reactivity
  const logger = props.logger;

  const navigate = useNavigate();
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
      line: {
        set: setLine,
      },
      lineStore: [lines, setLines],
      setLoading: setLoading,
      navigate: navigate,
      error: {
        set: setError,
      },
    },
    // eslint-disable-next-line solid/reactivity
    new EditorClient(props.httpClient, props.token, props.botId, 1),
    logger
  );
  onMount(() => {
    editor.init();
  });

  //  const [editorState, setEditorState] = createSignal(EditorState.NONE);
  //  const [scale, setScale] = createSignal(1);
  //  let sourceComponentId: number | undefined = undefined;
  //  let sourceCommandId: number | undefined = undefined;
  //  let commandConnectionPosition: Position | undefined = undefined;
  const [showComponentSelection, setShowComponentSelection] =
    createSignal(false);
  const componentCreatorList: Array<SpecificComponentCreator> = [
    //new FormatComponentCreator(editor),
    new ConditionComponentCreator(editor),
    new MessageComponentCreator(editor),
  ];
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
        <div class="editor-errors">
          <For each={errors()}>
            {(error) => (
              <div class="editor-error">
                <div class="error">{error.message}</div>
              </div>
            )}
          </For>
        </div>
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

          <Show when={loading()}>loading...</Show>
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
              <For each={componentCreatorList}>
                {(creator) => (
                  <div
                    class="component reduce"
                    onMouseDown={(event: MouseEvent) => {
                      editor.startAddingComponent(event, creator);
                    }}
                  >
                    <div class="no-events">{creator.content()}</div>
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

        <Show when={line()}>
          <Line position={line()!} />
        </Show>
        <For each={Object.values(lines)}>
          {(line) => <Line position={line} />}
        </For>
      </div>
    </div>
  );
}
