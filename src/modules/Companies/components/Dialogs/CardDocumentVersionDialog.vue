<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

onMounted(() => {
  console.log(props.id);
  console.log('ddd');
});

onUnmounted(() => {
  console.log('unmounted');
});
</script>
<template>
  <q-layout
    view="lHh LpR lff"
    container
    :style="{ 'max-height': $q.screen.lt.sm ? '100vh' : '95vh' }"
    style="height: 900px; width: 70rem; max-width: 100vw"
    class="bg-grey-3"
  >
    <q-header class="bg-primary text-white">
      <q-toolbar class="q-pa-lg">
        <q-btn
          v-if="$q.screen.lt.sm"
          color="primary"
          flat
          text-color="white"
          icon="arrow_back_ios"
          v-close-popup
        />
        <q-icon
          :class="$q.screen.lt.sm ? '' : 'q-ml-sm'"
          size="lg"
          name="group"
        />

        <q-toolbar-title>Versiones del Documento</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-separator />
    </q-header>

    <q-footer bordered class="bg-white text-primary q-pa-sm" align="right">
      <q-btn
        color="primary"
        icon="group_add"
        label="Confirmar"
        v-close-popup
        @click="() => {}"
      />
    </q-footer>

    <q-page-container>
      <q-page class="q-pa-none">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </q-card-section>
        </q-card>
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>
