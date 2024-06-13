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
  getDeleteConnectionHandler,
} from "./eventHandlers";
import { Component } from "./components/Component";
import EditorController from "./EditorController";

import "./Editor.css";

import { ExtendedComponentData } from "./EditorController/EditorStorage/ComponentStorage/types";
import { SpecificComponentCreator } from "./EditorController/SpecificComponent";

import { ConditionComponentCreator } from "./EditorController/components/ConditionComponent";
import { Line, LinePosition } from "./components/Line";
import { BotStatus, EditorProps, LineData } from "./types";
import { EditorClient } from "./EditorController/api/EditorClient";
import { A, useNavigate } from "@solidjs/router";
import { MessageComponentCreator } from "./EditorController/components/MessageComponent";
import { TextInputComponentCreator } from "./EditorController/components/TextInputComponent";
import { FormatComponentCreator } from "./EditorController/components/FormatComponent";
import { ButtonComponentCreator } from "./EditorController/components/ButtonComponent";
import BotClient from "~/api/bot/BotClient";
import { CodeComponentCreator } from "./EditorController/components/CodeComponent";

export default function Editor(props: EditorProps) {
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
  const [line, setLine] = createSignal<LineData | undefined>(undefined);
  const [lines, setLines] = createStore<Record<string, LineData>>({});
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<Error | undefined>();
  const [errors, setErrors] = createSignal<Array<Error>>([]);
  const [botStatus, setBotStatus] = createSignal(BotStatus.Stopped);
  createEffect(() => {
    if (error()) {
      const err = error() as Error;
      setErrors((errors) => [...errors, err]);

      setTimeout(() => {
        setErrors((errors) => errors.filter((error) => error != err));
      }, 5000);
    }
  });

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
      bot: {
        status: {
          set: setBotStatus,
          get: botStatus,
        },
      },
    },
    // eslint-disable-next-line solid/reactivity
    new EditorClient(props.httpClient, props.token, props.botId, 1),
    logger
  );
  onMount(() => {
    editor.init();
  });

  const [showComponentSelection, setShowComponentSelection] =
    createSignal(false);
  const componentCreatorList: Array<SpecificComponentCreator> = [
    new ConditionComponentCreator(editor),
    new MessageComponentCreator(editor),
    new TextInputComponentCreator(editor),
    new FormatComponentCreator(editor),
    new CodeComponentCreator(editor),
    new ButtonComponentCreator(editor),
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

        <div id="editor-menu-panel" class="events">
          <A href="/bots" class="blue-button">
            Bot list
          </A>
          <div class="separator"> </div>
          <Show
            when={botStatus() == BotStatus.Stopped}
            fallback={
              <button onClick={() => editor.stopBot()} class="yellow-button">
                Stop bot
              </button>
            }
          >
            <A
              href={"/bots/" + props.botId + "/start?prev=edit"}
              class="green-button"
            >
              Start bot
            </A>
          </Show>
          <div class="separator"> </div>
          <Show when={loading()}>
            <div class="loading">Loading...</div>
          </Show>
        </div>
        <div class="panel-flex">
          <Show
            when={showComponentSelection()}
            fallback={
              <button
                class="events blue-button show-panel-btn"
                onClick={() => setShowComponentSelection(true)}
              >
                {"->"}
              </button>
            }
          >
            <div id="component-selection-panel" class="events">
              <button
                class="hide-panel-btn blue-button"
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
          <div class="edit-area">
            <div class="scale-buttons events">
              <button class="green-button" onClick={() => editor.zoomIn()}>
                +
              </button>
              <div class="separator"> </div>
              <button class="blue-button" onClick={() => editor.zoomOut()}>
                -
              </button>
            </div>
            <div id="editing-panel">edit panel edit panel edit panel</div>
          </div>
        </div>
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
          <Line position={line()?.position!} color={line()?.color ?? "black"} />
        </Show>
        <For each={Object.values(lines)}>
          {(line) => (
            <Line position={line.position} color={line.color ?? "black"} />
          )}
        </For>
      </div>
    </div>
  );
}
