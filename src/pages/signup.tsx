import { A, action, useNavigate } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";
import { useAppState } from "~/AppContext";
import { checkResponsePromise } from "~/api/HTTPResponse";
import UserClient from "~/api/user/UserClient";
import { UserData } from "~/api/user/UserData";

export default function Signup() {
  const appState = useAppState();
  const userClient = new UserClient(appState.httpClient);

  const navigate = useNavigate();

  const [user, setUser] = createSignal<UserData>();
  const [enrolling] = createResource(user, async (user: UserData) => {
    await checkResponsePromise(userClient.signup(user), appState.logger);
    navigate("/signin");
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
        <div class="form-header">Sign up</div>
        <div class="form-item">
          <label for="login" class="form-label">
            Login
          </label>

          <input
            type="text"
            name="login"
            placeholder="Enter login"
            class="green-input"
          />
        </div>
        <div class="form-item">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            class="green-input"
          />
        </div>
        <input
          type="submit"
          value="Sign up"
          class="green-button submit"
          style={{ "pointer-events": enrolling.loading ? "none" : undefined }}
        />
        <Show when={enrolling.error}>
          <div class="error">{enrolling.error.message}</div>
        </Show>
      </form>
      <div class="under-form">
        <A href="/signin" class="blue-button under">
          Sign in
        </A>
      </div>
    </div>
  );
}
