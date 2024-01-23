import Logger from "~/logging/Logger";
import { ComponentData, ComponentStyle } from "./components/Component/types";
import { LinePosition } from "./components/Line";
import { SetStoreFunction, Store } from "solid-js/store";
import { JSX } from "solid-js";

export interface EditorData {
  componentStore: [
    Store<Record<number, ExtendedComponentData>>,
    SetStoreFunction<Record<number, ExtendedComponentData>>,
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

//export enum EditorState {
//  NONE,
//  COMPONENT_MOVEMENT,
//  COMPONENT_SELECTED,
//  CONNECTION,
//  AREA_MOVEMENT,
//}

export interface ExtendedComponentData extends ComponentData {
  content: () => JSX.Element;
}
