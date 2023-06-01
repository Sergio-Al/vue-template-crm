<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { useQuasar, QPopupProxy } from 'quasar';

import ViewCard from 'src/components/MainCard/ViewCard.vue';

import { ProductType } from '../../utils/types';
import { useProductType } from '../../composables';

const AdvancedFilterCampaign = defineAsyncComponent(
  () => import('src/modules/Prospects/components/AdvancedFilterCampaign.vue')
);

interface Props {
  id: string;
  data: ProductType;
}

const props = defineProps<Props>();

const $q = useQuasar();
const { userCRM, getProductType } = useProductType();

const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

const inputData = ref({ ...props.data });

//* Methods
const restoreValues = () => {
  if (props.data) inputData.value = { ...props.data };
};

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): ProductType => ({ ...inputData.value }),
});
</script>

<template>
  <view-card-component
    v-bind="$attrs"
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    icon-name="info"
    ref="baseCardRef"
    title="Información general"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
  >
    <template #edit>
      <!-- Modo edicion -->
      <div class="row q-col-gutter-lg q-py-md">
        <q-input
          v-model="inputData.nombre"
          type="text"
          class="col-12 col-sm-6"
          label="Nombre del tipo"
          outlined
          dense
        />
        <q-input
          v-model="inputData.iddivision_c"
          type="text"
          class="col-12 col-sm-6"
          label="División"
          outlined
          dense
        />
        <q-input
          v-model="inputData.idamercado_c"
          type="text"
          class="col-12 col-sm-6"
          label="Área de mercado"
          outlined
          dense
        />
        <q-input
          v-model="inputData.idregional_c"
          type="text"
          class="col-12 col-sm-6"
          label="Regional"
          outlined
          dense
        />
        <q-input
          v-model="inputData.idgrupocliente_c"
          type="text"
          class="col-12 col-sm-6"
          label="Grupo cliente"
          outlined
          dense
        />
        <!-- <q-select
          :options="opportunityState"
          class="col-12 col-sm-4"
          dense
          emit-value
          label="Estado"
          map-options
          option-label="label"
          option-value="value"
          outlined
          v-model="inputData.estado_oportunidad_c"
          @update:model-value="refreshEstadoOportunidad"
        /> -->

        <div class="col-12">
          <q-separator dark color="grey-4" />
        </div>
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-lg q-py-md">
        <q-input
          v-model="inputData.nombre"
          type="text"
          class="col-12 col-sm-6"
          label="Nombre del tipo"
          outlined
          dense
          readonly
        />
        <!-- <q-select
          :options="opportunityState"
          class="col-12 col-sm-4"
          dense
          emit-value
          label="Estado"
          map-options
          option-label="label"
          option-value="value"
          outlined
          readonly
          v-model="inputData.estado_oportunidad_c"
          @update:model-value="refreshEstadoOportunidad"
        /> -->
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
