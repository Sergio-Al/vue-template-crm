<script lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useAsyncState } from '@vueuse/core';
import { AlertComponent } from 'src/components';
import { Notification } from 'src/composables';
import ViewGeneralData from '../../views/ViewGeneralData.vue';
import ViewDataManufacturer from '../../views/ViewDataManufacturer.vue';
import ViewGeneralSkeleton from 'src/components/Skeletons/ViewGeneralSkeleton.vue';
import { CertificacionBody } from '../../utils/types';
import {
  getCertification,
  createCertificationService,
  updateCertificationService
} from '../../services/useCertificationsService';
import { userStore } from 'src/modules/Users/store/UserStore';

const { userCRM } = userStore();

</script>

<script lang="ts" setup>
interface Props {
  idSolicitud?: string;
}

// interface DialogOptions {
//   solicitudId?: string;
//   fabricanteId?: string;
// }

const props = defineProps<Props>();
const certificationRequestId = ref<string>('');
const manufacturerId = ref<string>('');
const applicantId = ref<string>('');

interface Emits {
  (e: 'update'): void;
}

const emits = defineEmits<Emits>();
//* variables
const tabsDefinition = [
  {
    name: 'dataGeneral',
    label: 'Información General',
    enabledForCreation: true,
  },
  {
    name: 'dataManufacturer',
    label: 'Seguimiento',
    enabledForCreation: false,
  },
];

const $q = useQuasar();
const showCloseAlert = ref(false);
const activeTab = ref('dataGeneral');

const titleDialog = ref('Certificación');
const open = ref(false);
const localId = ref('');

//* reference variables
const generalFormRef = ref<InstanceType<typeof ViewGeneralData> | null>(null);
const dataManufacturerRef = ref<InstanceType<
  typeof ViewDataManufacturer
> | null>(null);
//* computed variables
// const isEditing = computed(() => !!generalFormRef.value?.isSomeCardEditing);

//* methods
const openDialogTab = (
  idCert?: string,
  data?: any,
  dataRequest?: any
) => { 
  if(!!dataRequest){
    const { id='', hance_empresa_id_c='', assigned_user_id='' } = dataRequest;
    certificationRequestId.value = id;
    manufacturerId.value = hance_empresa_id_c;
    applicantId.value = assigned_user_id;
  }
  if (!!idCert) {
    localId.value = idCert;
    reload()
  }
  if (!!data) {
    //certificationData.value = data;
    titleDialog.value = !!data.title?`Certificación ${data.title}`:'Certificación';
    //console.log(certificationData);
  }

  //console.log(props)
  open.value = true;
};

const clearData = () => {
  localId.value = '';
  certificationRequestId.value = '';
  manufacturerId.value = '';
  applicantId.value = '';
  certificationData.value = {} as CertificacionBody;
  //certificationStore.clearData();
};

const reload = async()=>{
  await execute()
}

const onCloseDialog = () => {
  console.log('On close dialog');
  open.value = false;
};

const createCertification = async (data:CertificacionBody) => {

  //adicionar estado inicial

  const body = {
    ...data,
    id_user:userCRM.id,
    etapa_c : 'revision',
    estado_c : 'revision_encurso'
  }

  try {
    $q.loading.show({
      message: 'Guardando datos',
    });
    const response:any = await createCertificationService(body);
    localId.value = response.id;
    emits('update');
    execute();
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error al crear la certificación',
    });
  } finally {
    $q.loading.hide();
  }
};

const updateCertification = async (data: CertificacionBody) => {
  try{
    $q.loading.show({
      message: 'Actualizando datos',
    });
    await updateCertificationService(localId.value, {...data, id_user:userCRM.id})
    //console.log(response);
    emits('update');
    execute();
  }
  catch(e){
    $q.notify({
      type: 'negative',
      message: 'Error al modificar la certificación',
    });
  }
  finally{
    $q.loading.hide();
  }
};

const goTabManufacturer = () => {
  console.log('validar');
  activeTab.value = 'dataManufacturer';
};

const saveCurrentForm = async () => {
  try {
    await generalFormRef.value?.onSubmit();
  } catch (error) {
    Notification('negative', 'Error al guardar', '');
  }
};

const isEditing = computed(() => !!generalFormRef.value?.isSomeCardEditing);

const {
  state: certificationData,
  isLoading,
  execute,
} = useAsyncState(
  async () => {
    const response = await getCertification(localId.value);
    return response;
  },
  {
    hance_solicitudcertificacion_id_c: props.idSolicitud,
    iddivision_c: userCRM.iddivision,
  } as CertificacionBody,
  { immediate: false }
);

defineExpose({
  clearData,
  openDialogTab,
});
</script>

<template>
  <dialog-component
    size-dialog="dialog-xl"
    v-model="open"
    :footerDisabled="!isEditing"
    :headerDisabled="false"
    :iconDialog="'mail'"
    :persistent="false"
    @before-hide="clearData"
  >
    <template #header>
      <q-toolbar
        class="header-dialog"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
      >
        <q-icon name="shield" class="q-ml-md" color="white" size="md"></q-icon>

        <q-toolbar-title
          class="header-dialog"
          :class="$q.dark.isActive ? 'text-red' : 'text-white'"
        >
          <div class="flex">
            <span>{{ `${titleDialog}` }}</span>
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

      <q-tabs
        v-model="activeTab"
        inline-label
        mobile-arrows
        :class="
          $q.dark.isActive ? 'bg-dark' : 'bg-primary text-grey-6 text-bold'
        "
        indicator-color="deep-orange-4"
        active-color="white"
        align="justify"
        dense
        narrow-indicator
        v-if="tabsDefinition.length > 1"
      >
        <q-tab
          v-for="(tab, index) in tabsDefinition"
          :key="index"
          :name="tab.name"
          :label="tab.label"
        >
        </q-tab>
      </q-tabs>
    </template>
    <template #body>
      <q-toolbar
        class="header-dialog"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
      ></q-toolbar>

      <q-page
        :class="$q.platform.is.mobile ? 'q-pa-none' : 'q-pa-none'"
        style="margin-top: -50px"
      >
        <ViewGeneralSkeleton v-if="isLoading" />
        <q-tab-panels v-else v-model="activeTab" animated keep-alive>
          <q-tab-panel name="dataGeneral">
            <ViewGeneralData
              :data="certificationData"
              :id="localId"
              :request-id="certificationRequestId"
              :manufacturer-id="manufacturerId"
              :applicant-id="applicantId"
              @create="createCertification"
              @update="updateCertification"
              @continue="goTabManufacturer"
              ref="generalFormRef"
            />
          </q-tab-panel>
          <q-tab-panel name="dataManufacturer">
            <ViewDataManufacturer
              ref="dataManufacturerRef"
              @create="createCertification"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-page>
    </template>
    <template #footer v-if="isEditing">
      <q-btn color="primary" class="q-mr-md" @click="saveCurrentForm"
        >Guardar</q-btn
      >
      <q-btn color="negative" v-close-popup>Cancelar</q-btn>
    </template>
  </dialog-component>

  <!-- ******alert antes de cerrar -->
  <AlertComponent
    title="¿Cerrar Formulario?"
    icon="warning"
    iconColor="warning"
    iconSize="50px"
    btn-color="primary"
    btn-text="Si, salir"
    v-model="showCloseAlert"
    @confirm="onCloseDialog"
    @denegate="showCloseAlert = false"
  >
    <template #body>
      <span class="q-py-sm">
        Si cierra la edición se perderán los datos no guardados
      </span>
    </template>
  </AlertComponent>
</template>
