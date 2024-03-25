import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { FormatContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointColor, OutputPointType } from "../../types";

export default function FormatContent(props: FormatContentProps) {
  return (
    <>
      <Content componentName={"Format"}>
        <Input
          class="component-input"
          value={props.data?.formatString}
          handlers={props.handlers?.formatString}
        />
      </Content>
      <div class="output-points">
        <ContentConnectionPoint
          targetComponentId={props.outputs?.nextComponentId}
          pointId={OutputPointType.Next}
          tooltip="next"
          handlers={props.handlers?.outputPoint}
          color={OutputPointColor.Next}
        />
      </div>
    </>
  );
}
