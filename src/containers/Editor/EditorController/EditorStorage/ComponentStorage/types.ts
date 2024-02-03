import { JSX } from "solid-js";
import { ComponentData } from "~/containers/Editor/components/Component";
import { SpecificComponentController } from "../../SpecificComponent";

export interface ExtendedComponentData extends ComponentData {
  controller: SpecificComponentController;
  content: () => JSX.Element;
}
