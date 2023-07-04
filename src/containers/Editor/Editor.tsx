import { createSignal, createEffect, For } from "solid-js";
import { createStore } from "solid-js/store";
import { handleMouseMove } from "./events";
import { Component } from "./components/Component";
import EditorController from "./EditorController";
import { EditorState } from "./types";
import "./Editor.css";

export default function Editor() {
  const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });
  const [editorStore, setEditorStore] = createStore({
    components: {},
  });
  const editorController: EditorController = new EditorController(
    editorStore,
    setEditorStore
  );
  let editorState: EditorState = EditorState.NONE;

  const handleAddComponent = (event: Event) => {
    editorController.addComponent();
  };
  const handleDeleteComponent = (id: number) => {
    editorController.deleteComponent(id);
  };

  const handleSelectComponent = (id: number) => {
    editorController.selectComponent(id);
    editorState = EditorState.MOVING_COMPONENT;
  };
  const handleMouseUp = () => {
    if (editorState == EditorState.COMPONENT_SELECTED) {
      editorController.deselectComponents();
      editorState = EditorState.NONE;
    } else if (editorState == EditorState.MOVING_COMPONENT) {
      editorState = EditorState.COMPONENT_SELECTED;
    }
  };

  return (
    <div
      id="editor-area"
      onMouseMove={[handleMouseMove, setMousePos]}
      onMouseUp={handleMouseUp}
    >
      <button onClick={handleAddComponent}>Add Component</button>
      <For each={Object.values(editorController.getEditorStore().components)}>
        {(component) => {
          console.log(component.id);
          return (
            <Component
              component={component}
              deleteComponent={handleDeleteComponent}
              selectComponent={handleSelectComponent}
            />
          );
        }}
      </For>
    </div>
  );
}
