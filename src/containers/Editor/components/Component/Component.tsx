import { ComponentProps } from "./types";
import { handleDragStart, handleMouseUp, handleMouseDown } from "./events";
import "./Component.css";

export default function Component(props: ComponentProps) {
  const handleDeleteButtonClick = () => {
    props.deleteComponent(props.component.id);
  };
  const handleMouseDown = () => {
    props.selectComponent(props.component.id);
  };
  return (
    <div
      class="component"
      classList={{ selected: props.component.selected }}
      style={{
        left: props.component.position.x.toString() + "px",
        top: props.component.position.y.toString() + "px",
      }}
      onDragStart={handleDragStart}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <button onClick={handleDeleteButtonClick}>delete</button>
      <p>{props.component.id}</p>
    </div>
  );
}
