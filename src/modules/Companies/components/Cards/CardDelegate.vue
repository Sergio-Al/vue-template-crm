<script setup lang="ts">
import { ref } from 'vue';

import { users } from '../../utils/dummyData';
import type { User } from '../../utils/types';

const delegate = ref(null);
const options = ref<User[] | undefined>(undefined);

const filterFn = (
  val: string,
  update: (callback: () => void) => void,
  abort: () => void
) => {
  if (!!options.value) {
    // already loaded
    update(() => {
      return;
    });
  }

  // obtener representantes por api
  // options.value = await getRepresentantes();
  // ↓ obtener representantes como prueba, reemplazar toda la funcion
  //   settimeout por el await y asignar a options.value
  setTimeout(() => {
    update(() => {
      if (val === '') {
        options.value = [];
      } else {
        // const needle = val.toLowerCase();
        options.value = users.filter((v) => v.first_name.includes(val));
      }
    });
  }, 1500);
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

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
        input-debounce="0"
        label="Buscar usuario"
        :options="options"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
        hint="Ingrese el nombre del usuario"
        emit-value
        map-options
        option-label="first_name"
        option-value="id_usuario"
        v-model="delegate"
        outlined
        dense
        hide-dropdown-icon
        use-chips
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
    <q-card-section v-if="!!delegate">
      Se ha seleccionado a {{ delegate }}
    </q-card-section>
  </q-card>
</template>
