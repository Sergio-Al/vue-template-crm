<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useQuasar, QTableColumn } from 'quasar';

import { useCompaniesStore } from '../store/companyStore';
import { useAsyncState } from '@vueuse/core';

import SelectUser from '../components/Dialogs/SelectUser.vue';
import type { Company, User } from '../utils/types';

import {
  assignUsersToCompany,
  deleteUserFromCompany,
} from '../services/useCompanyService';

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
    name: 'email',
    required: true,
    label: 'Correo Electrónico',
    align: 'left',
    //field: (row) => `${row.first_name} ${row.last_name}`,
    field: 'email',
    sortable: true,
  },
  {
    name: 'cargo',
    required: true,
    label: 'Cargo',
    align: 'left',
    //field: (row) => `${row.first_name} ${row.last_name}`,
    field: 'cargo',
    sortable: true,
  },
  {
    name: 'division',
    required: true,
    label: 'Division',
    align: 'left',
    //field: (row) => `${row.first_name} ${row.last_name}`,
    field: 'division',
    sortable: true,
  },
  {
    name: 'amercado',
    required: true,
    label: 'Área de Mercado',
    align: 'left',
    field: 'a_mercado',
    sortable: true,
  },
  {
    name: 'employee_status',
    required: true,
    label: 'Estado',
    align: 'left',
    field: 'employee_status',
    sortable: true,
  },
  {
    name: 'options',
    required: true,
    label: 'Opciones',
    align: 'center',
    field: 'options',
    sortable: true,
  },
];

// event functions
const selectUser = async (users: User[]) => {
  const userIds = users.map((user) => user.id);

  // llamar a servicio para asignar usuarios a empresa
  // body
  try {
    await assignUsersToCompany(props.id, userIds);
    $q.notify({
      type: 'positive',
      message: 'Se han asignado nuevos usuarios a la empresa',
    });

    execute();
  } catch (error) {
    console.log(error);
  }
};

const assignAsDelegate = async (userId: string) => {
  try {
    await companyStore.onUpdateCompany(props.id, {
      assigned_user_id: userId,
    } as Company);
    await companyStore.onGetCompany(props.id);
    execute();
  } catch (error) {
    console.log(error);
  }
};

const deleteRelation = async (id: string, userId: string) => {
  try {
    await deleteUserFromCompany(id, userId);
    execute();
  } catch (error) {
    console.log(error);
  }
};

//se dispara cuando carga el componente
const {
  state: users,
  isLoading,
  execute,
} = useAsyncState(async () => {
  if (!!props.child && props.id) {
    // console.log('obteniendo usuarios con un parent id');
    return await companyStore.onGetUsersFromChildCompany(props.id);
  }
  const response = await companyStore.onGetCompanyUsers(props.id);
  return response;
  //return [];
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
        <!-- <q-btn v-if="!props.child" color="primary" icon="add" label="Nuevo" /> -->
        <q-btn
          color="primary"
          icon="add"
          label="Asignar"
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

      <template v-slot:body="propsBody">
        <q-tr :props="propsBody">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="propsBody.expand = !propsBody.expand"
              :icon="propsBody.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td
            v-for="col in propsBody.cols"
            :key="col.name"
            :props="propsBody"
          >
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
            <div class="q-gutter-sm" v-else-if="col.name === 'options'">
              <q-btn
                v-if="!companyStore.cardOwner"
                color="primary"
                icon="assignment_add"
                round
                size="sm"
                @click="
                  () => {
                    assignAsDelegate(propsBody.row.id);
                  }
                "
              >
                <q-tooltip> Asignar como representante </q-tooltip>
              </q-btn>
              <q-btn
                color="negative"
                icon="delete"
                round
                size="sm"
                @click="
                  () => {
                    deleteRelation(props.id, propsBody.row.id);
                  }
                "
              >
                <q-tooltip> Eliminar </q-tooltip>
              </q-btn>
            </div>
            <span v-else>{{ col.value }}</span>
          </q-td>
        </q-tr>
        <q-tr v-show="propsBody.expand" :props="propsBody">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ propsBody.row.first_name }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="openDialog" :maximized="$q.screen.lt.sm">
    <SelectUser @select-user="selectUser" :users="users" />
  </q-dialog>
</template>

<style lang="scss">
.fixed-height {
  min-height: inherit;
}
</style>
