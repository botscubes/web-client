import Content from "../../Content";
import "../../Content.css";
import { ConditionContentProps } from "./types";
import { Input } from "../../../Input";

export default function ConditionContent(props: ConditionContentProps) {
  return (
    <Content componentName={"Condition"}>
      <Input class="component-input" handlers={props.handlers?.expression} />
    </Content>
  );
}
