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

  onMount(async () => {
    setLoading(true);
    try {
      const response = await checkPromise(botClient.getBots(), appState.logger);

      if (response.statusUnauthorized()) {
        navigate("/signin");
      } else {
        const bots = getDataFromResponse(response, appState.logger);
        if (bots) {
          setBots(bots);
        }
      }
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  });

  const deleteBot = async (botId: number) => {
    setLoading(true);
    try {
      const response = await checkPromise(
        botClient.deleteBot(botId),
        appState.logger
      );
      if (response.statusUnauthorized()) {
        navigate("/signin");
      } else {
        checkResponse(response, appState.logger);
      }
    } catch (e: any) {
      setError(e.message);
    }
    setBots((bots) => bots.filter((bot) => bot.id != botId));
    setLoading(false);
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
          </div>
        )}
      </For>
      <Show when={error()}>
        <div class="error">{error()}</div>
      </Show>
    </>
  );
}
