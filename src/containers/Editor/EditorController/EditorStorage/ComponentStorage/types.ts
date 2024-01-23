import { JSX } from "solid-js";
import { ComponentData } from "~/containers/Editor/components/Component";

export interface ExtendedComponentData extends ComponentData {
  content: () => JSX.Element;
}
