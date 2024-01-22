import Logger from "~/logging/Logger";
import { ComponentData } from "./components/Component";
import { ComponentStyle } from "./components/Component/types";
import { LinePosition } from "./components/Line";
import { SetStoreFunction, Store } from "solid-js/store";

export interface EditorData {
  componentStore: [
    Store<Record<number, ComponentData>>,
    SetStoreFunction<Record<number, ComponentData>>,
  ];
  //componentStyle: ComponentStyle;
  //lines: Record<number, LinePosition>;
  //line: LinePosition;
  //showLine: boolean;
  //scale: number;
}

export interface EditorProps {
  logger: Logger;
}

export enum EditorState {
  NONE,
  COMPONENT_MOVEMENT,
  COMPONENT_SELECTED,
  CONNECTION,
  AREA_MOVEMENT,
}
