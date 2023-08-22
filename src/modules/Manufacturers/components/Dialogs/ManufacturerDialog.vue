<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useAsyncState } from '@vueuse/core';
import { AlertComponent } from 'src/components';

//import ViewGeneralSkeleton from 'src/components/Skeletons/ViewGeneralSkeleton.vue';
import { Manufacturer } from '../../utils/types';
// import {
//   getCertification,
//   createCertificationService,
// } from '../../services/useCertificationsService';

</script>

<script lang="ts" setup>
    interface Props {
        id: string;
    }

    const props = defineProps<Props>();
    //const certificationRequestId = ref<string>('');

    interface Emits {
    (e: 'udpate'): void;
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
            name: 'dataDocuments',
            label: 'Documentos',
            enabledForCreation: false,
        },
    ];

    const $q = useQuasar();
    const showCloseAlert = ref(false);
    const activeTab = ref('dataGeneral');

    const titleDialog = ref('Fabricante');
    const open = ref(false);
    const localId = ref('');

    //* reference variables
    const generalFormRef = ref<InstanceType<typeof ViewGeneralData> | null>(null);
    // const dataManufacturerRef = ref<InstanceType<
    // typeof ViewDataManufacturer
    // > | null>(null);
//* computed variables

// const isEditing = computed(() => !!generalFormRef.value?.isSomeCardEditing);

//* methods
const openDialogTab = (
  id?: string,
  //data?: Partial<CertificacionBody>,
  //options: DialogOptions = {}
) => {
  //const { solicitudId = '' } = options;
  if (!!id) {
    localId.value = id;
    //getManufacturer();
  }

//   if (!!data) {
//     certificationData.value = data;
//   }

  //console.log(props)
  open.value = true;
};

const clearData = () => {
  localId.value = '';
//   certificationRequestId.value = '';
//   certificationData.value = {} as CertificacionBody;
  //certificationStore.clearData();
};

const onCloseDialog = () => {
  console.log('On close dialog');
  open.value = false;
};

const createManufacturer = async () => {
//   const body: Partial<CertificacionBody> = {
//     ...generalFormRef.value?.exposeData(),
//     ...dataManufacturerRef.value?.exposeData(),
//   };

//   try {
//     $q.loading.show({
//       message: 'Guardando datos',
//     });
//     await createCertificationService(body);
//   } catch (error) {
//     $q.notify({
//       type: 'negative',
//       message: 'Error al crear la certificación',
//     });
//   } finally {
//     $q.loading.hide();
//   }
};

const updateManufacturer = (data: Partial<Manufacturer>) => {
  console.log(data);
  emits('udpate');
};

// const {
//   state: certificationData,
//   isLoading,
//   execute: getCertification2,
// } = useAsyncState(
//   async () => {
//     const a = await getCertification(localId.value);
//     console.log(a);
//     return a;
//   },
//   {
//     hance_solicitudcertificacion_id_c: props.idSolicitud,
//     iddivision_c: '04',
//   } as CertificacionBody,
//   { immediate: false }
// );

defineExpose({
  clearData,
  openDialogTab,
});
</script>

<template>
  <dialog-component
    size-dialog="dialog-xl"
    v-model="open"
    :footerDisabled="true"
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
        <q-tab-panels v-model="activeTab" animated keep-alive>
          <q-tab-panel name="dataGeneral">
            <!--<ViewGeneralData
              :data="certificationData"
              :id="localId"
              :request-id="certificationRequestId"
              @create="createCertification"
              @update="updateCertification"
              @continue="goTabManufacturer"
              ref="generalFormRef"
            />-->
          </q-tab-panel>
          <q-tab-panel name="dataManufacturer">
            <ViewDataManufacturer
              ref="dataManufacturerRef"
              @create="createManufacturer"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-page>
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
