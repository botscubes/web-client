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
          class="component-input blue-input"
          placeholder="Enter text"
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
        <ContentConnectionPoint
          targetComponentId={props.outputs?.idIfError}
          pointId={OutputPointType.Error}
          tooltip="error"
          handlers={props.handlers?.outputPoint}
          color={OutputPointColor.Error}
        />
      </div>
    </>
  );
}
