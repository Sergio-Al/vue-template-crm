<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useQuasar, QUploader } from 'quasar';

import { useAsyncState } from '@vueuse/core';

import {
  dataFormatCRM3,
  dataFormatCRM3Basic,
} from 'src/conections/conexionCRM3';

import { userStore } from 'src/modules/Users/store/UserStore';
import { axiosCRM3 } from 'src/conections/axiosPRY';

interface DocumentForm {
  name: string;
  date_added: string;
  fileName: string;
  date_exp: string;
  status: string;
  assigned_user_id: string;
}

interface Emits {
  (e: 'update', id: string): void;
}

const emits = defineEmits<Emits>();

const $q = useQuasar();
const { userCRM } = userStore();
const uploadFileRef = ref<InstanceType<typeof QUploader> | null>();

const data = ref({} as DocumentForm);
const headerId = ref<string>('');

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const uploadFiles = async (file: File[]) => {
  console.log(file);

  dataFormatCRM3;

  try {
    const fileToUpload = (await toBase64(file[0])) as string; // Guardando el archivo en BASE64

    const dataSend = {
      Ext: file[0].name.split('.').pop(),
      Name: file[0].name,
      user_id: userCRM.id,
      File: fileToUpload.replace(/^data:(.*,)?/, ''),
      id_header: headerId,
    };

    const data = dataFormatCRM3Basic('project_upload_photos', {
      data: dataSend,
    }); // enviando peticion al endpoint en PHP CRM 3

    await axiosCRM3.post('', data);
  } catch (error) {
    throw error;
  }
};

const onSubmit = async () => {
  try {
    $q.loading.show({
      message: 'Guardando información',
    });

    console.log('formulario', data);

    // Servicio para guardar informacion del documento (formulario)
    // const response =  await createDocumentInfo(data);
    // header.value =  response.data.id;
    headerId.value = '1'; // '1' es un id falso
    uploadFileRef.value?.upload();
    emits('update', '1'); // '1' es un id falso
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error al guardar el archivo',
    });
  } finally {
    $q.loading.hide();
  }
};
</script>

<template>
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
        v-model="data.date_exp"
        type="text"
        outlined
        dense
        label="Fecha de caducidad"
      />
      <q-input
        class="col-12 col-md-6"
        v-model="data.assigned_user_id"
        type="text"
        outlined
        dense
        label="Responsable"
      />
      <q-uploader
        :factory="uploadFiles"
        bordered
        class="col-12 q-mt-sm"
        color="primary"
        flat
        label="Añadir documento"
        ref="uploadFileRef"
        style="min-width: fit-content"
      />
    </div>
    <q-card-actions vertical align="left">
      <q-btn label="Guardar" color="primary" @click="onSubmit" />
    </q-card-actions>
  </q-card>
</template>
