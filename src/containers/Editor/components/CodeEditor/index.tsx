import { createSignal } from "solid-js";
import "./style.css";

export interface CodeEditorHandlers {
  onSave?(code: string): void;
  onCancel?(): void;
}

export interface CodeEditorData {
  code?: string;
}

export interface CodeEditorProps {
  handlers?: CodeEditorHandlers;
  data?: CodeEditorData;
}
export default function CodeEditor(props: CodeEditorProps) {
  // eslint-disable-next-line solid/reactivity
  const [code, setCode] = createSignal(props.data?.code ?? "");
  return (
    <div id="code-editor">
      <textarea
        class="code-area"
        placeholder="Enter code"
        onInput={(event) => setCode(event.target.value)}
      >
        {props.data?.code}
      </textarea>
      <div class="buttons">
        <button
          class="green-button"
          onClick={() => {
            props.handlers?.onSave?.(code());
          }}
        >
          Save
        </button>
        <div class="separator" />
        <button
          class="yellow-button"
          onClick={() => props.handlers?.onCancel?.()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
