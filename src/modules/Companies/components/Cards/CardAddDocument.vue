<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar, QUploader } from 'quasar';

import { useAsyncState } from '@vueuse/core';

import {
  dataFormatCRM3,
  dataFormatCRM3Basic,
} from 'src/conections/conexionCRM3';

import { userStore } from 'src/modules/Users/store/UserStore';
import { axiosCRM3 } from 'src/conections/axiosPRY';
import { selectedRepeatedKey } from '../../../Accounts/utils/ProvideKeys';
import { types } from 'util';

interface DocumentForm {
  name: string;
  date_added: string;
  fileName: string;
  date_exp: string;
  status: string;
  assigned_user_id: string;
  category: string;
}

interface Emits {
  (e: 'update', id: string): void;
}

const emits = defineEmits<Emits>();

const $q = useQuasar();
const { userCRM } = userStore();
const uploadFileRef = ref<InstanceType<typeof QUploader> | null>();

//const options = [ 'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
const status_doc = [
  'Activo',
  'Archivado',
  'Borrador',
  'Caducado',
  'En Revisión',
  'FAQ',
  'Pendiente',
];
const categories_doc = [
  'Base de Conocimiento',
  'Certificado de Comercialización',
  'Contrato',
  'Documento para cobranza',
  'File de cliente',
  'Garante',
  'Inventario',
  'Mercado',
  'Registro Sanitario',
];
const types_doc = ref([
  '2.1.1 Fotocopia de Representación Legal',
  '2.1.2 Certificado de Libre Venta',
]);

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
        label="Nombre del Documento"
      />
      <q-select
        class="col-12 col-md-6"
        v-model="data.status"
        :options="status_doc"
        type="text"
        outlined
        dense
        label="Estado"
      />
      <q-input
        class="col-12 col-md-6"
        v-model="data.data_added"
        type="date"
        outlined
        dense
        label="Fecha de Publicación"
      />
      <q-input
        class="col-12 col-md-6"
        v-model="data.date_exp"
        type="date"
        outlined
        dense
        label="Fecha de caducidad"
      />
      <q-select
        class="col-12 col-md-6"
        outlined
        v-model="data.category"
        :options="categories_doc"
        dense
        label="Categoría"
      />
      <q-select
        class="col-12 col-md-6"
        v-model="data.type"
        type="text"
        :options="types_doc"
        outlined
        dense
        label="Tipo"
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
