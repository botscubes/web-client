import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { StartContentProps } from "./types";
import { Input } from "../../../Input";
import { ConnectionPoint } from "../../../ConnectionPoint";
import "./StartContent.css";
import { OutputPointType } from "../../types";

export default function StartContent(props: StartContentProps) {
  return (
    <>
      <Content componentName={"Start"}>
        <div class="start"> </div>
      </Content>
      <div class="output-points">
        <ContentConnectionPoint
          targetComponentId={props.outputs?.nextComponentId}
          pointId={OutputPointType.Next}
          class="next-component-point"
          tooltip="next"
          handlers={props.handlers?.outputPoint}
        />
      </div>
    </>
  );
}
