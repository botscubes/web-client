import { Show, createResource, createSignal } from "solid-js";
import { A, action, useNavigate } from "@solidjs/router";
import { useAppState } from "~/AppContext";
import HTTPError from "~/api/HTTPError";
import { getDataFromResponsePromise } from "~/api/HTTPResponse";
import UserClient from "~/api/user/UserClient";
import { UserData } from "~/api/user/UserData";

export default function Signin() {
  const appState = useAppState();
  const userClient = new UserClient(appState.httpClient);

  const navigate = useNavigate();

  const [user, setUser] = createSignal<UserData>();
  const [enrolling] = createResource(user, async (user: UserData) => {
    const token = await getDataFromResponsePromise(
      userClient.signin(user),
      appState.logger
    );
    if (token) {
      appState.saveToken(token.token);
    } else {
      appState.logger.error("No token");
      throw new HTTPError("Error sending request");
    }

    navigate("/bots");
  });

  const send = action(async (formData: FormData) => {
    const user = {
      login: formData.get("login") as string,
      password: formData.get("password") as string,
    };
    setUser(user);
  });

  return (
    <>
      <form action={send} method="post">
        <p>Sign in</p>
        <label for="login">Login:</label>
        <br />
        <input type="text" name="login" />
        <br />
        <label for="password">Password: </label> <br />
        <input type="password" name="password" /> <br />
        <input
          type="submit"
          value="submit"
          style={{ "pointer-events": enrolling.loading ? "none" : undefined }}
        />
        <Show when={enrolling.error}>
          <div class="error">{enrolling.error.message}</div>
        </Show>
      </form>

      <A href="/signup">Sign up</A>
    </>
  );
}
