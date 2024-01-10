import { Title } from "@solidjs/meta";
import "./App.css";
import Header from "./containers/Header";

function App(props: any) {
  return (
    <>
      <Title>Bot constructor</Title>
      <Header />
      {props.children}
    </>
  );
}

export default App;
