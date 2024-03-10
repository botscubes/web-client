import { HTTPClient, HTTPResponse } from "../HTTPClient";
import { BotData, BotToken } from "./BotData";

export default class BotClient {
  constructor(
    private _httpClient: HTTPClient,
    private _token: string
  ) {}
  async addBot(title: string): Promise<HTTPResponse<undefined>> {
    return await this._httpClient.POST(
      "/api/bots",
      { title: title },
      this._token
    );
  }
  async getBots(): Promise<HTTPResponse<Array<BotData>>> {
    return await this._httpClient.GET("/api/bots", this._token);
  }
  async deleteBot(id: number): Promise<HTTPResponse<undefined>> {
    return await this._httpClient.DELETE(
      "/api/bots/" + id.toString(),
      this._token
    );
  }
  async setToken(id: number, token: string): Promise<HTTPResponse<undefined>> {
    return await this._httpClient.PATCH(
      "/api/bots/" + id.toString() + "/token",
      {
        token: token,
      },
      this._token
    );
  }
  async start(id: number): Promise<HTTPResponse<undefined>> {
    return await this._httpClient.PATCH(
      "/api/bots/" + id.toString() + "/start",
      undefined,
      this._token
    );
  }
  async stop(id: number): Promise<HTTPResponse<undefined>> {
    return await this._httpClient.PATCH(
      "/api/bots/" + id.toString() + "/stop",
      undefined,
      this._token
    );
  }
  async getToken(id: number): Promise<HTTPResponse<BotToken>> {
    return await this._httpClient.GET(
      "/api/bots/" + id.toString() + "/token",
      this._token
    );
  }
}
