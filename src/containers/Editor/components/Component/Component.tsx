import { ComponentProps } from "./types";
import "./Component.css";

export default function Component(props: ComponentProps) {
  const handleDeleteButtonClick = () => {
    props.deleteComponent(props.component.id);
  };
  return (
    <div class="component">
      <button onClick={handleDeleteButtonClick}>delete</button>
      <p>{props.component.id}</p>
    </div>
  );
}
