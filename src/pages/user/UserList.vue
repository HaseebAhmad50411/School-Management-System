<template>
  <div class="heading-sec">
    <h3 class="q-mt-none q-pt-md q-pb-md">
      Users
      <hr />
    </h3>
  </div>
  <div class="q-pa-sm q-ma-sm q-mt-xl">
    <div class="container">
      <h4>User List</h4>
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
          <div class="q-pa-sm q-gutter-sm"></div>
          <div class="col">
            <q-input label="  Search" rounded />
          </div>
        </div>
      </div>
      <div class="inner q-ma-md">
        <q-table
          row-key="id"
          :rows="data"
          :columns="columns"
          :loading="loading"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-btn
                outline
                disabled
                :style="{ color: getButtonColor(props.row.status) }"
              >
                {{ props.row.status === 1 ? "Active" : "In Active" }}
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-class="props">
            <q-td :props="props"> </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="mode_edit"
                @click="showEditDialog(props.row)"
              ></q-btn>
              <q-btn icon="delete" @click="onDelete(props.row.id)"></q-btn>
            </q-td>
          </template>
        </q-table>
        <q-dialog v-model="editDialog">
          <q-card>
            <q-card-section>
              <div class="row">
                <div class="col-12">
                  <q-input
                    v-model="row.name"
                    :rules="[
                      (val) =>
                        (typeof val === 'string' && val.length >= 3) ||
                        'Please use minimum 3 characters',
                      (val) =>
                        /^[A-Za-z\s]+$/.test(val) ||
                        'No symbols or special characters allowed',
                    ]"
                    label="Name"
                    required
                  ></q-input>
                </div>
                <div class="col-12 q-mt-lg">
                  <q-input
                    type="email"
                    v-model="row.email"
                    :rules="[
                      (val) => !!val || 'Email is required',
                      (val) =>
                        /\S+@\S+\.\S+/.test(val) ||
                        'Please enter a valid email address',
                    ]"
                    label="Email"
                    required
                  ></q-input>
                </div>

                <div class="col-5 q-ma-sm">
                  <q-checkbox
                    v-model="row.status"
                    label="Status"
                    :true-value="true"
                    :false-value="false"
                    :rules="[
                      (val) =>
                        typeof val === 'boolean' || 'Status must be a boolean',
                    ]"
                    required
                  ></q-checkbox>
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
                color="purple-9"
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

  <section class="flex justify-between q-pa-xl"></section>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "src/api/api";
import { Notify } from "quasar";
import { Axios } from "axios";
import { ref } from "vue";
export default {
  name: "userList",
  data() {
    return {
      editDialog: false,
      row: {
        name: "",
        email: "",
        status: "",
      },

      data: [],
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.id,
          rowat: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "name",
          label: "Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "email",
          label: "Email",
          align: "left",
          field: "email",
          sortable: true,
        },
        {
          name: "status",
          label: "Status",
          align: "left",
          field: "status",
          sortable: true,
        },

        {
          name: "actions",
          label: "Action",
        },

        // Add more columns as needed
      ],
      loading: false,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 5,
      },
    };
  },

  methods: {
    getButtonColor(status) {
      return status === 1 ? "green" : "red";
    },
    showEditDialog(row) {
      this.row = { ...row };
      this.editDialog = true;
    },

    async saveUpdate() {
      const rowId = this.row.id;
      try {
        const res = await api("put", `user/${rowId}`, this.row);
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
        const res = await api("delete", `user/${id}`, {}, this.data);
        console.log(res);
        this.data = res.data.data;
        console.log("refetchDataes.data:", res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchData() {
      this.loading = true;
      try {
        const res = await api("get", "user", {}, this.pagination);
        this.data = res.data.data;
        console.log("rfetchDataes.data: ", res.data);
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
  },

  mounted() {
    this.fetchData();
  },
};
</script>
<style>
.heading-sec {
  background-color: rgb(68, 68, 68);

  text-align: center;
  color: rgb(255, 255, 255);

  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgb(0, 0, 0), rgb(101, 9, 187));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
</style>
