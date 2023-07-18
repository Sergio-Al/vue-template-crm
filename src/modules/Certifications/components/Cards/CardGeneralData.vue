<script lang="ts" setup>
import { ref } from 'vue';
import { CertificationDB } from '../../utils/types';

interface Props {
  id: string;
}

const inputData = ref({} as CertificationDB);

const props = defineProps<Props>();
</script>
<template>
  <view-card-component
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    v-bind="$attrs"
    icon-name="info"
    title="Información"
  >
    <template #edit>
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.user_id_c"
          class="col-12 col-sm-6"
          label="Solicitante"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.date_entered"
          class="col-12 col-sm-6"
          label="Fecha"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12"
          label="Participación como"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Razón social"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Resolución ministerial"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12"
          label="Dirección"
          outlined
          dense
          readonly
        >
        </q-input>

        <q-input
          v-model="inputData.user_id1_c"
          class="col-12 col-sm-6"
          label="Personal acreditado"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.user_id1_c"
          class="col-12 col-sm-6"
          label="Nro de matrícula"
          outlined
          dense
          readonly
        >
        </q-input>
      </div>
    </template>
    <template #read>
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.user_id_c"
          class="col-12 col-sm-6"
          label="Solicitante"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.date_entered"
          class="col-12 col-sm-6"
          label="Fecha"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12"
          label="Participación como"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Razón social"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Resolución ministerial"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12"
          label="Dirección"
          outlined
          dense
          readonly
        >
        </q-input>

        <q-input
          v-model="inputData.user_id1_c"
          class="col-12 col-sm-6"
          label="Personal acreditado"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.user_id1_c"
          class="col-12 col-sm-6"
          label="Nro de matrícula"
          outlined
          dense
          readonly
        >
        </q-input>
      </div>
    </template>
  </view-card-component>
</template>
