import { ALL } from "./logging/levels";

export const config = {
  httpClient: {
    server: {
      domain: "localhost",
      port: 80,
      scheme: "http",
    },
    requests: {
      additionalHeaders: {},
    },
  },
  log: {
    levels: ALL,
  },
};
