import { lazy } from "solid-js";

export const botRoutes = {
  path: "/bots",
  children: [
    {
      path: "/",
      component: lazy(() => import("../pages/bots/index.tsx")),
    },
    {
      path: "/add",
      component: lazy(() => import("../pages/bots/add.tsx")),
    },
    {
      path: "/:id",
      children: [
        {
          path: "",
          component: lazy(() => import("../pages/bots/edit.tsx")),
        },
        {
          path: "/start",
          component: lazy(() => import("../pages/bots/start.tsx")),
        },
      ],
    },
  ],
};
