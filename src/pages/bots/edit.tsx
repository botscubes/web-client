import { useParams } from "@solidjs/router";
import { useAppState } from "~/AppContext";
import Editor from "~/containers/Editor";

export default function Edit() {
  const appState = useAppState();
  const params = useParams();
  const id: number = parseInt(params.id, 10);

  return (
    <div class="editor-page">
      <Editor
        token={appState.token}
        logger={appState.logger}
        botId={id}
        httpClient={appState.httpClient}
      />
    </div>
  );
}
