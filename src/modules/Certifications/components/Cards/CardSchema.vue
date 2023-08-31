<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuasar, QPopupProxy, QInput } from 'quasar';
import moment from 'moment';

import ViewCard from 'src/components/MainCard/ViewCard.vue';
import { getUsers, getUser } from '../../services/useCertificationsService';

import { CertificacionBody, CertificationDB, CertificationRequest, User } from '../../utils/types';
import { userStore } from 'src/modules/Users/store/UserStore';
import { useCertificationStore } from '../../store/certificationStore';
import { useAsyncState } from '@vueuse/core';

import CardSchemasSelect from './CardSchemasSelect.vue';

// obtener data del repositorio de mongoDB y borrar este import
// import {
//   useDivAreaMercado,
//   useDivision,
//   useGrupoCliente,
//   useRegionales,
// } from 'src/composables/useLanguage';
import { rowsSchema } from '../../utils/dummyData';
//import { amercado, divisions, regional } from '../../utils/dummyData';

interface Props {
  id: string;
  data: any;
}

// const { getListDivisiones, listDivisiones } = useDivision();
// const { getRegionales, listRegionales } = useRegionales();
//const { userCRM } = userStore();

const props = defineProps<Props>();
//const $q = useQuasar();
const certificationStore = useCertificationStore();
//const { userCRM, getCompany } = useCompany();
//const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const dateRef = ref<InstanceType<typeof QPopupProxy> | null>(null);

const localId = ref(props.id);
const inputData = ref({ ...props.data });

const tramite = ref<string>('inscripcion');
const producto = ref<string>('dispositivo');

const documentsSchema = ref<any>([]);
const showSchemas = ref<boolean>(false);
const edit = ref<boolean>(false)

//inputData.value.iddivision_c = '';
//inputData.value.user_id_c = '5c19df6d-0cf0-6e23-7c01-629fb9d01588';

// let users = ref<any[] | undefined>(undefined);
const columns = [
  {
    name: 'posicion_c',
    label: '#',
    field: 'posicion_c',
  },
  { name: 'id', align: 'center', label: 'Código', field: 'id', sortable: true },
  { name: 'documento_c', align: 'left', label: 'Nombre', field: 'documento_c', sortable: true },
  { name: 'modulo_c', align: 'center', label: 'Módulo', field: 'modulo_c', sortable: true },
  { name: 'auto', align: 'center', label: 'Generado por el sistema', field: 'auto', sortable: false },
  { name: 'obligatorio_c', label: 'Obligatorio', field: 'obligatorio_c', sortable: false }

];

onMounted(() => {
  if(localId.value){
    tramite.value = props.data.tipo_tramite_c;
    producto.value = props.data.tipo_producto_c;
  }
  else{
    edit.value = true;
  }
});

// Methods
const assignSchema = (item:any)=>{
  //console.log(item);
  showSchemas.value = false;
  schema.value = item;
  getDocuments(item.id);
}

const getDocuments = async(id:string)=>{
  documentsSchema.value = await certificationStore.onGetDocumentsSchema(id);
}

const {
  state: schema,
  isLoading,
  execute,
} = useAsyncState(async () => {
  const response = await certificationStore.onGetLastSchema(
    tramite.value,
    producto.value
  );

  await getDocuments(response.id)
 
  return response;
}, []);

const openDialogSchema = () => {
  showSchemas.value = true;
};

const closeDate = () => {
  dateRef.value?.hide();
};

const removeSolicitante = () => {
  inputData.value.user_id_c = '';
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

const divisionList = ref([]);
//let listAreaMercado = ref({});
const listRegional = ref([]);

const editMode = ()=>{
  edit.value = true;
}

const restoreValues = ()=>{
  edit.value = false;
  reload();
}

// onMounted(async () => {
//   await getListDivisiones();
//   await getRegionales();
//   await formatData();
// });

// const amercadoList = computed(() => {

//   const result: any = divisionList.value.filter(
//     (element: any) => element.cod_div == inputData.value.iddivision_c
//   );
//   const aux = { ...result[0] };
//   return aux.amercado;
// });
const reload = async()=>{
  await execute();
}

defineExpose({
  isEditing: computed(() => edit.value === true),
  exposeData: (): Partial<CertificacionBody> => ({
    tipo_tramite_c: tramite.value,
    tipo_producto_c: producto.value,
    schema_id: schema.value.id,
  }),
  changeSchema: (procedure: string, product: string) => {
    tramite.value = procedure;
    producto.value = product;
    //console.log(schema);
    reload();
  },
});
</script>

<template>
  <q-dialog v-model="showSchemas">
      <CardSchemasSelect 
      :tramite="schema.tramite" 
      @close="()=>{
        showSchemas = false;
      }" 
      @select="assignSchema" 
      />
  </q-dialog>
  <q-card class="my-card-schema">
    <q-card-section class="flex justify-between">
      <span>
        <q-icon size="20px" name="insert_drive_file" color="primary" />
        Requisitos
      </span>
      <div v-if="props.id">
        <q-btn v-if="!edit" @click="editMode" class="q-px-none" icon="edit" flat size="sm">
        <q-tooltip>Editar</q-tooltip>  
        </q-btn>
        <q-btn v-else @click="restoreValues" class="q-px-none" icon="cancel" flat size="sm">
          <q-tooltip>Cancelar</q-tooltip>  
        </q-btn>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="col-12 padding-schema" v-if="tramite != 'correccion'">
      <q-card class="bg-primary glossy q-mb-sm">
        <div class="row q-px-sm">
          <div class="col-2 text-left">
            <q-circular-progress
              show-value
              font-size="12px"
              :value="100"
              size="50px"
              :thickness="0.1"
              color="orange"
              track-color="grey-3"
              class="q-ma-md"
            >
              <q-icon color="white" size="35px" name="toc" />
            </q-circular-progress>
          </div>
          <div class="col-8">
            <div class="q-ma-md">
              <div class="flex items-center text-white justify-between">
                Esquema: {{ schema.name }}
              </div>
              <div>
                <small class="text-blue-grey-2">
                  Fecha de creación: {{ schema.date_entered }}
                </small>
                <br />
                <small class="text-blue-grey-2">
                  Descripcion: {{ schema.description }}
                </small>
              </div>
            </div>
          </div>
          <div class="col-2 text-right">
            <q-btn
              @click="openDialogSchema"
              class="q-ma-md"
              round
              color="white"
              :disabled = "!edit"
            >
              <q-icon name="search" color="black">
                <q-tooltip> Búsqueda </q-tooltip>
              </q-icon>
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-card-section>
    <q-card-section class="q-pb-md" v-if="tramite != 'correccion'">
        <div class="q-pa-sm">
            <q-table
                style="height: 400px"
                flat bordered
                :rows="documentsSchema"
                :columns="columns"
                row-key="index"
                :rows-per-page-options="[5,10,20]"
                >
            <template #body="propsTable">
                <q-tr :props="propsTable">
                    <q-td key="posicion_c" :props="propsTable">
                        {{propsTable.row.posicion_c}}
                    </q-td>
                    <q-td key="id" :props="propsTable">
                        {{propsTable.row.documento_c.split('_')[1]}}
                    </q-td>
                    <q-td key="documento_c" :props="propsTable">
                        <span class="text-break">
                            {{propsTable.row.documento_c}}
                        </span>
                    </q-td>
                    <q-td key="modulo_c" :props="propsTable">
                        {{propsTable.row.modulo_c}}
                    </q-td>
                    <q-td key="auto" :props="propsTable">
                        <q-checkbox v-model="propsTable.row.auto" disabled />
                    </q-td>
                    <q-td key="obligatorio_c" :props="propsTable">
                        <q-checkbox v-model="propsTable.row.obligatorio_c" disabled />
                    </q-td>
                </q-tr>
            </template>

            </q-table>
        </div>
    </q-card-section>
    <q-card-section class="text-center text-grey" v-else>
      <q-icon name="info" />
      El trámite seleccionado, no lleva requisitos consigo
    </q-card-section>
  </q-card>
  <!--<div v-if="isLoading">
    <q-card class="q-pa-sm">
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton height="80px" square />
    </q-card>
  </div>-->
</template>

<style lang="scss">
.assigned-user {
  font-size: 1.04rem;
}

.card-actions {
  padding: 5px;
}

.item-list {
  padding: 1em;
  align-items: center;
}

.text-break {
  width: 400px;
  line-break: auto;
  white-space: wrap;
  font-size: 1em;
}

.no-padding {
  padding: 0;
}

.padding-schema {
  padding: 10px 10px 0px;
}

.my-card-schema{
  min-height:395px;
}
</style>
