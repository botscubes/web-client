import { Title } from "@solidjs/meta";
import { A, action, useNavigate } from "@solidjs/router";
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
    <div class="form-page">
      <Title>Add bot</Title>
      <form action={send} method="post" class="form">
        <div class="form-header">Add bot</div>
        <div class="form-item">
          <label for="title" class="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter bot title"
            class="green-input"
          />
        </div>
        <input
          type="submit"
          value="Add"
          class="green-button submit"
          style={{ "pointer-events": enrolling.loading ? "none" : undefined }}
        />
        <Show when={enrolling.error}>
          <div class="error">{enrolling.error.message}</div>
        </Show>
      </form>
      <div class="under-form">
        <A href="/bots" class="yellow-button">
          Back
        </A>
      </div>
    </div>
  );
}
