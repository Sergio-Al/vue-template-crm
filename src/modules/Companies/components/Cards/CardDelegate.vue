<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import type { User } from '../../utils/types';
import { getUser, getUsers, getVersions } from '../../services/useCompanyService';

import ViewCard from 'src/components/MainCard/ViewCard.vue';

import { useCompaniesStore } from '../../store/companyStore';
import { useChildCompaniesStore } from '../../store/childCompanyStore';

interface Props {
  id?: string;
  userId?: string;
  showSave?: boolean;
  showControls?: boolean;
  child?: boolean;
}

interface Emits {
  (e: 'update', id: string | null): void;
}

const props = withDefaults(defineProps<Props>(), {
  showSave: false,
  showControls: true,
  child: false,
});
const emits = defineEmits<Emits>();
const exist_delegate = ref(true);

const companyStore = useCompaniesStore();
//const childCompanyStore = useChildCompaniesStore();
const delegate = ref(props.userId || null);
// const delegate = props.userId || null;
const defaultUsers = ref<User[] | undefined>(undefined);
const users = ref<User[] | undefined>(undefined);
const userSelected = ref<User | null>(null);

const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

const assignInfo = (id: string) => {
  console.log(id);
  if (!!users.value) {
    const userToSelect = users.value.find((user) => user.id === id) as User;
    userSelected.value = userToSelect;
    delegate.value = id;
    console.log(delegate.value);
  }
  
};

const filterFn = async (
  val: string,
  update: (callback: () => void) => void,
  //abort: () => void
) => {
  update(async () => {
    if (val === '') {
      if (!!users.value && users.value.length > 0) return;
      users.value = defaultUsers.value;
    } else {
      //console.log(props.id);
      const response = await getUsers(val, props.id);
      if (response.length === 0) {
        users.value = defaultUsers.value;
        return;
      }
      users.value = response;
    }
  });
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

// const updateAssigned = () => {
//   if (!!delegate.value) {
//     emits('update', delegate.value);
//   }
// };

const assignUser = async (idUser: string) => {
  // const user = await getUser(idUser);

  // const {id, fullname} = user;

  //  const response:any = [{id, fullname}];

  //  users.value = [response[0]];
  //  console.log(users.value);

   const response:any = await getUser(idUser);
   
   console.log(response);
   users.value = [response];
   console.log(users.value);
      
  // // user.fullname = user.nombres + ' ' + user.apellidos;
  // // console.log(user);

  userSelected.value = {fullname:response.fullname, email_address:response.email_address};
};

const assignDefaultUsers = async () => {
  if (props.child && !!props.id) {
    defaultUsers.value = await companyStore.onGetUsersFromChildCompany(props.id, '');
    users.value = defaultUsers.value;
    return;
  }
  if (!!props.id) {
    defaultUsers.value = await companyStore.onGetCompanyUsers(props.id, '');
    users.value = defaultUsers.value;
    return;
  }
};

const restoreValues = () => {
  if (props.userId) assignUser(props.userId);
};

onMounted(async () => {
  if(props.id){
    if(props.userId){
      assignUser(props.userId);
      exist_delegate.value = true;
    }
    else{
      await assignDefaultUsers();
      const long_array:any = users.value?.length;
      if(long_array > 0){
        exist_delegate.value = true;
        assignDefaultUsers();
      }
      else{
        exist_delegate.value = false;
      }
    }
  }
  else{
    exist_delegate.value = false;
  }

});

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: () => delegate.value,
});
</script>

<template>
  <view-card-component
    v-bind="$attrs"
    :controls="props.showControls"
    :initial-status="props.showControls ? 'read' : 'edit'"
    icon-name="info"
    ref="baseCardRef"
    title="Representante"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
  >
    <template #headerFieldRead>
      <q-avatar
        v-if="!props.userId"
        size="sm"
        color="warning"
        text-color="white"
        icon="warning"
      >
        <q-tooltip> Se debe de asignar a un representante </q-tooltip>
      </q-avatar>
    </template>
    <template #read>
      <q-card-section v-if="!!props.userId || !!delegate">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Nombre</div>
              <div class="text-subtitle1 q-mt-sm q-mb-xs">
                <q-icon flat round name="person"/>
                {{ userSelected?.fullname }}
              </div>
              <span flat class="text-grey">
                {{ userSelected?.email_address }}
              </span>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section v-else>
        <q-card flat class="text-grey-8"> Sin representante asignado</q-card>
      </q-card-section>
    </template>
    <template #edit
      ><q-card-section>
        <q-select
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          label="Buscar usuario"
          :options="users"
          @blur="assignDefaultUsers"
          @filter="filterFn"
          @filter-abort="abortFilterFn"
          :hint="!props.userId ? '' : 'Seleccione el usuario'"
          emit-value
          map-options
          option-label="fullname"
          option-value="id"
          v-model="delegate"
          outlined
          :disable="!exist_delegate"
          dense
          hide-dropdown-icon
          use-chips
          @update:model-value="assignInfo"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.fullname }}</q-item-label>
                <q-item-label caption
                  >Email: {{ scope.opt.email_address }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </template>

          <template #append>
            <q-btn
              v-if="
                !defaultUsers || (!!defaultUsers && defaultUsers.length === 0)
              "
              color="warning"
              icon="warning"
              round
              size="sm"
            >
              <q-tooltip>
                Debe asignar al menos un usuario a la empresa
              </q-tooltip>
            </q-btn>
          </template>
        </q-select>
      </q-card-section>
      <q-card-section v-if="!!delegate">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Nombre</div>
              <div class="text-subtitle1 q-mt-sm q-mb-xs">
                <q-icon flat round name="person"/>
                {{ userSelected?.fullname }}
              </div>
              <span flat class="text-grey">
                {{ userSelected?.email_address }}
              </span>
            </q-card-section>
          </q-card-section>



          <!-- <q-card-actions vertical align="left">
            <q-btn
              v-if="!!props.userId || props.showSave"
              flat
              label="Guardar"
              @click="updateAssigned()"
            />
          </q-card-actions> -->
        </q-card>
      </q-card-section></template
    >
  </view-card-component>
</template>
