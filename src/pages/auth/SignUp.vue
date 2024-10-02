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
        <h4 class="q-mt-sm q-mb-md">Sign Up</h4>
        <div class="row">
          <div class="col-12 q-mt-sm">
            <q-input
              type="name"
              v-model="register.name"
              label="Name"
              required
            ></q-input>
          </div>
          <div class="col-12 q-mt-sm">
            <q-input
              type="email"
              v-model="register.email"
              label="Email"
              required
            ></q-input>
          </div>
          <div class="col-12 q-mt-sm">
            <q-input
              v-model="register.password"
              label="Password"
              type="password"
              required
            ></q-input>
          </div>
        </div>
        <q-btn
          class="full-width q-mt-lg"
          color="purple-9"
          label="register"
          type="submit"
          rounded
        ></q-btn>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import { stringify } from "postcss";
import { Cookies } from "quasar";
import { api } from "src/api/api";
import { boot } from "quasar/wrappers";
import { Axios } from "axios";
import { Notify } from "quasar";
import { useRoute } from "vue-router";

export default {
  name: "signUp",
  data() {
    return {
      register: {
        name: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    async submitForm() {
      if (
        !this.register.name ||
        !this.register.password ||
        !this.register.email
      ) {
        this.$q.notify({
          type: "negative",
          message: "All fields are required",
        });
      } else {
        const res = await api("post", "register", this.register);

        this.$q.notify({
          type: "positive",
          message: "You have successfully submitted a User!",
        });
        this.$router.push({ path: "/" });
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
