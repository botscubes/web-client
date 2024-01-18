import Logger from "~/logging/Logger";
import HTTPError from "./HTTPError";

export interface ServiceError {
  code: number;
  message: string;
}

export interface HTTPResponseData<T> {
  status: number;
  data?: T;
  error?: ServiceError;
}

export class HTTPResponse<T> {
  constructor(private _response: HTTPResponseData<T>) {}
  get data(): T | undefined {
    return this._response.data;
  }
  get error(): ServiceError | undefined {
    return this._response.error;
  }
  get status(): number {
    return this._response.status;
  }
  get ok(): boolean {
    const status = this._response.status;
    if (status >= 200 && status <= 299) {
      return true;
    }
    return false;
  }
  check(
    handler: (response: HTTPResponse<T>) => HTTPResponse<T> = defaultCheck
  ): HTTPResponse<T> {
    return handler(this);
  }
  statusUnauthorized(): boolean {
    return this.status == 401;
  }
}

function defaultCheck<T>(response: HTTPResponse<T>): HTTPResponse<T> {
  if (!response.ok) {
    if (response.error != undefined) {
      throw new HTTPError(response.error.message);
    } else {
      throw new HTTPError("Error sending request.");
    }
  }
  return response;
}

export async function getDataFromResponsePromise<T>(
  promise: Promise<HTTPResponse<T>>,
  log: Logger
): Promise<T | undefined> {
  try {
    const data = (await promise).check().data;
    return data;
  } catch (e) {
    if (e instanceof HTTPError) {
      log.info(e.message);
      throw new HTTPError(e.message);
    } else if (e instanceof Error) {
      log.error(e.message);
      throw new HTTPError("Error sending request");
    }
  }
}

export async function checkResponsePromise<T>(
  promise: Promise<HTTPResponse<T>>,
  log: Logger
): Promise<HTTPResponse<T>> {
  try {
    const response = (await promise).check();
    return response;
  } catch (e) {
    if (e instanceof HTTPError) {
      log.info(e.message);
      throw new HTTPError(e.message);
    } else if (e instanceof Error) {
      log.error(e.message);
      throw new HTTPError("Error sending request");
    }
  }
  return promise;
}

export async function checkPromise<T>(
  promise: Promise<T>,
  log: Logger
): Promise<T> {
  try {
    const response = await promise;
    return response;
  } catch (e) {
    if (e instanceof Error) {
      log.error(e.message);
      throw new HTTPError("Error sending request");
    }
  }
  return promise;
}

export function checkResponse<T>(
  response: HTTPResponse<T>,
  log: Logger
): HTTPResponse<T> {
  try {
    return response.check();
  } catch (e) {
    if (e instanceof HTTPError) {
      log.info(e.message);
      throw new HTTPError(e.message);
    } else if (e instanceof Error) {
      log.error(e.message);
      throw new HTTPError("Error sending request");
    }
  }
  return response;
}

export function getDataFromResponse<T>(
  response: HTTPResponse<T>,
  log: Logger
): T | undefined {
  try {
    return response.check().data;
  } catch (e) {
    if (e instanceof HTTPError) {
      log.info(e.message);
      throw new HTTPError(e.message);
    } else if (e instanceof Error) {
      log.error(e.message);
      throw new HTTPError("Error sending request");
    }
  }
  return response.data;
}
