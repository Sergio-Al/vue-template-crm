<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';

import ViewCard from 'src/components/MainCard/ViewCard.vue';

import { Certification } from '../../utils/types';

import { productListData } from '../../utils/dummyData';

interface Props {
  id: string;
  data: Certification;
}

const props = defineProps<Props>();
const $q = useQuasar();
//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

const inputData = ref({ ...props.data });
const productCodes = ref([]);

const productList = ref([]);

//* Methods
const filterFn = async (
  val: string,
  update: (callback: () => void) => void,
  abort: () => void
) => {
  update(async () => {
    if (val === '') {
      if (!!productList.value && productList.value.length > 0) return;
      productList.value = [];
    } else {
      const term = val;
      // const response = await getUsers(term);
      // users.value = response;
      productList.value = productListData;
      console.log(productList.value);
    }
  });
};

const restoreValues = () => {
  if (props.data) inputData.value = { ...props.data };
};

const removeProduct = () => {
  inputData.value.id_producto = '';
};

const assignProductInfo = (id: string) => {
  // product
  productCodes.value =
    productListData
      .find((product) => product.id === id)
      ?.itemCodes.map((product) => ({
        id: product,
      })) || [];
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Certification => ({
    ...inputData.value,
    cod_productos: productCodes.value.map((code) => code.id).join(',') || '',
  }),
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
        <q-select
          :hint="!!inputData.id_producto ? 'Producto seleccionado' : ''"
          :options="productList"
          @filter-abort="abortFilterFn"
          @filter="filterFn"
          class="col-12 col-sm-12"
          dense
          emit-value
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="500"
          label="Nombre"
          map-options
          option-label="name"
          option-value="id"
          outlined
          use-chips
          use-input
          v-model="inputData.id_producto"
          @update:model-value="assignProductInfo"
        >
          <template #prepend>
            <q-icon name="inventory" />
          </template>
          <template #append>
            <q-btn
              v-if="!!inputData.id_producto"
              color="primary"
              size="sm"
              rounded
              icon="remove"
              flat
              dense
              @click="removeProduct"
            />
          </template>

          <template #no-option>
            <span class="text-grey-8 q-pa-lg">Sin opciones</span>
          </template>

          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon name="work" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label caption>Producto</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          v-for="(product, index) in productCodes"
          :key="index"
          v-model="product.id"
          type="text"
          label="Código a Registrar"
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
