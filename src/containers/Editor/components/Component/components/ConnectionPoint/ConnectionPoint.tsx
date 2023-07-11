import { createSignal, mergeProps } from "solid-js";
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
  const handleMouseDown = (event: MouseEvent) => {
    if (props.onMouseDown) {
      props.onMouseDown(event);
    }
  };
  const handleMouseUp = (event: MouseEvent) => {
    if (props.onMouseUp) {
      props.onMouseUp(event);
    }
  };

  return (
    <div
      class={`connection-point ${props.class != undefined ? props.class : ""}`}
      style={{
        color: props.connectionPointStyle.color,
        left: props.connectionPointStyle.position.x.toString() + "px",
        top: props.connectionPointStyle.position.y.toString() + "px",
        width: props.connectionPointStyle.size.toString() + "px",
        height: props.connectionPointStyle.size.toString() + "px",
        opacity: focus() ? 0.5 : 0,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
}
