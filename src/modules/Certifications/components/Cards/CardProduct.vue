<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref, onMounted } from 'vue';

import ViewCard from 'src/components/MainCard/ViewCard.vue';
import CardRelationProduct from './CardRelationProduct.vue';

import { CertificationDB, CertificationRequest } from '../../utils/types';

import { getProduct } from '../../services/useCertificationsService';
import { manufacturers, productListData } from '../../utils/dummyData';
import CardRelationManufacturer from './CardRelationManufacturer.vue';

interface Props {
  id: string;
  data: Partial<CertificationRequest>;
}

const props = defineProps<Props>();
const $q = useQuasar();
//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

const inputData = ref({ ...props.data });
const productCodes = ref<{ id: string }[]>([]);

const productList = ref([]);
const manufacturerList = ref([]);

//* Methods
const filterManufacturer = async (
  val: string,
  update: (callback: () => void) => void,
  abort: () => void
) => {
  update(async () => {
    if (val === '') {
      if (!!manufacturerList.value && manufacturerList.value.length > 0) return;
      manufacturerList.value = [];
    } else {
      const term = val;
      // const response = await getUsers(term);
      // users.value = response;
      manufacturerList.value = manufacturers;
      console.log(manufacturerList.value);
    }
  });
};

const filterProduct = async (
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
  inputData.value.producto_c = '';
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

const addProduct = () => {
  productCodes.value.unshift({ id: '' });
};

const removeProductByIndex = (index: number) => {
  productCodes.value.splice(index, 1);
};

onMounted(async () => {
  if (!!props.id) {
    if (!!inputData.value.referencia_prods) {
      const product = inputData.value.referencia_prods.split(',|');
      productCodes.value = product.map((code: string) => ({ id: code }));
    }
  }
});

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Partial<CertificationRequest> => ({
    fabricante_c: inputData.value.fabricante_c,
    producto_c: inputData.value.producto_c,
    referencia_prods:
      productCodes.value.map((code: { id: string }) => code.id).join(',|') ||
      '',
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
        <q-input
          class="col-12 col-sm-12"
          dense
          label="Fabricante"
          outlined
          type="text"
          v-model="inputData.fabricante_c"
        />
        <q-input
          class="col-12 col-sm-12"
          dense
          label="Nombre del Producto"
          outlined
          type="text"
          v-model="inputData.producto_c"
        />
        <!-- <q-select
          :hint="!!inputData.fabricante_c ? 'Fabricante seleccionado' : ''"
          :options="manufacturerList"
          @filter-abort="abortFilterFn"
          @filter="filterManufacturer"
          class="col-12 col-sm-12"
          dense
          emit-value
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="500"
          label="Fabricante"
          map-options
          option-label="name"
          option-value="name"
          outlined
          use-chips
          use-input
          v-model="inputData.fabricante_c"
        >
          <template #append>
            <q-btn
              v-if="!!inputData.fabricante_c"
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
        </q-select> -->
        <!-- <q-select
          :hint="!!inputData.producto_c ? 'Producto seleccionado' : ''"
          :options="productList"
          @filter-abort="abortFilterFn"
          @filter="filterProduct"
          class="col-12 col-sm-12"
          dense
          emit-value
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="500"
          label="Nombre del producto"
          map-options
          option-label="name"
          option-value="name"
          outlined
          use-chips
          use-input
          v-model="inputData.producto_c"
        >
          <template #append>
            <q-btn
              v-if="!!inputData.producto_c"
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
        </q-select> -->
        <div class="row q-mt-md">
          <span class="">Items a Registrar</span>
        </div>
        <div class="col-12">
          <q-btn
            color="primary"
            icon="add"
            label="Añadir Item"
            dense
            @click="addProduct"
          />
        </div>
        <q-input
          v-for="(product, index) in productCodes"
          :key="index"
          v-model="product.id"
          type="text"
          label="Código a Registrar"
          dense
          outlined
          class="col-12"
        >
          <template #prepend>
            <q-btn
              color="negative"
              icon="remove"
              size="sm"
              round
              @click="removeProductByIndex(index)"
            />
          </template>
        </q-input>
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          class="col-12 col-sm-12"
          dense
          label="Fabricante"
          outlined
          type="text"
          v-model="inputData.fabricante_c"
          readonly
        />
        <q-input
          class="col-12 col-sm-12"
          dense
          label="Nombre del Producto"
          outlined
          type="text"
          v-model="inputData.producto_c"
          readonly
        />
        <!-- <div class="col-12">
          <CardRelationManufacturer
            ref="cardRelationManufacturerRef"
            v-model:id="inputData.hance_empresa_id_c"
            module-name="Fabricante"
            error-message="Se necesita un fabricante"
          />
        </div>
        <div class="col-12">
          <CardRelationProduct
            v-model:id="inputData.producto_c"
            module-name="Producto"
            error-message="Se necesita un producto"
          />
        </div> -->
        <div class="row q-mt-md col-12">
          <span class="">Items Registrados</span>
        </div>
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
