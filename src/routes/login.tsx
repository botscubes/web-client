import { A, redirect } from "solid-start";
import { createRouteAction } from "solid-start/data/createRouteAction";

export default function Login() {
  const [_, { Form }] = createRouteAction(async (formData: FormData) => {
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    //const username = formData.get("username");
    //if (username === "admin") {
    //  return redirect("/admin");
    //} else {
    //  throw new Error("Invalid username");
    //}
    //return redirect("/home");
  });

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
      <A href="/signup">Sign up</A>
    </>
  );
}
