<template>
        <div>
            <q-table
            style="flex-grow: 1; width: inherit"
            flat
            bordered
            :rows="documents"
            :columns="columns"
            :loading="isLoading"
            row-key="id"
            >
            <template v-slot:header="props">
                <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.label }}
                </q-th>
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="posicion_c" :props="props" :style="'width: 250px;'">
                        <span class="text-primary cursor-pointer text-weight-bold">
                        {{ props.row.posicion_c }}
                        </span>
                    </q-td>
                    <q-td key="id" :props="props" :style="'width: 150px;'">
                        <span class="q-my-sm">
                        {{ props.row.documento_c.split('_')[1] }}
                        </span>
                    </q-td>
                    <q-td key="documento_c" :props="props" :style="'max-width: 250px;'" class="text-break">
                        {{ props.row.documento_c }}
                    </q-td>
                    <q-td key="modulo_c" :props="props" :style="'width: 150px;'">
                        <div class="col-12 text-center">
                            <span class="q-my-sm">{{ props.row.modulo_c }}</span>
                        </div>
                    </q-td>
                    <q-td key="auto" :props="props" :style="'width: 150px;'">
                        <q-checkbox v-model="props.row.auto" disabled />
                    </q-td>
                    <q-td key="obligatorio_c" :props="props" :style="'width: 150px;'">
                        <q-checkbox v-model="props.row.obligatorio_c" disabled />
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
        id:''
    }

const props = defineProps<Props>();
const certificationStore = useCertificationStore();
const columns: QTableColumn[] = [
  {
    name: 'posicion_c',
    align: 'left',
    label: '#',
    field: 'name',
    sortable: true,
  },
  {
    name:  'id',
    align: 'left',
    label: 'Código',
    field: 'id',
    sortable: true,
  },
  {
    name:  'documento_c',
    align: 'left',
    label: 'Nombre',
    field: 'documento_c',
    sortable: true,
  },
  {
    name: 'modulo_c',
    align: 'left',
    label: 'Módulo',
    field: 'modulo_c',
    sortable: true,
  },
  {
    name: 'auto',
    align: 'left',
    label: 'Generado por el Sistema',
    field: 'auto',
    sortable: true,
  },
  {
    name: 'obligatorio_c',
    align: 'left',
    label: 'Obligatorio',
    field: 'obligatorio_c',
    sortable: true,
  },
];

//metodos
const reloadList = async ()=>{
    await execute();
}

const {
    state: documents,
    isLoading,
    execute,
} = useAsyncState(async () => {

    const response = await certificationStore.onGetDocumentsSchema(props.id);
    console.log(response);
    return response;
}, []);

</script>
<style scoped>
    
</style>