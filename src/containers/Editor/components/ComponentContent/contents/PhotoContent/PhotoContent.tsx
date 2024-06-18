import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import { PhotoContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointColor, OutputPointType } from "../../types";

export default function PhotoContent(props: PhotoContentProps) {
  return (
    <>
      <Content componentName={"Photo"}>
        <Input
          class="component-input blue-input"
          placeholder="Enter path"
          value={props.data?.path}
          handlers={props.handlers?.path}
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
    </>
  );
}
