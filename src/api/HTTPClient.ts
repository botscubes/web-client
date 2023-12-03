export interface ServiceError {
  code: number;
  message: string;
}

export interface HTTPResponse<T> {
  status: number;
  data?: T;
  error?: ServiceError;
}

export class HTTPClient {
  constructor(private _url: string) {}

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
  async DELETE<T>(path: string, token?: string): Promise<HTTPResponse<T>> {
    return this.request(path, "DELETE", token);
  }

  async request<I, O>(
    path: string,
    method: string,
    token?: string,
    data?: I
  ): Promise<HTTPResponse<O>> {
    let options = {};
    if (data == undefined) {
      if (token != undefined) {
        options = {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authentication: "Bearer " + token,
          },
          body: JSON.stringify(data),
        };
      } else {
        options = {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        };
      }
    } else {
      if (token != undefined) {
        options = {
          method: method,
          headers: {
            Authentication: "Bearer " + token,
          },
        };
      } else {
        options = {
          method: method,
        };
      }
    }
    const response = await fetch(this._url + path, options);
    const result = {
      status: response.status,
      data: undefined,
      error: undefined,
    };
    if (response.status == 200 || response.status == 201) {
      result.data = await response.json();
    } else if (response.status == 422) {
      result.error = await response.json();
    }

    return result;
  }
}
