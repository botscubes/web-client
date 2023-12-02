export interface HTTPResponse<T> {
  data?: T;
  status: number;
}

export class HTTPRequest {
  constructor(private _url: string) {}

  async GET<T>(
    path: string,
    token?: string
  ): Promise<[HTTPResponse<T>, Error?]> {
    return this.request(path, "GET", token);
  }
  //POST()
  //PATCH()
  //PUT()
  //DELETE()

  async request<I, O>(
    path: string,
    method: string,
    token?: string,
    data?: I
  ): Promise<[HTTPResponse<O>, Error?]> {
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
      data: undefined,
      status: response.status,
    };
    try {
      result.data = await response.json();
    } catch (e) {
      return [result, e as Error];
    }
    return [result, undefined];
  }
}
