import { Title } from "@solidjs/meta";
import { action, useNavigate } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";
import { useAppState } from "~/AppContext";
import { checkPromise, checkResponse } from "~/api/HTTPResponse";
import BotClient from "~/api/bot/BotClient";

export default function AddBot() {
  const appState = useAppState();
  const botClient = new BotClient(appState.httpClient, appState.token);

  const navigate = useNavigate();

  const [title, setTitle] = createSignal<string>();
  const [enrolling] = createResource(title, async (title: string) => {
    const response = await checkPromise(
      botClient.addBot(title),
      appState.logger
    );

    if (response.statusUnauthorized()) {
      navigate("/signin");
    } else {
      checkResponse(response, appState.logger);
      navigate("/bots");
    }
  });

  const send = action(async (formData: FormData) => {
    const title = formData.get("title") as string;
    setTitle(title);
  });
  return (
    <>
      <Title>Add bot</Title>
      <div>Add bot</div>
      <form action={send} method="post">
        <label for="title">Title:</label>
        <br />
        <input type="text" name="title" />
        <br />
        <input
          type="submit"
          value="submit"
          style={{ "pointer-events": enrolling.loading ? "none" : undefined }}
        />
        <Show when={enrolling.error}>
          <div class="error">{enrolling.error.message}</div>
        </Show>
      </form>
    </>
  );
}
