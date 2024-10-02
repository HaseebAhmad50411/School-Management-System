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
        <h4 class="q-mt-sm q-mb-md">Student Form</h4>
        <div class="row">
          <div class="col-12 q-mt-sm">
            <q-input
              v-model="data.name"
              label="Name"
              type="text"
              required
            ></q-input>
          </div>
          <div class="col-12 q-mt-sm">
            <q-input
              type="email"
              v-model="data.email"
              label="Email"
              required
            ></q-input>
          </div>
          <div class="col-12 q-mt-sm">
            <q-file
              filled
              v-model="selectedFile"
              @update:model-value="handleFileChange"
              label="Upload Image"
              stack-label
            />
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
  name: "studentForm",
  data() {
    return {
      data: {
        name: "",
        email: "",
        img_id: null,
      },

      url: "",
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(file) {
      if (file && file.name) {
        console.log("handleFileChange: ", file);
        this.selectedFile = file;
        this.url = this.selectedFile.name; // Store only the file name
        this.uploadImage();
      } else {
        this.selectedFile = null;
        this.data.url = "";
      }
    },
    async submitForm() {
      if (!this.data.name || !this.data.email) {
        this.$q.notify({
          type: "negative",
          message: "All fields are required",
        });
        return;
      }

      try {
        const res = await api("post", "students", this.data);
        this.$q.notify({
          type: "positive",
          message: "student created successfully!",
        });
        this.$router.push({ path: "/home" });
      } catch (error) {
        console.error("Error submitting form:", error);
        this.$q.notify({
          type: "negative",
          message: "Failed to submit the form",
        });
      }
    },
    async uploadImage() {
      if (!this.selectedFile) {
        return; // No file selected, exit early
      }

      try {
        const formData = new FormData();
        formData.append("url", this.selectedFile);
        console.log("Uploading image:", this.selectedFile);
        const res = await api("post", "images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.data.img_id = res?.data?.image?.id || null;
        console.log("Image upload response:", res);

        this.$q.notify({
          type: "positive",
          message: "Image uploaded successfully!",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        this.$q.notify({
          type: "negative",
          message: "Failed to upload the image",
        });
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
