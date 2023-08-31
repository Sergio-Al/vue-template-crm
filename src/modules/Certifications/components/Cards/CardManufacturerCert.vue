<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuasar, QPopupProxy, QInput } from 'quasar';
import moment from 'moment';
import AlertComponent from 'src/components/MainAlert/AlertComponent.vue';
import ViewCard from 'src/components/MainCard/ViewCard.vue';
//import { getUsers, getUser } from '../../services/useCertificationsService';

import { CertificacionBody, Manufacturer } from '../../utils/types';
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

const props = withDefaults(
  defineProps<Props>(),
  {
    manufacturerId: '',
  }
);

const advancedFilterManufacturerRef = ref<InstanceType<typeof AdvancedFilterManufacturer> | null>(null);

const manufacturer = ref({ } as Manufacturer);
const $q = useQuasar();

const manufacturer_aux = ref({} as any);
const manufacturerId = ref(props.manufacturerId);
const selectManufacturerDialog = ref(false);


// const emits = defineEmits<{
// //   (event: 'idAccount', localIdValue: any): void;
// //   (event: 'cambioStage', item: boolean): void;
// }>();

const showFilter = ref(false);
//const bloqueado = ref(true);

//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const dateRef = ref<InstanceType<typeof QPopupProxy> | null>(null);
const manufacturerDialogRef = ref<InstanceType<
  typeof ManufacturerDialog
> | null>(null);
const manufacturerInputRef = ref<InstanceType<typeof QInput> | null>(null);

const inputData = ref({ ...props.data });

const { isLoading, execute } = useAsyncState(async () => {

  if (!!manufacturerId.value)
      try {
        const response = await getManufacturer(manufacturerId.value);
        //console.log(response);
        manufacturer.value = response;
        console.log(manufacturer.value);
        return response;
      } catch (error) {
        $q.notify({
          type: 'warning',
          message: 'Error en la captura',
          caption: 'No se encontró al fabricante',
        });
      }
}, null as null | Manufacturer);

const validateInputs = async () => {
  const validatedFields = await Promise.all([
    manufacturerInputRef.value?.validate(),
    //manufacturerInputRef.value?.validate()
  ]);
  return validatedFields.every((field) => !!field);
};

const verDialogItem = async (id: string) => {
  manufacturerDialogRef.value?.openDialogTab(id);
};

onMounted(async () => {
  console.log(manufacturerId.value);
});

const closeDate = () => {
  dateRef.value?.hide();
};

const removeFabricante = () => {
  inputData.value.user_id_c = '';
};



// const divisionList = ref([]);
// //let listAreaMercado = ref({});
// const listRegional = ref([]);



const toggleFilter = () => {
  //bloqueado.value = false;
  showFilter.value = !showFilter.value;
  if(showFilter.value == false && props.id){
    execute();
  }
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
  manufacturer.value.id = '';
  manufacturer.value.name = '';
  manufacturer.value.billing_address_country = '';
  manufacturer.value.billing_address_city = '';
  manufacturer.value.billing_address_street = '';
};

const selectItem = (item: Manufacturer) => {
    manufacturer_aux.value = item;
    selectManufacturerDialog.value = true;
};

const assignManufacturer = async () => {

    manufacturer.value.id = manufacturer_aux.value.id;
    manufacturer.value.name = manufacturer_aux.value.name;
    manufacturer.value.billing_address_country = manufacturer_aux.value.pais;
    manufacturer.value.billing_address_city = manufacturer_aux.value.ciudad;
    manufacturer.value.billing_address_street = manufacturer_aux.value.direccion;

    advancedFilterManufacturerRef.value?.onClose();
    //toggleFilter();

};

defineExpose({
  validateInputs,
  isEditing: computed(() => showFilter.value === true),
  //exposeData: (): string => manufacturer.value,
  exposeData: (): Partial<CertificacionBody> => ({
    hanp_proveedores_id_c: manufacturer.value.id,
  }),
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
        <q-card-section class="full-width q-py-sm">
          <div class="row q-mt-sm">
            <span>
              Fabricante</span
            >
          </div>
          <div class="assigned-user q-mt-none q-mb-none">
            <span @click="verDialogItem(manufacturer.id)" v-if="manufacturer.name" class="text-subtitle-1 text-weight-medium text-primary cursor-pointer"
              >
              {{ manufacturer.name || 'Sin asignar' }}
              </span>
              <span v-else>
                -
              </span>
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

      <q-card-actions>
        <q-btn
          style="font-size: 13px"
          icon="edit"
          @click="toggleFilter"
          flat
          color="primary"
        >
          <span class="q-ml-xs"> Cambiar Fabricante </span>
        </q-btn>
      </q-card-actions>
      <q-card-section v-if="showFilter" class="q-pt-none q-pb-md">
        <q-input
          ref="manufacturerInputRef"
          outlined
          v-model="manufacturer.name"
          label="Fabricante"
          class="col-md-6 col-sm-12 q-py-none"
          readonly
          dense
          label-slot
          :rules="[(val) => !!val || 'Campo requerido']"
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
              icon="search"
              color="primary"
              @click="openDialogProv"
            >
            <q-tooltip>
              Búsqueda
            </q-tooltip>
            </q-btn>
            <q-btn
              dense
              outline
              icon="close"
              color="negative"
              @click="clearProv"
            >
            <q-tooltip>
              Limpiar
            </q-tooltip>
            </q-btn>
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
</style>
