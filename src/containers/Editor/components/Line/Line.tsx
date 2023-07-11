import { createMemo } from "solid-js";
import { LineProps } from "./types";
import "./Line.css";

export default function Line(props: LineProps) {
  const padding = 10;

  const differenceX = createMemo(
    () => props.position.end.x - props.position.start.x
  );

  const differenceY = createMemo(
    () => props.position.end.y - props.position.start.y
  );
  const svgWidth = () => Math.abs(differenceX()) + 2 * padding;
  const svgHeigth = () => Math.abs(differenceY()) + 2 * padding;
  const svgTop = () =>
    Math.min(props.position.end.y, props.position.start.y) - padding;
  const svgLeft = () =>
    Math.min(props.position.start.x, props.position.end.x) - padding;

  const svgStyleObject = () => {
    return {
      left: svgLeft().toString() + "px",
      top: svgTop().toString() + "px",
      width: svgWidth().toString() + "px",
      height: svgHeigth().toString() + "px",
    };
  };
  const lineX1 = () => {
    if (differenceX() >= 0) {
      return padding;
    }
    return Math.abs(differenceX()) + padding;
  };
  const lineY1 = () => {
    if (differenceY() >= 0) {
      return padding;
    }
    return Math.abs(differenceY()) + padding;
  };
  const lineX2 = () => {
    if (differenceX() >= 0) {
      return Math.abs(differenceX()) + padding;
    }
    return padding;
  };
  const lineY2 = () => {
    if (differenceY() >= 0) {
      return Math.abs(differenceY()) + padding;
    }

    return padding;
  };
  return (
    <svg
      class="connection-line"
      style={svgStyleObject()}
      xmlns="http//www.w3.org/2000/svg"
    >
      <line
        x1={lineX1()}
        y1={lineY1()}
        x2={lineX2()}
        y2={lineY2()}
        stroke="black"
      />

      <line
        x1="this.relativeX2"
        y1="this.relativeY2"
        x2="this.arrowLine1X2"
        y2="this.arrowLine1Y2"
        stroke="black"
      />

      <line
        x1="this.relativeX2"
        y1="this.relativeY2"
        x2="this.arrowLine2X2"
        y2="this.arrowLine2Y2"
        stroke="black"
      />
    </svg>
  );
}
