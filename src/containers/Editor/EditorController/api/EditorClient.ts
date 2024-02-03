import { HTTPClient, HTTPResponse } from "~/api/HTTPClient";
import { APIComponentData } from "./types";

export class EditorClient {
  constructor(
    private httpClient: HTTPClient,
    private token: string,
    private botId: number,
    private groupId: number
  ) {}

  async getComponents(): Promise<HTTPResponse<APIComponentData[]>> {
    return this.httpClient.GET(
      `/api/bots/${this.botId}/groups/${this.groupId}/components`,
      this.token
    );
  }
}
