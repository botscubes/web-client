import Logger from "~/logging/Logger";
import { ComponentData, ComponentStyle } from "./components/Component/types";
import { LinePosition } from "./components/Line";
import { SetStoreFunction, Store } from "solid-js/store";
import { Accessor, JSX, Setter } from "solid-js";
import { ExtendedComponentData } from "./EditorController/EditorStorage/ComponentStorage/types";
import { Position } from "./shared/types";
import { HTTPClient } from "~/api/HTTPClient";
import { Navigator } from "@solidjs/router";

export interface EditorData {
  componentStore: [
    Store<Record<number, ExtendedComponentData>>,
    SetStoreFunction<Record<number, ExtendedComponentData>>,
  ];
  addingComponent: {
    setContent: Setter<(() => JSX.Element) | undefined>;
    setPosition: Setter<Position>;
  };
  setUserSelect: Setter<boolean>;
  scale: {
    set: Setter<number>;
    get: Accessor<number>;
  };
  line: {
    set: Setter<LinePosition | undefined>;
  };
  lineStore: [
    Store<Record<string, LinePosition>>,
    SetStoreFunction<Record<string, LinePosition>>,
  ];
  setLoading: Setter<boolean>;
  navigate: Navigator;
  //componentStyle: ComponentStyle;
  //lines: Record<number, LinePosition>;
  //line: LinePosition;
  //showLine: boolean;
  //scale: number;
}

export interface EditorProps {
  logger: Logger;
  botId: number;
  httpClient: HTTPClient;
  token: string;
}

//export enum EditorState {
//  NONE,
//  COMPONENT_MOVEMENT,
//  COMPONENT_SELECTED,
//  CONNECTION,
//  AREA_MOVEMENT,
//}
