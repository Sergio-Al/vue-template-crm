<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, defineAsyncComponent, ref } from 'vue';

import ViewCard from 'src/components/MainCard/ViewCard.vue';

import type { ChildCompany } from 'src/modules/Companies/utils/types';

const AdvancedFilterCampaign = defineAsyncComponent(
  () => import('src/modules/Prospects/components/AdvancedFilterCampaign.vue')
);

interface Props {
  id: string;
  data: ChildCompany;
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
  exposeData: (): ChildCompany => ({ ...inputData.value }),
  exposeUpdateData:()=>
  (
    {
      name:inputData.value.name,
      razon_social_c:inputData.value.razon_social_c,
      resolucion_ministerial_c:inputData.value.resolucion_ministerial_c,
      resolucion_ministerial_date_c:inputData.value.resolucion_ministerial_date_c,
      identificacion_fiscal_c:inputData.value.identificacion_fiscal_c
    } as ChildCompany
  )
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
          v-model="inputData.razon_social_c"
          type="text"
          class="col-12 col-sm-12 q-py-sm"
          label="Razón Social"
          outlined
          dense
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
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
          type="date"
          class="col-12 col-sm-6 q-py-sm"
          label="Fecha de Resolución Ministerial"
          outlined
          dense
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
          type="date"
          class="col-12 col-sm-6 q-py-sm"
          label="Fecha de Resolución Ministerial"
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
