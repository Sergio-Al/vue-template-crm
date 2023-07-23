<script lang="ts" setup>
import { ref } from 'vue';
import { QTableColumn } from 'quasar';
import { useAsyncState } from '@vueuse/core';
import ChildCompanyDialog from '../components/Dialogs/ChildCompanyDialog.vue';
import { useCompaniesStore } from '../store/companyStore';
import { useChildCompaniesStore } from '../store/childCompanyStore';
import { deleteChildCompany } from '../services/useCompanyService';

import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';


// import { childCompanies } from '../utils/dummyData';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const companyStore = useCompaniesStore();
const showConfirmed = ref(false);
const idSubCompanyDelete = ref();

const columns: QTableColumn[] = [
  {
    name: 'razon_social_c',
    required: true,
    label: 'Razón Social',
    align: 'left',
    field: 'razon_social_c',
    //field: (row) => row.name,
    //format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Nombre Comercial',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'direccion_c',
    required: true,
    align: 'left',
    label: 'Dirección',
    field: 'direccion_c',
    sortable: true,
  },
  {
    name: 'ownership',
    required: true,
    align: 'left',
    label: 'Representante',
    field: 'ownership',
    sortable: true,
  },
  {
    name: 'resolucion_ministerial_c',
    required: true,
    align: 'left',
    label: 'Nro. de Resolución Ministerial',
    field: 'resolucion_ministerial_c',
    sortable: true,
  },
  {
    name: 'phone_office',
    required: true,
    align: 'left',
    label: 'Teléfono',
    field: 'phone_office',
    sortable: true,
  },
];

const childCompanyStore = useChildCompaniesStore();

// const deleteCompanyChildConfirm = (companyId:string)=>{
//   showConfirmed.value = true;
//   deleteSubCompany(props.row.id);
// }

const propsCreateAlert = {
  title: 'Alerta de confirmación',
  icon: 'person',
  iconSize: 'md',
  message: '',
  iconColor: 'red',
  btnColor: 'red',
  btnText: 'Si, estoy seguro',
};

const childCompanyDialogRef = ref<InstanceType<
  typeof ChildCompanyDialog
> | null>(null);

const openDialog = (id?: string, title?: string) => {
  if (!!id) {
    childCompanyDialogRef.value?.openDialogTab(id, title);
    return;
  }
  childCompanyDialogRef.value?.openDialogTab();
};

const visitPage = (url: string) => {
  window.open(url, '_blank');
};

const directionFormat = (direction: string) => {
  if (!!direction) {
    return direction.replace('_gnrtd', '').replaceAll(',|', '');
  }
  return '';
};

const deleteSubCompany = async () => {
  try {
    isLoading.value = true;
    await deleteChildCompany(idSubCompanyDelete.value);
    reloadList();
  } catch (error) {
    console.log('error');
  } finally {
    isLoading.value = false;
  }
};

const reloadList = async ()=>{
  await execute();
}

const onCancelRelation = () => {
  console.log('se cancelo');
};

const localId = ref(props.id ?? '');
//se dispara cuando carga el componente
const {
  state: companies,
  isLoading,
  execute,
} = useAsyncState(async () => {
  const parentId = props.id;
  return await companyStore.onGetListCompaniesChild(parentId);
}, []);
</script>

<template>
  <div class="q-pa-md q-py-lg flex fixed-height">
    <q-table
      style="flex-grow: 1"
      flat
      bordered
      :rows="companies"
      :columns="columns"
      :loading="isLoading"
      row-key="name"
    >
      <template #top>
        <span class="text-h6">Participantes de la empresa</span>
        <q-space />
        <q-btn color="primary" icon="add" label="Nuevo" @click="openDialog()" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template #body="props">
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
            <!-- colocar el mismo nombre de la columna del array de columnas -->
            <div v-if="col.name === 'razon_social_c'">
              <span
                class="text-primary cursor"
                @click="openDialog(props.row.id, col.value)"
              >
                {{ col.value }}
              </span>
            </div>
            <div v-else-if="col.name === 'ownership'">
              <q-chip
                v-if="!col.value"
                class="primary"
                icon="person"
                outline
                dense
                label="No asignado"
              />
              <div v-else>
                <q-avatar
                  icon="person"
                  color="primary"
                  size="sm"
                  text-color="white"
                />
                <span class="q-ml-sm">{{ col.value }}</span>
              </div>
            </div>
            <div v-else-if="col.name === 'direccion_c'">
              <div>
                {{ directionFormat(col.value) }}
              </div>
            </div>
            <span v-else>{{ col.value }}</span>
          </q-td>
          <q-td auto-width>
            <q-btn
              @click="()=>{
                showConfirmed = true;
                idSubCompanyDelete = props.row.id;
              }
              "
              size="sm"
              color="negative"
              round
              dense
              icon="delete"
            >
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
            <AlertComponent
              v-model="showConfirmed"
              v-bind="propsCreateAlert"
              @confirm="deleteSubCompany"
              @denegate="onCancelRelation"
            >
              <template #body>
                <span> ¿Está seguro de eliminar la empresa participación ? </span>
              </template>
            </AlertComponent>
          </q-td>
    
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <span class="text-bold">Sitio Web :</span>
              <q-chip
                v-if="props.row.website"
                color="primary"
                text-color="white"
                icon="web"
                dense
                clickable
                label="Visitar"
                class="q-px-md"
                @click="visitPage(props.row.website)"
              />
              <span v-else class="q-px-sm">Sin página</span>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <ChildCompanyDialog
    :parent-id="props.id"
    ref="childCompanyDialogRef"
    @change="execute()"
  />
</template>

<style lang="scss">
.fixed-height {
  min-height: inherit;
}
.cursor{
  cursor: pointer;
}
</style>
