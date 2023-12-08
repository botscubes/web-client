import Logger from "~/logging/Logger";
import { HTTPClient } from "../HTTPClient";
import { Token } from "./Token";
import UserClient from "./UserClient";
import { UserData } from "./UserData";
import { checkPromise } from "../checkPromise";

export default class User implements UserData {
  login: string = "";
  password: string = "";
  private _userClient: UserClient;
  private _token: string = "";
  private _log: Logger;

  constructor(
    httpClient: HTTPClient,
    userData: UserData,
    token: string,
    logger = new Logger()
  ) {
    this.login = userData.login;
    this.password = userData.password;
    this._userClient = new UserClient(httpClient);
    this._token = token;
    this._log = logger;
  }
  async signup() {
    (await checkPromise(this._userClient.signup(this), this._log)).check();
  }
  async signin(): Promise<Token | undefined> {
    return (
      await checkPromise(this._userClient.signin(this), this._log)
    ).check().data;
  }
  async signout() {
    (
      await checkPromise(this._userClient.signout(this._token), this._log)
    ).check();
  }
}
