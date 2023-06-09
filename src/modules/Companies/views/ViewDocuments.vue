<script lang="ts" setup>
import { ref } from 'vue';
import { QTableColumn } from 'quasar';

import { useCompaniesStore } from '../store/companyStore';
import { useAsyncState } from '@vueuse/core';
import AddDocument from '../components/Dialogs/AddDocument.vue';
import CardDocumentViewer from '../components/Cards/CardDocumentViewer.vue';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
import { CompanyDocument } from '../utils/types';

import type { Document } from '../utils/types';

import { documentTableList } from '../utils/dummyData';

interface Props {
  id: string;
  child?: boolean;
}

const props = withDefaults(defineProps<Props>(), { child: false });
const companyStore = useCompaniesStore();

const columns: QTableColumn[] = [
  {
    name: 'categoria_doc',
    align: 'left',
    label: 'Categoría',
    field: 'categoria_doc',
    sortable: true,
  },
  {
    name: 'tipo_doc',
    align: 'left',
    label: 'Tipo',
    field: 'tipo_doc',
    sortable: true,
  },
  {
    name: 'nombre_doc',
    align: 'left',
    label: 'Nombre',
    field: 'nombre_doc',
    sortable: true,
  },
   {
    name: 'version',
    align: 'left',
    label: 'Versión',
    field: 'version',
    sortable: true,
  },
  {
    name: 'active_date',
    align: 'left',
    label: 'Fecha de Publicación',
    field: 'active_date',
    sortable: true,
  },
  {
    name: 'exp_date',
    align: 'left',
    label: 'Fecha de Caducidad',
    field: 'exp_date',
    sortable: true,
  },
  {
    name: 'status_id',
    align: 'left',
    label: 'Estado',
    field: 'status_id',
    sortable: true,
  },

  {
    name: 'options',
    align: 'center',
    label: 'Versiones',
    field: 'options',
    sortable: true,
  },
];

const documentDialog = ref<boolean>(false);
const documentVersionDialog = ref<boolean>(false);
const currentDocumentVersionId = ref<string>('');
const documentSelected = ref<Document>({} as Document);

const openDialog = () => {
  documentDialog.value = true;
};

const openDocumentVersionDialog = (id: string, data: Document) => {
  console.log(id);
  currentDocumentVersionId.value = id;
  documentVersionDialog.value = true;
  documentSelected.value = data;
};

//se dispara cuando carga el componente
const { state: documents, isLoading, execute } = useAsyncState(async () => {
  //console.log('holoo');
  return documentTableList;
  // let a = await companyStore.onGetCompanyDocuments(props.id);
  // console.log(a);
  // return a;
  //console.log(a);
}, []);

// const dummyData = [
//   {
//     id: 'ddfasfads',
//     name: 'Resolución Ministerial HANSA',
//     date_added: '27/01/2023',
//     fileName: 'Resolución Ministerial',
//     date_exp: '27/02/2025',
//     status: 'Activo',
//     category: 'Registro Sanitario',
//     type_template:'Fotocopia de Resolución Ministerial',
//     version:1
//   },
//   {
//     id: 'otro',
//     name: 'Certificado de Empresa Vigente',
//     date_added: '27/01/2023',
//     fileName: 'Certificado de Empresa Vigente 2023',
//     date_exp: '27/02/2024',
//     status: 'Activo',
//     category: 'Registro Sanitario',
//     type_template:'Certificado de Empresa Vigente',
//     version:1
//   },
// ];

</script>

<template>
  <div class="q-pa-md q-py-lg flex fixed-height">
    <q-table
      style="flex-grow: 1; width: inherit"
      flat
      bordered
      :rows="documents"
      :columns="columns"
      :loading="isLoading"
      row-key="id"
    >
      <template #top>
        <div class="column">
          <span class="text-h6">Documentos de la empresa</span>
          <span v-if="props.child" class="text-caption"
            >Empresa participante</span
          >
        </div>
        <q-space />
        <q-btn
          color="primary"
          icon="add"
          label="Adicionar"
          @click="openDialog"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name === 'options'">
              <q-btn
                @click="
                  () => {
                    openDocumentVersionDialog(props.row.id, props.row);
                  }
                "
                size="sm"
                color="primary"
                round
                dense
                icon="cloud_upload"
              >
                <q-tooltip>Adicionar Version</q-tooltip>
              </q-btn>
            </div>
            <span v-else>{{ col.value }}</span>
          </q-td>
        </q-tr>
        <q-tr v-if="props.expand" :props="props">
          <q-td colspan="100%">
            <!-- <iframe
              :src="${HANSACRM3_URL}/index.php?entryPoint=download&id=${props.value.documentId}&type=Documents&view_doc=view"
              style="height: 80vh; width: 100%"
              frameborder="0"
            >
            </iframe> -->
            <CardDocumentViewer
              :id="props.row.id"
              :category="props.row.category"
              :type="props.row.type"
            />
            <div class="q-pt-smtext-left">
              Visualizador del documento: {{ props.row.name }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="documentDialog" persistent>
    <AddDocument :id="props.id" />
  </q-dialog>
  <q-dialog v-model="documentVersionDialog" persistent>
    <AddDocument
      :id="props.id"
      :document-id="currentDocumentVersionId"
      :document-data="documentSelected"
    />
  </q-dialog>
</template>

<style lang="scss">
.fixed-height {
  min-height: inherit;
}
</style>
