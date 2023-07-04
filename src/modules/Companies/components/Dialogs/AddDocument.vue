<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { QExpansionItem, QTableColumn } from 'quasar';

import CardAddDocument from '../Cards/CardAddDocument.vue';

interface Props {
  documentId?: string;
}

const expansionItemRef = ref<InstanceType<typeof QExpansionItem> | null>();

const props = withDefaults(defineProps<Props>(), {
  documentId: '',
});

onMounted(() => {
  console.log('mounted');
  if (!props.documentId) {
    expansionItemRef.value?.show();
  }
});

const columns: QTableColumn[] = [
  {
    name: 'name',
    align: 'left',
    label: 'Nombre',
    field: 'name',
    sortable: true,
  },
  {
    name: 'version',
    align: 'left',
    label: 'Version',
    field: 'version',
    sortable: true,
  },
  {
    name: 'date_added',
    align: 'left',
    label: 'Fecha',
    field: 'date_added',
    sortable: true,
  },
  {
    name: 'description',
    align: 'left',
    label: 'Registro de cambio',
    field: 'description',
    sortable: true,
  },
  {
    name: 'options',
    align: 'center',
    label: 'Opciones',
    field: 'options',
    sortable: true,
  },
];

const dummyData = [
  {
    id: 'ddfasfads',
    name: 'nombre1',
    date_added: '27/01/2023',
    fileName: 'nombreDocumentos',
    date_exp: '27/02/2023',
    status: 'Revision',
    description: 'Segunda version del documento',
    version: '2',
    assigned_user_id: 'assignedUserId',
  },
  {
    id: 'otro',
    name: 'nombre1',
    date_added: '27/01/2023',
    fileName: 'nombreDocumentos',
    date_exp: '27/02/2023',
    version: '1',
    description: 'Primera version del documento',
    status: 'Revision',
    assigned_user_id: 'assignedUserId',
  },
];
</script>

<template>
  <q-layout
    view="lHh LpR lff"
    container
    :style="{ 'max-height': $q.screen.lt.sm ? '100vh' : '80vh' }"
    style="height: 900px; width: 50rem; max-width: 100vw"
    class="bg-grey-3"
  >
    <q-header class="bg-primary text-white">
      <q-toolbar class="q-pa-lg">
        <q-btn
          v-if="$q.screen.lt.sm"
          color="primary"
          flat
          text-color="white"
          icon="arrow_back_ios"
          v-close-popup
        />
        <q-icon
          :class="$q.screen.lt.sm ? '' : 'q-ml-sm'"
          size="lg"
          name="article"
        />
        <q-toolbar-title>Adicionar nuevo documento</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-separator />
    </q-header>

    <!-- <q-footer bordered class="bg-white text-primary q-pa-sm" align="right">
      <q-btn
        color="primary"
        icon="group_add"
        label="Confirmar"
        v-close-popup
        @click="() => {}"
      />
    </q-footer> -->

    <q-page-container>
      <q-page class="q-pa-none">
        <q-expansion-item
          ref="expansionItemRef"
          expand-separator
          icon="add"
          label="Añadir documento"
        >
        <CardAddDocument />
        </q-expansion-item>
        <div v-if="!!props.documentId" class="q-mt-sm q-pa-sm">
          <q-table
            title="Versiones del documento"
            :rows="dummyData"
            hide-bottom
            :columns="columns"
            row-key="id"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'options'">
                    <q-btn
                      @click="() => {}"
                      size="sm"
                      color="negative"
                      round
                      dense
                      icon="delete"
                    >
                      <q-tooltip>Eliminar</q-tooltip>
                    </q-btn>
                  </div>
                  <span v-else>{{ col.value }}</span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>
