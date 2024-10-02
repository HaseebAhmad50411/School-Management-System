<template>
  <header class="heading-sec q-pa-sm">
    <h3 class="q-mt-sm q-mb-md">
      Welcome
      <hr />
    </h3>

    <div>
      <q-btn
        @click="logOut()"
        class="log-out absolute absolute-top-right q-mt-lg"
        label="Log out"
        outline
        style="color: white"
      />
    </div>
  </header>
  <section class="flex justify-center q-pa-xl">
    <div class="row q-mb-md">
      <div class="col">
        <q-card @click="teacherList()" class="cards q-px-xl q-py-xs">
          <q-card-section class="absolute-bottom text-center text-bold">
            <h4>Teacher</h4>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <q-card @click="noteacherList()" class="cards q-px-xl q-py-xs">
          <q-card-section class="absolute-bottom text-center text-bold">
            <h4>Teacher Detail</h4>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <q-card @click="studentList()" class="cards q-px-xl q-py-xs">
          <q-card-section class="absolute-bottom text-center text-bold">
            <h4>Student</h4>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <q-card @click="nostudentList()" class="cards q-px-xl q-py-xs">
          <q-card-section class="absolute-bottom text-center text-bold">
            <h4>Student Detail</h4>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <q-card @click="courseList()" class="cards q-px-xl q-py-xs">
          <q-card-section class="absolute-bottom text-center text-bold">
            <h4>Class</h4>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <q-card @click="nocourseList()" class="cards q-px-xl q-py-xs">
          <q-card-section class="absolute-bottom text-center text-bold">
            <h4>Class Detail</h4>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <q-card @click="subjectList()" class="cards q-px-xl q-py-xs">
          <q-card-section class="absolute-bottom text-center text-bold">
            <h4>Subject</h4>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <q-card @click="nosubjectList()" class="cards q-px-xl q-py-xs">
          <q-card-section class="absolute-bottom text-center text-bold">
            <h4>Subject Detail</h4>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col">
        <q-card @click="userList()" class="cards q-px-xl q-py-xs">
          <q-card-section class="absolute-bottom text-center text-bold">
            <h4>User</h4>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script>
import { Cookies, Loading } from "quasar";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Axios } from "axios";
export default defineComponent({
  name: "homePage",

  methods: {
    dashboard() {
      return this.$router.push({ path: "/dashboard" });
    },
    studentList() {
      return this.$router.push({ path: "/student_list" });
    },
    nostudentList() {
      return this.$router.push({ path: "/no_student_list" });
    },
    teacherList() {
      return this.$router.push({ path: "/teacher_list" });
    },
    noteacherList() {
      return this.$router.push({ path: "/no_teacher_list" });
    },
    courseList() {
      return this.$router.push({ path: "/course_list" });
    },
    nocourseList() {
      return this.$router.push({ path: "/no_course_list" });
    },
    subjectList() {
      return this.$router.push({ path: "/subject" });
    },
    nosubjectList() {
      return this.$router.push({ path: "/no_subject" });
    },
    userList() {
      return this.$router.push({ path: "/user" });
    },

    logOut() {
      Cookies.remove("token", null);
      this.$router.push({ path: "/" });
      window.location.reload();
    },
  },
});
</script>
<style>
header {
  background-color: rgb(68, 68, 68);
  margin-top: 0;

  text-align: center;
  color: white;

  /* fallback for old browsers */
  background: rgb(35, 35, 36);

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgb(8, 7, 8), rgb(101, 9, 182));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgb(0, 0, 0), rgb(101, 9, 187));
}
.log-out {
  margin-right: 4em;
}
h3,
h4 {
  font-weight: bold;
}
.cards {
  background-image: url("assets/gradient-dynamic-purple-lines-background_23-2148995757.avif");
  height: 15em;
  width: 45em;
  color: white;
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
