<script lang="ts" setup>
import { ref, computed } from 'vue';
import { CertificacionBody } from '../../utils/types';
import { ViewCard } from 'src/modules/Accounts/components';

interface Props {
  id?: string;
}

// interface ManufacturerData {
//   fabricante: string;
//   contacto: string;
//   direccion: string;
//   pais: string;
//   telefono: string;
//   email: string;
//   license: string;
// }

const props = withDefaults(defineProps<Props>(), { id: '' });

const inputData = ref({} as CertificacionBody);

const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Partial<CertificacionBody> => ({
    name: inputData.value.name,
    billing_address_country: inputData.value.billing_address_country,
    phone_office: inputData.value.phone_office,
    email1: inputData.value.email1,
    licence: inputData.value.licence,
  }),
});
</script>
<template>
  <view-card-component
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    v-bind="$attrs"
    icon-name="info"
    ref="baseCardRef"
    title="Información"
  >
    <template #edit>
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.name"
          class="col-12 col-sm-6"
          label="Nombre del fabricante"
          outlined
          dense
        >
        </q-input>
        <!-- <q-input
          v-model="inputData.contacto"
          class="col-12 col-sm-6"
          label="Contacto"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.direccion"
          class="col-12 col-sm-6"
          label="Dirección"
          outlined
          dense
        >
        </q-input> -->
        <q-input
          v-model="inputData.billing_address_country"
          class="col-12 col-sm-6"
          label="País"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.phone_office"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.email1"
          class="col-12 col-sm-6"
          label="Correo Electronico"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.licence"
          class="col-12"
          label="Licencia de"
          outlined
          dense
        >
        </q-input>
      </div>
    </template>
    <template #read>
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.name"
          class="col-12 col-sm-6"
          label="Nombre del fabricante"
          outlined
          dense
        >
        </q-input>
        <!-- <q-input
          v-model="inputData.contacto"
          class="col-12 col-sm-6"
          label="Contacto"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.direccion"
          class="col-12 col-sm-6"
          label="Dirección"
          outlined
          dense
        >
        </q-input> -->
        <q-input
          v-model="inputData.billing_address_country"
          class="col-12 col-sm-6"
          label="País"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.phone_office"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.email1"
          class="col-12 col-sm-6"
          label="Correo Electronico"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.licence"
          class="col-12"
          label="Licencia de"
          outlined
          dense
        >
        </q-input>
      </div>
    </template>
  </view-card-component>
</template>
