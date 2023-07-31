<script lang="ts" setup>
import { ref } from 'vue';
import { QTableColumn } from 'quasar';

import { useCompaniesStore } from '../store/companyStore';
import { useAsyncState } from '@vueuse/core';
import AddDocument from '../components/Dialogs/AddDocument.vue';
import CardDocumentViewer from '../components/Cards/CardDocumentViewer.vue';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
import { CompanyDocument } from '../utils/types';
import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';


import type { Document } from '../utils/types';
import { documentTableList } from '../utils/dummyData';

interface Props {
  id: string;
  child?: boolean;
}

const props = withDefaults(defineProps<Props>(), { child: false });
const companyStore = useCompaniesStore();
const showConfirmed = ref(false);

const propsCreateAlert = {
  title: 'Alerta de confirmación',
  icon: 'person',
  iconSize: 'md',
  message: '',
  iconColor: 'red',
  btnColor: 'red',
  btnText: 'Si, estoy seguro',
};

const columns: QTableColumn[] = [
  {
    name: 'nombre_doc',
    align: 'left',
    label: 'Nombre',
    field: 'nombre_doc',
    sortable: true,
  },
  {
    name: 'categoria_doc',
    align: 'left',
    label: 'Categoría',
    field: 'categoria_doc',
    sortable: true,
  },
  {
    name: 'division',
    align: 'left',
    label: 'División',
    field: 'division',
    sortable: true,
  },
  {
    name: 'active_date',
    align: 'left',
    label: 'Vigencia',
    field: 'active_date',
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
    name: 'tipo',
    align: 'left',
    label: 'Tipo de Documento',
    field: 'tipo',
    sortable: true,
  },
  {
    name: 'responsable',
    align: 'left',
    label: 'Responsable',
    field: 'responsable',
    sortable: true,
  },
  {
    name: 'options',
    align: 'center',
    label: 'Acciones',
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

// const openDocumentVersionDialog = (id: string, data: Document) => {
//   console.log(id);
//   currentDocumentVersionId.value = id;
//   documentVersionDialog.value = true;
//   documentSelected.value = data;
// };

//se dispara cuando carga el componente
const propsParent = {...props};

const idDocumentDelete = ref();

const {
  state: documents,
  isLoading,
  execute,
} = useAsyncState(async () => {

  const response = await companyStore.onGetCompanyDocuments(props.id, props.child);
  //console.log(response);
  return response;
  //return convierteFechaDoc(response);
}, []);

const reloadList = async ()=>{
  await execute();
}

// const convierteFechaDoc = (docs:[]) => {
//   docs.forEach((element:any)=>{
//     element.fecha_creacion = companyStore.formatoFecha(element.fecha_creacion, 1)
//   });
//   return docs;
// }

const onCancelRelation = () => {
  console.log('se cancelo');
};

const deleteDocument = async ()=>{
  try{
    await companyStore.onDeleteDocumentCompany(idDocumentDelete.value, propsParent.id, propsParent.child);
    reloadList();
  }
  catch(e){
    throw (e);
  }
}

const setColorState = (state: string): string => {
  const colorMap: { [key: string]: string } = {
    Activo : 'green',
    Archivado: 'orange',
    Borrador: 'orange',
    Caducado: 'red',
    'En Revisión': 'blue',
    FAQ: 'black',
    Pendiente: 'blue',
  };

  return colorMap[state] || 'grey';
};

const setColorType = (type: string): string => {
  const colorMap: { [key: string]: string } = {
    privado : 'orange',
    publico: 'green',
  };

  return colorMap[type] || 'grey';
};


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
            >Participacion Como</span
          >
        </div>
        <q-space />
        <q-btn
            icon="update"
            :color="$q.dark.isActive ? 'grey-3' : 'primary'"
            dense
            flat
            @click="reloadList()"
            :label="`${$q.screen.xs ? '' : ''}`"
            class="q-mx-lg"
          >
            <q-tooltip class="bg-primary" :offset="[10, 10]">
              Actualizar
            </q-tooltip>
          </q-btn>
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
          <!--<q-td v-for="col in props.cols" :key="col.name" :props="props">
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
          </q-td>-->
          <q-td key="nombre_doc" :props="props" :style="'width: 250px;'">
            <!--<span
              class="text-blue-9 cursor-pointer"
              @click="openItemSelected(props.row.id, props.row.nombre_doc)"
            >
              {{ props.row.nombre_doc }}
            </span>-->
            <span class="text-primary cursor-pointer text-weight-bold">
              {{ props.row.nombre_doc }}
            </span>
          </q-td>
          <q-td key="categoria_doc" :props="props" :style="'width: 150px;'">
            <p class="q-my-sm">
              {{ props.row.categoria_doc }}
            </p>
            <p class="text-caption q-my-sm"><span class="text-weight-bold">Tipo:</span> {{ props.row.tipo_doc }}</p>
          </q-td>
          <q-td key="division" :props="props" :style="'width: 150px;'">
            <p class="q-my-sm">
              {{ props.row.division_c }}
            </p>
            <p class="text-caption q-my-sm"><span class="text-weight-bold">A. Mercado:</span> Desconocido</p>
          </q-td>
          <q-td key="active_date" :props="props" :style="'width: 150px;'">
            <p class="q-my-sm"><span class="text-weight-bold">F. Inicio:  </span>{{ props.row.active_date }}</p>
            <p class="text-caption q-my-sm">
              <span class="text-weight-bold">F. Culminación:  </span> {{ props.row.exp_date }}
            </p>
          </q-td>
          <q-td key="status_id" :props="props" :style="'width: 150px;'">
            <q-badge outline :color="setColorState(props.row.status_id)" class="q-px-md q-py-sm">
              <span class="text-weight-bold">{{ props.row.status_id.toUpperCase() }}</span>
            </q-badge>
          </q-td>
          <q-td key="tipo" :props="props" :style="'width: 150px;'">
            <q-badge outline :color="setColorType(props.row.tipo)" class="q-px-md q-py-sm">
              <q-icon v-if="props.row.tipo == 'privado'" name="info" />
              <q-icon v-else name="check" />
              <span class="text-weight-bold q-pl-sm">{{ props.row.tipo.toUpperCase() }}</span>
            </q-badge>
          </q-td>
          <q-td key="responsable" :props="props" :style="'width: 150px;'">
            <div class="row">
              <div class="col-2">
                <q-avatar
                  size="24px"
                  font-size="24px"
                  color="primary"
                  text-color="white"
                  icon="person"
                />
              </div>
              <div class="col-10">
                <span>
                  {{ props.row.responsable }}
                </span>
              </div>
            </div>
            <span class="text-caption"><span class="text-weight-bold">Fecha de Registro:</span> {{ props.row.fecha_creacion }}</span>
          </q-td>
          <q-td key="options" :props="props" :style="'width: 150px;'">
            <q-btn
                color="negative"
                icon="delete"
                round
                size="sm"
                @click="()=>{
                  showConfirmed = true;
                  idDocumentDelete = props.row.id
                }"
              >
                <q-tooltip> Eliminar </q-tooltip>
              </q-btn>

              <AlertComponent
                v-model="showConfirmed"
                v-bind="propsCreateAlert"
                @confirm="deleteDocument"
                @denegate="onCancelRelation"
              >
                <template #body>
                  <span> ¿Está seguro de eliminar el documento?  </span>
                </template>
              </AlertComponent>
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
              :data="props.row"
              :child="propsParent.child"
              :category="props.row.category"
              :type="props.row.type"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="documentDialog" persistent>
    <AddDocument :id="props.id" :child="props.child" />
  </q-dialog>
  <q-dialog v-model="documentVersionDialog" persistent>
    <AddDocument
      :id="props.id"
      :document-id="currentDocumentVersionId"
      :document-data="documentSelected"
    />
  </q-dialog>

</template>

<style lang="scss" scoped>
.fixed-height {
  min-height: inherit;
}

.text-break {
    width:300px;
    line-break: auto;
    white-space: normal;
    font-size: 1.1em;
  } 
</style>
