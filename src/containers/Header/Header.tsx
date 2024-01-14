import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { useAppState } from "~/AppContext";
import "./Header.css";

export default function Header() {
  const appState = useAppState();

  return (
    <header>
      <div id="global-menu">
        <A href="/about">About</A>
      </div>
      <div id="auth">
        <Show
          when={!appState.token}
          fallback={
            <div class="action-link" onClick={() => {}}>
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