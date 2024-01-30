import Content from "../../Content";
import "../../Content.css";
import { ConditionContentProps } from "./types";
import { Input } from "../../../Input";
import { ConnectionPoint } from "../../../ConnectionPoint";
import "./ConditionContent.css";

export default function ConditionContent(props: ConditionContentProps) {
  return (
    <>
      <Content componentName={"Condition"}>
        <Input class="component-input" handlers={props.handlers?.expression} />
      </Content>
      <div class="output-points">
        <ConnectionPoint class="next-component-point" tooltip="true" />
        <ConnectionPoint class="false-point" tooltip="false" />
        <ConnectionPoint
          class="error-point"
          tooltip="error"
          handlers={{ onMouseDown: props.handlers?.points?.error?.onMouseDown }}
        />
      </div>
    </>
  );
}
