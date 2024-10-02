<template>
  <div class="absolute-center full-width">
    <q-form
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="flex justify-center"
      @submit.prevent="submitForm"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '38%' }"
        id="app"
        class="card"
      >
        <h4 class="q-mt-sm q-mb-md">Log In</h4>
        <div class="row">
          <div class="col-12 q-mt-sm">
            <q-input
              type="email"
              v-model="login.email"
              label="Email"
              required
            ></q-input>
          </div>
          <div class="col-12 q-mt-sm">
            <q-input
              v-model="login.password"
              label="Password"
              type="password"
              required
            ></q-input>
          </div>
        </div>
        <q-btn
          class="full-width q-mt-lg"
          color="purple-9"
          label="Login"
          type="submit"
          rounded
        ></q-btn>
        <q-card-section>
          Don't have an account?
          <q-btn @click="signUp()" flat color="purple-9" label="Sign Up" />
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import { Cookies, LocalStorage } from "quasar";
import { api } from "src/api/api";
import { Notify } from "quasar";

export default {
  name: "LogIn",
  data() {
    return {
      login: {
        password: "",
        email: "",
      },
      user: null, // Add this line
    };
  },
  methods: {
    signUp() {
      return this.$router.push({ path: "/signUp" });
    },
    async submitForm() {
      if (!this.login.password || !this.login.email) {
        this.$q.notify({
          type: "negative",
          message: "All fields are required",
        });
      } else {
        try {
          const res = await api("post", "login", this.login);
          const { access_token, user } = res.data;
          // Store the token
          Cookies.set("token", access_token);

          // Store user settings in LocalStorage
          const settings = {
            is_admin: user.is_admin,
            permissions: user.permissions,
            // other settings
          };
          LocalStorage.set("settings", settings);

          // Store user data in the component state
          this.user = user;

          // Notify user of successful login
          this.$q.notify({
            type: "positive",
            message: "You have successfully Logged In!",
          });
          console.log(settings);

          // Redirect based on user role
          if (settings.is_admin) {
            this.$router.push({ path: "/admin" });
          } else {
            this.$router.push({ path: "/home" });
          }

          // Reload the page to apply changes
          window.location.reload();
        } catch (error) {
          // Handle error (e.g., invalid credentials)
          this.$q.notify({
            type: "negative",
            message:
              "Login failed. Please check your credentials and try again.",
          });
        }
      }
    },
  },
};
</script>

<style>
body {
  background-color: rgb(68, 68, 68);
  min-height: 100vh;
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgb(0, 0, 0), rgb(101, 9, 187));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgb(0, 0, 0), rgb(101, 9, 187));
}
.card {
  border-radius: 10px;
  padding: 5em;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.7);
}
h4 {
  text-align: center;
  font-weight: bold;
}
.input {
  border: none;
  margin: 1px 0px;
  width: 100%;
}
.q-card .q-form .q-card {
  background-color: black;
  color: white;
}
</style>
