import { Show } from "solid-js";
import { A, redirect } from "solid-start";
import { createRouteAction } from "solid-start/data/createRouteAction";
import { serverConfig } from "~/ServerConfig";
import { HTTPClient } from "~/api/HTTPClient";
import UserClient from "~/api/user/UserClient";
import { config } from "~/config";

export default function Signup() {
  const userClinet = new UserClient(new HTTPClient(serverConfig.getUrl()));

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
      let response;
      try {
        const login = formData.get("login") as string;
        const password = formData.get("password") as string;

        response = await userClinet.signup({
          login: login,
          password: password,
        });
      } catch (e) {
        console.log(e);
        throw new Error("Error sending request.");
      }
      if (response.status == 422) {
        if (response.error != undefined) {
          throw new Error(response.error.message);
        }
      }

      return redirect("/signin");
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
