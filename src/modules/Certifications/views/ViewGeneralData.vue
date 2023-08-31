<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import moment from 'moment';
import { Loading, QInput, useQuasar } from 'quasar';
import CardGeneralData from '../components/Cards/CardGeneralData.vue';
import CardProcedureType from '../components/Cards/CardProcedureType.vue';
import CardProductType from '../components/Cards/CardProductType.vue';
import CardRequest from '../components/Cards/CardRequest.vue';
import CardManufacturerCert from '../components/Cards/CardManufacturerCert.vue';
import CardSchema from '../components/Cards/CardSchema.vue';

import AssignedUser from 'src/components/AssignedUsers/AssignedUser.vue';
import { CertificacionBody, CertificationRequest } from '../utils/types';

const $q = useQuasar();

interface Props {
  id?:string;
  data: CertificacionBody;
  requestId?: string;
  manufacturerId?:string;
  applicantId?:string;
}

const props = withDefaults(defineProps<Props>(), { id: '', requestId: '' });

interface Emits {
  (e: 'create', value: Partial<CertificacionBody>): void;
  (e: 'update', value: Partial<CertificacionBody>): void;
  (e: 'continue'): void;
}

const emits = defineEmits<Emits>();

const cardGeneralDataRef = ref<InstanceType<typeof CardGeneralData> | null>(
  null
);
const cardProcedureTypeRef = ref<InstanceType<typeof CardProcedureType> | null>(
  null
);
const cardProductTypeRef = ref<InstanceType<typeof CardProductType> | null>(
  null
);
const assignedSingleUserRef = ref<InstanceType<typeof AssignedUser> | null>(
  null
);

const cardRequestRef = ref<InstanceType<typeof CardRequest> | null>(null);
const cardManufacturerRef = ref<InstanceType<typeof CardManufacturerCert> | null>(null);
const cardSchemaRef = ref<InstanceType<typeof CardSchema> | null>(null);
const localId = ref(props.id)
const procedureValue = ref(props.data.tipo_tramite_c || '');
const productValue = ref(props.data.tipo_producto_c || '');
//const watch_change_types = ref<boolean>(false);

const captureData = (procedure?: string, product?: string) => {
  //actuar como isEditing
  //watch_change_types.value = true;
  
  if (!!procedure) {
    procedureValue.value = procedure;
  }

  if (!!product) {
    productValue.value = product;
  }

  if (procedureValue.value && !!productValue.value) {
    cardSchemaRef.value?.changeSchema(procedureValue.value, productValue.value);
  }
};

const captureDataReq = (idManufacturer?: any, idSolicitante?:any) => {
  //cardSchemaRef.value?.changeSchema(procedureValue.value, productValue.value);
  cardManufacturerRef.value?.changeRequest(idManufacturer, undefined);
  cardGeneralDataRef.value?.changeRequest(undefined, idSolicitante);
};

const requestId = computed(() => {
  if (props.requestId) {
    return props.requestId;
  }
  else if(!!props.data.hance_solicitudcertificacion_id_c){
    return props.data.hance_solicitudcertificacion_id_c;
  }
  return '';
});

const manufacturerId = computed(() => {
  if (props.manufacturerId) {
    return props.manufacturerId;
  }
  else if(!!props.data.hanp_proveedores_id_c){
    return props.data.hanp_proveedores_id_c;
  }
  return '';
});

const certificationData = computed(() => {
  if (props.data) {
    //props.data.date_entered = moment(props.data.date_entered).format('YYYY-MM-DD');
    return { ...props.data };
  }
  return {} as CertificacionBody;
});

const validateCards = async () => {
  const validCards: (boolean | undefined)[] = [];
  
  if (cardGeneralDataRef.value?.isEditing) {
    const cardGeneralDataValidation = await cardGeneralDataRef.value.validateInputs();
    validCards.push(cardGeneralDataValidation);
  }

  if (cardRequestRef.value?.isEditing) {
    const cardRequestValidation = await cardRequestRef.value.validateInputs();
    validCards.push(cardRequestValidation);
  }

  if (cardManufacturerRef.value?.isEditing) {
    const cardManufacturerValidation = await cardManufacturerRef.value.validateInputs();
    validCards.push(cardManufacturerValidation);
  }

  return validCards.every((card) => !!card);
};

const onSubmit = async () => {

  const areCardsValid = await validateCards();
  if (!areCardsValid) {
    $q.notify({
      type: 'warning',
      message: 'Error de validación',
      caption: 'Algunos campos necesitan ser llenados',
    });
    return;
  }

  const cardGeneralData:any = cardGeneralDataRef.value?.exposeData();
  const cardRequestData:any = cardRequestRef.value?.exposeData();
  const cardManufacturerData:any = cardManufacturerRef.value.exposeData();
  const cardSchemaData:any = cardSchemaRef.value?.exposeData();
  const assignedUser = assignedSingleUserRef.value?.assignedUser.id || '1';

  const body: any = {
          ...cardGeneralData,
          ...cardRequestData,
          ...cardManufacturerData,
          ...cardSchemaData,
          assigned_user_id: assignedUser,
        } as any;

          // send data
  if (!!localId.value) {
    emits('update', body);
  } else {
    body.date_entered = new Date().toISOString();
    emits('create', body);
  }

};

const isSomeCardEditing = computed(() => {
  //console.log(cardGeneralDataRef.value?.isEditing);
  // if(!cardGeneralDataRef.value?.isEditing){
  //   watch_change_types.value == false;
  // }

  return [
  cardGeneralDataRef.value?.isEditing,
  cardProductTypeRef.value?.isEditing,
  cardProcedureTypeRef.value?.isEditing,
  cardRequestRef.value?.isEditing,
  cardManufacturerRef.value?.isEditing,
  cardSchemaRef.value?.isEditing
  //watch_change_types
  ].some((value) => !!value);
});

onMounted(() => {
  console.log(props);
});

defineExpose({
  exposeData: (): Partial<CertificacionBody> => ({
    ...cardGeneralDataRef.value?.exposeData(),
    tipo_tramite_c: cardProcedureTypeRef.value?.exposeData(),
    tipo_producto_c: cardProductTypeRef.value?.exposeData(),
    hance_solicitudcertificacion_id_c: cardRequestRef.value?.exposeData(),
    assigned_user_id: assignedSingleUserRef.value?.assignedUser.id || '',
  }),
  onSubmit,
  isSomeCardEditing
});
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="row q-gutter-sm q-gutter-y-md q-pa-sm">
        <div class="row q-col-gutter-x-md">
            <div class="col-12 col-md-6 col-lg-6">
              <CardGeneralData
              ref="cardGeneralDataRef"
              :id="props.id || ''"
              :data="certificationData"
              :applicantId="applicantId"
              class="q-py-none"
              />
            </div>
            <div class="col-12 col-md-6 col-lg-6 q-gutter-y-md">
              <AssignedUser
                title="Profesional Acreditado"
                ref="assignedSingleUserRef"
                :module="'HANCE_Certificacion'"
                :module-id="localId"
                :options="false"
                hide-chip
                @changeUser="() => {}"
              />
              <div class="row q-col-gutter-x-sm">
                <div class="col-6">
                  <CardRequest
                  ref="cardRequestRef"
                  :id="props.id || ''"
                  :data="props.data || ''"
                  :requestId="requestId"
                  @change="(value: string, value2:string) => captureDataReq(value, value2)"
                  />
                </div>
                <div class="col-6">
                  <CardManufacturerCert
                  ref="cardManufacturerRef"
                  :id="props.id || ''"
                  :data="props.data || ''"
                  :manufacturerId="manufacturerId"
                  />
                </div>
              </div>
            </div>
        </div>
        
        <div class="row q-col-gutter-x-md" style="width:100%;">
          <div class="col-12 q-gutter-y-md col-md-6 col-lg-6">
            <CardProcedureType
              ref="cardProcedureTypeRef"
              :id="props.id || ''"
              :data="props.data"
              @change="(value: string) => captureData(value, undefined)"
            />
            <CardProductType
              ref="cardProductTypeRef"
              :id="props.id || ''"
              :data="props.data"
              @change="(value: string) => captureData(undefined, value)"
            />
          </div>
          <div class="col-12 col-md-6 col-lg-6">
            <CardSchema
              ref="cardSchemaRef"
              :id="props.id || ''"
              :data="props.data || ''"
            />
          </div>
        </div>
      </div>
    </q-page-container>

    <!--<transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <q-footer
        v-if="true"
        elevated
        reveal
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-4'"
      >
        <q-toolbar class="justify-center">
          <q-btn 
            color="primary"
            class="q-mr-md"
            @click="onSubmit"
          >
            Guardar
          </q-btn>
        </q-toolbar>
      </q-footer>
    </transition>-->
  </q-layout>
</template>
