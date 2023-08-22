<script lang="ts" setup>
import { ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { Manufacturer } from '../../utils/types';
import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';
import AdvancedFilterManufacturer from 'src/components/Filters/AdvancedFilterManufacturer.vue';
import { getManufacturer } from 'src/modules/Certifications/services/useCertificationsService';

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
  (event: 'assigned', data: Manufacturer): void;
  (event: 'delete', id: string): void;
}>();

const $q = useQuasar();

const advancedFilterManufacturerRef = ref<InstanceType<
  typeof AdvancedFilterManufacturer
> | null>(null);

const defaultData = {
  id:'',
  title: '',
  subtitle1: '',
  description: '',
  phone_mobile: '',
  email1: '',
  country:'',
  city:''
};
const manufacturerFiltered = ref({} as Manufacturer);
const selectManufacturerDialog = ref(false);
const validated = ref(false);

const getContactDetail = async (id: string, assign = false) => {
  if (assign) isLoading.value = true;
  const response = await getManufacturer(id);
  console.log(response);

  const manufacturer = {
    id: response.id as string,
    title: response.name as string,
    description: response.name as string,
    phone_mobile: response.phone_office,
    city:response.billing_address_city,
    country:response.billing_address_country
  };

  if (assign) {
    state.value = manufacturer;
    isLoading.value = false;
  }

  console.log(state.value);

  return manufacturer;
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
    emits('assigned', manufacturerFiltered.value);
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
  console.log(props)
  if (props.id) {
    //console.log(props.id);
    const response = await getContactDetail(props.id);
    //console.log(response);
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
  <q-card v-if="isLoading" bordered flat>
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
  <q-card
    v-else
    :class="{ 'error-card': !props.id && validated }"
    bordered
    flat
  >
    <q-list bordered>
      <q-item>
        <q-item-section v-if="!!props.id && props.editMode" side>
          <q-btn
            @click="deleteValue"
            class="q-my-xs"
            color="negative"
            icon="remove"
            round
            size="xs"
          />
        </q-item-section>

        <q-item-section v-if="!props.id">
          <q-item-label caption class="text-weight-bold" lines="1">
            <q-icon name="perm_contact_calendar" class="q-mr-sm" />{{
              moduleName
            }}</q-item-label
          >
          <q-item-label class="text-grey-7">
            <q-icon name="warning" />
            <span class="text-weight-thin"> No Seleccionado </span>
          </q-item-label>
          <span v-if="!props.id && validated" class="text-caption">{{
            props.errorMessage
          }}</span>
        </q-item-section>
        <q-item-section v-else>
          <q-item-label class="text-weight-bold" caption lines="1">
            <q-icon name="perm_contact_calendar" class="q-mr-sm" />{{
              moduleName
            }}</q-item-label
          >

          <q-item-label v-if="moduleName == 'Fabricante'">
            <a
              class="text-bold cursor-pointer flex items-center text-primary"
              @click="() => {}"
            >
              {{ state.title }}
            </a>
            <span v-if="state.country" class="text-caption text-grey text-weight-bold">
              <q-icon name="public" />
              <span class="q-pl-sm">País:  {{state.country}} - {{state.city}}</span>
            </span>
          </q-item-label>

          <q-item-label v-else> Seleccionado </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-btn
            v-if="props.editMode"
            @click="openManufacturerFilter"
            class="q-my-xs"
            color="primary"
            icon="open_in_new"
            round
            size="xs"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>

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

<style lang="scss" scoped>
.error-card {
  border-color: $negative;
  * {
    color: $negative !important;
  }
}
</style>
