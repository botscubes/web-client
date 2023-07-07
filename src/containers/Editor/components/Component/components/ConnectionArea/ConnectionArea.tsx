import "./ConnectionArea.css";
import { createMemo, createSignal } from "solid-js";
import { ConnectionAreaProps } from "./types";
import { ConnectionPoint } from "../ConnectionPoint";

export default function ConnectionArea(props: ConnectionAreaProps) {
  const [pointPos, setPointPos] = createSignal({
    x: 0,
    y: 0,
  });
  const areaWidth = createMemo(
    () => props.data.componentWidth + props.data.connectionPointSize
  );
  const areaHeight = createMemo(
    () => props.data.componentHeight + props.data.connectionPointSize
  );
  const handleMouseMove = (event: MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.x;
    const y = event.clientY - rect.y;
    const pointSize = props.data.connectionPointSize;
    const bordersX = x >= pointSize / 2 && x <= areaWidth() - pointSize / 2;
    const bordersY = y >= pointSize / 2 && y <= areaHeight() - pointSize / 2;

    let pointX: number | undefined = undefined;
    let pointY: number | undefined = undefined;

    if (x <= pointSize && bordersY) {
      pointX = 0;
      pointY = y - pointSize / 2;
    } else if (x >= areaWidth() - pointSize && bordersY) {
      pointX = areaWidth() - pointSize;
      pointY = y - pointSize / 2;
    } else if (y <= pointSize && bordersX) {
      pointY = 0;
      pointX = x - pointSize / 2;
    } else if (y >= areaHeight() - pointSize && bordersX) {
      pointY = areaHeight() - pointSize;
      pointX = x - pointSize / 2;
    }
    if (pointX != undefined && pointY != undefined) {
      setPointPos({
        x: pointX,
        y: pointY,
      });
    }
  };
  console.log("aaaaaa");
  return (
    <div
      class="connection-area"
      style={{
        left: (-props.data.connectionPointSize / 2).toString() + "px",
        top: (-props.data.connectionPointSize / 2).toString() + "px",
        width: areaWidth().toString() + "px",
        height: areaHeight().toString() + "px",
      }}
      onMouseMove={handleMouseMove}
    >
      <ConnectionPoint
        data={{
          position: pointPos(),
          size: props.data.connectionPointSize,
        }}
      />
    </div>
  );
}
