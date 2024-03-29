<script setup lang="ts">
import { ref, onMounted } from 'vue';

import CardAddVersion from './CardAddVersion.vue';

import type { Document } from '../../utils/types';

//import { documentList } from '../../utils/dummyData';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
import { useAsyncState } from '@vueuse/core';

import { useCompaniesStore } from '../../store/companyStore';
import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';

const {
 onDeleteDocumentVersion
} = useCompaniesStore();

interface Props {
  id: string;
  category: string;
  type: string;
  data: Document;
  child: boolean;
}

const props = defineProps<Props>();

const showConfirmed = ref<boolean>(false);

const propsCreateAlert = {
  title: 'Alerta de confirmación',
  icon: 'person',
  iconSize: 'md',
  message: '',
  iconColor: 'red',
  btnColor: 'red',
  btnText: 'Si, estoy seguro',
};

const loading = ref(false);
const documentPath = ref('upload/0');
const link = ref('');
const link2 = ref('');
const newVersionDialog = ref(false);

const companyStore = useCompaniesStore();
const idVersion = ref();

const previewDocument = (fileName: string) => {
  documentPath.value = `${HANSACRM3_URL}/index.php?entryPoint=download&id=${fileName}&type=Documents&view_doc=view`;
  //documentPath.value = `public/img/${fileName}`;
};

const deleteVersion = async () => {
  try {
    isLoading.value = true;
    //console.log('se eliminará', idVersion.value);

    await onDeleteDocumentVersion(idVersion.value);
    reloadList();
  } catch (error) {
    console.log('error');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  console.log('mounted here')
});

const {
  state: documents,
  isLoading,
  execute,
} = useAsyncState(async () => {
  const response = await companyStore.onGetVersions(props.id);
  return convierteFechaDoc(response);
}, [] as Document[]);

const convierteFechaDoc = (docs:[]) => {
  docs.forEach((element:any)=>{
    element.fecha_creacion = companyStore.formatoFecha(element.fecha_creacion, 1)
  });
  return docs;
}

const reloadList = ()=>{
  execute();
}


const onCancelRelation = () => {
  console.log('se canceló');
};

</script>
<template>
  <AlertComponent
   v-model="showConfirmed"
   v-bind="propsCreateAlert"
   @confirm="deleteVersion"
   @denegate="onCancelRelation"
    >
      <template #body>
        <span> ¿Está seguro de eliminar la versión del documento ? </span>
      </template>
    </AlertComponent>
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
                        <span class="text-weight-medium text-black">{{ row.fecha_creacion }}</span></q-item-label
                      >
                      <q-item-label caption lines="1"
                        >Responsable: <span class="text-weight-medium text-black">{{ row.nombre_usuario }}</span></q-item-label
                      >
                    </q-item-section>
                      
                    <q-item-section side>
                      <q-btn color="black" icon="more_vert" flat round size="md">
                        <q-menu auto-close :offset="[0, 0]">
                          <q-list dense>
                            <q-item clickable>
                              <div class="row items-center">
                                <q-item-section
        
                                @click="()=>{
                                  showConfirmed = true;
                                  idVersion = row.id_doc_version;
                                }"
                                >Quitar</q-item-section>
                              </div>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
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
