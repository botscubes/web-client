// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { AppContextProvider } from "./AppContext";
import Header from "./containers/Header";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Constructor</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <AppContextProvider>
          <Header />
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </AppContextProvider>
        <Scripts />
      </Body>
    </Html>
  );
}