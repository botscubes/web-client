import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { ConditionContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointColor, OutputPointType } from "../../types";

export default function ConditionContent(props: ConditionContentProps) {
  return (
    <>
      <Content componentName={"Condition"}>
        <Input
          class="component-input"
          value={props.data?.expression}
          handlers={props.handlers?.expression}
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
          targetComponentId={props.outputs?.idIfFalse}
          pointId={OutputPointType.Else}
          tooltip="false"
          handlers={props.handlers?.outputPoint}
          color={OutputPointColor.Else}
        />
      </div>
    </>
  );
}
