import { ComponentProps } from "./types";
import { handleDragStart, handleMouseUp, handleMouseDown } from "./events";
import "./Component.css";

export default function Component(props: ComponentProps) {
  const handleDeleteButtonClick = () => {
    props.deleteComponent(props.component.id);
  };
  return (
    <div
      class="component"
      onDragStart={handleDragStart}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <button onClick={handleDeleteButtonClick}>delete</button>
      <p>{props.component.id}</p>
    </div>
  );
}
