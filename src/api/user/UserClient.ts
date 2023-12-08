import { HTTPClient, HTTPResponse } from "../HTTPClient";
import { Token } from "./Token";
import { UserData } from "./UserData";

export default class UserClient {
  constructor(private _httpClient: HTTPClient) {}
  async signup(user: UserData): Promise<HTTPResponse<undefined>> {
    return await this._httpClient.POST("/api/users/signup", user);
  }
  async signin(user: UserData): Promise<HTTPResponse<Token>> {
    return await this._httpClient.POST("/api/users/signin", user);
  }
  async signout(token: string): Promise<HTTPResponse<undefined>> {
    return await this._httpClient.DELETE("/api/users/signout", token);
  }
}
