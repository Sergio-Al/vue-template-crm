<script setup lang="ts">
import { onMounted, ref } from 'vue';
//import { useCompaniesStore } from '../store/companies';
import { TableSkeleton } from 'src/components';
import { userStore } from 'src/modules/Users/store/UserStore';
import CompanyDialog from '../components/Dialogs/CompanyDialog.vue';
import { useCompanyTableStore } from '../store/UseCompanyTableStore';

import type { Filter, Pagination, base } from '../utils/types';

import AdvancedFilter from '../components/AdvancedFilter/AdvancedFilter.vue';
import MassiveUpdateDialog from '../components/Dialogs/MassiveUpdateDialog.vue';

//properties
const props = withDefaults(
  defineProps<{
    idUser?: string;
    moduleId?: string;
  }>(),
  {
    idUser: '',
  }
);

// const prueba = ()=>{
//   await axios_LB_05.get()
// }

//Stores
const user = userStore();
const table = useCompanyTableStore();
const { setVisibleColumn, getListCompanies, reloadList, setPagination } =
  useCompanyTableStore();

//Refs
const advancedFilterRef = ref<InstanceType<typeof AdvancedFilter> | null>(null);
// const projectDialogRef = ref<InstanceType<typeof ProjectDialog> | null>(null);
// const accountDialogRef = ref<InstanceType<typeof AccountDialog> | null>(null);

const massiveUpdateDialogRef = ref<InstanceType<
  typeof MassiveUpdateDialog
> | null>(null);
const companyDialogRef = ref<InstanceType<typeof CompanyDialog> | null>(null);

const onRequestTable = async (val: {
  pagination: Pagination;
  filter: Filter;
}) => {
  // await setPagination(val.pagination);
  await getListCompanies(val);
};

const onDeleteMultiple = async (selected: base[]) => {
  const items = selected.map((el: base) => {
    return { id: el.id };
  });
  await table.deleteMultiple(items);

  setTimeout(() => {
    table.reloadList();
  }, 1000);
  //table.reloadList();
};

const onUpdateMultiple = (selected: base[]) => {
  const items = selected.map((el: base) => {
    return { id: el.id };
  });
  const data = massiveUpdateDialogRef.value?.data;
  table.updateMultiple(data, items);
};

const onSubmitDataFilter = () => {
  console.log('busqueda');
  try {
    table.data_filter = advancedFilterRef.value?.dataFilter;
    table.setFilterData();
    table.reloadList();
  } catch (error) {
    throw error;
  }
};

const onClearDataFilter = () => {
  try {
    //filterAdvancedRef.value?.clearFilter();
    table.clearFilterData();
    console.log('here');
    table.setFilterData();
    table.reloadList();
  } catch (error) {
    throw error;
  }
};

const onUpdateDataTable = async () => {
  try {
    await reloadList();
  } catch (error) {
    throw error;
  }
};

const openDialog = () => {
  console.log('opening... dialog');
  companyDialogRef.value?.openDialogTab();
};

const openItemSelected = (id: string, title: string) => {
  companyDialogRef.value?.openDialogTab(id, title);
};

const openLink = (link: string) => {
  if (!link) return;
  window.open(`https://${link}`, '_blank');
};

const constructorComp = async (idUser?: string) => {
  if (idUser) user.insertUser(idUser);
};

const directionFormat = (direction: string) => {
  if (!!direction) {
    return direction.replace('_gnrtd', '').replaceAll(',|', '');
  }
  return '';
};

onMounted(async () => {
  //isReady.value = false;
  //await getUserConfig();
  //isReady.value = true;
  //if (props.moduleId) openItemSelected(props.moduleId);
});

(() => {
  constructorComp(props.idUser);
})();
</script>

<template>
  <div :class="$q.platform.is.desktop ? 'q-pa-md' : 'q-pa-sm'">
    <table-component
      :rows="table.data_table.rows"
      :columns="table.data_table.columns"
      :total="table.pagination.rowsNumber"
      :rowsPerPage="table.pagination.rowsPerPage"
      :sortBy="table.pagination.sortBy"
      :descending="table.pagination.descending"
      :visible="table.visible_columns"
      :dataFilter="table.data_filter"
      :loading="table.loading"
      :defaultRows="false"
      :style="'height: 95dvh'"
      searchPlaceholder="Busqueda por: Nombre Comercial, Nro de Resolución Ministerial y Teléfono"
      @visibleColumns="setVisibleColumn"
      @submitFilter="onSubmitDataFilter"
      @updateMultiple="onUpdateMultiple"
      @deleteMultiple="onDeleteMultiple"
      @updateData="onUpdateDataTable"
      @update:props="onRequestTable"
      @clearFilter="onClearDataFilter"
      @openDialog="openDialog"
      v-if="true"
    >
      <template #rows="{ propsTable }">
        <q-tr :props="propsTable">
          <q-td class="text-left">
            <q-checkbox v-model="propsTable.selected" flat dense />
          </q-td>
          <q-td key="name" :props="propsTable" :style="'width: 100px;'">
            <span
              class="text-blue-9 cursor-pointer"
              @click="openItemSelected(propsTable.row.id, propsTable.row.name)"
            >
              {{ propsTable.row.name }}
            </span>
          </q-td>
          <q-td
            key="razon_social_c"
            :props="propsTable"
            :style="'width: 100px;'"
          >
            {{ propsTable.row.razon_social_c }}
          </q-td>
          <q-td key="direccion_c" :props="propsTable" :style="'width: 100px;'">
            {{ directionFormat(propsTable.row.direccion_c) }}
          </q-td>
          <q-td key="resolucion_ministerial_c" :props="propsTable">
            {{ propsTable.row.resolucion_ministerial_c }}
          </q-td>
          <q-td key="website" :props="propsTable">
            <q-chip
              class="primary"
              icon="web"
              label="Visitar"
              clickable
              :disable="!propsTable.row.website"
              @click="() => openLink(propsTable.row.website)"
            >
              <q-tooltip v-if="!!propsTable.row.website">
                {{ propsTable.row.website }}
              </q-tooltip>
            </q-chip>
          </q-td>
          <q-td key="phone_office" :props="propsTable">
            {{ propsTable.row.phone_office }}
          </q-td>
          <q-td key="ownership" :props="propsTable">
            {{ propsTable.row.ownership }}
          </q-td>
          <!--<q-td key="id_representante" :props="propsTable">
            <div
              class="text-primary"
              style="display: flex; align-items: center"
            >
              <small
                :style="'width: 150px;line-break: auto;white-space: normal;margin-left: 0.5rem;'"
              >
                {{ propsTable.row.nombre_representante }}
              </small>
            </div>
            <div></div>
          </q-td>-->
        </q-tr>
      </template>
      <template v-slot:buttons>
        <q-btn
          color="primary"
          label="Nuevo"
          v-if="!$q.screen.xs"
          @click="openDialog()"
        >
        </q-btn>
        <q-page-sticky :offset="[18, 0]" position="bottom-right" v-else>
          <q-btn fab color="primary" icon="add" @click="openDialog()" />
        </q-page-sticky>
      </template>
      <template #updateContent>
        <MassiveUpdateDialog ref="massiveUpdateDialogRef" />
      </template>
      <template #filterContent>
        <AdvancedFilter ref="advancedFilterRef" @submit-filter="() => {}" />
      </template>
    </table-component>
    <TableSkeleton v-else />
  </div>
  <CompanyDialog ref="companyDialogRef" />
</template>
