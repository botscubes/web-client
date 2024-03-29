import { HTTPResponse } from "./HTTPResponse";

type Headers = {
  [key: string]: string | number | boolean;
};

export class HTTPClient {
  constructor(
    private _baseUrl: string,
    private _additionalHeaders?: Headers
  ) {}

  async GET<T>(path: string, token?: string): Promise<HTTPResponse<T>> {
    return this.request(path, "GET", token);
  }
  async POST<I, O>(
    path: string,
    data?: I,
    token?: string
  ): Promise<HTTPResponse<O>> {
    return this.request(path, "POST", token, data);
  }
  async PATCH<I, O>(
    path: string,
    data?: I,
    token?: string
  ): Promise<HTTPResponse<O>> {
    return this.request(path, "PATCH", token, data);
  }

  async PUT<I, O>(
    path: string,
    data?: I,
    token?: string
  ): Promise<HTTPResponse<O>> {
    return this.request(path, "PUT", token, data);
  }
  async DELETE<I, O>(
    path: string,
    token?: string,
    data?: I
  ): Promise<HTTPResponse<O>> {
    return this.request(path, "DELETE", token, data);
  }

  async request<I, O>(
    path: string,
    method: string,
    token?: string,
    data?: I
  ): Promise<HTTPResponse<O>> {
    let options = {};
    if (data != undefined) {
      if (token != undefined) {
        options = {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + token,
            ...this._additionalHeaders,
          },
          body: JSON.stringify(data),
        };
      } else {
        options = {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            ...this._additionalHeaders,
          },
          body: JSON.stringify(data),
        };
      }
    } else {
      if (token != undefined) {
        options = {
          method: method,
          headers: {
            Authorization: "Bearer " + token,
            ...this._additionalHeaders,
          },
        };
      } else {
        options = {
          method: method,
          ...this._additionalHeaders,
        };
      }
    }
    const response = await fetch(this._baseUrl + path, options);
    const result = {
      status: response.status,
      data: undefined,
      error: undefined,
    };
    const text = await response.text();
    if (text) {
      if (response.status == 200) {
        result.data = JSON.parse(text);
      } else if (response.status == 201) {
        try {
          result.data = JSON.parse(text);
        } catch {
          result.data = undefined;
        }
      } else if (response.status == 422) {
        result.error = JSON.parse(text);
      }
    }

    return new HTTPResponse<O>(result);
  }
}
export { HTTPResponse };
