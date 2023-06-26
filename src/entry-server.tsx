import {
  createHandler,
  renderAsync,
  StartServer,
} from "solid-start/entry-server";

export default createHandler(
  renderAsync((event) => <StartServer event={event} />)
);
const teset = 10;
function test(a: number, b: number) {
   return a+b+teset;
}

test()
