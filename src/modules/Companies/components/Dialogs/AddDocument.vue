<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { QExpansionItem, QTableColumn } from 'quasar';

import CardAddDocument from '../Cards/CardAddDocument.vue';
import type { Document } from '../../utils/types';

interface Props {
  id?: string;
  documentId?: string;
  documentName?:string;
  child?:boolean;
  documentData?: Document;
}

interface Emits {
  (e: 'close-dialog', id: string): void;
}

const emits = defineEmits<Emits>();

const expansionItemRef = ref<InstanceType<typeof QExpansionItem> | null>();

const props = withDefaults(defineProps<Props>(), {
  id: '',
  child:false,
  documentId: '',
  documentName: '',
  documentData: () => ({} as Document),
});

onMounted(() => {
  if(!!props.documentId){
    console.log('editar')
  }
  else{
    console.log('nuevo')
  }
  
  console.log('mounted');
  console.log(props);
  expansionItemRef.value?.show();
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
    label: 'Versión',
    field: 'version',
    sortable: true,
  },
  {
    name: 'date_added',
    align: 'left',
    label: 'Fecha de Publicación',
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
    name: 'status',
    align: 'left',
    label: 'Estado',
    field: 'status',
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

const update = ()=>{
  emits('close-dialog', '1');
}

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
        <q-toolbar-title>{{documentName || 'Adicionar nuevo documento'}}</q-toolbar-title>
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
          :icon="props.documentId?'edit':'add'"
          :label="props.documentId?'Editar documento':'Añadir documento'"
        >
          <CardAddDocument
            :header-id="props.id"
            :header-child="props.child"
            :default-data="props.documentData"
            :document-id="props.documentId"
            @update = "update"
          />
        </q-expansion-item>
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>
