import { Title } from "@solidjs/meta";
import "./App.css";
import Header from "./containers/Header";
import { For, createEffect, createSignal } from "solid-js";
import { useAppState } from "./AppContext";

function App(props: any) {
  const appState = useAppState();
  const [errors, setErrors] = createSignal<Array<string>>([]);
  createEffect(() => {
    if (appState.error) {
      let err = appState.error;
      setErrors((errors) => [...errors, appState.error]);

      setTimeout(() => {
        setErrors((errors) => errors.filter((error) => error != err));
      }, 5000);
    }
  });

  return (
    <>
      <Title>Bot constructor</Title>
      <Header />
      {props.children}
      <div class="global-errors">
        <For each={errors()}>
          {(error) => (
            <div class="global-error">
              <div class="error">{error}</div>
            </div>
          )}
        </For>
      </div>
    </>
  );
}

export default App;
