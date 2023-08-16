<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuasar, QPopupProxy } from 'quasar';
import moment from 'moment';

import ViewCard from 'src/components/MainCard/ViewCard.vue';
//import { getUsers, getUser } from '../../services/useCertificationsService';

import { CertificationRequest } from '../../utils/types';
import { userStore } from 'src/modules/Users/store/UserStore';
import RelacionadoSol from 'src/components/Activities/Dialogs/CallsActivityDialog/CallRelacion/RelacionadoSol.vue';
import CertificationRequestDialog from 'src/modules/Certifications/components/Dialogs/CertificationRequestDialog.vue';

// obtener data del repositorio de mongoDB y borrar este import
import {
  useDivAreaMercado,
  useDivision,
  useGrupoCliente,
  useRegionales,
} from 'src/composables/useLanguage';

import
{
  getCertificationRequest,
  getCertificationRequestCustomized
} from '../../services/useCertificationsService';
import { useAsyncState } from '@vueuse/core';

//import { user } from '../../utils/dummyData';
//import { amercado, divisions, regional } from '../../utils/dummyData';

interface Props {
  id: string;
  data: any;
}
const advancedFilterSol = ref<InstanceType<typeof RelacionadoSol> | null>(null);

const certificationRequest = ref({} as any);
const { userCRM } = userStore();

const props = defineProps<Props>();
const $q = useQuasar();

const emits = defineEmits<{
  (event: 'idAccount', localIdValue: any): void;
  (event: 'cambioStage', item: boolean): void;
}>();

const showFilter = ref(false);
const bloqueado = ref(true);

//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const dateRef = ref<InstanceType<typeof QPopupProxy> | null>(null);
const requestDialogRef = ref<InstanceType<typeof CertificationRequestDialog> | null>(
    null
  );

const inputData = ref({ ...props.data });
//inputData.value.iddivision_c = '';
//inputData.value.user_id_c = '5c19df6d-0cf0-6e23-7c01-629fb9d01588';

//let users = ref<any[] | undefined>(undefined);

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

const verDialogItem = async (id: string) => {
    await requestDialogRef.value?.openDialogTab(id)
  };

const { isLoading } = useAsyncState(async () => {
  if (!!props.data.hance_solicitudcertificacion_id_c)
      try {
        const response = await getCertificationRequestCustomized(props.data.hance_solicitudcertificacion_id_c);
        //console.log(response);
        certificationRequest.value = response[0];
        return response;
      } catch (error) {
        $q.notify({
          type: 'warning',
          message: 'Error en la captura',
          caption: 'No se encontró la solicitud',
        });
      }
}, null as null | CertificationRequest);

onMounted(async () => {
  console.log(inputData.value.hance_solicitudcertificacion_id_c);

  // await getListDivisiones();
  // await getRegionales();
  // divisionList.value = listDivisiones.value;

  // //console.log(divisionList.value);

  // if (!!props.id) {
  //   inputData.value.date_entered = inputData.value.date_entered?.substring(0,10);
  // } else {
  //   if (userCRM) {
  //     //console.log(userCRM);
  //     const { id, nombres, apellidos, iddivision, idamercado, idregional } =
  //       userCRM;
  //     inputData.value.user_id_c = id;
  //     inputData.value.user_id = id;
  //     users.value = [{ id, fullname: `${nombres} ${apellidos}` }];
  //     //valores por defecto aqui
  //     inputData.value.idamercado_c = idamercado;
  //     inputData.value.iddivision_c = iddivision;
  //     //inputData.value.idregional_c=idregional;
  //     inputData.value.idregional_c = '';
  //     inputData.value.date_entered = new Date().toISOString().substring(0, 10);
  //   }
  // }

  // console.log(inputData.value);

  // // buscar solicitante y asignar a users[] (options)
  // if (!!inputData.value.user_id_c) {
  //   if (!!props.id) {
  //     const response:any = await getUser(inputData.value.user_id_c);
  //     users.value = [response[0]];
  //   }
  //   // const response = await getUser(inputData.value.user_id_c);
  //   //   console.log(response);
  //   //   users.value = [response];
  // }

  // //listAreaMercado.value = await useDivAreaMercado(inputData.value.iddivision_c);

  // const aux:any = await listRegionales.value.find(
  //   (element: any) => element.cod_pais == 'BO'
  // );

  // listRegional.value = aux.regiones;
});

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

const toggleFilter = () => {
  bloqueado.value = false;
  showFilter.value = !showFilter.value;
  //console.log('permitir elegir la solicitud')
};

const openDialogSol = () => {
  advancedFilterSol.value?.openDialog();
};

const selectRelaSol = (item: any) => {
  console.log(item)
  certificationRequest.value.name = String(item.name);
  certificationRequest.value.id = String(item.id);
  certificationRequest.value.solicitante = String(item.solicitante);
  certificationRequest.value.fecha_creacion = String(item.date_entered);
  //emits('idAccount', { idrequest: item.id });

  advancedFilterSol.value?.onClose();
};

const clearSol = () => {
  certificationRequest.value.name = '';
  certificationRequest.value.id = '';
};

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

// defineExpose({
//   isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
//   exposeData: (): Partial<CertificationRequest> => ({
//     user_id_c: inputData.value.user_id_c,
//     user_id : userCRM.id,
//     date_entered: inputData.value.date_entered,
//     iddivision_c: inputData.value.iddivision_c,
//     idamercado_c: inputData.value.idamercado_c,
//     idregional_c: inputData.value.idregional_c,
//   }),
// });

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): string => certificationRequest.value,
});

</script>

<template>
  <CertificationRequestDialog ref="requestDialogRef" />
  <RelacionadoSol
    account_id=""
    ref="advancedFilterSol"
    @selectItem="selectRelaSol"
  />
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
  <div>
    <q-card class="my-card">
      <q-card-section horizontal>
        <q-card-section class="col-auto flex flex-center">
          <q-avatar size="60px" color="primary">
            <q-icon name="work" color="white" size="35px" />
          </q-avatar>
        </q-card-section>
        <q-card-section class="full-width q-py-xs">
          <div class="row q-mt-sm flex justify-between">
            <span class="text-caption text-weight-medium">
              Solicitud
            </span>
          </div>
          <div class="assigned-user q-mt-none q-mb-none">
            <span class="text-subtitle-1 text-font-weight">Nro.<span class="text-primary q-pl-sm"> {{certificationRequest.name || 'Sin asignar'}}</span></span>
          </div>
          <div v-if="certificationRequest.name" class="text-caption text-weight-light text-grey-9">
            Solicitante: {{ certificationRequest.solicitante }}
          </div>
          <div v-if="certificationRequest.name" class="text-caption text-weight-light text-grey-9">
            Fecha de Creación: {{ certificationRequest.fecha_creacion }}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="card-actions justify-between">
          <q-btn
            style="font-size: 13px"
            icon="edit"
            @click="toggleFilter"
            flat
            color="primary"
          >
            <span class="q-ml-xs"> Cambiar Solicitud </span>
          </q-btn>
          <q-btn
            style="font-size: 13px"
            icon="visibility"
            @click="verDialogItem(certificationRequest.id)"
            label="Ver"
            color="primary"
            outline
            :disabled="!certificationRequest.id"
          >
          </q-btn>

      </q-card-actions>
      <q-card-section v-if="showFilter">
        <q-input
              outlined
              v-model="certificationRequest.name"
              label="Solicitud de Certificación"
              class="col-md-6 col-sm-12"
              :readonly="bloqueado"
              dense
              label-slot
            >
              <template v-slot:prepend>
                <q-avatar>
                  <q-icon name="work" size="sm" />
                </q-avatar>
              </template>
              <template v-slot:after>
                <q-btn
                  dense
                  outline
                  icon="north_west"
                  color="primary"
                  @click="openDialogSol"
                  :disable="bloqueado"
                />
                <q-btn
                  dense
                  outline
                  icon="close"
                  color="negative"
                  @click="clearSol"
                  :disable="bloqueado"
                />
              </template>
        </q-input>
      </q-card-section>

    </q-card>
  </div>
</template>

<style lang="scss">
.assigned-user {
  font-size: 1.04rem;
}

.card-actions {
  padding: 5px;
}
</style>
