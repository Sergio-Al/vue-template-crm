<script setup lang="ts">
import { ref, onMounted } from 'vue';

import CardAddVersion from './CardAddVersion.vue';

import type { Document } from '../../utils/types';

import { documentList } from '../../utils/dummyData';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
import { useAsyncState } from '@vueuse/core';

import { useCompaniesStore } from '../../store/companyStore';

interface Props {
  id: string;
  category: string;
  type: string;
  data: Document;
  child: boolean;
}

const props = defineProps<Props>();

const loading = ref(false);
const documentPath = ref('upload/0');
const link = ref('');
const link2 = ref('');
const newVersionDialog = ref(false);

const companyStore = useCompaniesStore();

const previewDocument = (fileName: string) => {
  documentPath.value = `${HANSACRM3_URL}/index.php?entryPoint=download&id=${fileName}&type=Documents&view_doc=view`;
  //documentPath.value = `public/img/${fileName}`;
};

onMounted(() => {
  console.log('mounted document viewer');
});

const convierteFechaDoc = (docs:[]) => {
  docs.forEach((element:any)=>{
    const fecha_aux = element.fecha_creacion.substring(0, 10);
    const aux = fecha_aux.split('-');
    element.fecha_creacion = `${aux[2]}/${aux[1]}/${aux[0]}`;
  });

  return docs;
}

const {
  state: documents,
  isLoading,
  execute,
} = useAsyncState(async () => {
  // const response = await axios_NS_07.get(`/document-history/${id}/${category}-${type}`);
  // return response;
  const response = await companyStore.onGetVersions(props.id);



  return convierteFechaDoc(response);
  //return documentList;
}, [] as Document[]);
</script>
<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="row">
        <div class="col-12 col-md-4 q-pa-md">
          <div class="row q-pb-md">
            <q-btn
              class="col-12"
              color="primary"
              full-width
              icon="add"
              label="Adicionar nueva version"
              @click="newVersionDialog = true"
            />
          </div>
          <div
            v-if="documents.length > 0 && !$q.screen.xs"
            col-3
            q-pa-md
            column
            items-end
          >
            <q-scroll-area style="height: 70vh">
              <q-list class="scroll q-none">
                <template v-for="(row, index) in documents" :key="index">
                  <q-item
                    class="q-my-sm"
                    clickable
                    active-class="my-menu-link"
                    :active="link === row.id_doc_version"
                    @click="previewDocument(row.id_doc_version)"
                  >
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ row.filename }}</q-item-label>
                      <q-item-label caption lines="1" class="text-black"
                        >Versión: {{ row.version }}</q-item-label
                      >
                      <q-item-label caption lines="1"
                        >Fecha de Creación:
                        <span class="text-weight-bold text-black">{{ row.fecha_creacion }}</span></q-item-label
                      >
                      <q-item-label caption lines="1"
                        >Responsable: <span class="text-weight-bold text-black">{{ row.nombre_usuario }}</span></q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                </template>
              </q-list>
            </q-scroll-area>
          </div>
          <div v-else-if="documents.length > 0 && $q.screen.xs">
            <q-list>
              <template v-for="(row, index) in documents" :key="index">
                <q-item class="q-my-sm" clickable active-class="my-menu-link">
                  <q-item-section avatar>
                    <a :href="link2 + row.id_doc_version">
                      <img src="pdf.png" style="width: 30px; height: 35px" />
                    </a>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label
                      ><a :href="link2 + row.id_doc_version">{{
                        row.doc_nombre
                      }}</a></q-item-label
                    >
                    <q-item-label caption lines="1" class="text-black"
                      >Versión {{ row.version }}</q-item-label
                    >
                    <q-item-label caption lines="1"
                      >Fecha de Creación: {{ row.fecha_creacion }}</q-item-label
                    >
                    <q-item-label caption lines="1"
                      >Responsable: {{ row.nombre_usuario }}</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      size="12px"
                      flat
                      dense
                      round
                      icon="more_vert"
                      @click="(event:Event)=>event.stopPropagation()"
                    >
                      <q-menu>
                        <q-list style="min-width: 100px" dense>
                          <q-item clickable v-close-popup>
                            <q-item-section>Quitar</q-item-section>
                          </q-item>
                          <q-separator />
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </template>
            </q-list>
          </div>
          <div v-else class="text-center">
            <span>No se encontraron registros!!!</span>
          </div>
        </div>
        <div class="col-12 col-md-8 items-end" v-if="!$q.screen.xs">
          <template v-if="documentPath === 'upload/0'">
            <q-card
              style="height: 70vh; width: 100%"
              flat
              bordered
              class="my-card column flex-center"
            >
              <img src="img/pdf.png" style="width: 200px; height: 200px" />
              <br />
              <div class="text-h5 q-mt-sm q-mb-xs text-weight-bold">
                Seleccione un documento de la lista
              </div>
            </q-card>
          </template>
          <template v-else>
            <iframe
              :src="documentPath"
              style="height: 70vh; width: 100%"
              frameborder="0"
            >
            </iframe>
          </template>
        </div>
      </div>
    </q-card-section>
    <q-inner-loading
      :showing="loading"
      label="Relacionando una cotización.."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </q-card>
  <q-dialog v-model="newVersionDialog" persistent>
    <CardAddVersion :id-document="props.id" :data="props.data" :child="props.child" />
  </q-dialog>
</template>
