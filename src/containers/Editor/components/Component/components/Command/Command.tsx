import "./Command.css";
import { ConnectionPoint } from "../ConnectionPoint";
import { CommandProps } from "./types";
import { Position } from "../../../../shared/types";

export default function Command(props: CommandProps) {
  const handlePointMouseDown =
    (pointPosition: Position) => (event: MouseEvent) => {
      props.startConnection(props.commandData.id, pointPosition);
    };
  return (
    <div
      class="command-area"
      style={{
        left: props.commandStyle.position.x.toString() + "px",
        top: props.commandStyle.position.y.toString() + "px",
        height: props.commandStyle.height.toString() + "px",
        width: props.commandStyle.componentWidth.toString() + "px",
      }}
    >
      <ConnectionPoint
        class="command-connection-point"
        connectionPointStyle={{
          size: props.commandStyle.connectionPointSize,
        }}
        connectionPointData={{
          position: {
            x: -props.commandStyle.connectionPointSize / 2,
            y: props.commandStyle.height / 4,
          },
        }}
        onMouseDown={handlePointMouseDown({
          x: 0,
          y: props.commandStyle.position.y + props.commandStyle.height / 2,
        })}
      />
      <ConnectionPoint
        class="command-connection-point"
        connectionPointStyle={{
          size: props.commandStyle.connectionPointSize,
        }}
        connectionPointData={{
          position: {
            x:
              props.commandStyle.componentWidth -
              props.commandStyle.connectionPointSize / 2,
            y: props.commandStyle.height / 4,
          },
        }}
        onMouseDown={handlePointMouseDown({
          x: props.commandStyle.componentWidth,
          y: props.commandStyle.position.y + props.commandStyle.height / 2,
        })}
      />

      <button
        class="command-button"
        style={{
          width:
            (
              props.commandStyle.componentWidth -
              props.commandStyle.connectionPointSize
            ).toString() + "px",
        }}
      >
        {" "}
        {props.commandData.name}
      </button>
    </div>
  );
}
