<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar, QUploader } from 'quasar';

import { useAsyncState } from '@vueuse/core';

import { useCompaniesStore } from '../../store/companyStore';

import {
  dataFormatCRM3,
  dataFormatCRM3Basic,
} from 'src/conections/conexionCRM3';

import { userStore } from 'src/modules/Users/store/UserStore';
import { axiosCRM3 } from 'src/conections/axiosPRY';
import type { Document } from '../../utils/types';

// interface DocumentForm {
//   description: string;
//   fileName: string;
//   assigned_user_id: string;
//   category: any;
//   type: any;
//   status_id:string;
//   active_date:any;
//   exp_date:any;
// }

import {
  regionalList,
  divisionList,
  documentTypeList,
} from '../../utils/dummyData';

interface Props {
  headerId?: string;
  defaultData?: Document;
}

interface Emits {
  (e: 'update', id: string): void;
}

const props = withDefaults(defineProps<Props>(), { headerId: '' });
const emits = defineEmits<Emits>();

const $q = useQuasar();
const { userCRM } = userStore();
const uploadFileRef = ref<InstanceType<typeof QUploader> | null>();

const companyStore = useCompaniesStore();

//const options = [ 'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
const categories_doc = ref([]);
const status_doc = [
  'Activo',
  'Archivado',
  'Borrador',
  'Caducado',
  'En Revisión',
  'FAQ',
  'Pendiente',
];
//const types_doc = ['2.1.1 Fotocopia de Representación Legal', '2.1.2 Certificado de Libre Venta'];
const types_doc = ref([]);

const data = ref({ category: '', version: '1' } as Document);
const headerId = ref<string>('');

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const types_filter = computed(() => {
  const dataConcat = data.value.category.value + '_';
  if (types_doc.value.length === 0) return [];
  return types_doc.value.filter((r: any) =>
    r.value.toLowerCase().includes(dataConcat.toLowerCase())
  );
});

const defaultExists = computed(() => {
  return !!props.defaultData && Object.keys(props.defaultData).length > 0;
});

const uploadFiles = async (file: File[]) => {
  //console.log(file);

  dataFormatCRM3;

  try {
    $q.loading.show({
      message: 'Guardando información',
    });
    // const fileToUpload = (await toBase64(file[0])) as string; // Guardando el archivo en BASE64

    const dataSend = {
      category_id: data.value.category?.value || '',
      template_type: data.value.type?.value || '',
      iddivision_c: data.value.iddivision_c || '',
      division_c:
        divisionList.find((div) => div.value === data.value.iddivision_c)
          ?.label || '',
      regional_c: data.value.regional,
      user_id: userCRM.id,
      header: props.headerId,
      status_id:data.value.status_id,
      active_date:data.value.active_date,
      exp_date:data.value.exp_date,
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
    // $q.notify({
    //   type: 'negative',
    //   message: 'Error al guardar el archivo',
    // });
  } finally {
    $q.loading.hide();
  }
};

const onSubmit = async () => {
  uploadFileRef.value?.upload();
  emits('update', '1'); // '1' es un id falso
};

onMounted(async () => {
  if (defaultExists.value) {
    console.log('with data');
    data.value = {
      ...data.value,
      ...props.defaultData,
      version: (+(props.defaultData?.version || 1) + 1).toString(),
    };
  }
  categories_doc.value = await companyStore.onGetCategoryDocuments();
  //console.log(categories_doc.value);
  types_doc.value = await companyStore.onGetTypeDocuments();
});
</script>

<template>
  <q-card class="q-pa-sm" style="min-width: fit-content">
    <div class="row q-col-gutter-md q-px-md q-py-md">
      <q-input
        class="col-12 col-md-6"
        v-model="data.description"
        type="text"
        outlined
        dense
        label="Nombre del Documento"
      />
      <q-select
        class="col-12 col-md-6"
        v-model="data.status_id"
        :options="status_doc"
        type="text"
        outlined
        dense
        label="Estado"
      />
      <q-input
        class="col-12 col-md-6"
        v-model="data.active_date"
        type="date"
        outlined
        dense
        label="Fecha de Publicación"
      />
      <q-input
        class="col-12 col-md-6"
        v-model="data.exp_date"
        type="date"
        outlined
        dense
        label="Fecha de caducidad"
      />
      <q-input
        class="col-12 col-md-6"
        v-model="data.version"
        type="number"
        outlined
        dense
        label="Versión"
        readonly
        :disable="defaultExists"
      />
      <q-select
        class="col-12 col-md-6"
        outlined
        v-model="data.category"
        :options="categories_doc"
        dense
        label="Categoría"
        :disable="defaultExists"
      />
      <q-select
        class="col-12 col-sm-6"
        outlined
        dense
        v-model="data.regional"
        :options="regionalList"
        type="text"
        label="Regional"
        option-value="value"
        option-label="label"
        emit-value
        map-options
      />
      <q-select
        class="col-12 col-sm-6"
        outlined
        dense
        v-model="data.iddivision_c"
        :options="divisionList"
        type="text"
        label="División"
        option-value="value"
        option-label="label"
        emit-value
        map-options
      />
      <q-select
        class="col-12 col-sm-6"
        outlined
        dense
        v-model="data.document_type"
        :options="documentTypeList"
        type="text"
        label="Tipo de documento"
        option-value="value"
        option-label="label"
        emit-value
        map-options
      />
      <q-select
        class="col-12 col-md-6"
        v-model="data.type"
        type="text"
        :options="types_filter"
        outlined
        dense
        option-value="value"
        option-label="label"
        label="Tipo"
        :disable="defaultExists"
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
      <q-btn v-close-popup label="Guardar" color="primary" @click="onSubmit" />
    </q-card-actions>
  </q-card>
</template>
