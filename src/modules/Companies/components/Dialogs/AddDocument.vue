<script lang="ts" setup>
import { ref, onMounted } from 'vue';

interface DocumentForm {
  name: string;
  date_added: string;
  fileName: string;
  date_exp: string;
  status: string;
  assigned_user_id: string;
}

const data = ref({} as DocumentForm);

onMounted(() => {
  console.log('mounted');
});
</script>

<template>
  <q-layout
    view="lHh LpR lff"
    container
    :style="{ 'max-height': $q.screen.lt.sm ? '100vh' : '95vh' }"
    style="height: 900px; width: 50rem; max-width: 100vw"
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

        <q-toolbar-title>Adicionar nuevo documento</q-toolbar-title>
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
        <q-card class="q-pa-sm" style="min-width: fit-content">
          <div class="row q-col-gutter-md q-px-md q-py-md">
            <q-input
              class="col-12 col-md-6"
              v-model="data.name"
              type="text"
              outlined
              dense
              label="Nombre"
            />
            <q-input
              class="col-12 col-md-6"
              v-model="data.date_added"
              type="text"
              outlined
              dense
              label="Fecha"
            />
            <q-input
              class="col-12 col-md-6"
              v-model="data.status"
              type="text"
              outlined
              dense
              label="Estado"
            />
            <q-input
              class="col-12 col-md-6"
              v-model="data.assigned_user_id"
              type="text"
              outlined
              dense
              label="Responsable"
            />
            <span class="q-mt-sm"> Documento </span>
            <q-uploader
              class="col-12 q-mt-sm"
              url="http://localhost:4444/upload"
              color="primary"
              flat
              bordered
              style="min-width: fit-content"
            />
          </div>
        </q-card>
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>
