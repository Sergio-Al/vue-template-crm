<script setup lang="ts">
import { QInput, useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';

import ViewCard from 'src/components/MainCard/ViewCard.vue';

import { Company } from '../../utils/types';
import moment from 'moment';

interface Props {
  id: string;
  data: Company;
}

const props = defineProps<Props>();
//const $q = useQuasar();
//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const razonSocialInputRef = ref<InstanceType<typeof QInput> | null>(null);
const nameInputRef = ref<InstanceType<typeof QInput> | null>(null);

const inputData = ref({ ...props.data });
//inputData.value.resolucion_ministerial_date_c = new Date(inputData.value.resolucion_ministerial_date_c).toISOString();

//* Methods
const validateInputs = async () => {
  const validatedFields = await Promise.all([
    razonSocialInputRef.value?.validate(),
    nameInputRef.value?.validate(),
  ]);
  return validatedFields.every((field) => !!field);
};

const restoreValues = () => {
  if (props.data) inputData.value = { ...props.data };
};

defineExpose({
  validateInputs,
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Company => ({ ...inputData.value }),
});
</script>

<template>
  <view-card-component
    v-bind="$attrs"
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    icon-name="info"
    ref="baseCardRef"
    title="Información General"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
  >
    <template #edit>
      <!-- Modo edicion -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          ref="razonSocialInputRef"
          v-model="inputData.razon_social_c"
          type="text"
          class="col-12 col-sm-12 q-py-sm"
          label="Razón Social"
          outlined
          dense
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          ref="nameInputRef"
          v-model="inputData.name"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Nombre Comercial"
          outlined
          dense
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          v-model="inputData.identificacion_fiscal_c"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Nro. de Identificacion Fiscal"
          outlined
          dense
        />
        <q-input
          v-model="inputData.resolucion_ministerial_c"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Nro. de Resolución Ministerial"
          outlined
          dense
        />
        <q-input
          v-model="inputData.resolucion_ministerial_date_c"
          class="col-12 col-sm-6 q-py-sm"
          label="Fecha de Resolución Ministerial"
          outlined
          dense
          type="date"
        />
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.razon_social_c"
          type="text"
          class="col-12 col-sm-12 q-py-sm"
          label="Razón Social"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputData.name"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Nombre Comercial"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputData.identificacion_fiscal_c"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Nro. de Identificacion Fiscal"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputData.resolucion_ministerial_c"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Nro. de Resolución Ministerial"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputData.resolucion_ministerial_date_c"
          class="col-12 col-sm-6 q-py-sm"
          label="Fecha de Resolución Ministerial"
          outlined
          dense
          type="date"
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
