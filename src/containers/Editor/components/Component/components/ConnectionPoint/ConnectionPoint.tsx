import { createSignal } from "solid-js";
import "./ConnectionPoint.css";
import { ConnectionPointProps } from "./types";

export default function ConnectionPoint(props: ConnectionPointProps) {
  const [focus, setFocus] = createSignal(false);

  const handleMouseEnter = () => {
    setFocus(true);
  };
  const handleMouseLeave = () => {
    setFocus(false);
  };

  return (
    <div
      class="connection-point"
      style={{
        left: props.data.position.x.toString() + "px",
        top: props.data.position.y.toString() + "px",
        width: props.data.size.toString() + "px",
        height: props.data.size.toString() + "px",
        opacity: focus() ? 0.5 : 0,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
