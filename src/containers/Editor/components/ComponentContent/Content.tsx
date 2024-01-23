import { JSX, children } from "solid-js";
import "./Content.css";

export default function Content(props: {
  children: JSX.Element;
  componentName: string;
}) {
  const c = children(() => props.children);

  return (
    <div class="component-content-container">
      <div class="component-name">{props.componentName}</div>
      <div class="component-content">{c()}</div>
    </div>
  );
}
