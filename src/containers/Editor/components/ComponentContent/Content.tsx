import { JSX, children } from "solid-js";
import "./Content.css";
import { ConnectionPoint } from "../ConnectionPoint";
import { ContentPointHandlers } from ".";
import { Position } from "../../shared/types";

export function Content(props: {
  children: JSX.Element;
  componentName: string;
}) {
  const c = children(() => props.children);

  return (
    <div class="component-content-container">
      <div class="component-name">{props.componentName}</div>
      <div class="component-content">{c()}</div>
    </div>
  );
}

export function ContentConnectionPoint(props: {
  pointId: string;
  targetComponentId: number | undefined;
  class?: string;
  tooltip: string;
  handlers?: ContentPointHandlers;
  color?: string;
}) {
  return (
    <div class={"content-point" + (props.class ? " " + props.class : "")}>
      <ConnectionPoint
        tooltip={props.tooltip}
        handlers={{
          onMount: (getClientPosition: () => Position) => {
            props.handlers?.onMount(
              props.pointId,
              props.targetComponentId,
              getClientPosition
            );
          },
          onMouseDown: (clientPosition: Position) => {
            props.handlers?.onMouseDown(
              props.pointId,
              clientPosition,
              props.color ?? "black"
            );
          },
        }}
        style={{
          color: props.color,
        }}
      />
      <div class="point-tooltip">{props.tooltip}</div>
    </div>
  );
}
