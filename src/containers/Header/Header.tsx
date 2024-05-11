import { A, useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { useAppState } from "~/AppContext";
import "./Header.css";
import UserClient from "~/api/user/UserClient";
import { checkResponsePromise } from "~/api/HTTPResponse";

export default function Header() {
  const appState = useAppState();
  const userClient = new UserClient(appState.httpClient);
  const navigate = useNavigate();

  let sending = false;
  const logout = async () => {
    if (!sending) {
      sending = true;
      try {
        await checkResponsePromise(
          userClient.signout(appState.token),
          appState.logger
        );
        appState.deleteToken();
        navigate("/signin");
      } catch (e) {
        appState.error = e as Error;
      }
      sending = false;
    }
  };

  return (
    <header>
      <div id="global-menu">
        <A href="/about">About</A>
      </div>
      <div id="auth">
        <Show
          when={!appState.token}
          fallback={
            <div class="header-link" onClick={logout}>
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
