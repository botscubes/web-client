import { Show } from "solid-js";
import { A, redirect } from "solid-start";
import { createRouteAction } from "solid-start/data/createRouteAction";
import { useAppState } from "~/AppContext";
import HTTPError from "~/api/HTTPError";
import { getDataFromResponsePromise } from "~/api/HTTPResponse";
import UserClient from "~/api/user/UserClient";

export default function Login() {
  const appState = useAppState();
  const userClient = new UserClient(appState.httpClient);

  const [enrolling, { Form }] = createRouteAction(
    async (formData: FormData) => {
      const login = formData.get("login") as string;
      const password = formData.get("password") as string;
      const user = {
        login: login,
        password: password,
      };
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

      return redirect("/about");
    }
  );

  return (
    <>
      <Form>
        <p>Sign in</p>
        <label for="username">Login:</label>
        <br />
        <input type="text" name="username" />
        <br />
        <label for="password">Password: </label> <br />
        <input type="password" name="password" /> <br />
        <input type="submit" value="submit" />
      </Form>
      <Show when={enrolling.error}>
        <div class="error">{enrolling.error.message}</div>
      </Show>
      <A href="/signup">Sign up</A>
    </>
  );
}
