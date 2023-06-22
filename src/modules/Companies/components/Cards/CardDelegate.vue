<script setup lang="ts">
import { ref } from 'vue';

const delegate = ref(null);
const options = ref<string[] | undefined>(undefined);

const dummyUsers = ['Kevin', 'Fabio', 'Dani', 'Rafael'];

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
  // ↓ obtener representantes como prueba
  setTimeout(() => {
    update(() => {
      options.value = dummyUsers;
    });
  }, 2000);
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
        v-model="delegate"
        :options="options"
        label="Buscar usuario"
        outlined
        dense
        hide-dropdown-icon
        use-chips
        @filter="filterFn"
        @filter-abort="abortFilterFn"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-select>
    </q-card-section>
  </q-card>
</template>
