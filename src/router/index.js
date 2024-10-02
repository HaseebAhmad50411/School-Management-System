import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { Cookies, LocalStorage } from "quasar";
import { Notify } from "quasar";

export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
    const token = cookies.get("token");
    const settings = LocalStorage.getItem("settings") || {};
    const permissions = settings?.permissions || [];
    const isAdmin = settings?.is_admin || false;

    if (Boolean(to.meta.auth)) {
      console.log("1", Boolean(token));
      if (!Boolean(token)) {
        console.log("2");
        return next({ path: "/" });
      }

      if (to.meta.requiresAdmin && !isAdmin) {
        console.log("User is not an admin, redirecting to home.");
        Notify.create({
          type: "negative",
          message: "User is not an admin, redirecting to home.",
        });
        return next({ path: "/home" });
      }

      return next();
    } else {
      if (Boolean(token)) {
        console.log("3");
        return next({ path: "/home" });
      }

      return next();
    }
  });

  return Router;
});
