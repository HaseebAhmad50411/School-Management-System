<template>
  <div class="heading-sec">
    <h3 style="color: aliceblue" class="q-mt-none q-pt-md q-pb-md">
      Classes
      <hr />
    </h3>
    <div>
      <q-btn
        @click="logOut"
        class="log-out absolute absolute-top-right q-mt-lg"
        label="Log out"
        outline
        style="color: white"
      />
    </div>
  </div>
  <div class="q-pa-sm q-ma-sm q-mt-xl">
    <div class="container">
      <h4>List Of Classes</h4>
      <div class="inner q-ma-sm">
        <div class="row">
          <div class="col q-pt-md">
            <q-btn
              class="q-mx-sm"
              @click="fetchData"
              label="Refresh"
              color="purple-9"
            />
          </div>
          <div class="col q-pt-md">
            <q-btn
              class="q-mx-sm"
              label="Create New Class"
              color="purple-9"
              @click="createNewCourse"
            />
          </div>
          <div class="col">
            <q-input
              v-model="searchQuery"
              @keyup.enter="onSearch"
              label="Search"
              rounded
            >
            </q-input>
          </div>
        </div>
      </div>
      <div class="q-pa-md">
        <q-table
          flat
          bordered
          title="List Of Courses"
          :rows="data"
          :columns="columns"
          :loading="loading"
          row-key="id"
          title-class="text-white"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
              <q-th auto-width />
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="accent"
                  round
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                />
              </q-td>
              <td auto-width></td>
              <td>
                <p>{{ props.row.class }}</p>
              </td>

              <q-td auto-width>
                <q-btn
                  icon="mode_edit"
                  color="purple-9"
                  @click="showEditDialog(props.row)"
                />
                <q-btn color="primary" @click="showAttachDialog(props.row)"
                  ><i style="font-size: 1.6em" class="bi bi-paperclip"></i
                ></q-btn>
                <q-btn
                  color="negative"
                  icon="delete"
                  @click="onDelete(props.row.id)"
                />
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <tr>
                <q-td colspan="100%">
                  <p class="text-bold">Teachers</p>
                  <div v-if="props.row.teachers.length">
                    <td>
                      <q-td>
                        <tr class="text-bold">
                          <td>Name</td>
                        </tr>
                        <div
                          v-for="teacher in props.row.teachers"
                          :key="teacher.id"
                        >
                          <td>
                            <p>{{ teacher.name }}</p>
                          </td>
                        </div>
                      </q-td>
                    </td>

                    <td>
                      <q-td>
                        <tr class="text-bold">
                          <td>Email</td>
                        </tr>
                        <div
                          v-for="teacher in props.row.teachers"
                          :key="teacher.id"
                        >
                          <td>
                            <p>{{ teacher.email }}</p>
                          </td>
                        </div>
                      </q-td>
                    </td>
                  </div>
                  <div v-else>
                    <p>No teachers available.</p>
                  </div>
                </q-td>
              </tr>
              <tr>
                <q-td colspan="100%">
                  <p class="text-bold">Students</p>
                  <div v-if="props.row.students.length">
                    <td>
                      <q-td>
                        <tr class="text-bold">
                          <td>Name</td>
                        </tr>
                        <div
                          v-for="student in props.row.students"
                          :key="student.id"
                        >
                          <td>
                            <p>{{ student.name }}</p>
                          </td>
                        </div>
                      </q-td>
                    </td>

                    <td>
                      <q-td>
                        <tr class="text-bold">
                          <td>Email</td>
                        </tr>
                        <div
                          v-for="student in props.row.students"
                          :key="student.id"
                        >
                          <td>
                            <p>{{ student.email }}</p>
                          </td>
                        </div>
                      </q-td>
                    </td>
                  </div>
                  <div v-else>
                    <p>No students available.</p>
                  </div>
                </q-td>
              </tr>
              <tr>
                <q-td colspan="100%">
                  <p class="text-bold">subjects</p>
                  <div v-if="props.row.subjects.length">
                    <td>
                      <q-td>
                        <tr class="text-bold">
                          <td>Subject Name</td>
                        </tr>
                        <div
                          v-for="subject in props.row.subjects"
                          :key="subject.id"
                        >
                          <td>
                            <p>{{ subject.subject_name }}</p>
                          </td>
                        </div>
                      </q-td>
                    </td>
                  </div>
                  <div v-else>
                    <p>No subjects available.</p>
                  </div>
                </q-td>
              </tr>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
  <q-dialog v-model="editDialog">
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-12">
            <q-input label="Name" required v-model="row.class" />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn color="purple-9" label="Update" @click="saveUpdate" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="attachDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Attach Teacher</div>
      </q-card-section>

      <q-card-section>
        <div class="q-ma-md">
          <div class="row">
            <q-input
              style="min-width: 20em; max-width: 25em"
              v-model="row.course_id"
              readonly
              label="Course ID"
            />
          </div>
          <div class="row">
            <q-select
              borderless
              v-model="row.teacher_id"
              :options="teacherOptions"
              option-value="id"
              option-label="name"
              label="Teachers"
              option-disable="inactive"
              emit-value
              map-options
              multiple
              style="min-width: 20em; max-width: 25em"
            />
          </div>
          <div class="row">
            <q-select
              borderless
              v-model="row.student_id"
              :options="studentOptions"
              option-value="id"
              option-label="name"
              label="Students"
              option-disable="inactive"
              emit-value
              map-options
              multiple
              style="min-width: 20em; max-width: 25em"
            />
          </div>
          <div class="row">
            <q-select
              borderless
              v-model="row.subject_id"
              :options="subjectOptions"
              option-value="id"
              option-label="subject_name"
              label="Subject Name"
              option-disable="inactive"
              emit-value
              map-options
              multiple
              style="min-width: 20em; max-width: 25em"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn color="purple-9" label="Attach" @click="associate" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <section class="flex justify-between q-pa-xl"></section>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "src/api/api";
import { useRoute } from "vue-router";
import { Cookies } from "quasar";

export default defineComponent({
  name: "CourseList",
  data() {
    return {
      editDialog: false,
      attachDialog: false,
      row: {
        class: "",
        course_id: null,
        teacher_id: [],
        student_id: [],
        subject_id: [],
      },
      subjectOptions: [],
      teacherOptions: [],
      studentOptions: [],

      searchQuery: "",
      data: [],
      columns: [
        {
          name: "id",
          required: true,
          label: "",
          align: "left",
          sortable: true,
        },
        {
          name: "class",
          label: "Class",
          align: "left",
        },
        {
          name: "actions",
          label: "Action",
          align: "right",
        },
      ],
      loading: false,
    };
  },
  methods: {
    logOut() {
      Cookies.remove("token", null);
      this.$router.push({ path: "/" });
      window.location.reload();
    },
    showAttachDialog(row) {
      this.row = { ...row };
      this.row.course_id = row.id; // Automatically set course_id to row.id
      this.attachDialog = true;
    },
    showEditDialog(row) {
      this.row = { ...row };
      this.editDialog = true;
    },
    createNewCourse() {
      this.$router.push({ path: "/course_form" });
    },
    async fetchStudents() {
      try {
        const res = await api("get", "students");
        this.studentOptions = res.data.data.map((student) => ({
          id: student.id,
          name: student.name,
        }));
      } catch (error) {
        console.error("Error fetching students:", error);
        this.$q.notify({
          type: "negative",
          message: "Failed to fetch students",
        });
      }
    },
    async fetchTeachers() {
      try {
        const res = await api("get", "teachers");
        this.teacherOptions = res.data.data.map((teacher) => ({
          id: teacher.id,
          name: teacher.name,
        }));
      } catch (error) {
        console.error("Error fetching teachers:", error);
        this.$q.notify({
          type: "negative",
          message: "Failed to fetch teachers",
        });
      }
    },
    async fetchSubjects() {
      try {
        const res = await api("get", "subjects");
        this.subjectOptions = res.data.data.map((subject) => ({
          id: subject.id,
          subject_name: subject.subject_name,
        }));
      } catch (error) {
        console.error("Error fetching subjects:", error);
        this.$q.notify({
          type: "negative",
          message: "Failed to fetch subjects",
        });
      }
    },
    async associate() {
      const rowId = this.row.id;
      try {
        await api("post", `courses/${rowId}/associate`, {
          teacher_id: this.row.teacher_id,
          student_id: this.row.student_id,
          subject_id: this.row.subject_id,
          course_id: this.row.id,
        });
        const index = this.data.findIndex((row) => row.id === rowId);
        if (index !== -1) {
          this.data[index] = {
            ...this.data[index],
            teacher_id: this.row.teacher_id,
            student_id: this.row.student_id,
            subject_id: this.row.subject_id,
            course_id: this.row.id,
          };
        }
        this.row = {};
        this.attachDialog = false;
        this.fetchData(); // Refresh the data to reflect the changes
      } catch (error) {
        console.error("Error attaching entities:", error);
        this.$q.notify({
          type: "negative",
          message: "Failed to attach entities",
        });
      }
    },
    async saveUpdate() {
      const rowId = this.row.id;
      try {
        await api("put", `courses/${rowId}`, this.row);
        const index = this.data.findIndex((row) => row.id === rowId);
        if (index !== -1) {
          this.data.splice(index, 1, this.row);
          this.row = {};
          this.editDialog = false;
        }
      } catch (error) {
        console.error("Error updating row:", error);
      }
    },
    async onDelete(id) {
      this.loading = true;
      try {
        await api("delete", `courses/${id}`);
        this.data = this.data.filter((row) => row.id !== id);
      } catch (error) {
        console.error("Error deleting data:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchData() {
      this.loading = true;
      try {
        const res = await api(
          "get",
          "courses",
          {},
          {
            search: this.searchQuery,
          }
        );
        this.data = res.data.data;
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },
    async onSearch() {
      await this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
    this.fetchTeachers();
    this.fetchStudents();
    this.fetchSubjects();
  },
});
</script>

<style>
.heading-sec {
  background-color: rgb(68, 68, 68);
  text-align: center;
  color: rgb(20, 20, 20);
  background: linear-gradient(to right, rgb(0, 0, 0), rgb(101, 9, 187));
}
body {
  background-color: rgb(255, 255, 255);
}
h3 {
  font-weight: bold;
}
.container {
  border: none;
  box-shadow: 0px 0px 10px rgba(100, 100, 100, 0.7);
  padding: 1em;
}
h4 {
  text-align: center;
  margin-bottom: 0.5em;
  margin-top: 0.1em;
}
.inner {
  padding: 1em;
  border: 1px solid rgb(228, 224, 224);
}
th {
  font-weight: bolder;
  color: rgb(255, 255, 255);
}
.q-table__top,
thead tr:first-child th {
  background-color: rgb(101, 9, 187);
}
.log-out {
  margin-right: 1em;
}
</style>
