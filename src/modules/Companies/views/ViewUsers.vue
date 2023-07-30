<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useQuasar, QTableColumn } from 'quasar';

import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';

import { useCompaniesStore } from '../store/companyStore';
import { useAsyncState } from '@vueuse/core';

import SelectUser from '../components/Dialogs/SelectUser.vue';
import type { Company, User } from '../utils/types';

import {
  assignUsersToCompany,
  assignUsersToChildCompany,
  deleteUserFromCompany
} from '../services/useCompanyService';
import { useChildCompaniesStore } from '../store/childCompanyStore';

interface Props {
  id: string;
  child?: boolean;
  parentId?: string;
}

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

const props = withDefaults(defineProps<Props>(), {
  child: false,
});

let companyId = '';
let userId = '';

const companyStore = useCompaniesStore();
const childCompanyStore = useChildCompaniesStore();
const $q = useQuasar();
const userFiltered = ref<string>('');

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

const isDelegateMissing = computed(() => {
  if (props.child) {
    return !childCompanyStore.childPayload.user_id_c;
  } else {
    return !companyStore.cardOwner;
  }
});

// event functions
const selectUser = async (users: User[]) => {
  const userIds = users.map((user) => user.id);
  try {
    if (props.child) {
      isLoading.value = true;
      const response = await assignUsersToChildCompany(props.id, userIds);
      console.log(response);
      if(response == 1){
        $q.notify({
          type: 'positive',
          message: 'Se han asignado nuevos usuarios a la empresa',
        });
        isLoading.value = false;
        reloadList();
      }
    } else {
      // await assignUsersToCompany(props.id, userIds);
    }
  } catch (error) {
    console.log(error);
  }
};

// const deleteUser= async () => {
//   try {
//     isLoading.value = true;
//     //await deleteChildCompany(idSubCompanyDelete.value);
//     //reloadList();
//   } catch (error) {
//     console.log('error');
//   } finally {
//     isLoading.value = false;
//   }
// };

const onCancelRelation = () => {
  console.log('se cancelo');
};

const assignAsDelegate = async (userId: string) => {
  try {
    if (props.child) {
      await childCompanyStore.onUpdateChildCompany(props.id, {
        user_id_c: userId,
      });
      await childCompanyStore.onGetChildCompany(props.id);
    } else {
      await companyStore.onUpdateCompany(props.id, {
        assigned_user_id: userId,
      } as Company);
      await companyStore.onGetCompany(props.id);
    }
    execute();
  } catch (error) {
    console.log(error);
  }
};

const deleteRelation = async () => {
  try {
    isLoading.value = true;
    const data = {
      child:props.child,
      userId,
      companyId
    }
    await deleteUserFromCompany(data);
    reloadList();
  } catch (error) {
    console.log(error);
  }
};

const reloadList = async()=>{
  await execute();
}

const {
  state: users,
  isLoading,
  execute,
} = useAsyncState(async () => {
  let list_users = [];
  if(!userFiltered.value) userFiltered.value = ''
  if (!!props.child && props.id) {
    list_users = await companyStore.onGetUsersFromChildCompany(props.id, userFiltered.value);
  }
  else{
    list_users = await companyStore.onGetCompanyUsers(props.id, userFiltered.value);
  }
  return list_users;
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
        <div class="col">
          <div class="row">
            <div class="column">
              <span class="text-h6">Usuarios de la empresa</span>
              <!--<span v-if="child" class="text-caption">Participación Como</span>-->
            </div>
            <q-space />
            <q-btn v-if="!props.child" color="primary" icon="add" label="Nuevo" />
            <q-btn
              v-else
              color="primary"
              icon="add"
              label="Asignar"
              @click="() => (openDialog = true)"
            />
          </div>
          <div class="row q-mt-md">
           <div>
                <q-form
                  @submit="
                    () => {
                      execute();
                    }
                  "
                  class="q-gutter-md row items-center justify-between"
                >
                  <q-input
                    outlined
                    v-model="userFiltered"
                    dense
                    clearable
                    type="text"
                    label="Nombre de usuario"
                  ></q-input>

                  <div>
                    <q-btn
                      label="Buscar"
                      color="primary"
                      icon="search"
                      type="submit"
                      size="sm"
                    />
                  </div>
                </q-form>
              </div>
        </div>
        </div>
      </template>
        <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="propsBody">
        <q-tr :props="propsBody">
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
                v-if="isDelegateMissing"
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
                    showConfirmed = true;
                    companyId = props.id;
                    userId = propsBody.row.id
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
    <SelectUser
      @select-user="selectUser"
      :users="users"
      :parent-id="childCompanyStore.childPayload.hance_empresa_id_c"
    />
  </q-dialog>
  <AlertComponent
    v-model="showConfirmed"
    v-bind="propsCreateAlert"
    @confirm="deleteRelation"
    @denegate="onCancelRelation"
    >
    <template #body>
      <span> ¿Está seguro de quitar al usuario? </span>
    </template>
   </AlertComponent>
</template>

<style lang="scss">
.fixed-height {
  min-height: inherit;
}
</style>
