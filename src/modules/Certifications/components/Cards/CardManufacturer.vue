<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';

import ViewCard from 'src/components/MainCard/ViewCard.vue';

import { Certification } from '../../utils/types';

interface Props {
  id: string;
  data: Certification;
}

const props = defineProps<Props>();
const $q = useQuasar();
//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

const inputData = ref({ ...props.data });

//* Methods
const restoreValues = () => {
  if (props.data) inputData.value = { ...props.data };
};

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Certification => ({ ...inputData.value }),
});
</script>

<template>
  <view-card-component
    v-bind="$attrs"
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    icon-name="precision_manufacturing"
    ref="baseCardRef"
    title="Fabricante"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
  >
    <template #edit>
      <!-- Modo edicion -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.id_empresa"
          type="text"
          class="col-12 col-sm-12"
          label="Nombre"
          outlined
          dense
          :rules="[(val) => !!val || 'Campo requerido']"
        >
          <template v-slot:prepend>
            <q-icon name="work" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.id_profesional_acreditado"
          type="text"
          class="col-12 col-sm-6"
          label="Contacto"
          outlined
          dense
          :rules="[(val) => !!val || 'Campo requerido']"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.empresa_email"
          type="text"
          class="col-12 col-sm-6"
          label="Correo"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.empresa_phone"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="call" />
          </template>
        </q-input>
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.id_empresa"
          type="text"
          class="col-12 col-sm-12"
          label="Nombre"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputData.id_profesional_acreditado"
          type="text"
          class="col-12 col-sm-6"
          label="Contacto"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputData.empresa_email"
          type="text"
          class="col-12 col-sm-6"
          label="Correo"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputData.empresa_phone"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
          readonly
        />
      </div>
    </template>
  </view-card-component>
</template>

<style scoped lang="scss">
.prueba {
  text-overflow: ellipsis;
  overflow: hidden !important;
  white-space: nowrap;
  width: 100px;
  padding-left: 0px;
  // border: 1px solid;
  // background-color: #92a8d1;
}
</style>
