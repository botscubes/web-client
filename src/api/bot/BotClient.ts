import { HTTPClient, HTTPResponse } from "../HTTPClient";

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
}
