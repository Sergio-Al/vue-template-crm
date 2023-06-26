<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { User } from '../../utils/types';
import { getUser, getUsers } from '../../services/useCompanyService';

interface Props {
  id?: string;
}

const props = defineProps<Props>();

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
    }
  });
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

onMounted(async () => {
  if (props.id) {
    console.log('searching...');
    const user = await getUser(props.id);
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
        option-label="first_name"
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
                >{{ scope.opt.first_name }}
                {{ scope.opt.last_name }}</q-item-label
              >
              <q-item-label caption
                >Division: {{ scope.opt.iddivision_c }}</q-item-label
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
              {{ userSelected?.first_name }} {{ userSelected?.last_name }}
            </div>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="person" />
          <q-btn flat> {{ userSelected?.iddivision_c }} </q-btn>
          <q-btn flat color="primary"> {{ userSelected?.idregional_c }} </q-btn>
        </q-card-actions>
      </q-card>
    </q-card-section>
  </q-card>
</template>
