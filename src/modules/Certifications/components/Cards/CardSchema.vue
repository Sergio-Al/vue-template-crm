<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuasar, QPopupProxy } from 'quasar';
import moment from 'moment';

import ViewCard from 'src/components/MainCard/ViewCard.vue';
import { getUsers, getUser } from '../../services/useCertificationsService';

import { CertificationDB, CertificationRequest, User } from '../../utils/types';
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
const { userCRM } = userStore();

const props = defineProps<Props>();
const $q = useQuasar();
const certificationStore = useCertificationStore();
//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const dateRef = ref<InstanceType<typeof QPopupProxy> | null>(null);

const localId = ref(props.id);
const inputData = ref({ ...props.data });

const tramite = ref<string>('inscripcion');
const producto = ref<string>('dispositivo');

const documentsSchema = ref<any>([]);
const showSchemas = ref<boolean>(false);

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
});
//* Methods
// const restoreValues = async () => {
//   if (props.data) inputData.value = { ...props.data };
//   await formatData();
// };

// const filterFn = async (
//   val: string,
//   update: (callback: () => void) => void,
//   abort: () => void
// ) => {
//   update(async () => {
//     if (val === '') {
//       if (!!users.value && users.value.length > 0) return;
//       users.value = [];
//     } else {
//       const response = await getUsers(val);
//       console.log(response);
//       users.value = response;
//       //users.value = [{ id: '1', fullname: 'Dan dd' }];
//       //console.log(users.value);
//     }
//   });
// };

// const formatData = async () => {
//   if (!!inputData.value.date_entered) {
//     inputData.value.date_entered = moment(inputData.value.date_entered).format(
//       'YYYY-MM-DD'
//     );
//   }
// }

// onMounted(async () => {
//   console.log(schema.value)
// });


const assignSchema = (item:any)=>{
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
const reloadList = async()=>{
  await execute();
}

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Partial<CertificationRequest> => ({
    user_id_c: inputData.value.user_id_c,
    user_id: userCRM.id,
    date_entered: inputData.value.date_entered,
    iddivision_c: inputData.value.iddivision_c,
    idamercado_c: inputData.value.idamercado_c,
    idregional_c: inputData.value.idregional_c,
  }),
  changeSchema: (procedure: string, product: string) => {
    tramite.value = procedure;
    producto.value = product;
    reloadList();
  },
});
</script>

<template>
  <q-dialog v-model="showSchemas">
    <CardSchemasSelect @select="assignSchema" :tramite="schema.tramite" />
  </q-dialog>
  <q-card class="my-card" :loading="isLoading">
    <q-card-section>
      <span class="">
        <q-icon size="20px" name="insert_drive_file" color="primary" />
        Requisitos
      </span>
    </q-card-section>
    <q-separator />
    <q-card-section class="col-12 padding-schema">
      <q-card class="bg-primary glossy q-mb-sm">
        <!--<q-list separator>
                <q-item class="item-list">
                    <q-item-section avatar>
                        <q-circular-progress
                        show-value
                        font-size="12px"
                        :value="100"
                        size="50px"
                        :thickness="0.10"
                        color="orange"
                        track-color="grey-3"
                        class="q-ma-md"
                        >
                            <q-icon color="white" size="35px" name="toc" />
                        </q-circular-progress>
                    </q-item-section>
                    <q-item-section class="">
                        <q-item-label>
                            <div class="flex items-center text-white justify-between">
                                Esquema: Equipo
                            </div>
                            <div>
                            <small class="text-blue-grey-2">
                                Fecha de creación: {{ 'Sin asignar' }}
                            </small>
                            <br />
                            <small class="text-blue-grey-2">
                                Descripcion
                            </small>
                            </div>
                        </q-item-label>
                    </q-item-section>
                    <q-item-section class="justify-end">

                    </q-item-section>
                </q-item>
            </q-list>-->
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
            >
              <q-icon name="edit" color="black">
                <q-tooltip> Cambiar Esquema </q-tooltip>
              </q-icon>
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-card-section>
    <q-card-section class="q-pb-md">
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
</style>
