import Content from "../../Content";
import "../../Content.css";
import { FormatContentProps } from "./types";
import { Input } from "../../../Input";

export default function FormatContent(props: FormatContentProps) {
  return (
    <Content componentName={"Format"}>
      <Input class="component-input" handlers={props.handlers?.formatString} />
    </Content>
  );
}
