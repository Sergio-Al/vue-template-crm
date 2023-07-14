<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { Document } from '../../utils/types';

import { documentList } from '../../utils/dummyData';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
import { useAsyncState } from '@vueuse/core';

interface Props {
  id: string;
  category: string;
  type: string;
}

const props = defineProps<Props>();

const loading = ref(false);
const documentPath = ref('upload/0');
const link = ref('');
const link2 = ref('');

const previewDocument = (fileName: string) => {
  // documentPath.value = `${HANSACRM3_URL}/index.php?entryPoint=download&id=${fileName}&type=Documents&view_doc=view`;
  documentPath.value = `public/img/${fileName}`;
};

onMounted(() => {
  console.log('mounted document viewer');
});

const {
  state: documents,
  isLoading,
  execute,
} = useAsyncState(async () => {
  // const response = await axios_NS_07.get(`/document-history/${id}/${category}-${type}`);
  // return response;
  return documentList;
}, [] as Document[]);
</script>
<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="row">
        <div class="col-12 col-md-4 q-pa-md">
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
                    :active="link === row.id"
                    @click="previewDocument(row.fileName)"
                  >
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ row.name }}</q-item-label>
                      <q-item-label caption lines="1" class="text-black">{{
                        row.category
                      }}</q-item-label>
                      <q-item-label caption lines="1"
                        >Publicación: {{ row.date_added }}</q-item-label
                      >
                      <q-item-label caption lines="1"
                        >Vencimiento: {{ row.date_exp }}</q-item-label
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
                    <a :href="link2 + row.id">
                      <img src="pdf.png" style="width: 30px; height: 35px" />
                    </a>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label
                      ><a :href="link2 + row.id">{{
                        row.name
                      }}</a></q-item-label
                    >
                    <q-item-label caption lines="1" class="text-black">{{
                      row.category
                    }}</q-item-label>
                    <q-item-label caption lines="1"
                      >Publicación: {{ row.date_added }}</q-item-label
                    >
                    <q-item-label caption lines="1"
                      >Vencimiento: {{ row.date_exp }}</q-item-label
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
</template>
