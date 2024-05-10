import { Title } from "@solidjs/meta";
import { A, action, useNavigate, useParams } from "@solidjs/router";
import { Show, createSignal } from "solid-js";
import { useAppState } from "~/AppContext";
import {
  checkPromise,
  checkResponse,
  getDataFromResponse,
} from "~/api/HTTPResponse";
import BotClient from "~/api/bot/BotClient";

export default function StartBot() {
  const appState = useAppState();
  const params = useParams();
  let oldToken = "";
  const id: number = parseInt(params.id, 10);
  const botClient = new BotClient(appState.httpClient, appState.token);

  const navigate = useNavigate();

  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const request = async (fn: () => Promise<void>) => {
    setError("");
    setLoading(true);
    try {
      await fn();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const send = action(async (formData: FormData) => {
    request(async () => {
      const token = formData.get("token") as string;
      if (oldToken != token) {
        const response = await checkPromise(
          botClient.setToken(id, token),
          appState.logger
        );

        if (response.statusUnauthorized()) {
          navigate("/signin");
          return;
        }
        checkResponse(response, appState.logger);
      }
      const response = await checkPromise(botClient.start(id), appState.logger);
      if (response.statusUnauthorized()) {
        navigate("/signin");
      }
      checkResponse(response, appState.logger);
      navigate("/bots");
    });
  });
  const getToken = async (el: HTMLInputElement) => {
    const response = await checkPromise(
      botClient.getToken(id),
      appState.logger
    );

    if (response.statusUnauthorized()) {
      navigate("/signin");
    } else {
      const data = getDataFromResponse(response, appState.logger);
      if (data) {
        el.value = data.token;
        oldToken = data.token;
      }
    }
  };
  return (
    <div class="form-page">
      <Title>Run bot</Title>

      <form action={send} method="post" class="form">
        <div class="form-header">Run bot</div>
        <div class="form-item">
          <label for="token" class="form-label">
            Token
          </label>
          <input
            type="text"
            name="token"
            placeholder="Enter token"
            class="blue-input"
            ref={(el) => {
              request(() => getToken(el));
            }}
          />
        </div>
        <input
          class="blue-button submit"
          type="submit"
          value="Run"
          style={{ "pointer-events": loading() ? "none" : undefined }}
        />
        <Show when={error()}>
          <div class="error">{error()}</div>
        </Show>
        <Show when={loading()}>
          <div class="loading">Loading...</div>
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
