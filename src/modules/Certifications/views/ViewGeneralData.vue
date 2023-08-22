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

interface Props {
  id?:string;
  data: CertificacionBody;
  requestId?: string;
  manufacturerId?:string;
  applicantId?:string;
}

interface Emits {
  //(e: 'create', value: Partial<CertificacionBody>): void;
  //(e: 'update', value: Partial<CertificacionBody>): void;
  (e: 'continue'): void;
}

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

const props = withDefaults(defineProps<Props>(), { id: '', requestId: '' });

const localId = ref(props.id)
const emits = defineEmits<Emits>();
const procedureValue = ref(props.data.tipo_tramite_c || '');
const productValue = ref(props.data.tipo_producto_c || '');

const captureData = (procedure?: string, product?: string) => {
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

const onSubmit = async () => {
  // Validar datos...
  // const areCardsValid = await validateCards();
  // if (!areCardsValid) {
  //   $q.notify({
  //     type: 'warning',
  //     message: 'Error de validación',
  //     caption: 'Algunos campos necesitan ser llenados',
  //   });
  //   return;
  // }

  const cardGeneralData = cardGeneralDataRef.value?.exposeData();
  const cardProcedureTypeData = cardProcedureTypeRef.value?.exposeData();
  const cardProductType = cardProductTypeRef.value?.exposeData();
  const cardRequestData = cardRequestRef.value?.exposeData();
  const cardManufacturerData = cardManufacturerRef.value?.exposeData();
  const cardSchemaData = cardSchemaRef.value?.exposeData();
  //const assignedUser = cardDelegateRef.value?.exposeData();
  const assignedUser = assignedSingleUserRef.value?.assignedUser.id || '1';

  if (!!localId.value) {
      //modificar
      try {
        Loading.show({
          message: 'Modificando Información',
        });
        const body: any = {
          ...cardGeneralData,
          // ...cardProcedureTypeData,
          // ...cardProductType,
          // ...cardRequestData,
          // ...cardManufacturerData,
          ...cardSchemaData,
          assigned_user_id: assignedUser,
        } as any;
        console.log(body)
        // await companyStore.onUpdateCompany(localId.value, body);
        // emits('submitComplete', localId.value);
        // await execute();
      } catch (error) {
        console.log(error);
      }
    }
    else{
      console.log('creando...')
      //crear
      // try {
      //   Loading.show({
      //     message: 'Guardando Información',
      //   });
      //   const body:Company = {
      //     ...cardInfoData,
      //     ...cardContactData,
      //     comment: commentCreate.value,
      //     direccion_c: directionData?.address_street_generated_c,
      //     //assigned_user_id: assignedUser, //no tiene usuarios aun, no registra responsable
      //   } as Company;

      //   const newCompany = await companyStore.onCreateCompany(body);
      //   localId.value = newCompany.id;
      //   emits('submitComplete', localId.value);
      //   await execute();
      // } catch (error) {
      //   console.log(error);
      // }
    }

};

const isSomeCardEditing = computed(() => {
  return [
  cardGeneralDataRef.value?.isEditing,
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
      <div class="row q-col-gutter-lg q-pa-md">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <div class="row q-gutter-y-md">
            <CardGeneralData
              ref="cardGeneralDataRef"
              :id="props.id || ''"
              :data="certificationData"
              :applicantId="applicantId"
              class="col-12"
            />
            <CardProcedureType
              ref="cardProcedureTypeRef"
              class="col-12"
              :data="props.data"
              @change="(value: string) => captureData(value, undefined)"
            />
            <CardProductType
              ref="cardProductTypeRef"
              class="col-12"
              :data="props.data"
              @change="(value: string) => captureData(undefined, value)"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 q-gutter-y-md">
          <AssignedUser
            title="Profesional Acreditado"
            hide-chip
            ref="assignedSingleUserRef"
            :module="'HANCE_Certificacion'"
            :module-id="localId"
            @changeUser="() => {}"
          />

          <!--<AssignedSingleUser2
            ref="assignedSingleUserRef"
            :module="'HANCE_Certificacion'"
            :module-id="''"
            :withList="false"
            @changeUser="() => {}"
          />-->
          <div class="row justify-between">
            <div class="col-6 q-col-gutter-xs">
              <CardRequest
              ref="cardRequestRef"
              :id="props.id || ''"
              :data="props.data || ''"
              :requestId="requestId"
              @change="(value: string, value2:string) => captureDataReq(value, value2)"
              />
            </div>
            <div class="col-6 q-col-gutter-xs">
              <CardManufacturerCert
              ref="cardManufacturerRef"
              :id="props.id || ''"
              :data="props.data || ''"
              :manufacturerId="manufacturerId"
              />
            </div>
          </div>
          <CardSchema
            ref="cardSchemaRef"
            :id="props.id || ''"
            :data="props.data || ''"
            class="col-12"
          />
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
