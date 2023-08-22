<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useQuasar } from 'quasar';
import ViewGeneralRequest from '../../views/ViewGeneralRequest.vue';
import ViewGeneralSkeleton from 'src/components/Skeletons/ViewGeneralSkeleton.vue';

import type {
  CertificacionBody,
  CertificationRequest,
} from '../../utils/types';
import {
  createCertificationRequest,
  updateCertificationRequest,
  getCertificationRequest,
  updateStateCertificationRequest,
} from '../../services/useCertificationsService';

import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';
import CertificationDialog from './CertificationDialog.vue';
import CardAddKept from './../Cards/CardAddKept.vue';

interface Emits {
  (e: 'update'): void;
}

const emits = defineEmits<Emits>();

const $q = useQuasar();
const open = ref(false);
const titleDialog = ref('Solicitud de Certificación');
const localId = ref('');
const showDialogKept = ref<boolean>(false);

const showAlertAprobar = ref<boolean>(false);
const showAlertCrear = ref<boolean>(false);

let propsCreateAlert = {
  title: 'Solicitud de Certificación',
  icon: 'info',
  iconSize: 'md',
  message: '',
  iconColor: 'info',
  btnColor: 'primary',
  btnText: 'Si',
};

const certificationDialogRef = ref<InstanceType<
  typeof CertificationDialog
> | null>(null);

//const actionConfirm = ref<any>('aprobar');
//let msgAlert = '¿Esta seguro de aprobar la Solicitud de Certificación?';

const openDialogCertification = (
  id?: string,
  data?: Partial<CertificacionBody>,
  dataRequest?: any,
) => {
  certificationDialogRef.value?.openDialogTab(id, data, dataRequest);
};

const openDialogTab = (id?: string) => {
  if (!!id) {
    localId.value = id;
    getCertification();
  }
  open.value = true;
};

const onCloseDialog = () => {
  open.value = false;
};

const clearData = () => {
  localId.value = '';
  certificationData.value = {} as CertificationRequest;
};

const createCertification = async (data: Partial<CertificationRequest>) => {
  try {
    $q.loading.show({
      message: 'Creando solicitud',
    });
    const response = await createCertificationRequest(data);
    // console.log(data);
    //const response = await certificationRequestPromise(localId.value);
    localId.value = response.id;
    emits('update');
    await getCertification();
  } catch (error) {
    $q.notify({
      position: 'bottom-right',
      color: 'negative',
      message: 'Error',
      caption: 'No se pudo crear la solicitud',
    });
  } finally {
    $q.loading.hide();
  }
};

const updateCertification = async (data: Partial<CertificationRequest>) => {
  try {
    $q.loading.show({
      message: 'Actualizando solicitud',
    });

    if (!!data.id) {
      await updateCertificationRequest(data.id, data);
    }
    emits('update');
    await getCertification();
  } catch (error) {
    $q.notify({
      position: 'bottom-right',
      color: 'negative',
      message: 'Error',
      caption: 'No se pudo actualizar la solicitud',
    });
  } finally {
    $q.loading.hide();
  }
};

const setColorState = (state: string): string => {
  const colorMap: { [key: string]: string } = {
    pending: 'orange',
    kept: 'red',
    approved: 'green',
    rejected: 'red',
  };

  return colorMap[state] || 'orange';
};

const setTextColorState = (state: string): string => {
  const colorMap: { [key: string]: string } = {
    pending: 'text-orange',
    kept: 'text-red',
    approved: 'text-green',
    rejected: 'text-red',
  };

  return colorMap[state] || 'text-orange';
};

const changeState = (value: number) => {
  if (value == 1) {
    showAlertAprobar.value = true;
  } else if (value == 2) {
    showDialogKept.value = true;
    //todo: abrir dialog para realizar observacion
    //el estado cambia a observado y se guarda el comentario
  }
};

const aprobarSolicitud = async () => {
  //cambiar de estado a aprobado
  await updateStateCertificationRequest(localId.value, 'approved');
  $q.notify({
    color: 'positive',
    message: 'Aprobación de solicitud',
    caption: 'Se aprobó la solicitud con éxito',
  });
  await getCertification();
  emits('update');
  showAlertCrear.value = true;
};

const crearCertificacion = () => {
  openDialogCertification(undefined, undefined, certificationData.value );
};

const state_request = computed(() => {
  const state = certificationData.value.estado_aprobacion_c;
  let value = '';
  switch (state) {
    case 'pending':
      value = 'PENDIENTE';
      break;
    case 'approved':
      value = 'APROBADA';
      break;
    case 'kept':
      value = 'OBSERVADA';
      break;
    case 'rejected':
      value = 'RECHAZADA';
      break;
    default:
      value = '';
      break;
  }
  return value;
});

// const reloadList = async()=>{
//   await getCertification();
// }

const {
  state: certificationData,
  isLoading,
  execute: getCertification,
} = useAsyncState(
  async () => {
    console.log(localId.value);
    const a = await getCertificationRequest(localId.value);
    // console.log(a);
    return a;
  },
  {} as CertificationRequest,
  {
    immediate: false,
  }
);

defineExpose({
  openDialogTab,
});

// const saludo = ()=>{
//   console.log('este es un saludo')
// }
</script>

<template>
  <AlertComponent
    v-model="showAlertAprobar"
    v-bind="propsCreateAlert"
    @confirm="aprobarSolicitud"
    @denegate="showAlertAprobar = false"
  >
    <template #body>
      <span> ¿Esta seguro de aprobar la Solicitud de Certificación? </span>
    </template>
  </AlertComponent>

  <AlertComponent
    v-model="showAlertCrear"
    v-bind="propsCreateAlert"
    @confirm="crearCertificacion"
    @denegate="showAlertCrear = false"
  >
    <template #body>
      <span> ¿Desea crear la certificación ahora? </span>
    </template>
  </AlertComponent>
  <CertificationDialog :idSolicitud="localId" ref="certificationDialogRef" />

  <dialog-component
    size-dialog="dialog-xl"
    v-model="open"
    :footerDisabled="false"
    :headerDisabled="false"
    :iconDialog="'mail'"
    :persistent="false"
    @before-hide="clearData"
  >
    <template #header>
      <q-card class="bg-primary" flat v-if="isLoading">
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
      </q-card>
      <q-toolbar
        v-else
        class="header-dialog"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
      >
        <q-circular-progress
          show-value
          font-size="16px"
          class="text-red q-ma-md"
          :value="100"
          size="55px"
          :thickness="0.07"
          color="orange"
          track-color="grey-3"
        >
          <q-icon name="shield" color="white" size="lg"></q-icon>
        </q-circular-progress>

        <q-toolbar-title
          class="header-dialog q-py-sm q-pl-lg"
          :class="$q.dark.isActive ? 'text-red' : 'text-white'"
        >
          <div v-if="certificationData">
            <p class="text-h6 q-my-none">{{ titleDialog }}</p>
            <p
              v-if="certificationData.name"
              class="text-subtitle1 text-grey q-my-none"
            >
              <q-icon
                :color="setColorState(certificationData.estado_aprobacion_c)"
                name="circle"
                size="xs"
              />
              {{ `Solicitud Nro. ${certificationData.name}` }}
            </p>
            <p
              class="text-subtitle1 text-weight-medium q-my-none"
              :class="setTextColorState(certificationData.estado_aprobacion_c)"
            >
              <q-icon
                class="q-mr-sm"
                size="xs"
                name="info"
                :color="setColorState(certificationData.estado_aprobacion_c)"
              />{{ state_request || 'PENDIENTE' }}
            </p>
          </div>
          <div class="flex" v-else>
            <span>{{ titleDialog }}</span>
          </div>
        </q-toolbar-title>
        <q-btn
          class="q-ml-md"
          dense
          flat
          color="white"
          :icon="!$q.screen.xs ? 'close' : 'arrow_forward'"
          @click="onCloseDialog"
        >
          <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-toolbar>
    </template>
    <template #body>
      <q-page class="q-pa-md q-pt-xl">
        <ViewGeneralSkeleton v-if="isLoading" />
        <ViewGeneralRequest
          v-else
          :data="certificationData"
          @create="createCertification"
          @update="updateCertification"
        />
      </q-page>
    </template>
    <template
      #footer
      v-if="
        certificationData.id &&
        certificationData.estado_aprobacion_c == 'pending'
      "
    >
      <q-btn color="primary" class="q-mr-md" @click="changeState(1)"
        >Aprobar</q-btn
      >
      <q-btn color="negative" @click="changeState(2)">Observar</q-btn>
    </template>
    <!--<template #footer v-if="isEditing">
      <q-btn color="primary" class="q-mr-md" @click="saveCurrentForm"
        >Guardar</q-btn
      >
      <q-btn color="negative" v-close-popup>Cancelar</q-btn>
    </template>-->
  </dialog-component>

  <q-dialog v-model="showDialogKept">
    <CardAddKept
      :idSolicitud="certificationData.id"
      @update="()=>{
        showDialogKept = false;
        getCertification();
        emits('update');
      }"
    />
  </q-dialog>
</template>
