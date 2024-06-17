import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { MoveContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointColor, OutputPointType } from "../../types";
import "./style.css";

export default function MoveContent(props: MoveContentProps) {
  return (
    <div class="to-int-content">
      <Content componentName={"Move"}>
        <Input
          class="component-input blue-input"
          placeholder="Enter source"
          value={props.data?.source}
          handlers={props.handlers?.source}
        />
        <Input
          class="component-input blue-input destination-input"
          placeholder="Enter destination"
          value={props.data?.destination}
          handlers={props.handlers?.destination}
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
