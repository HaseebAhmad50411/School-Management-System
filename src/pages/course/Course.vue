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
              @click="createNewClass"
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
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
              <q-td auto-width>
                <q-btn
                  icon="mode_edit"
                  color="purple-9"
                  @click="showEditDialog(props.row)"
                />
                <q-btn
                  color="negative"
                  icon="delete"
                  @click="onDelete(props.row.id)"
                />
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div>
                  <p class="text-bold">Teachers</p>
                  <div v-if="props.row.teachers.length">
                    <div
                      v-for="teacher in props.row.teachers"
                      :key="teacher.id"
                    >
                      <p>{{ teacher.name }} ({{ teacher.email }})</p>
                    </div>
                  </div>
                  <div v-else>
                    <p>No teachers available.</p>
                  </div>
                </div>
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div>
                  <p class="text-bold">Students</p>
                  <div v-if="props.row.students.length">
                    <div
                      v-for="student in props.row.students"
                      :key="student.id"
                    >
                      <p>{{ student.name }} ({{ student.email }})</p>
                    </div>
                  </div>
                  <div v-else>
                    <p>No students available.</p>
                  </div>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <section class="flex justify-between q-pa-xl"></section>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "src/api/api";
import { Cookies } from "quasar";

export default defineComponent({
  name: "CourseList",
  data() {
    return {
      editDialog: false,
      row: {
        name: "",
        email: "",
      },
      searchQuery: "",
      data: [],
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.id,
          sortable: true,
        },
        {
          name: "class",
          label: "Class",
          align: "left",
          field: (row) => row.class,
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          align: "right",
        },
      ],
      loading: false,
    };
  },
  methods: {
    logOut() {
      Cookies.remove("token");
      this.$router.push({ path: "/" });
      window.location.reload();
    },
    showEditDialog(row) {
      this.row = { ...row };
      this.editDialog = true;
    },
    createNewClass() {
      this.$router.push({ path: "/course_form" });
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
        const res = await api("get", "courses", {
          params: {
            search: this.searchQuery,
          },
        });
        this.data = res.data.data;
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
