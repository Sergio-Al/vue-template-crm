<script lang="ts" setup>
import { QTableColumn } from 'quasar';

import { useCompaniesStore } from '../store/companyStore';
import { useAsyncState } from '@vueuse/core';

interface Props {
  id: string;
  child?: boolean;
}

const props = withDefaults(defineProps<Props>(), { child: false });
const companyStore = useCompaniesStore();

const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Documento',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories',
    align: 'center',
    label: 'Descripcion',
    field: 'calories',
    sortable: true,
  },
  { name: 'fat', label: 'Fecha Inicio Vigencia', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Fecha Fin Vigencia', field: 'carbs' },
  {
    name: 'calcium',
    label: 'Versión',
    field: 'calcium',
    sortable: true
  }
];

//se dispara cuando carga el componente
const { state: documents, isLoading } = useAsyncState(async () => {
  return await companyStore.onGetCompanyDocuments(props.id);
}, []);
</script>

<template>
  <div class="q-pa-md q-py-lg flex fixed-height">
    <q-table
      style="flex-grow: 1; width: inherit"
      flat
      bordered
      :rows="documents"
      :columns="columns"
      :loading="isLoading"
      row-key="name"
    >
      <template #top>
        <div class="column">
          <span class="text-h6">Documentos de la empresa</span>
          <span v-if="props.child" class="text-caption"
            >Empresa partipante</span
          >
        </div>
        <q-space />
        <q-btn color="primary" icon="add" label="Adicionar" @click="() => {}" />
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
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.name }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss">
.fixed-height {
  min-height: inherit;
}
</style>
