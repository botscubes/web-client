import { HTTPClient, HTTPResponse } from "~/api/HTTPClient";
import {
  APIAddComponentRequestData,
  APIAddComponentResponseData,
  APIComponentData,
  APISetConnectionData,
  APISourceComponentOutput,
} from "./types";
import { Position } from "../../shared/types";
import BotClient from "~/api/bot/BotClient";

export class EditorClient {
  private botClient;
  constructor(
    private httpClient: HTTPClient,
    private token: string,
    private botId: number,
    private groupId: number
  ) {
    this.botClient = new BotClient(httpClient, token);
  }

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
  async setComponentPosition(
    componentId: number,
    position: Position
  ): Promise<HTTPResponse<undefined>> {
    return this.httpClient.PATCH(
      `/api/bots/${this.botId}/groups/${this.groupId}/components/${componentId}/position`,
      position,
      this.token
    );
  }
  async setConnection(
    data: APISetConnectionData
  ): Promise<HTTPResponse<undefined>> {
    return this.httpClient.POST(
      `/api/bots/${this.botId}/groups/${this.groupId}/connections`,
      data,
      this.token
    );
  }

  async deleteConnection(
    data: APISourceComponentOutput
  ): Promise<HTTPResponse<undefined>> {
    return this.httpClient.DELETE(
      `/api/bots/${this.botId}/groups/${this.groupId}/connections`,
      this.token,
      data
    );
  }

  async updateComponentData(
    componentId: number,
    data: Record<string, any>
  ): Promise<HTTPResponse<undefined>> {
    return this.httpClient.PATCH(
      `/api/bots/${this.botId}/groups/${this.groupId}/components/${componentId}/data`,
      data,
      this.token
    );
  }

  async getBotStatus(): Promise<HTTPResponse<number>> {
    return await this.botClient.getStatus(this.botId);
  }

  async stopBot(): Promise<HTTPResponse<undefined>> {
    return await this.botClient.stop(this.botId);
  }
}
