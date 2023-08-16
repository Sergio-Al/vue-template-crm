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
    name: 'resolucion_ministerial_c',
    required: true,
    align: 'left',
    label: 'Nro. de Resolución Ministerial',
    field: 'resolucion_ministerial_c',
    sortable: true,
  },
  {
    name: 'website',
    required: true,
    align: 'left',
    label: 'Sitio Web',
    field: 'website',
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
  {
    name: 'representante',
    required: true,
    align: 'left',
    label: 'Representante',
    field: 'representante',
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

const openLink = (link: string) => {
  if (!link) return;
  window.open(`https://${link}`, '_blank');
};

const localId = ref(props.id ?? '');
//se dispara cuando carga el componente
const {
  state: companies,
  isLoading,
  execute,
} = useAsyncState(async () => {
  const parentId = props.id;
  const a = await companyStore.onGetListCompaniesChild(parentId);
  console.log(a)
  return a;
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
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <!-- colocar el mismo nombre de la columna del array de columnas -->
            <div v-if="col.name === 'razon_social_c'">
              <span
                class="text-primary cursor text-weight-bold"
                @click="openDialog(props.row.id, col.value)"
              >
                {{ col.value }}
              </span>
            </div>
            <div v-else-if="col.name === 'website'">
              <q-chip
              class="primary"
              icon="web"
              label="Visitar"
              color="info"
              dark
              clickable
              :disable="!props.row.website"
              @click="() => openLink(props.row.website)"
            >
              <q-tooltip v-if="!!props.row.website">
                {{ props.row.website }}
              </q-tooltip>
            </q-chip>
            </div>

            <div v-else-if="col.name === 'representante'">
              <div class="row items-center ">
                <div class="col-2">
                  <q-avatar
                    size="24px"
                    font-size="24px"
                    color="primary"
                    text-color="white"
                    icon="person"
                  />
                </div>  
                <div class="column q-pl-sm ellipsis col-10">
                  <div v-if="props.row.representante">
                    <span class="text-break">
                      {{ props.row.representante }}
                    </span><br />
                    <span class="text-break text-grey">
                      {{ props.row.title }}
                    </span>
                  </div>
                  <span v-else class="text-red">Sin representante</span>
                </div>
              </div>
            </div>

            <div v-else-if="col.name === 'direccion_c'">
              <div>
                {{ directionFormat(col.value) }}
              </div>
            </div>

            <div v-else-if="col.name === 'phone_office'">
              <span v-if="props.row.phone_office">
                <q-icon name="phone" size="1.5em" color="primary" /> {{ props.row.phone_office }}
              </span><br>
              <span v-if="props.row.phone_alternate">
                <q-icon name="phone" size="1.5em" color="primary" /> {{ props.row.phone_alternate }}
              </span>
            </div>

            <div v-else-if="col.name === 'resolucion_ministerial_c'">
              <div class="text-center">
                <span>
                {{ props.row.resolucion_ministerial_c }}
                </span><br>
                <span class="text-caption text-grey" v-if="props.row.resolucion_ministerial_date_c">
                  Fecha: {{props.row.resolucion_ministerial_date_c}}
                </span>
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
