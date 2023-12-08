import { LoggerConfig } from "./LoggerConfig";

export default class Logger {
  constructor(private _config: LoggerConfig = { levels: ALL }) {}

  warn(message: string) {
    if (this._config.levels & WARN) {
      console.warn(message);
    }
  }
  error(message: string) {
    if (this._config.levels & ERROR) {
      console.error(message);
    }
  }
  trace(message: string) {
    if (this._config.levels & TRACE) {
      console.trace(message);
    }
  }
  info(message: string) {
    if (this._config.levels & INFO) {
      console.info(message);
    }
  }
  debug(message: string) {
    if (this._config.levels & DEBUG) {
      console.debug(message);
    }
  }
}
