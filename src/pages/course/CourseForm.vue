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
        <h4 class="q-mt-sm q-mb-md">Class Form</h4>
        <div class="row">
          <div class="col-12 q-mt-sm q-mb-sm">
            <q-input
              v-model="data.class"
              label="Class"
              type="text"
              required
            ></q-input>
          </div>
        </div>
        <q-btn
          class="full-width q-mt-lg"
          color="purple-9"
          label="Submit"
          type="submit"
          rounded
        ></q-btn>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import { Cookies, Notify } from "quasar";
import { api } from "src/api/api";

export default {
  name: "CourseForm",
  data() {
    return {
      data: {
        class: "",
      },
    };
  },
  methods: {
    async submitForm() {
      console.log(this.data.class);
      if (!this.data.class) {
        this.$q.notify({
          type: "negative",
          message: "All fields are required",
        });
      } else {
        try {
          const res = await api("post", "courses", this.data);

          this.$q.notify({
            type: "positive",
            message: "Course created successfully",
          });
          this.$router.push({ path: "/home" });
        } catch (error) {
          console.error("Error submitting form:", error);
          this.$q.notify({
            type: "negative",
            message: "Failed to submit the form",
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
  background-color: white;
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
</style>
