<template>
  <div class="subject_form">
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
          class="subject_card"
        >
          <h4 class="sub_head q-mt-sm q-mb-md">Subject Form</h4>
          <div class="row">
            <div class="col-12 q-mt-sm q-mb-sm">
              <q-input
                v-model="data.subject_name"
                label="Subject Name"
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
  </div>
</template>

<script>
import { Notify } from "quasar";
import { api } from "src/api/api";

export default {
  name: "SubjectForm",
  data() {
    return {
      data: {
        subject_name: "",
      },
    };
  },
  methods: {
    async submitForm() {
      if (!this.data.subject_name) {
        this.$q.notify({
          type: "negative",
          message: "All fields are required",
        });
      } else {
        try {
          const res = await api("post", "subjects", this.data);

          this.$q.notify({
            type: "positive",
            message: "Subject created successfully",
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
.subject_form {
  background-color: rgb(68, 68, 68);
  min-height: 100vh;
  background: linear-gradient(to right, rgb(0, 0, 0), rgb(101, 9, 187));
}
.subject_card {
  background-color: white;
  border-radius: 10px;
  padding: 5em;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.7);
}
.sub_head {
  text-align: center;
  font-weight: bold;
}
</style>
