import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { FromJSONContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointColor, OutputPointType } from "../../types";
import "./style.css";

export default function FromJSONContent(props: FromJSONContentProps) {
  return (
    <div class="from-json-content">
      <Content componentName={"FromJSON"}>
        <Input
          class="component-input blue-input"
          placeholder="Enter path"
          value={props.data?.path}
          handlers={props.handlers?.path}
        />
        <Input
          class="component-input blue-input second-input"
          placeholder="Enter json"
          value={props.data?.json}
          handlers={props.handlers?.json}
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
    </div>
  );
}
