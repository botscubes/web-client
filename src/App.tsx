import { Title } from "@solidjs/meta";
import "./App.css";
import Header from "./containers/Header";
import { For, createEffect, createSignal } from "solid-js";
import { useAppState } from "./AppContext";

function App(props: any) {
  const appState = useAppState();
  const [errors, setErrors] = createSignal<Array<Error>>([]);
  createEffect(() => {
    if (appState.error) {
      let err = appState.error;
      setErrors((errors) => [...errors, err]);

      setTimeout(() => {
        setErrors((errors) => errors.filter((error) => error != err));
      }, 5000);
    }
  });

  return (
    <>
      <Title>Bot constructor</Title>
      <Header />
      <div id="content">{props.children}</div>
      <div class="global-errors">
        <For each={errors()}>
          {(error) => (
            <div class="global-error">
              <div class="error">{error.message}</div>
            </div>
          )}
        </For>
      </div>
    </>
  );
}

export default App;
