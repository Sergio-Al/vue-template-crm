<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { QUploader, useQuasar } from 'quasar';

import { userStore } from 'src/modules/Users/store/UserStore';
import type { Document } from '../../utils/types';
import { axiosCRM3 } from 'src/conections/axiosPRY';
import { dataFormatCRM3Basic } from 'src/conections/conexionCRM3';

interface Props {
  idDocument: string;
  data: Document;
  child: boolean
}

interface Emits {
  (e: 'update'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const uploadFileRef = ref<InstanceType<typeof QUploader> | null>();

const $q = useQuasar();
const { userCRM } = userStore();

onMounted(async () => {
  //console.log(props.child);
});

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
      user_id_c: userCRM.id,
      document_id: props.idDocument,
      date_entered: data.value.active_date,
      revision:data.value.version,
      change_log:data.value.description
    };

    //const method = props.child?'certif_upload_version_empresa':'certif_upload_version_participacion';
    const method = 'certif_upload_version_empresa';

    const body = dataFormatCRM3Basic(
      method,
      {
        data: dataSend,
      },
      file[0]
    );

    await axiosCRM3.post('', body);
    console.log('se guardó el documento');
    //cerrar el dialog
  } catch (error) {
    //console.log('se guardó el documento');
    throw error;
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
    <q-card-section class="text-h6"> Subir nueva versión </q-card-section>
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
      <q-btn label="Adicionar" color="primary" v-close-popup @click="onSubmit" />
    </q-card-actions>
  </q-card>
</template>
