<template>
  <q-item>
    <q-item-section>
      <q-item-label>
        <q-btn tag="a" target="_blank" :href="link" rounded flat>
          <q-icon class="q-mr-sm" :name="icon" />{{ title }}</q-btn
        >
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CoinetsLinks",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>
<style scoped>
.q-btn:active {
  background-color: greenyellow;
}
</style>
