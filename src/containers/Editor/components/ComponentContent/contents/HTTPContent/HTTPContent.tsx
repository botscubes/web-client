import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { HTTPContentProps } from "./types";
import "./style.css";
import { OutputPointColor, OutputPointType } from "../../types";

export default function HTTPContent(props: HTTPContentProps) {
  return (
    <div class="http-content">
      <Content componentName={"HTTP"}>
        <div class="content-width"> </div>
        <button class="button" onClick={() => props.handlers?.onEditClick()}>
          Edit
        </button>
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
