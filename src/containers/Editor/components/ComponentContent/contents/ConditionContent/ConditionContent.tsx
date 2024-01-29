import Content from "../../Content";
import "../../Content.css";
import { ConditionContentProps } from "./types";
import { Input } from "../../../Input";
import { ConnectionPoint } from "../../../ConnectionPoint";

export default function ConditionContent(props: ConditionContentProps) {
  return (
    <>
      <Content componentName={"Condition"}>
        <Input class="component-input" handlers={props.handlers?.expression} />
      </Content>
      <div class="output-points">
        <ConnectionPoint class="output-point" tooltip="true" />
        <ConnectionPoint class="output-point" tooltip="false" />
        <ConnectionPoint class="error-point" tooltip="error" />
      </div>
    </>
  );
}
