import { lazy } from "solid-js";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/index.tsx")),
  },
  {
    path: "*404",
    component: lazy(() => import("../pages/404.tsx")),
  },
  {
    path: "signup",
    component: lazy(() => import("../pages/signup.tsx")),
  },
  {
    path: "signin",
    component: lazy(() => import("../pages/signin.tsx")),
  },
];
