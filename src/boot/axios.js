import { boot } from "quasar/wrappers";
import axios from "axios";
import { Cookies, Notify, LocalStorage } from "quasar";
import { useRoute } from "vue-router";

const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_URL });
api.defaults.headers.common["Content-Type"] = "application/json";
api.defaults.headers.common["Accept"] = "application/json";

export default boot(({ app }) => {
  // set default to use withCredentials
  api.defaults.withCredentials = false;

  api.interceptors.request.use(async (req) => {
    // Automatically append the authorization header
    const token = cookies.get("token");

    if (token) {
      req.headers["Authorization"] = "Bearer " + token;
    }

    // Automatically append the Content type header if its not set
    req.headers["Content-Type"] = req.headers["Content-Type"]
      ? req.headers["Content-Type"]
      : "application/json";
    return Promise.resolve(req);
  });

  // Intercept every response to see if we got an authentication error. If yes then make the user re-login
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        cookies.remove("token");
        LocalStorage.remove("settings");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
      return Promise.reject(error);
    }
  );

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
