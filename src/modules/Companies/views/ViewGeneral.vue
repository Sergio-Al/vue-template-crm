<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCompaniesStore } from '../store/companies';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
import { userStore } from 'src/modules/Users/store/UserStore';
import { TableSkeleton } from 'src/components';

import {
  base,
  Pagination,
  Filter,
  UpdateMassiveModel,
  IndicatorsModel,
} from '../utils/types';

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

//Stores
const user = userStore();
const table = useCompaniesStore();
const { setVisibleColumn, getListCompanies, reloadList, setPagination } =
  useCompaniesStore();

//Refs
// const filterAdvancedRef = ref<InstanceType<typeof AdvancedFilterTable> | null>(
//   null
// );
// const projectDialogRef = ref<InstanceType<typeof ProjectDialog> | null>(null);
// const accountDialogRef = ref<InstanceType<typeof AccountDialog> | null>(null);

// const updateMassiveRef = ref<InstanceType<
//   typeof UpdateMassiveComponent
// > | null>(null);

//functions
const formSaved = async () => {
  await table.reloadList();
};

const onRequestTable = async (val: {
  pagination: Pagination;
  filter: Filter;
}) => {
  await setPagination(val.pagination);
  await getListCompanies(val);
};

const onDeleteMultiple = (selected: base[]) => {
  const items = selected.map((el: base) => {
    return { id: el.id };
  });
  table.deleteMultiple(items);
};

const onUpdateMultiple = (selected: base[]) => {
  const items = selected.map((el: base) => {
    return { id: el.id };
  });
  // const data = <UpdateMassiveModel>updateMassiveRef.value?.getData();
  // table.updateMultiple(data, items);
};

const onSubmitDataFilter = () => {
  try {
    // table.data_filter = filterAdvancedRef.value?.dataFilter;
    table.setFilterData();
    table.reloadList();
  } catch (error) {
    throw error;
  }
};

const onClearDataFilter = () => {
  try {
    // filterAdvancedRef.value?.clearFilter();
    table.clearFilterData();
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

const openDialog = (title: string) => {
  // projectDialogRef.value?.openDialogProject(undefined, title);
};

const openAccountDialog = (id: string) => {
  // accountDialogRef.value?.openDialogAccountTab(id);
};

const openItemSelected = (id: string) => {
  // projectDialogRef.value?.openDialogProject(id);
};

const setStatusColor = (status: string) => {
  const statusName = [
    {
      name: 'In Review',
      color: 'blue-1',
      textColor: 'blue',
      icon: 'timeline',
    },
    {
      name: 'Draft',
      color: 'grey-4',
      textColor: 'grey-7',
      icon: 'mode',
    },
    {
      name: 'Underway',
      color: 'yellow-2',
      textColor: 'yellow-9',
      icon: 'timeline',
    },
    {
      name: 'On_Hold',
      color: 'cyan-2',
      textColor: 'cyan-9',
      icon: 'watch_later',
    },
    {
      name: 'Completed',
      color: 'green-2',
      textColor: 'green-9',
      icon: 'check',
    },
    {
      name: 'Canceled',
      color: 'red-2',
      textColor: 'red-9',
      icon: 'close',
    },
  ];
  return statusName.find((el) => el.name === status);
};

onMounted(async () => {
  //isReady.value = false;
  //await getUserConfig();
  //isReady.value = true;
  if (props.moduleId) openItemSelected(props.moduleId);
});

const constructorComp = async (idUser?: string) => {
  if (idUser) user.insertUser(idUser);
};

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
      searchPlaceholder="Busqueda por: Razon_social, nro_resolucion_min,"
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
          <q-td key="razon_social" :props="propsTable" :style="'width: 100px;'">
            {{ propsTable.row.razon_social }}
          </q-td>
          <q-td key="direccion" :props="propsTable" :style="'width: 100px;'">
            {{ propsTable.row.direccion }}
          </q-td>
          <q-td key="nro_resolucion_min" :props="propsTable">
            {{ propsTable.row.direccion }}
          </q-td>
          <q-td key="id_representante" :props="propsTable">
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
          </q-td>
        </q-tr>
      </template>
      <template v-slot:buttons>
        <q-btn
          color="primary"
          label="Nuevo"
          v-if="!$q.screen.xs"
          @click="openDialog('NUEVA EMPRESA')"
        >
        </q-btn>
        <q-page-sticky :offset="[18, 0]" position="bottom-right" v-else>
          <q-btn
            fab
            color="primary"
            icon="add"
            @click="openDialog('NUEVO EMPRESA')"
          />
        </q-page-sticky>
      </template>
      <template #updateContent>
        <UpdateMassiveComponent ref="updateMassiveRef" />
      </template>
      <template #filterContent>
        <AdvancedFilterTable
          ref="filterAdvancedRef"
          @submitFilter="onSubmitDataFilter"
        />
      </template>
    </table-component>
    <TableSkeleton v-else />
  </div>
</template>
