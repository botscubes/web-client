import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { ConditionContentProps } from "./types";
import { Input } from "../../../Input";
import "./ConditionContent.css";
import { OutputPointType } from "../../types";

export default function ConditionContent(props: ConditionContentProps) {
  return (
    <>
      <Content componentName={"Condition"}>
        <Input class="component-input" handlers={props.handlers?.expression} />
      </Content>
      <div class="output-points">
        {
          // <ContentConnectionPoint class="next-component-point" tooltip="true" />
          // <ContentConnectionPoint class="false-point" tooltip="false" />
        }
        <ContentConnectionPoint
          targetComponentId={props.data?.idIfFalse}
          pointId={OutputPointType.Error}
          class="error-point"
          tooltip="error"
          handlers={props.handlers?.outputPoint}
        />
      </div>
    </>
  );
}
