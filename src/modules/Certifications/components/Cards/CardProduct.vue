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

const products = ref([
  { id: 'adddafdsaf' },
  { id: 'dddfasfeef' },
  { id: 'ddsfasdfas' },
]);

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
    icon-name="inventory"
    ref="baseCardRef"
    title="Producto"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
  >
    <template #edit>
      <!-- Modo edicion -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.id_producto"
          type="text"
          class="col-12 col-sm-12"
          label="Solicitante"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="inventory" />
          </template>
        </q-input>
        <q-input
          v-for="(product, index) in products"
          :key="index"
          v-model="product.id"
          type="text"
          label="Código de Producto"
          readonly
          dense
          outlined
          class="col-6"
        />
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.id_producto"
          type="text"
          class="col-12 col-sm-12"
          label="Solicitante"
          outlined
          dense
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="inventory" />
          </template>
        </q-input>
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
