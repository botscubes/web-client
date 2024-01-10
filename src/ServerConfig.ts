export class ServerConfig {
  private _url;
  constructor(domain: string, port: number, scheme = "https") {
    this._url = scheme + "://" + domain + ":" + port;
  }
  public getUrl(path?: string): string {
    return path ? this._url + path : this._url;
  }
}

//export const serverConfig = new ServerConfig(
//  config.server.domain,
//  config.server.port,
//  config.server.scheme
//);
