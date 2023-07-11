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

export default function Editor() {
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
    commandId: number,
    pointPosition: Position
  ) => {
    setLinePos({
      start: pointPosition,
      end: mousePos(),
    });

    setShowLine(true);
    setEditorState(EditorState.CONNECTION);
    console.log("Editor: start connection");
  };
  const handleFinishConnection = (
    componentId: number,
    pointPosition: Position
  ) => {
    console.log("Editor: finish connection");
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
        setEditorState(EditorState.NONE);
      }

      setShowLine(false);
    }
  };
  const handleMouseDown = (event: MouseEvent) => {
    //setShowLine(true);
  };

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
      onMouseMove={[handleMouseMove, setMousePos]}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <button onClick={handleAddComponent}>Add Component</button>
      <div class="scaling">
        <For each={Object.values(editorController.getEditorStore().components)}>
          {(component) => {
            console.log(component.id);
            const componentStyle =
              editorController.getEditorStore().componentStyle;
            return (
              <Component
                componentData={component}
                componentStyle={componentStyle}
                deleteComponent={handleDeleteComponent}
                selectComponent={handleSelectComponent}
                addSelectedComponent={handleAddSelectedComponent}
                startConnection={handleStartConnection}
                finishConnection={handleFinishConnection}
              />
            );
          }}
        </For>
        <Show when={showLine()}>
          <Line position={linePos()} />
        </Show>
      </div>
    </div>
  );
}
