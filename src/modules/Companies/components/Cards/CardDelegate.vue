<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { User } from '../../utils/types';
import { getUser, getUsers } from '../../services/useCompanyService';

interface Props {
  id?: string;
  showSave?: boolean;
}

interface Emits {
  (e: 'update', id: string | null): void;
}

const props = withDefaults(defineProps<Props>(), {
  showSave: false,
});
const emits = defineEmits<Emits>();

const delegate = ref(null);
const options = ref<User[] | undefined>(undefined);
const userSelected = ref<User | null>(null);

const assignInfo = (id: string) => {
  console.log(id);
  if (!!options.value) {
    const userToSelect = options.value.find((value) => value.id === id) as User;

    userSelected.value = userToSelect;
  }
};

const filterFn = async (
  val: string,
  update: (callback: () => void) => void,
  abort: () => void
) => {
  update(async () => {
    if (val === '') {
      if (!!options.value && options.value.length > 0) return;
      options.value = [];
      
    } else {
      const term = val;
      const response = await getUsers(term);
      
      options.value = response;
      console.log(options.value);
    }
  });
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

const updateAssigned = () => {
  if (!!delegate.value) {
    emits('update', delegate.value);
  }
};

onMounted(async () => {
  if (props.id) {
    console.log('searching...');
    const user = await getUser(props.id);
    user.fullname = user.nombres+' '+user.apellidos;
    console.log(user);
    userSelected.value = user;
  }
});

defineExpose({
  exposeData: () => delegate.value,
});
</script>

<template>
  <q-card class="col-12">
    <q-card-section>
      <q-icon name="info" size="sm" class="q-mr-sm" color="warning" />
      Representante
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-select
        use-input
        hide-selected
        fill-input
        input-debounce="500"
        label="Buscar usuario"
        :options="options"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
        hint="Ingrese el nombre del usuario"
        emit-value
        map-options
        option-label="fullname"
        option-value="id"
        v-model="delegate"
        outlined
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
              <q-item-label
                >{{scope.opt.fullname}}</q-item-label
              >
              <q-item-label caption
                >Email: {{scope.opt.email_address}}</q-item-label
              >
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>
    <q-card-section v-if="!!props.id || !!delegate">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Nombre</div>
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ userSelected?.fullname }}
            </div>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="person" />
          <span flat color="primary"> {{ userSelected?.email_address}} </span>
        </q-card-actions>
        <q-card-actions vertical align="left">
          <q-btn
            v-if="!!props.id || props.showSave"
            flat
            label="Guardar"
            @click="updateAssigned()"
          />
        </q-card-actions>
      </q-card>
    </q-card-section>
  </q-card>
</template>
