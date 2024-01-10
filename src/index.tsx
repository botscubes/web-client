/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";

import "./index.css";
import App from "./App";
import { routes } from "./routes";

const root = document.getElementById("root");

//render(() => <App />, root!)

render(
  () => (
    <MetaProvider>
      <Router root={App}>{routes}</Router>
    </MetaProvider>
  ),
  root!
);
