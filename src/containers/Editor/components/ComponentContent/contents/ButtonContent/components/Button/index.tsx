import { ContentConnectionPoint } from "../../../../Content";
import { OutputPointType } from "../../../../types";
import "./style.css";

export interface ButtonProps {
  text: string;
  class?: string;
}
export function Button(props: ButtonProps) {
  return (
    <div class={"button-component" + (props.class ? " " + props.class : "")}>
      <ContentConnectionPoint
        targetComponentId={0}
        pointId={OutputPointType.Next}
        class="next-component-point button-point"
        tooltip="next"
        handlers={undefined}
      />
      <button class="button">{props.text}</button>
    </div>
  );
}
