import { HTTPClient, HTTPResponse } from "~/api/HTTPClient";
import {
  APIAddComponentRequestData,
  APIAddComponentResponseData,
  APIComponentData,
} from "./types";

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
  async addComponent(
    data: APIAddComponentRequestData
  ): Promise<HTTPResponse<APIAddComponentResponseData>> {
    return this.httpClient.POST(
      `/api/bots/${this.botId}/groups/${this.groupId}/components`,
      data,
      this.token
    );
  }
  async deleteComponent(componentId: number): Promise<HTTPResponse<undefined>> {
    return this.httpClient.DELETE(
      `/api/bots/${this.botId}/groups/${this.groupId}/components/${componentId}`,
      this.token
    );
  }
}
