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
    <div class="form-page">
      <form action={send} method="post" class="form">
        <div class="form-header">Sign in</div>
        <div class="form-item">
          <label for="login" class="form-label">
            Login
          </label>
          <input
            type="text"
            name="login"
            class="blue-input"
            placeholder="Enter login"
          />
        </div>
        <div class="form-item">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            class="blue-input"
            placeholder="Enter password"
          />
        </div>
        <input
          type="submit"
          value="submit"
          class="blue-button submit"
          style={{ "pointer-events": enrolling.loading ? "none" : undefined }}
        />
        <Show when={enrolling.error}>
          <div class="error">{enrolling.error.message}</div>
        </Show>
      </form>
      <div class="under-form">
        <A href="/signup" class="green-button">
          Sign up
        </A>
      </div>
    </div>
  );
}
