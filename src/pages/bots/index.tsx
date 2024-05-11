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
    <div class="bot-page">
      <Title>Bots</Title>
      <div class="above-list">
        <A href="/bots/add" class="green-button">
          Add bot
        </A>
      </div>
      <div class="list">
        <div class="list-header">Bots</div>

        <Show when={loading()}>
          <div class="loading">Loading...</div>
        </Show>
        <Show when={error()}>
          <div class="error">{error()}</div>
        </Show>
        <For each={bots()}>
          {(bot) => {
            const maxLen = 10;
            let title = bot.title;
            if (title.length > maxLen) {
              title = title.slice(0, maxLen) + "...";
            }
            return (
              <div class="list-item">
                <div class="left">
                  <div class="status">
                    <div class={bot.status ? "active" : "not-active"}> </div>
                  </div>
                  <div class="separator"> </div>
                  <div class="item-title">{title}</div>
                </div>
                <div class="buttons">
                  <A href={"/bots/" + bot.id} class="blue-button">
                    Edit
                  </A>
                  <div class="separator"> </div>

                  <Show
                    when={!bot.status}
                    fallback={
                      <button
                        class="yellow-button"
                        onClick={() => stopBot(bot.id)}
                      >
                        Stop
                      </button>
                    }
                  >
                    <button
                      class="green-button"
                      onClick={() => navigate(`/bots/${bot.id}/start`)}
                    >
                      Start
                    </button>
                  </Show>
                  <div class="separator"> </div>
                  <button class="red-button" onClick={[deleteBot, bot.id]}>
                    Delete
                  </button>
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
