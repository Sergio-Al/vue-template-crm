<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  id?: string;
}

interface ManufacturerData {
  fabricante: string;
  contacto: string;
  direccion: string;
  pais: string;
  telefono: string;
  email: string;
  license: string;
}

const props = withDefaults(defineProps<Props>(), { id: '' });

const inputData = ref({} as ManufacturerData);
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
          v-model="inputData.fabricante"
          class="col-12 col-sm-6"
          label="Nombre del fabricante"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="work" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.contacto"
          class="col-12 col-sm-6"
          label="Contacto"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="contact_phone" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.direccion"
          class="col-12 col-sm-6"
          label="Dirección"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="location_on" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.pais"
          class="col-12 col-sm-6"
          label="País"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="flag" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.telefono"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="call" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.email"
          class="col-12 col-sm-6"
          label="Correo Electronico"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.license"
          class="col-12"
          label="Licencia de"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="policy" />
          </template>
        </q-input>
      </div>
    </template>
    <template #read>
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.fabricante"
          class="col-12 col-sm-6"
          label="Nombre del fabricante"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="work" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.contacto"
          class="col-12 col-sm-6"
          label="Contacto"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="contact_phone" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.direccion"
          class="col-12 col-sm-6"
          label="Dirección"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="location_on" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.pais"
          class="col-12 col-sm-6"
          label="País"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="flag" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.telefono"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="call" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.email"
          class="col-12 col-sm-6"
          label="Correo Electronico"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.license"
          class="col-12"
          label="Licencia de"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="policy" />
          </template>
        </q-input>
      </div>
    </template>
  </view-card-component>
</template>
