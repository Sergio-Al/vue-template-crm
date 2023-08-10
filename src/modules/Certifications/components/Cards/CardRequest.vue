<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core';
import { ref, onMounted, computed } from 'vue';
import moment from 'moment';
import { CertificationRequest } from '../../utils/types';
import { getCertificationRequest } from '../../services/useCertificationsService';

import CertificationRequestDialog from '../Dialogs/CertificationRequestDialog.vue';

interface Props {
  requestId: string;
}

const props = defineProps<Props>();

const certificationRequestDialogRef = ref<InstanceType<
  typeof CertificationRequestDialog
> | null>(null);

const { state, isLoading } = useAsyncState(async () => {
  if (props.requestId) return await getCertificationRequest(props.requestId);
  return {} as CertificationRequest;
}, {} as CertificationRequest);

const dateFormatted = computed(() => {
  if (!!state.value.date_entered) {
    return moment(state.value.date_entered).format('DD-MM-YYYY');
  }
  return 'Formato de fecha inválido';
});

const openCertificationRequestDialog = (id: string) => {
  console.log('here', id);
  certificationRequestDialogRef.value?.openDialogTab(id);
};

onMounted(() => {
  console.log('gg');
});
</script>

<template>
  <div v-if="isLoading"></div>
  <q-card v-bind="$attrs" v-else class="q-pa-md">
    <div class="row">
      <q-avatar
        size="xl"
        font-size="30px"
        color="primary"
        text-color="white"
        icon="work"
      />
      <div class="col q-ml-sm">
        <div class="text-caption">Solicitud</div>
        <div class="text-bold">
          <span class="text-primary">Nro.</span><span>{{ state.name }}</span>
        </div>
        <div style="font-size: 14px">
          <span class="text-grey">Solicitante: </span>
          <span>{{ state.created_by_name }}</span>
        </div>
        <div style="font-size: 14px">
          <span class="text-grey">Fecha de creación: </span>
          <span>{{ dateFormatted }}</span>
        </div>
      </div>
    </div>
    <q-btn
      style="position: absolute; bottom: 0; right: 0"
      class="q-ma-sm q-px-sm"
      color="primary"
      icon="visibility"
      label="Ver"
      dense
      outline
      @click="openCertificationRequestDialog(state.id)"
    />
  </q-card>
  <CertificationRequestDialog ref="certificationRequestDialogRef" />
</template>
