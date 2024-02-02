import { HTTPClient, HTTPResponse } from "~/api/HTTPClient";
import { APIComponent } from "./data";

export class EditorClient {
  constructor(
    private httpClient: HTTPClient,
    private token: string,
    private botId: number,
    private groupId: number
  ) {}

  async getComponents(): Promise<HTTPResponse<APIComponent[]>> {
    return this.httpClient.GET(
      `/api/bots/${this.botId}/groups/${this.groupId}/components`,
      this.token
    );
  }
}
