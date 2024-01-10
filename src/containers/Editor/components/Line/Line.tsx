import { createEffect, createMemo, createSignal } from "solid-js";
import { LineProps } from "./types";
import "./Line.css";

export default function Line(props: LineProps) {
  const padding = 10;
  const maxArrowLength = 12;
  const arrowAngle = Math.PI / 3;
  const [arrowLength, setArrowLength] = createSignal(0);

  const differenceX = createMemo(
    () => props.position.end.x - props.position.start.x
  );

  const differenceY = createMemo(
    () => props.position.end.y - props.position.start.y
  );

  createEffect(() => {
    const hypotenuse = Math.sqrt(
      Math.pow(differenceX(), 2) + Math.pow(differenceY(), 2)
    );

    if (hypotenuse < maxArrowLength) {
      setArrowLength(hypotenuse);
    } else {
      setArrowLength(maxArrowLength);
    }
  });

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
  const lineX2 = createMemo(() => {
    if (differenceX() >= 0) {
      return Math.abs(differenceX()) + padding;
    }
    return padding;
  });
  const lineY2 = createMemo(() => {
    if (differenceY() >= 0) {
      return Math.abs(differenceY()) + padding;
    }

    return padding;
  });

  const angle = createMemo(() => {
    if (differenceX() == 0) {
      return 0;
    }
    if (differenceY() == 0) {
      return Math.PI / 2;
    }
    const angle = Math.atan(Math.abs(differenceX() / differenceY()));
    return angle;
  });
  const arrowPointX = createMemo(() => {
    if (differenceX() > 0) {
      if (angle() == 0) {
        return lineX2() - arrowLength();
      }
      return lineX2() - arrowLength() * Math.sin(angle());
    }
    return lineX2() + arrowLength() * Math.sin(angle());
  });

  const arrowPointY = createMemo(() => {
    if (differenceY() > 0) {
      return lineY2() - arrowLength() * Math.cos(angle());
    }
    return lineY2() + arrowLength() * Math.cos(angle());
  });

  const arrowShiftLength = createMemo(
    () => Math.tan(arrowAngle / 2) * arrowLength()
  );
  const arrowShiftX = createMemo(() => {
    const length = arrowShiftLength() * Math.cos(angle());
    if (differenceY() <= 0) {
      return -length;
    }
    return length;
  });
  const arrowShiftY = createMemo(() => {
    const length = arrowShiftLength() * Math.sin(angle());
    if (differenceX() >= 0) {
      return -length;
    }
    return length;
  });
  const arrowPointX1 = () => Math.round(arrowPointX() + arrowShiftX());
  const arrowPointY1 = () => Math.round(arrowPointY() + arrowShiftY());
  const arrowPointX2 = () => Math.round(arrowPointX() - arrowShiftX());
  const arrowPointY2 = () => Math.round(arrowPointY() - arrowShiftY());

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

      <path
        d={`
          M${arrowPointX1()} ${arrowPointY1()} 
          L${lineX2()} ${lineY2()} 
          L${arrowPointX2()} ${arrowPointY2()}
        `}
        stroke="black"
        fill="transparent"
      />
    </svg>
  );
}
