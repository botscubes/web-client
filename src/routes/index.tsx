import { Title } from "solid-start";
import Counter from "~/components/Counter";
import Editor from "~/containers/Editor";

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <Editor />
    </main>
  );
}
