import { ComponentProps } from "./types";
import { handleDragStart } from "./events";
import { ConnectionArea } from "./components/ConnectionArea";
import "./Component.css";
import { MouseButton } from "../../shared/types";

export default function Component(props: ComponentProps) {
  const handleDeleteButtonClick = () => {
    props.deleteComponent(props.component.id);
  };
  const handleMouseDown = (event: MouseEvent) => {
    if (!(event.ctrlKey || event.metaKey) && event.button == MouseButton.LEFT) {
      props.selectComponent(props.component.id);
    }
  };
  const handleMouseUp = (event: MouseEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.button == MouseButton.LEFT) {
      props.addSelectedComponent(props.component.id);
    }
  };
  return (
    <div
      class="component"
      classList={{ selected: props.component.selected }}
      style={{
        left: props.component.position.x.toString() + "px",
        top: props.component.position.y.toString() + "px",
        width: props.componentStyle.width.toString() + "px",
        height: "50px",
      }}
      onDragStart={handleDragStart}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <button onClick={handleDeleteButtonClick}>
        delete {props.component.id}
      </button>
      <ConnectionArea
        data={{
          connectionPointSize: props.componentStyle.connectionPointSize,
          componentWidth: props.componentStyle.width,
          componentHeight: 50,
        }}
      />
    </div>
  );
}
