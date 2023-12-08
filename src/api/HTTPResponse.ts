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
