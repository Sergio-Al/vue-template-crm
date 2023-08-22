<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuasar, QPopupProxy } from 'quasar';
import moment from 'moment';
import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';
import ViewCard from 'src/components/MainCard/ViewCard.vue';
//import { getUsers, getUser } from '../../services/useCertificationsService';

import { Manufacturer } from '../../utils/types';
import { userStore } from 'src/modules/Users/store/UserStore';
import AdvancedFilterManufacturer from 'src/components/Filters/AdvancedFilterManufacturer.vue';
//import RelacionadoProv from 'src/components/Activities/Dialogs/CallsActivityDialog/CallRelacion/RelacionadoProv.vue';
import ManufacturerDialog from 'src/modules/Manufacturers/components/Dialogs/ManufacturerDialog.vue';

// obtener data del repositorio de mongoDB y borrar este import
// import {
//   useDivAreaMercado,
//   useDivision,
//   useGrupoCliente,
//   useRegionales,
// } from 'src/composables/useLanguage';

import {
  getCertificationRequest,
  getCertificationRequestCustomized,
  getManufacturer
} from '../../services/useCertificationsService';
import { useAsyncState } from '@vueuse/core';

//import { user } from '../../utils/dummyData';
//import { amercado, divisions, regional } from '../../utils/dummyData';

interface Props {
  id?: string;
  data: any;
  manufacturerId?:string;
}

let props = defineProps<Props>();
const advancedFilterManufacturerRef = ref<InstanceType<typeof AdvancedFilterManufacturer> | null>(null);

//const manufacturer = ref({} as any);
const manufacturer = ref({ } as Manufacturer);
const manufacturer_aux = ref({} as any);
const manufacturerId = ref(props.manufacturerId);
const { userCRM } = userStore();
const selectManufacturerDialog = ref(false);

const $q = useQuasar();

const emits = defineEmits<{
//   (event: 'idAccount', localIdValue: any): void;
//   (event: 'cambioStage', item: boolean): void;
}>();

const showFilter = ref(false);
const bloqueado = ref(true);

//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const dateRef = ref<InstanceType<typeof QPopupProxy> | null>(null);
const manufacturerDialogRef = ref<InstanceType<
  typeof ManufacturerDialog
> | null>(null);

const inputData = ref({ ...props.data });

const { isLoading, execute } = useAsyncState(async () => {
  if (!!manufacturerId.value)
      console.log(manufacturerId.value);
      try {
        const response = await getManufacturer(manufacturerId.value);
        console.log(response);
        manufacturer.value = response;
        return response;
      } catch (error) {
        $q.notify({
          type: 'warning',
          message: 'Error en la captura',
          caption: 'No se encontró al fabricante',
        });
      }
}, null as null | Manufacturer);

onMounted(async () => {
  console.log(manufacturerId.value);
});

const closeDate = () => {
  dateRef.value?.hide();
};

const removeFabricante = () => {
  inputData.value.user_id_c = '';
};

const divisionList = ref([]);
//let listAreaMercado = ref({});
const listRegional = ref([]);

const verDialogItem = async (id: string) => {
  await manufacturerDialogRef.value?.openDialogTab(id);
};

const toggleFilter = () => {
  bloqueado.value = false;
  showFilter.value = !showFilter.value;
  //console.log('permitir elegir la solicitud')
};

const openDialogProv = () => {
  advancedFilterManufacturerRef.value?.openDialog();
};

// const selectRelaProv = (item: any) => {
//   console.log(item);

//   manufacturer.value.name = String(item.name);
//   manufacturer.value.id = String(item.id);
//   manufacturer.value.pais = String(item.pais);
//   manufacturer.value.direccion = String(item.direccion);

//   advancedFilterProv.value?.onClose();
// };

const clearProv = () => {
  manufacturer.value.name = '';
  manufacturer.value.id = '';
};

const selectItem = (item: Manufacturer) => {
    manufacturer_aux.value = item;
    selectManufacturerDialog.value = true;
};

const assignManufacturer = async () => {
    manufacturer.value.name = manufacturer_aux.value.name;
    manufacturer.value.id = manufacturer_aux.value.id;
    manufacturer.value.pais = manufacturer_aux.value.pais;
    manufacturer.value.direccion = manufacturer_aux.value.direccion;

    advancedFilterManufacturerRef.value?.onClose();
    toggleFilter();
  // getContactDetail(manufacturerFiltered.value.id, true);
};

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): string => manufacturer.value,
  changeRequest : (idManufacturer:any, idSolicitante:any)=>{
  //console.log(idRequest)
  manufacturerId.value = idManufacturer || '';
  //console.log(idRequest);
   //props.manufacturerId = idRequest;
  execute();
}
});
</script>

<template>
  <ManufacturerDialog ref="manufacturerDialogRef" />

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
        ¿Esta seguro de asignar a {{ manufacturer_aux.name }} como
        fabricante?
      </span>
    </template>
  </AlertComponent>

  <!--<div v-if="isLoading">
    <q-card class="q-pa-sm">
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton height="80px" square />
    </q-card>
  </div>-->
  <div>
    <q-card class="my-card" :loading="isLoading">
      <q-card-section horizontal>
        <q-card-section class="col-auto flex flex-center">
          <q-avatar size="50px" color="primary">
            <q-icon name="store" color="white" size="30px" />
          </q-avatar>
        </q-card-section>
        <q-card-section class="full-width q-py-md">
          <div class="row q-mt-sm flex justify-between">
            <span class="text-caption text-weight-medium">
              Fabricante</span
            >
          </div>
          <div class="assigned-user q-mt-none q-mb-none">
            <span class="text-subtitle-1 text-font-weight"
              ><span class="text-primary">
                {{ manufacturer.name || 'Sin asignar' }}</span
              ></span
            >
          </div>
          <div
            class="text-caption text-weight-light text-grey-9"
          >
            País de Origen: {{ manufacturer.billing_address_country || '-' }}
          </div>
          <div
            class="text-caption text-weight-light text-grey-9"
          >
            Dirección: {{ manufacturer.billing_address_street || '-' }}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="justify-between q-py-md-custom">
        <q-btn
          style="font-size: 13px"
          icon="edit"
          @click="toggleFilter"
          flat
          color="primary"
        >
          <span class="q-ml-xs"> Cambiar Fabricante </span>
        </q-btn>
        <q-btn
          style="font-size: 13px"
          icon="visibility"
          @click="verDialogItem(manufacturer.id)"
          label="Ver"
          color="primary"
          outline
          :disabled="!manufacturer.id"
        >
        </q-btn>
      </q-card-actions>
      <q-card-section v-if="showFilter">
        <q-input
          outlined
          v-model="manufacturer.name"
          label="Fabricante"
          class="col-md-6 col-sm-12"
          :readonly="bloqueado"
          dense
          label-slot
        >
          <template v-slot:prepend>
            <q-avatar>
              <q-icon name="store" size="sm" />
            </q-avatar>
          </template>
          <template v-slot:after>
            <q-btn
              dense
              outline
              icon="north_west"
              color="primary"
              @click="openDialogProv"
              :disable="bloqueado"
            />
            <q-btn
              dense
              outline
              icon="close"
              color="negative"
              @click="clearProv"
              :disable="bloqueado"
            />
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.assigned-user {
  font-size: 1.04rem;
}

.q-py-md-custom{
  padding:13px 10px;
}
</style>
