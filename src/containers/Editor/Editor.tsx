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
    editorController.deselectComponents();
    const id: number = editorController.addComponent();
    editorController.selectComponent(id);
    editorState = EditorState.COMPONENT_SELECTED;
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
      editorState = EditorState.COMPONENT_SELECTED;
    } else {
      editorState = EditorState.NONE;
    }
  };
  const handleSelectComponent = (id: number) => {
    if (!editorController.componentIsSelected(id)) {
      editorController.deselectComponents();
      editorController.selectComponent(id);
    }
    editorController.fixMouseShiftsRelativeToComponents(mousePos());
    editorState = EditorState.MOVING_COMPONENT;
  };
  const handleMouseUp = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.dataset.editorArea != undefined) {
      editorController.deselectComponents();
      editorState = EditorState.NONE;
    }

    if (editorState == EditorState.MOVING_COMPONENT) {
      editorState = EditorState.COMPONENT_SELECTED;
    }
  };

  createEffect(() => {
    const position = mousePos();
    if (editorState == EditorState.MOVING_COMPONENT) {
      editorController.moveComponents(position);
    }
  });
  return (
    <div
      id="editor-area"
      data-editor-area
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
              addSelectedComponent={handleAddSelectedComponent}
            />
          );
        }}
      </For>
    </div>
  );
}
