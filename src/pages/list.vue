<template>
  <header class="window-width">
    <div class="row justify-center">
      <div class="col-8">
        <q-input label="Search" />
      </div>
    </div>
  </header>
  <section class="flex flex-center">
    <div class="row">
      <q-card>
        <q-card-section class="row">
          <div class="col">
            <q-img
              src="assets/user-icon-vector-with-blue-background-suitable-web-design-etc_266866-110.jpg"
              size="full-width"
            />
          </div>
          <div class="col"></div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row">
      <q-card> </q-card>
    </div>
    <div class="row">
      <q-card> </q-card>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "mainList",
});
</script>
