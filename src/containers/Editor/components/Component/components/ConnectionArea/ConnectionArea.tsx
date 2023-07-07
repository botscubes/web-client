import "./ConnectionArea.css";
import { createSignal } from "solid-js";
import { ConnectionAreaProps } from "./types";
export default function ConnectionArea(props: ConnectionAreaProps) {
  const [position, setPosition] = createSignal({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: MouseEvent) => {
    console.log(event.offsetX);
  };
  return (
    <div
      class="connection-area"
      style={{
        left: (-props.data.connectionPointSize / 2).toString() + "px",
        top: (-props.data.connectionPointSize / 2).toString() + "px",
        width:
          (
            props.data.componentWidth + props.data.connectionPointSize
          ).toString() + "px",
        height:
          (
            props.data.componentHeight + props.data.connectionPointSize
          ).toString() + "px",
      }}
      onMouseMove={handleMouseMove}
    >
      ddd
    </div>
  );
}
