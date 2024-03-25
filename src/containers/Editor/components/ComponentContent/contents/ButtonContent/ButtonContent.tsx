import { Content, ContentConnectionPoint } from "../../Content";
import "../../Content.css";
import "./ButtonContent.css";
import { ButtonContentProps } from "./types";
import { Input } from "../../../Input";
import { OutputPointType } from "../../types";
import { Button } from "./components/Button";
import { For } from "solid-js";

export default function ButtonContent(props: ButtonContentProps) {
  const buttons = ["button1", "button2"];
  return (
    <>
      <Content componentName={"Buttons"}>
        <div class="flex-column">
          <Input
            class="component-input"
            value={props.data?.text}
            handlers={props.handlers?.expression}
          />
          <For each={buttons}>
            {(button) => <Button text={button} class="indent" />}
          </For>
        </div>
      </Content>
      {
        //  <div class="output-points">
        //    <ContentConnectionPoint
        //      targetComponentId={props.outputs?.nextComponentId}
        //      pointId={OutputPointType.Next}
        //      class="next-component-point"
        //      tooltip="next"
        //      handlers={props.handlers?.outputPoint}
        //    />
        //    <ContentConnectionPoint
        //      targetComponentId={props.outputs?.idIfFalse}
        //      pointId={OutputPointType.Else}
        //      class="false-point"
        //      tooltip="false"
        //      handlers={props.handlers?.outputPoint}
        //    />
        //  </div>
      }
    </>
  );
}
