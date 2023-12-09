import { Show } from "solid-js";
import { A, redirect } from "solid-start";
import { createRouteAction } from "solid-start/data/createRouteAction";
import { useAppState } from "~/AppContext";
import { checkResponsePromise } from "~/api/HTTPResponse";
import UserClient from "~/api/user/UserClient";

export default function Signup() {
  const appState = useAppState();
  const userClient = new UserClient(appState.httpClient);
  const [enrolling, { Form }] = createRouteAction(
    async (formData: FormData) => {
      //  let response = await fetch(serverConfig.getUrl("/api/users/signup"), {
      //    method: "POST",
      //    headers: {
      //      "Content-Type": "application/json;charset=utf-8",
      //    },
      //    body: JSON.stringify({}),
      //  });:
      //  console.log(response);
      //   const username = formData.get("username");
      //   if (username === "admin") {
      //     //  return redirect("/admin");
      //   } else {
      //     //  throw new Error("Invalid username");
      //   }
      //   //return redirect("/home");

      const login = formData.get("login") as string;
      const password = formData.get("password") as string;
      const user = {
        login: login,
        password: password,
      };
      await checkResponsePromise(userClient.signup(user), appState.logger);

      return redirect("/login");
    }
  );

  return (
    <>
      <Form>
        <p>Sign up</p>
        <label for="login">Login:</label>
        <br />
        <input type="text" name="login" />
        <br />
        <label for="password">Password: </label> <br />
        <input type="password" name="password" /> <br />
        <input type="submit" value="submit" />
        <Show when={enrolling.error}>
          <div class="error">{enrolling.error.message}</div>
        </Show>
      </Form>
      <A href="/login">Sign in</A>
    </>
  );
}
