<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core';
import { ref } from 'vue';

import RelationDetailCard from 'src/modules/Leads/components/Cards/RelationDetailCard.vue';
import AdvancedFilterProduct from 'src/modules/Accounts/components/AdvancedFilter/AdvancedFilterProduct.vue';
import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';

import type { Product } from '../../utils/types';
import { productPromise } from '../../utils/dummyData';

interface Props {
  id: string;
  moduleName: string;
  editMode?: boolean;
  errorMessage?: string;
}

interface Emits {
  (e: 'update:id', id: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const validated = ref(false);
const productFiltered = ref({} as Product);
const selectProductDialog = ref(false);

const advancedFilterProductRef = ref<InstanceType<
  typeof AdvancedFilterProduct
> | null>(null);

const openProductFilter = async () => {
  console.log('opening product filter');
  await advancedFilterProductRef.value?.openDialog();
};

const deleteValue = () => {
  console.log('deleting value');
};

const selectItem = (item: Product) => {
  productFiltered.value = item;
  selectProductDialog.value = true;
};

const assignProduct = async () => {
  if (!!productFiltered.value.id) {
    await emits('update:id', productFiltered.value.id);
    await execute();
  }
};

const { state, isLoading, execute } = useAsyncState(async () => {
  if (props.id) {
    const response = await productPromise();
    return response;
  }
  return {} as Product;
}, {} as Product);
</script>

<template>
  <RelationDetailCard
    v-if="!props.id"
    :module-name="moduleName"
    title="No Seleccionado"
    icon="perm_contact_calendar"
    no-data
    :error="!props.id && validated"
    :error-message="props.errorMessage"
  >
    <template v-if="editMode" #options>
      <q-btn
        @click="openProductFilter"
        class="q-my-xs"
        color="primary"
        icon="open_in_new"
        round
        size="xs"
    /></template>
  </RelationDetailCard>
  <q-card v-else-if="isLoading" bordered flat>
    <q-list bordered>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="80%" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
  <RelationDetailCard
    v-else
    :module-name="moduleName"
    :title="state.name"
    :description="state.description"
    icon="perm_contact_calendar"
    :id="props.id"
  >
    <template v-if="editMode" #leftOptions>
      <q-btn
        @click="deleteValue"
        class="q-my-xs"
        color="negative"
        icon="remove"
        round
        size="xs"
      />
    </template>
    <template v-if="editMode" #options>
      <q-btn
        class="q-my-xs"
        color="primary"
        icon="open_in_new"
        round
        size="xs"
        @click="openProductFilter"
      />
    </template>
  </RelationDetailCard>
  <AdvancedFilterProduct
    ref="advancedFilterProductRef"
    title="Búsqueda de Productos"
    @select-item="selectItem"
  />
  <AlertComponent
    title="¿Asignar Producto?"
    icon="warning"
    iconColor="warning"
    iconSize="50px"
    btn-color="primary"
    btn-text="Si, asignar"
    v-model="selectProductDialog"
    @confirm="assignProduct()"
    @denegate="selectProductDialog = false"
  >
    <template #body>
      <span class="q-py-sm">
        ¿Esta seguro de asignar a {{ productFiltered.name }} como producto?
      </span>
    </template>
  </AlertComponent>
</template>
