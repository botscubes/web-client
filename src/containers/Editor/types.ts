import Logger from "~/logging/Logger";
import { LinePosition } from "./components/Line";
import { SetStoreFunction, Store } from "solid-js/store";
import { Accessor, JSX, Setter } from "solid-js";
import { ExtendedComponentData } from "./EditorController/EditorStorage/ComponentStorage/types";
import { Position } from "./shared/types";
import { HTTPClient } from "~/api/HTTPClient";
import { Navigator } from "@solidjs/router";

export interface LineData {
  color: string;
  position: LinePosition;
}

export enum BotStatus {
  Running = 1,
  Stopped = 0,
}

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
    set: Setter<LineData | undefined>;
  };
  lineStore: [
    Store<Record<string, LineData>>,
    SetStoreFunction<Record<string, LineData>>,
  ];
  bot: {
    status: {
      set: Setter<BotStatus>;
      get: Accessor<BotStatus>;
    };
  };
  setLoading: Setter<boolean>;
  navigate: Navigator;
  error: {
    set: Setter<Error | undefined>;
  };
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
