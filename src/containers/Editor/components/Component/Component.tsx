import { ComponentProps } from "./types";
import { handleDragStart } from "./events";
import { ConnectionArea } from "./components/ConnectionArea";
import "./Component.css";
import { MouseButton, Position } from "../../shared/types";
import { For } from "solid-js";
import { Command } from "./components/Command";
import { ConnectionPoint } from "./components/ConnectionPoint";
import { getConnectionPointMouseDownHandler } from "./eventHandlers";

export default function Component(props: ComponentProps) {
  const commands = () => Object.values(props.componentData.commands);
  const height = () =>
    commands().length *
      (props.componentStyle.commandIndent +
        props.componentStyle.commandHeight) +
    props.componentStyle.commandIndent;

  const handleDeleteButtonClick = () => {
    props.deleteComponent(props.componentData.id);
  };
  const handleMouseDown = (event: MouseEvent) => {
    if (!(event.ctrlKey || event.metaKey) && event.button == MouseButton.LEFT) {
      props.selectComponent(props.componentData.id, {
        x: event.clientX,
        y: event.clientY,
      });
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
  const handleStartConnection = (
    commandId: number,
    connectionPosition: Position
  ) => {
    props.startConnection(
      props.componentData.id,
      commandId,
      {
        x: props.componentData.position.x + connectionPosition.x,
        y: props.componentData.position.y + connectionPosition.y,
      },
      {
        x: connectionPosition.x,
        y: connectionPosition.y,
      }
    );
  };

  return (
    <div
      class="component"
      classList={{ selected: props.componentData.selected }}
      style={{
        left: props.componentData.position.x.toString() + "px",
        top: props.componentData.position.y.toString() + "px",
        width: props.componentStyle.width.toString() + "px",
        height: height().toString() + "px",
      }}
      onDragStart={handleDragStart}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <button class="delete-button" onClick={handleDeleteButtonClick}>
        ✖
      </button>
      <ConnectionArea
        scale={props.scale}
        connectionAreaData={{
          visible: props.componentData.connectionAreaVisible,
        }}
        connectionAreaStyle={{
          connectionPointSize: props.componentStyle.connectionPointSize,
          componentWidth: props.componentStyle.width,
          componentHeight: height(),
        }}
        finishConnection={handleFinishConnection}
      />

      <For each={commands()}>
        {(command, i) => {
          return (
            <Command
              commandData={command}
              commandStyle={{
                height: props.componentStyle.commandHeight,
                connectionPointSize: props.componentStyle.connectionPointSize,
                componentWidth: props.componentStyle.width,
                position: {
                  x: 0,
                  y:
                    (i() + 1) * props.componentStyle.commandIndent +
                    i() * props.componentStyle.commandHeight,
                },
              }}
              startConnection={handleStartConnection}
            />
          );
        }}
      </For>

      <For each={Object.values(props.componentData.connectionPoints)}>
        {(point) => {
          return (
            <ConnectionPoint
              connectionPointStyle={{
                size: props.componentStyle.connectionPointSize,
              }}
              connectionPointData={point}
              onMouseDown={getConnectionPointMouseDownHandler(
                props.deleteConnection,
                point.componentId,
                point.commandId
              )}
            />
          );
        }}
      </For>
    </div>
  );
}
