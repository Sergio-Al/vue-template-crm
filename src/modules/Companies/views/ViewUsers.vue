<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar, QTableColumn } from 'quasar';

import { useCompaniesStore } from '../store/companyStore';
import { useAsyncState } from '@vueuse/core';

import SelectUser from '../components/Dialogs/SelectUser.vue';
import type { User } from '../utils/types';

import { assignUsersToCompany } from '../services/useCompanyService';

interface Props {
  id: string;
  child?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  child: false,
});

const companyStore = useCompaniesStore();
const $q = useQuasar();

const openDialog = ref<boolean>(false);

const userColumns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    //field: (row) => `${row.first_name} ${row.last_name}`,
    field: 'user_name',
    sortable: true,
  },
  {
    name: 'division',
    required: true,
    label: 'División',
    align: 'left',
    field: 'division',
    sortable: true,
  },
  {
    name: 'regional',
    required: true,
    label: 'Regional',
    align: 'left',
    field: 'idregional_c',
    sortable: true,
  },
  {
    name: 'amercado',
    required: true,
    label: 'Área de mercado',
    align: 'left',
    field: 'a_mercado',
    sortable: true,
  },
];

// event functions
const selectUser = async (users: User[]) => {
  const userIds = users.map((user) => user.id);

  $q.notify({
    type: 'positive',
    message: `company ${props.id} user with id ${userIds} selected`,
  });

  // llamar a servicio para asignar usuarios a empresa
  // body
  // await assignUsersToCompany(props.id, usersIds);
};

//se dispara cuando carga el componente
const { state: users, isLoading } = useAsyncState(async () => {
  if (!!props.child && props.id) {
    console.log('obteniendo usuarios con un parent id');
    // asignar y retornar de aqui
    // return await companyStore.onGetUsersFromChildCompany(props.id)
  }
  const response = await companyStore.onGetCompanyUsers(props.id);
  return response;
}, [] as User[]);
</script>

<template>
  <div v-bind="$attrs" class="q-pa-md q-py-lg flex fixed-height">
    <q-table
      style="flex-grow: 1; width: inherit"
      flat
      bordered
      :rows="users"
      :columns="userColumns"
      :loading="isLoading"
      row-key="id"
    >
      <template #top>
        <div class="column">
          <span class="text-h6">Empleados de la empresa</span>
          <span v-if="child" class="text-caption">Empresa participante</span>
        </div>
        <q-space />
        <q-btn
          color="primary"
          icon="add"
          label="Nuevo"
          @click="() => (openDialog = true)"
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
            <div v-if="col.name === 'name'">
              <q-avatar
                size="sm"
                color="primary"
                text-color="white"
                icon="person"
                class="q-mr-sm"
              />
              <span>{{ col.value }}</span>
            </div>
            <span v-else>{{ col.value }}</span>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.first_name }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <SelectUser v-model="openDialog" @select-user="selectUser" />
</template>

<style lang="scss">
.fixed-height {
  min-height: inherit;
}
</style>