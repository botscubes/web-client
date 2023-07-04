import { createSignal, createEffect, For } from "solid-js";
import { createStore } from "solid-js/store";
import { handleMouseMove } from "./events";
import { Component } from "./components/Component";
import EditorController from "./EditorController";
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

  const handleAddComponent = (event: Event) => {
    editorController.addComponent();
  };
  const handleDeleteComponent = (id: number) => {
    editorController.deleteComponent(id);
  };
  //debug
  //  createEffect(() => {
  //    console.log(mousePos());
  //  });
  return (
    <div id="editor-area" onMouseMove={[handleMouseMove, setMousePos]}>
      <button onClick={handleAddComponent}>Add Component</button>
      <For each={Object.values(editorController.getEditorStore().components)}>
        {(component) => {
          console.log(component.id);
          return (
            <Component
              component={component}
              deleteComponent={handleDeleteComponent}
            />
          );
        }}
      </For>
    </div>
  );
}
