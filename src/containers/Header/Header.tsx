import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { useAppState } from "~/AppContext";
import "./Header.css";

export default function Header() {
  const appState = useAppState();
  let testCounter = 0;
  const logout = () => {
    appState.error = "error" + testCounter.toString();
    testCounter++;
  };

  return (
    <header>
      <div id="global-menu">
        <A href="/about">About</A>
      </div>
      <div id="auth">
        <Show
          when={!appState.token && false}
          fallback={
            <div class="action-link" onClick={logout}>
              Sign out
            </div>
          }
        >
          <A href="/signin">Sign in</A>
          <A href="/signup">Sign up</A>
        </Show>
      </div>
    </header>
  );
}
