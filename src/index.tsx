/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";

import "./index.css";
import App from "./App";
import { routes } from "./routes";
import { AppContextProvider } from "./AppContext";

const root = document.getElementById("root");

//render(() => <App />, root!)

render(
  () => (
    <MetaProvider>
      <AppContextProvider>
        <Router root={App}>{routes}</Router>
      </AppContextProvider>
    </MetaProvider>
  ),
  root!
);
