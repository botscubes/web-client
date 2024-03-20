import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { MessageContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointType } from "../../types";

export default function MessageContent(props: MessageContentProps) {
  return (
    <>
      <Content componentName={"Message"}>
        <Input
          class="component-input"
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
          pointId={OutputPointType.Error}
          class="next-component-point"
          tooltip="next"
          handlers={props.handlers?.outputPoint}
        />
      </div>
    </>
  );
}
