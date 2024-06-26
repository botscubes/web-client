import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { MessageContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointColor, OutputPointType } from "../../types";

export default function MessageContent(props: MessageContentProps) {
  return (
    <>
      <Content componentName={"Message"}>
        <Input
          class="component-input blue-input"
          placeholder="Enter text"
          value={props.data?.text}
          handlers={props.handlers?.text}
        />
      </Content>
      <div class="output-points">
        {
          // <ContentConnectionPoint class="next-component-point" tooltip="true" />
          // <ContentConnectionPoint class="false-point" tooltip="false" />
        }
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
