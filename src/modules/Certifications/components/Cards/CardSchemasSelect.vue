<template>
    <q-card class="flex fixed-height fixed-width">
        <div>
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
                <div class="col-12 flex justify-between bg-primary q-pa-sm">
                    <div>
                        <span class="text-h6 text-white">Esquemas para el tipo</span>
                        <br>
                        <span class="text-caption text-white"
                            >{{props.tramite}}</span
                        >
                    </div>
                    <q-btn
                        icon="update"
                        dense
                        flat
                        rounded
                        @click="reloadList()"
                        class="text-white"
                    >
                        <q-tooltip class="bg-primary" :offset="[10, 10]">
                        Actualizar
                        </q-tooltip>
                    </q-btn>
                </div>
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
                    >
                    <q-tooltip>
                        Ver Documentos
                    </q-tooltip>
                    </q-btn>
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
                <q-td key="description" :props="props" :style="'max-width: 250px;'" class="text-break">
                    {{ props.row.description }}
                </q-td>
                <q-td key="documents" :props="props" :style="'width: 150px;'">
                    <div class="col-12 text-center">
                        <span class="q-my-sm">{{ props.row.documents }}</span>
                    </div>
                </q-td>
                <q-td key="created_by" :props="props" :style="'width: 150px;'">
                    <span class="q-my-sm">{{ props.row.created_by }}</span>
                </q-td>
                <q-td key="actions" :props="props" :style="'width: 150px;'">
                    <q-btn text-color="white" label="Seleccionar" color="primary" @click="seleccionar(props.row)" />
                </q-td>
                </q-tr>
                <q-tr v-if="props.expand" :props="props">
                    <q-td colspan="100%">
                        <CardDocumentsSchema
                        :id="props.row.id"
                        />
                    </q-td>
                </q-tr>
            </template>
            </q-table>
        </div>
    </q-card>
</template>
<script setup lang="ts">
import { useQuasar, QPopupProxy, QTableColumn } from 'quasar';
import { useAsyncState } from '@vueuse/core';
import { useCertificationStore } from '../../store/certificationStore';

import CardDocumentsSchema from './CardDocumentsSchema.vue';

interface Props {
  tramite:''
}
interface Emits {
  (e: 'select', value: any): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

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
  {
    name: 'actions',
    align: 'left',
    label: 'Acciones',
    field: 'actions',
    sortable: true,
  },
];

//metodos
const reloadList = async ()=>{
    await execute();
}

const seleccionar = (item:string)=>{
    emits('select', item)
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
<style lang="scss" scoped>
.fixed-height {
  min-height: inherit;
}

.fixed-width{
    min-width:950px;
}

.text-break {
    width:500px;
    line-break: normal;
    white-space: wrap;
    font-size: .9em;
  }
</style>