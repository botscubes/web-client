import { createSignal, createEffect } from "solid-js";
import { handleMouseMove } from "./events";
import { Component } from "./components/Component";
import "./Editor.css";

export default function Editor() {
  const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });
  createEffect(() => {
    console.log(mousePos());
  });
  return (
    <div id="editor-area" onMouseMove={[handleMouseMove, setMousePos]}>
      <Component />
    </div>
  );
}
