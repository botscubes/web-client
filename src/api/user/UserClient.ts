import { HTTPClient, HTTPResponse } from "../HTTPClient";
import { Token } from "./Token";
import { User } from "./User";

export default class UserClient {
  constructor(private _httpClient: HTTPClient) {}
  async signup(user: User): Promise<HTTPResponse<undefined>> {
    return await this._httpClient.POST("/api/users/signup", user);
  }
  async signin(user: User): Promise<HTTPResponse<Token>> {
    return await this._httpClient.POST("/api/users/signin", user);
  }
  async signout(token: string): Promise<HTTPResponse<undefined>> {
    return await this._httpClient.DELETE("/api/users/signout", token);
  }
}
