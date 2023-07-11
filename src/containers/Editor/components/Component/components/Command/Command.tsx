import "./Command.css";
import { ConnectionPoint } from "../ConnectionPoint";
import { CommandProps } from "./types";

export default function Command(props: CommandProps) {
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
          position: {
            x: -props.commandStyle.connectionPointSize / 2,
            y: props.commandStyle.height / 4,
          },
        }}
      />
      <ConnectionPoint
        class="command-connection-point"
        connectionPointStyle={{
          size: props.commandStyle.connectionPointSize,
          position: {
            x:
              props.commandStyle.componentWidth -
              props.commandStyle.connectionPointSize / 2,
            y: props.commandStyle.height / 4,
          },
        }}
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
