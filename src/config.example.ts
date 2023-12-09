import { ALL } from "./logging/levels";

export const config = {
  server: {
    domain: "localhost",
    port: 80,
    scheme: "http",
  },
  log: {
    levels: ALL,
  },
};
