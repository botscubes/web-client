export default class HTTPRequest<InputType, OutputType> {
  private static readonly SCHEME = "http";
  constructor(
    private host: string,
    private path: string,
    private query: string = "",
    private method: string = "POST",
    private userToken: string = "",
    private body: InputType,
    private errorHandler?: (message: string) => void,
    private resultHandler?: (response: OutputType) => void
  ) {}

  send() {
    const url: string =
      HTTPRequest.SCHEME + "://" + this.host + this.path + this.query;
    fetch(url, {
      method: this.method,
      headers: {
        Authorization: "Bearer " + this.userToken,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(this.body),
    })
      .then((response) => response.json())
      .then((result: OutputType) => {
        console.log(result);
        if (this.resultHandler) {
          this.resultHandler(result);
        }
      })
      .catch((message: string) => {
        if (this.errorHandler) {
          this.errorHandler(message);
        }
      });
  }
}
