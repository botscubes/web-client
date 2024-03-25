import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { TextInputContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointColor, OutputPointType } from "../../types";

export default function TextInputContent(props: TextInputContentProps) {
  return (
    <>
      <Content componentName={"TextInput"}>
        <div class="content-width"> </div>
        {
          //          <Input
          //            class="component-input"
          //            value={props.data?.text}
          //            handlers={props.handlers?.text}
          //          />
        }
      </Content>

      <div class="output-points">
        <ContentConnectionPoint
          targetComponentId={props.outputs?.nextComponentId}
          pointId={OutputPointType.Next}
          tooltip="next"
          handlers={props.handlers?.outputPoint}
          color={OutputPointColor.Next}
        />
      </div>
    </>
  );
}
