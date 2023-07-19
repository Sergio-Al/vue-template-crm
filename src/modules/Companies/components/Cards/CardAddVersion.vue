<script lang="ts" setup>
import { ref } from 'vue';
import { QUploader, useQuasar } from 'quasar';

import { userStore } from 'src/modules/Users/store/UserStore';
import type { Document } from '../../utils/types';
import { axiosCRM3 } from 'src/conections/axiosPRY';
import { dataFormatCRM3Basic } from 'src/conections/conexionCRM3';

interface Props {
  idDocument: string;
  data: Document;
}

interface Emits {
  (e: 'update'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const uploadFileRef = ref<InstanceType<typeof QUploader> | null>();

const $q = useQuasar();
const { userCRM } = userStore();

const data = ref({
  ...props.data,
  active_date: new Date().toISOString().substring(0, 10), // fecha actual
  version: ((!!props.data?.version ? +props.data?.version : 1) + 1).toString(), // nueva version
} as Document);

const uploadFiles = async (file: File[]) => {
  try {
    $q.loading.show({
      message: 'Guardando información',
    });

    const dataSend = {
      category_id: data.value.category?.value || '',
      template_type: data.value.type?.value || '',
      iddivision_c: data.value.iddivision_c || '',
      idamercado_c: data.value.idamercado_c || '',
      user_id_c: userCRM.id,
      header: props.idDocument,
      status_id: data.value.status_id,
      active_date: data.value.active_date,
      exp_date: data.value.exp_date,
    };

    const body = dataFormatCRM3Basic(
      'certif_upload_empresa',
      {
        data: dataSend,
      },
      file[0]
    );
    console.log(dataSend);
    await axiosCRM3.post('', body);
  } catch (error) {
    console.log('se guardó el documento');
  } finally {
    $q.loading.hide();
    emits('update');
  }
};

const onSubmit = async () => {
  uploadFileRef.value?.upload();
};
</script>

<template>
  <q-card class="q-pa-sm" style="min-width: fit-content">
    <q-card-section class="text-h6"> Adicionar documento </q-card-section>
    <div class="row q-col-gutter-md q-px-md q-py-md">
      <q-input
        class="col-12 col-md-6"
        v-model="data.active_date"
        outlined
        dense
        type="date"
        label="Fecha"
      />
      <q-input
        class="col-12 col-md-6"
        outlined
        dense
        v-model="data.version"
        type="text"
        label="Version"
        readonly
      />
      <q-input
        class="col-12"
        outlined
        v-model="data.description"
        dense
        type="text"
        label="Registro de cambio"
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

    <q-card-actions align="center">
      <q-btn label="Cancelar" color="negative" v-close-popup />
      <q-btn label="Adicionar" color="primary" @click="onSubmit" />
    </q-card-actions>
  </q-card>
</template>
