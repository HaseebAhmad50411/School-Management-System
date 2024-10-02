<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      width="200"
      class="bg-green-1"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header
          ><div class="row text-large">
            <div class="col q-ml-lg">
              <q-icon size="large" name="grid_view" />
            </div>
            <div class="col q-mr-xl">COINTS</div>
          </div>
        </q-item-label>

        <CoinetsLinks
          v-for="link in coinetsLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <div class="row">
        <q-card
          class="lock-card q-ml-sm q-mb-sm col-11 bg-teal-10 absolute-bottom"
        >
          <q-card-section class="row">
            <div class="col">
              <q-btn rounded style="background-color: white" icon="lock" />
            </div>
            <div class="col relative-position">
              <q-icon
                color="light-green-12"
                class="card-icon col-2 absolute"
                size="500%"
                name="grid_view"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-mb-sm text-white text-bold">
              Gain full access to your finances with detailed analytics and
              graphs
            </div>

            <q-btn class="text-black" color="light-green-12" label="Access" />
          </q-card-section>
        </q-card>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import CoinetsLinks from "components/CoinetsLinks.vue";

const linksList = [
  {
    title: "Dashboard",
    icon: "widgets",
    link: "http://localhost:9000/#/dashboard",
  },
  {
    title: "Transaction",
    icon: "sync_alt",
  },
  {
    title: "Budgeting",
    icon: "folder_open",
  },
  {
    title: "Account",
    icon: "people",
  },
  {
    title: "Settings",
    icon: "settings",
  },
];

export default defineComponent({
  name: "DashboardLayout",

  components: {
    CoinetsLinks,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      coinetsLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style scoped>
.card-icon {
  top: -68%;
  left: 46%;
  opacity: 0.2;
}
.lock-card {
  border-radius: 10%;

  overflow: hidden;
}
.main-page {
  border-top-left-radius: 2em;
  margin-left: -2em;
}
</style>
