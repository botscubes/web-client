import { Title } from "@solidjs/meta";
import { A, useNavigate } from "@solidjs/router";
import { For, Show, createSignal, onMount } from "solid-js";
import { useAppState } from "~/AppContext";
import {
  checkPromise,
  checkResponse,
  getDataFromResponse,
} from "~/api/HTTPResponse";
import BotClient from "~/api/bot/BotClient";
import { BotData } from "~/api/bot/BotData";

export default function Bots() {
  const appState = useAppState();
  const botClient = new BotClient(appState.httpClient, appState.token);

  const navigate = useNavigate();
  const [bots, setBots] = createSignal<Array<BotData>>([]);
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
  onMount(async () => {
    request(async () => {
      const response = await checkPromise(botClient.getBots(), appState.logger);

      if (response.statusUnauthorized()) {
        navigate("/signin");
      } else {
        const bots = getDataFromResponse(response, appState.logger);
        if (bots) {
          setBots(bots);
        }
      }
    });
  });

  const deleteBot = async (botId: number) => {
    request(async () => {
      const response = await checkPromise(
        botClient.deleteBot(botId),
        appState.logger
      );
      if (response.statusUnauthorized()) {
        navigate("/signin");
      } else {
        checkResponse(response, appState.logger);
      }
      setBots((bots) => bots.filter((bot) => bot.id != botId));
    });
  };

  const stopBot = async (botId: number) => {
    request(async () => {
      const response = await checkPromise(
        botClient.stop(botId),
        appState.logger
      );
      if (response.statusUnauthorized()) {
        navigate("/signin");
      } else {
        checkResponse(response, appState.logger);
      }
      setBots((bots) =>
        bots.map((bot) => {
          if (bot.id == botId) {
            return { ...bot, status: 0 };
          } else {
            return bot;
          }
        })
      );
    });
  };

  return (
    <>
      <Title>Bots</Title>
      <A href="/bots/add">Add bot</A>

      <div>Bots</div>
      <Show when={loading()}>Loading...</Show>
      <For each={bots()}>
        {(bot, i) => (
          <div>
            {i()} |
            <A href={"/bots/" + bot.id}>
              {bot.title} | {bot.status ? "active" : "not active"}
            </A>
            <button onClick={[deleteBot, bot.id]}>Delete</button>
            <Show
              when={!bot.status}
              fallback={<button onClick={() => stopBot(bot.id)}>Stop</button>}
            >
              <button onClick={() => navigate(`/bots/${bot.id}/start`)}>
                Start
              </button>
            </Show>
          </div>
        )}
      </For>
      <Show when={error()}>
        <div class="error">{error()}</div>
      </Show>
    </>
  );
}
