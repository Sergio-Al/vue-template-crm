<script setup lang="ts">
import { ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useQuasar } from 'quasar';

import ViewGeneralRequest from '../../views/ViewGeneralRequest.vue';
import ViewGeneralSkeleton from 'src/components/Skeletons/ViewGeneralSkeleton.vue';

import type { CertificationRequest } from '../../utils/types';
import {
  createCertificationRequest,
  updateCertificationRequest,
  getCertificationRequest,
} from '../../services/useCertificationsService';

interface Emits {
  (e: 'update'): void;
}

const emits = defineEmits<Emits>();

const $q = useQuasar();
const open = ref(false);
const titleDialog = ref('Solicitud de certificacion');
const localId = ref('');

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
    // console.log(data.id);
    // console.log('update', data);

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

const {
  state: certificationData,
  isLoading,
  execute: getCertification,
} = useAsyncState(
  async () => {
    return await getCertificationRequest(localId.value);
  },
  {} as CertificationRequest,
  {
    immediate: false,
  }
);

defineExpose({
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
        <q-icon name="shield" class="q-ml-md" color="white" size="md"></q-icon>

        <q-toolbar-title
          class="header-dialog"
          :class="$q.dark.isActive ? 'text-red' : 'text-white'"
        >
          <div class="flex">
            <span>{{ `${certificationData.name || titleDialog}` }}</span>
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
  </dialog-component>
</template>
