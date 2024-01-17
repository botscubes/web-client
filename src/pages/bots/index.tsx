import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

export default function Bots() {
  return (
    <>
      <Title>Bots</Title>
      <A href="/bots/add">Add bot</A>

      <div>Bots</div>
    </>
  );
}
