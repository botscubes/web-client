import { createSignal } from "solid-js";
import { HTTPEditingContentProps } from "./types";

export default function HTTPEditingContent(props: HTTPEditingContentProps) {
  const [data, setData] = createSignal({
    url: props.data?.url,
    body: props.data?.body,
    header: props.data?.header,
    method: props.data?.method,
  });
  return (
    <div class="editing-content">
      <label for="url">url</label>
      <textarea
        id="url"
        class="vresize"
        name="url"
        rows="3"
        placeholder="Enter url"
        onInput={(event) =>
          setData((data) => ({
            ...data,
            url: event.target.value,
          }))
        }
      >
        {props.data?.url}
      </textarea>
      <label for="method">method</label>
      <textarea
        id="method"
        name="method"
        rows="1"
        placeholder="Enter method"
        onInput={(event) =>
          setData((data) => ({
            ...data,
            method: event.target.value,
          }))
        }
      >
        {props.data?.method}
      </textarea>
      <label for="header">header</label>
      <textarea
        id="header"
        class="vresize"
        name="header"
        rows="5"
        placeholder="Enter header"
        onInput={(event) =>
          setData((data) => ({
            ...data,
            header: event.target.value,
          }))
        }
      >
        {props.data?.header}
      </textarea>
      <label for="body">body</label>
      <textarea
        id="body"
        class="vresize"
        name="body"
        placeholder="Enter body"
        rows="10"
        onInput={(event) =>
          setData((data) => ({
            ...data,
            body: event.target.value,
          }))
        }
      >
        {props.data?.body}
      </textarea>
      <div class="buttons">
        <button
          class="green-button"
          onClick={() => {
            props.handlers?.onSave?.(data());
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
