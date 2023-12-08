export type LoggingLevel = number;

export const NONE: LoggingLevel = 0;
export const INFO: LoggingLevel = 1;
export const WARN: LoggingLevel = 2;
export const DEBUG: LoggingLevel = 4;
export const ERROR: LoggingLevel = 8;
export const TRACE: LoggingLevel = 16;

export const ALL = INFO | WARN | DEBUG | ERROR | TRACE;
