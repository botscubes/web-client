import { createContext, createSignal, useContext } from "solid-js";
import { config } from "./config";
import { ServerConfig } from "./ServerConfig";
import Logger from "./logging/Logger";
import { HTTPClient } from "./api/HTTPClient";

export interface AppState {
  get logger(): Logger;
  get httpClient(): HTTPClient;

  saveToken(token: string): void;
  deleteToken(): void;
  get token(): string;

  get error(): Error | undefined;
  set error(error: Error);
}

const AppContext = createContext<AppState>({} as AppState);

export function AppContextProvider(props: any) {
  const [token, setToken] = createSignal("");
  const [error, setError] = createSignal<Error>();

  const conf = config;
  const serverConfig = new ServerConfig(
    conf.server.domain,
    conf.server.port,
    conf.server.scheme
  );
  const logger = new Logger({ levels: conf.log.levels });
  const httpClient = new HTTPClient(serverConfig.getUrl());
  const state: AppState = {
    get logger(): Logger {
      return logger;
    },
    get httpClient(): HTTPClient {
      return httpClient;
    },
    saveToken(t: string) {
      setToken(t);
    },
    deleteToken() {
      setToken("");
    },
    get token() {
      return token();
    },

    get error(): Error | undefined {
      return error();
    },
    set error(error: Error) {
      setError(error);
    },
  };

  return (
    <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}
