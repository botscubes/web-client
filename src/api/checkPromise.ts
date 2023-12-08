import Logger from "~/logging/Logger";
import { HTTPResponse } from "./HTTPResponse";
import HTTPError from "./HTTPError";

export async function checkPromise<T>(
  promise: Promise<HTTPResponse<T>>,
  log: Logger
): Promise<HTTPResponse<T>> {
  return await promise.catch((e) => {
    log.error(e);
    throw new HTTPError("Error sending request");
  });
}
