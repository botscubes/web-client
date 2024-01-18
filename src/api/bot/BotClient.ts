import { HTTPClient, HTTPResponse } from "../HTTPClient";
import { BotData } from "./BotData";

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
}
