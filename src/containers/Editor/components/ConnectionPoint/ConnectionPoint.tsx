import { createSignal } from "solid-js";
import "./ConnectionPoint.css";
import { ConnectionPointProps } from "./types";
import { Position } from "../../shared/types";

function getClientPosition(event: MouseEvent): Position {
  const element = event.target as HTMLElement;
  return getClientPositionFromElement(element);
}
function getClientPositionFromElement(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

export default function ConnectionPoint(props: ConnectionPointProps) {
  const [focus, setFocus] = createSignal(false);

  const handleMouseEnter = () => {
    setFocus(true);
  };
  const handleMouseLeave = () => {
    setFocus(false);
  };
  const handleMouseDown = (event: MouseEvent) => {
    props.handlers?.onMouseDown?.(getClientPosition(event));
  };
  const handleMouseUp = (event: MouseEvent) => {
    props.handlers?.onMouseUp?.(getClientPosition(event));
  };

  const size = () => {
    if (props.style?.size) {
      return props.style.size.toString() + "px";
    }
    return undefined;
  };
  const opacity = () => {
    if (props.style?.size) {
      return focus() ? 0.5 : 0;
    }
    return 0.5;
  };
  const left = () => {
    if (props.data?.position?.x) {
      return props.data.position.x.toString() + "px";
    }
    return undefined;
  };

  const top = () => {
    if (props.data?.position?.y) {
      return props.data.position.y.toString() + "px";
    }
    return undefined;
  };

  return (
    <div data-tooltip={props.tooltip}>
      <div
        ref={(el) => {
          props.handlers?.onMount?.(() => getClientPositionFromElement(el));
        }}
        class={"connection-point" + (props.class ? " " + props.class : "")}
        style={{
          "background-color": props.style?.color,
          left: left(),
          top: top(),
          width: size(),
          height: size(),
          opacity: opacity(),
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
