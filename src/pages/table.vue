<template>
  <div class="heading-sec">
    <h3 class="q-mt-none q-pt-md q-pb-md" style="color: aliceblue">
      courses
      <hr />
    </h3>
  </div>
  <div class="q-pa-sm q-ma-sm q-mt-xl">
    <div class="container">
      <h4>course List</h4>
      <div class="inner q-ma-sm">
        <div class="row">
          <div class="col q-pt-md">
            <q-btn
              class="q-mx-sm"
              @click="fetchData"
              label="Refresh"
              color="red"
            />
          </div>
          <div class="col q-pt-md">
            <q-btn
              class="q-mx-sm"
              label="Create New course"
              color="red"
              @click="createNewcourse"
            />
          </div>
          <div class="col">
            <q-input
              v-model="searchQuery"
              @keyup.enter="onSearch"
              label="Search"
              rounded
            />
          </div>
        </div>
      </div>
      <div class="q-pa-md">
        <div class="row">
          <div
            class="col-12 q-ma-sm"
            v-for="(group, course) in groupedData"
            :key="course"
          >
            <h4 class="text-bold">Class : {{ course }}</h4>
            <q-table
              row-key="id"
              :rows="group"
              :columns="columns"
              :loading="loading"
            >
              <template v-slot:body-cell-students="props">
                <q-tr :props="props">
                  <div v-for="student in props.row.students" :key="student.id">
                    <td class="text-bold">
                      Name
                      <hr />
                      <p>{{ student.name }}</p>
                    </td>
                    <td class="text-bold">
                      Email:
                      <hr />
                      <p>{{ student.email }}</p>
                    </td>
                  </div>
                </q-tr>
              </template>
              <template v-slot:body-cell-teachers="props">
                <q-td :props="props">
                  <div v-for="teacher in props.row.teachers" :key="teacher.id">
                    <td class="text-bold">
                      Name
                      <hr />
                      <p>{{ teacher.name }}</p>
                    </td>
                    <td class="text-bold">
                      Email:
                      <hr />
                      <p>{{ teacher.email }}</p>
                    </td>
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-actions="props">
                <td :props="props" align="right">
                  <q-btn
                    color="primary"
                    icon="mode_edit"
                    @click="showEditDialog(props.row)"
                  ></q-btn>
                  <q-btn
                    color="red"
                    icon="delete"
                    @click="onDelete(props.row.id)"
                  ></q-btn>
                </td>
              </template>
            </q-table>
            <q-dialog v-model="editDialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Update the existing row!</div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <div class="col-12">
                      <q-input
                        v-model="row.class"
                        label="Class"
                        required
                      ></q-input>
                    </div>
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    class="q-mt-lg"
                    flat
                    rounded
                    label="Cancel"
                    v-close-popup
                  />
                  <q-btn
                    class="q-mt-lg"
                    color="orange-8"
                    label="Save"
                    @click="saveUpdate()"
                    rounded
                  ></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="flex justify-between q-pa-xl"></section>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "src/api/api";
import { useRoute } from "vue-router";
import { Cookies } from "quasar";
export default {
  name: "courseTable",
  data() {
    return {
      editDialog: false,
      row: {
        id: null,
        class: "",
      },
      searchQuery: "",
      data: [],
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: "id",
          sortable: true,
        },
        {
          name: "students",
          label: "Students",
          align: "left",
          field: "students",
          sortable: true,
        },
        {
          name: "teachers",
          label: "Teachers",
          align: "left",
          field: "teachers",
          sortable: true,
        },

        {
          name: "actions",
          label: "Actions",
          align: "right",
        },
      ],
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
    };
  },
  computed: {
    groupedData() {
      const grouped = {};
      this.data.forEach((row) => {
        if (!grouped[row.class]) {
          grouped[row.class] = [];
        }
        grouped[row.class].push(row);
      });
      return grouped;
    },
  },
  methods: {
    showEditDialog(row) {
      this.row = { ...row }; // Ensure you're copying the row data
      this.editDialog = true;
    },
    createNewcourse() {
      this.$router.push({ path: "/form" });
    },
    async saveUpdate() {
      const rowId = this.row.id;
      try {
        const res = await api("put", `courses/${rowId}`, this.row);
        if (res.status === 200) {
          const index = this.data.findIndex((row) => row.id === rowId);
          if (index !== -1) {
            this.data.splice(index, 1, this.row);
            this.editDialog = false;
          }
        } else {
          console.error("Error updating row:", res);
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
        console.error("Error deleting row:", error);
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
            page: this.pagination.page,
            per_page: this.pagination.rowsPerPage,
            search: this.searchQuery,
          }
        );
        this.data = res.data.data;
        this.pagination = {
          page: res.data.current_page,
          rowsPerPage: res.data.per_page,
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },
    async onSearch() {
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
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

.q-table__top tr:first-child {
  font-weight: bolder;
  background-color: rgb(117, 5, 5);
}

.q-table__top,
thead tr:first th {
  background-color: rgb(203, 29, 17);
}

.log-out {
  margin-right: 1em;
}
</style>
