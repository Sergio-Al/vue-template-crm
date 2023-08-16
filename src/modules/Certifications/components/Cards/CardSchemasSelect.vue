<template>
    <div class="q-pa-md q-py-lg flex fixed-height">
    <q-table
      style="flex-grow: 1; width: inherit"
      flat
      bordered
      :rows="schemas"
      :columns="columns"
      :loading="isLoading"
      row-key="id"
    >
      <template #top>
        <div class="column">
          <span class="text-h6">Esquemas para el tipo</span>
          <span class="text-caption"
            >{{props.tramite}}</span
          >
        </div>
        <q-space />
        <q-btn
            icon="update"
            :color="$q.dark.isActive ? 'grey-3' : 'primary'"
            dense
            flat
            @click="reloadList()"
            :label="`${$q.screen.xs ? '' : ''}`"
            class="q-mx-lg"
          >
            <q-tooltip class="bg-primary" :offset="[10, 10]">
              Actualizar
            </q-tooltip>
          </q-btn>
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
          <q-td key="name" :props="props" :style="'width: 250px;'">
            <!--<span
              class="text-blue-9 cursor-pointer"
              @click="openItemSelected(props.row.id, props.row.nombre_doc)"
            >
              {{ props.row.nombre_doc }}
            </span>-->
            <span class="text-primary cursor-pointer text-weight-bold">
              {{ props.row.name }}
            </span>
          </q-td>
          <q-td key="date_entered" :props="props" :style="'width: 150px;'">
            <span class="q-my-sm">
              {{ props.row.date_entered }}
            </span>
          </q-td>
          <q-td key="description" :props="props" :style="'width: 250px;'">
            {{ props.row.description }}
          </q-td>
          <q-td key="documents" :props="props" :style="'width: 150px;'">
            <span class="q-my-sm">{{ props.row.documents }}</span>
          </q-td>
          <q-td key="created_by" :props="props" :style="'width: 150px;'">
            <span class="q-my-sm">{{ props.row.created_by }}</span>
          </q-td>
        </q-tr>
        <q-tr v-if="props.expand" :props="props">
          <q-td colspan="100%">
            <!--<CardDocumentViewer
              :id="props.row.id"
              :data="props.row"
              :child="propsParent.child"
              :category="props.row.category"
              :type="props.row.type"
            />-->
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
import { useQuasar, QPopupProxy, QTableColumn } from 'quasar';
import { useAsyncState } from '@vueuse/core';
import { useCertificationStore } from '../../store/certificationStore';

interface Props {
  tramite:''
}

const props = defineProps<Props>();
const certificationStore = useCertificationStore();
const columns: QTableColumn[] = [
  {
    name: 'name',
    align: 'left',
    label: 'Nombre',
    field: 'name',
    sortable: true,
  },
  {
    name: 'date_entered',
    align: 'left',
    label: 'Fecha de Creación',
    field: 'date_entered',
    sortable: true,
  },
  {
    name: 'description',
    align: 'left',
    label: 'Descripción',
    field: 'description',
    sortable: true,
  },
  {
    name: 'documents',
    align: 'left',
    label: 'Documentos',
    field: 'documents',
    sortable: true,
  },
  {
    name: 'created_by',
    align: 'left',
    label: 'Creado Por',
    field: 'created_by',
    sortable: true,
  },
];

//metodos
const reloadList = async ()=>{
    await execute();
}

const {
  state: schemas,
  isLoading,
  execute,
} = useAsyncState(async () => {
  const response = await certificationStore.onGetListSchemas(props.tramite);
  console.log(response);
  return response;
}, []);
</script>