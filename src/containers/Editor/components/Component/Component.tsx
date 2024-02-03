import { ComponentProps } from "./types";
import { handleDragStart } from "./events";
import { ConnectionArea } from "./components/ConnectionArea";
import "./Component.css";
import { MouseButton, Position } from "../../shared/types";
import { For, Show, children, createSignal, onMount } from "solid-js";
//import { ConnectionPoint } from "./components/ConnectionPoint";
import { getConnectionPointMouseDownHandler } from "./eventHandlers";
import { Dynamic } from "solid-js/web";
import { ConnectionPoint } from "../ConnectionPoint";

export default function Component(props: ComponentProps) {
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);

  const resizeObserver = new ResizeObserver((entries, _observer) => {
    entries.forEach((entry) => {
      const height = entry.borderBoxSize[0].blockSize;
      const width = entry.borderBoxSize[0].inlineSize;
      setWidth(width);
      setHeight(height);
    });
  });

  const handleDeleteButtonClick = () => {
    props.deleteComponent(props.componentData.id);
  };
  const handleMouseDown = (event: MouseEvent) => {
    if (!(event.ctrlKey || event.metaKey) && event.button == MouseButton.LEFT) {
      const element = event.target as HTMLElement;
      if (element.tagName != "INPUT") {
        props.selectComponent(props.componentData.id, {
          x: event.clientX,
          y: event.clientY,
        });
      }
    }
  };
  const handleMouseUp = (event: MouseEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.button == MouseButton.LEFT) {
      props.addSelectedComponent(props.componentData.id);
    }
  };
  const handleFinishConnection = (pointPosition: Position) => {
    props.finishConnection(
      props.componentData.id,
      {
        x: props.componentData.position.x + pointPosition.x,
        y: props.componentData.position.y + pointPosition.y,
      },
      {
        x: pointPosition.x - props.componentStyle.connectionPointSize / 2,
        y: pointPosition.y - props.componentStyle.connectionPointSize / 2,
      }
    );
  };
  // const handleStartConnection = (
  //   commandId: number,
  //   connectionPosition: Position
  // ) => {
  //   props.startConnection(
  //     props.componentData.id,
  //     commandId,
  //     {
  //       x: props.componentData.position.x + connectionPosition.x,
  //       y: props.componentData.position.y + connectionPosition.y,
  //     },
  //     {
  //       x: connectionPosition.x,
  //       y: connectionPosition.y,
  //     }
  //   );
  // };

  const c = children(() => props.children);
  return (
    <div
      class="component absolute"
      classList={{ selected: props.componentData.selected }}
      style={{
        left: props.componentData.position.x.toString() + "px",
        top: props.componentData.position.y.toString() + "px",
      }}
      onDragStart={handleDragStart}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      ref={(el) => {
        resizeObserver.observe(el);
      }}
    >
      {c()}
      <Show when={props.componentData.abilityToDelete}>
        <button class="delete-button" onClick={handleDeleteButtonClick}>
          ✖
        </button>
      </Show>

      <ConnectionArea
        data={{
          visible: props.componentData.connectionAreaVisible,
        }}
        styles={{
          connectionPointSize: props.componentStyle.connectionPointSize,
          componentWidth: width(),
          componentHeight: height(),
          scale: props.scale,
        }}
        handlers={{
          finishConnection: handleFinishConnection,
        }}
      />

      <For each={Object.values(props.componentData.connectionPoints)}>
        {(point) => {
          return (
            <ConnectionPoint
              class="target-point absolute"
              style={{
                size: props.componentStyle.connectionPointSize,
              }}
              data={point}
              handlers={{
                onMouseDown: getConnectionPointMouseDownHandler(
                  props.deleteConnection,
                  props.componentData.id,
                  point.componentId,
                  point.pointId
                ),
              }}
            />
          );
        }}
      </For>
    </div>
  );
}
