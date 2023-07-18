<script lang="ts" setup>
import { ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { getRecordModuleInfo } from 'src/services/GlobalService';
import RelationDetailCard from 'src/modules/Leads/components/Cards/RelationDetailCard.vue';
import { Manufacturer } from '../../utils/types';
import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';
import AdvancedFilterManufacturer from 'src/modules/Accounts/components/AdvancedFilter/AdvancedFilterManufacturer.vue';

import { manufacturerPromise } from '../../utils/dummyData';

const props = withDefaults(
  defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
    moduleName: string;
    editMode?: boolean;
    errorMessage?: string;
  }>(),
  {
    moduleName: 'Name Module',
    editMode: false,
  }
);

const emits = defineEmits<{
  (event: 'assign'): void;
  (event: 'update:id', id: string): void;
  (event: 'delete', id: string): void;
}>();

const $q = useQuasar();

const advancedFilterManufacturerRef = ref<InstanceType<
  typeof AdvancedFilterManufacturer
> | null>(null);

const defaultData = {
  title: '',
  subtitle1: '',
  description: '',
  phone_mobile: '',
  email1: '',
};
const manufacturerFiltered = ref({} as Manufacturer);
const selectManufacturerDialog = ref(false);
const validated = ref(false);

const getContactDetail = async (id: string, assign = false) => {
  if (assign) isLoading.value = true;

  // const response = await getRecordModuleInfo<{
  //   name: string;
  //   assigned_user_name: string;
  //   phone_mobile: string;
  //   email1: string;
  // }>('HANP_Proveedores', id, {
  //   allData: false,
  //   fields: ['name', 'assigned_user_name', 'phone_mobile', 'website'],
  // });
  const response = await manufacturerPromise();

  const contact = {
    title: response.name as string,
    description: response.name as string,
    phone_mobile: response.phone_office,
  };

  if (assign) {
    state.value = contact;
    isLoading.value = false;
  }

  console.log(state.value);

  return contact;
};

const openManufacturerFilter = () => {
  advancedFilterManufacturerRef.value?.openDialog();
};

const selectItem = (manufacturer: Manufacturer) => {
  manufacturerFiltered.value = manufacturer;
  selectManufacturerDialog.value = true;
};

const assignManufacturer = async () => {
  if (!!manufacturerFiltered.value.id) {
    await emits('update:id', manufacturerFiltered.value.id);
    advancedFilterManufacturerRef.value?.onClose();
    await execute();
  }

  // getContactDetail(manufacturerFiltered.value.id, true);
};

const deleteValue = async () => {
  emits('update:id', '');
  state.value = defaultData;
};

const validate = () => {
  reset();
  validated.value = true;
  return !!props.id;
};

const reset = () => {
  validated.value = false;
};

const { state, isLoading, execute } = useAsyncState(async () => {
  if (props.id) {
    console.log(props.id);
    const response = await getContactDetail(props.id);
    console.log(response);
    return response;
  }
  return defaultData;
}, defaultData);

defineExpose({
  validate,
  reset,
  state,
});
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
        @click="openManufacturerFilter"
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
    :title="state.title"
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
        @click="openManufacturerFilter"
      />
    </template>
  </RelationDetailCard>
  <AdvancedFilterManufacturer
    ref="advancedFilterManufacturerRef"
    title="Búsqueda de Fabricantes"
    :account_id="''"
    @select-item="selectItem"
  />

  <AlertComponent
    title="¿Asignar Fabricante?"
    icon="warning"
    iconColor="warning"
    iconSize="50px"
    btn-color="primary"
    btn-text="Si, asignar"
    v-model="selectManufacturerDialog"
    @confirm="assignManufacturer"
    @denegate="selectManufacturerDialog = false"
  >
    <template #body>
      <span class="q-py-sm">
        ¿Esta seguro de asignar a {{ manufacturerFiltered.name }} como
        fabricante?
      </span>
    </template>
  </AlertComponent>
</template>
