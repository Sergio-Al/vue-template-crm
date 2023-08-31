<script lang="ts" setup>
import moment from 'moment';
import { ref, computed, onMounted } from 'vue';
import {
  CertificacionBody,
  EmpresaParticipacion,
  User,
} from '../../utils/types';
import {
  getUsers,
  getParticipants,
  getParticipacionComo,
  getUserLB,
} from '../../services/useCertificationsService';

import { useDivision } from 'src/composables/useLanguage';
import { ViewCard } from 'src/modules/Accounts/components';

import { userStore } from 'src/modules/Users/store/UserStore';
import { useCertificationStore } from '../../store/certificationStore';
import { axios_LB_01 } from 'src/conections/axiosCRM';
import { QInput } from 'quasar';

//const certificationStore = useCertificationStore();

const { userCRM } = userStore();

interface Props {
  id: string;
  data: CertificacionBody;
  applicantId:any;
}

const { getListDivisiones, listDivisiones } = useDivision();

const props = defineProps<Props>();

const localId = ref(props.id);
const inputData = ref({...props.data} as CertificacionBody);
const inputParticipant = ref({} as EmpresaParticipacion);
const users = ref<User[] | undefined>(undefined);
const participants = ref<EmpresaParticipacion[] | undefined>(undefined);

const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const applicantInputRef = ref<InstanceType<typeof QInput> | null>(null);
const participantInputRef = ref<InstanceType<typeof QInput> | null>(null);

const oneParticipant = ref<boolean>(false);
const date_entered_visual = ref('');
const solicitante_visual  = ref();

const amercadoList = computed(() => {
  const result: any = listDivisiones.value.filter(
    (element: any) => element.cod_div == inputData.value.iddivision_c
  );
  const aux = { ...result[0] };
  return aux.amercado;
});

const filterFn = async (
  val: string,
  update: (callback: () => void) => void,
  abort: () => void
) => {
  update(async () => {
    if (val === '') {
      if (!!users.value && users.value.length > 0) return;
      users.value = [];
    } else {
      const term = val;
      const response = await getUsers(term);
      users.value = response;
      //users.value = [{ id: '1', fullname: 'Dan dd' }];
      console.log(users.value);
    }
  });
};


const validateInputs = async () => {
  const validatedFields = await Promise.all([
    applicantInputRef.value?.validate(),
    participantInputRef.value?.validate()
  ]);
  return validatedFields.every((field) => !!field);
};

// const filterParticipante = async (
//   val: string,
//   update: (callback: () => void) => void,
//   abort: () => void
// ) => {
//   update(async () => {
//     console.log('here');
//     if (val === '') {
//       if (!!participants.value && participants.value.length > 0) return;
//       participants.value = [];
//     } else {
//       const term = val;
//       const response = await getParticipants(term);
//       participants.value = response;
//     }
//   });
// };

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

const assignParticipacion = (id: string) => {
  const empresaParticipacion = participants.value?.find((p) => p.id === id);
  if (!!empresaParticipacion) inputParticipant.value = empresaParticipacion;
};

const removeSolicitante = () => {
  inputData.value.user_id_c = '';
};

const removeParticipante = () => {
  inputData.value.hance_empresa_id_c = '';
  inputParticipant.value = {} as EmpresaParticipacion;
};

const formatDirection = computed(() => {
  // if (localDataCurrent.value.address_street_generated_c)
  //   return localDataCurrent.value.address_street_generated_c
  //     .replace('_gnrtd', '')
  //     .replaceAll(',|', '');
  // else return '';
  if (inputParticipant.value.direccion_c)
    return inputParticipant.value.direccion_c
      .replace('_gnrtd', '')
      .replaceAll(',|', '');
  else return '';
});

// const clearData = () => {
//     inputData.value = {
//       name: '',
//       assigned_user_id: '',
//       etapa_c: '',
//       estado_c: '',
//       tipo_tramite_c: '',
//       user_id_c: '',
//       tipo_producto_c: '',
//       iddivision_c: '',
//       idamercado_c: '',
//       idregional_c: '',
//       date_entered: moment().format('DD/MM/YYYY'),
//       date_register_misa_c: '',
//       date_planning_cert_c: '',
//       date_real_cert_c: '',
//       hance_empresa_id_c: '',
//       cod_misa_c: '',
//       nro_ruta_c: ''
//     };
//   };
const formatDate = computed(() => {
  return moment(inputParticipant.value.resolucion_ministerial_date_c).format('DD/MM/YYYY');
});

const getParticipantsList = async (id:string)=>{
  let response = await getParticipants(id);
  participants.value = response;     
}

onMounted(async () => {

  await getParticipantsList(userCRM.id);
  users.value = await getUsers('');

  if(!!localId.value){
    //ya tenemos la data
    //inputData.value = props.data;
    inputData.value.date_entered = moment(inputData.value.date_entered).format('YYYY-MM-DD');
    date_entered_visual.value = moment(inputData.value.date_entered).format('DD/MM/YYYY');
    // los campos participacion y solicitante deben ser obligatorios
    const response = await getParticipacionComo(inputData.value.hance_empresa_id_c);
    inputParticipant.value = response[0];
    //const solicitante = await getUserLB(inputData.value.user_id_c);
    const result = users.value?.find(element=>(element.id == inputData.value.user_id_c));
    solicitante_visual.value = result?.fullname;
  }
  else{
    inputData.value.date_entered = moment(new Date()).format('YYYY-MM-DD');
    inputData.value.iddivision_c = userCRM.iddivision;
    inputData.value.idamercado_c = userCRM.idamercado;
    inputData.value.user_id_c = props.applicantId;

    if(participants.value?.length == 1){
        const participant = participants.value[0];
        oneParticipant.value = true;
        inputData.value.hance_empresa_id_c = participant.id;
        inputParticipant.value.name = participant.name;
        inputParticipant.value.razon_social_c = participant.razon_social_c;
        inputParticipant.value.direccion_c = participant.direccion_c;
        inputParticipant.value.titular = participant.titular;
        inputParticipant.value.resolucion_ministerial_c = participant.resolucion_ministerial_c;
        inputParticipant.value.resolucion_ministerial_date_c = participant.resolucion_ministerial_date_c;
        //solo es uno, asignar inofrmacion a los campos
      }
  }

  await getListDivisiones();
});

const restoreValues = () => {
  if (props.data) {
    inputData.value = { ...props.data };
    inputData.value.date_entered = moment(inputData.value.date_entered).format('YYYY-MM-DD');
    // const result = users.value?.find(element=>(element.id == inputData.value.user_id_c));
    // inputData.value.solicitante = result?.fullname;
  }
};

defineExpose({
  validateInputs,
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Partial<CertificacionBody> => ({
    user_id_c: inputData.value.user_id_c,
    date_entered: inputData.value.date_entered,
    hance_empresa_id_c: inputData.value.hance_empresa_id_c,
    iddivision_c: inputData.value.iddivision_c,
    license_c: inputData.value.license_c,
  }),
  changeRequest : (idManufacturer:any, idSolicitante:string)=>{
    //console.log(idSolicitante);
    inputData.value.user_id_c = idSolicitante || '';
}
});
</script>
<template>
  <view-card-component
    v-bind="$attrs"
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    icon-name="info"
    ref="baseCardRef"
    title="Información"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
    >
    <template #edit>
      <div class="row q-col-gutter-y-md q-col-gutter-x-sm q-pa-sm q-pt-md">
        <q-select
          ref="applicantInputRef"
          :options="users"
          @filter-abort="abortFilterFn"
          @filter="filterFn"
          class="col-12 q-py-sm"
          dense
          emit-value
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="500"
          label="* Solicitante"
          map-options
          option-label="fullname"
          option-value="id"
          outlined
          use-chips
          use-input
          v-model="inputData.user_id_c"
          :rules="[(val) => !!val || 'Campo requerido']"
        >
          <template #append>
            <q-btn
              v-if="!!inputData.user_id_c"
              color="primary"
              size="sm"
              rounded
              icon="remove"
              flat
              dense
              @click="removeSolicitante"
            />
          </template>

          <template #no-option>
            <span class="text-grey-8 q-pa-lg">Sin opciones</span>
          </template>

          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.fullname }}</q-item-label>
                <q-item-label caption
                  >Email: {{ scope.opt.email_address }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <!-- <q-input
          v-model="inputData.date_entered"
          class="col-12 col-sm-6 q-py-sm"
          label="Fecha"
          outlined
          dense
          type="date"
        >
        </q-input> -->
        <!--<q-select
          :hint="
            !!inputData.hance_empresa_id_c ? 'Participante Seleccionado' : ''
          "
          :options="participants"
          @filter-abort="abortFilterFn"
          @filter="filterParticipante"
          class="col-12 col-sm-6"
          dense
          emit-value
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="500"
          label="Participación como"
          map-options
          option-label="name"
          option-value="id"
          outlined
          use-chips
          use-input
          v-model="inputData.hance_empresa_id_c"
          @update:model-value="assignParticipacion"
        >
          <template #append>
            <q-btn
              v-if="!!inputData.hance_empresa_id_c"
              color="primary"
              size="sm"
              rounded
              icon="remove"
              flat
              dense
              @click="removeParticipante"
            />
          </template>

          <template #no-option>
            <span class="text-grey-8 q-pa-lg">Sin opciones</span>
          </template>

          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label caption
                  >Razón social: {{ scope.opt.razon_social_c }}</q-item-label
                >
                <q-item-label caption
                  >Resolución Ministerial:
                  {{ scope.opt.resolucion_ministerial_c }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </template>
        </q-select> -->
        <q-select v-if="!oneParticipant"
          ref="participantInputRef"
          class="col-12 col-sm-6 q-py-sm"
          outlined
          dense
          v-model="inputData.hance_empresa_id_c"
          :options="participants"
          label="* Participación Como"
          option-value="id"
          option-label="name"
          emit-value
          fill-input
          map-options
          hide-selected
          input-debounce="500"
          use-chips
          use-input
          @update:model-value="assignParticipacion"
          :rules="[(val) => !!val || 'Campo requerido']"
        >
          <template #no-option>
            <span class="text-grey-8 q-pa-lg">Sin opciones</span>
          </template>

          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label caption
                  >Razón social: {{ scope.opt.razon_social_c }}</q-item-label
                >
                <q-item-label caption
                  >Resolución Ministerial:
                  {{ scope.opt.resolucion_ministerial_c }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          v-else
          v-model="inputParticipant.name"
          class="col-12 col-sm-6"
          label="* Participación Como"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputParticipant.razon_social_c"
          class="col-12 col-sm-6 q-py-sm"
          label="Razón social"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="formatDirection"
          class="col-12 col-sm-6 q-py-sm"
          label="Dirección"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputParticipant.titular"
          class="col-12 col-sm-6 q-py-sm"
          label="Nombre del Titular"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputParticipant.resolucion_ministerial_c"
          class="col-12 col-sm-6 q-py-sm"
          label="Resolución ministerial"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="formatDate"
          class="col-12 col-sm-6 q-py-sm"
          label="Fecha de Resolución Ministerial"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-select
          class="col-12 col-sm-6 q-py-sm"
          outlined
          dense
          v-model="inputData.iddivision_c"
          :options="listDivisiones"
          type="text"
          label="División"
          option-value="cod_div"
          option-label="label"
          emit-value
          map-options
        >
        </q-select>
        <q-input
          v-model="inputData.license_c"
          class="col-12 col-sm-6 q-py-sm"
          label="Licencia"
          outlined
          dense
        >
        </q-input>
        <!--<q-select
          class="col-12 col-sm-6 q-py-sm"
          outlined
          dense
          v-model="inputData.idamercado_c"
          :options="amercadoList"
          type="text"
          label="Área de mercado"
          option-value="cod_amercado"
          option-label="label"
          emit-value
          map-options
        >
        </q-select>-->
      </div>
    </template>
    <template #read>
      <div class="row q-col-gutter-y-md q-col-gutter-x-sm q-pa-sm q-pt-md">
        <q-input
          v-model="solicitante_visual"
          class="col-12 q-py-sm"
          label="* Solicitante"
          outlined
          dense
          readonly
          type="text"
        />
        <!--<q-input
          v-model="date_entered_visual"
          class="col-12 col-sm-6 col-md-6 q-py-sm"
          label="Fecha"
          outlined
          dense
          readonly
          type="text"
        />-->
        <q-input
          v-model="inputParticipant.name"
          class="col-12 col-sm-6 q-py-sm"
          label="* Participación Como"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputParticipant.razon_social_c"
          class="col-12 col-sm-6 q-py-sm"
          label="Razón social"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="formatDirection"
          class="col-12 col-sm-6 q-py-sm"
          label="Dirección"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputParticipant.titular"
          class="col-12 col-sm-6 q-py-sm"
          label="Nombre del Titular"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputParticipant.resolucion_ministerial_c"
          class="col-12 col-sm-6 q-py-sm"
          label="Resolución ministerial"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="formatDate"
          class="col-12 col-sm-6 q-py-sm"
          label="Fecha de Resolución Ministerial"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-select
          class="col-12 col-sm-6 q-py-sm"
          outlined
          dense
          v-model="inputData.iddivision_c"
          :options="listDivisiones"
          type="text"
          label="División"
          option-value="cod_div"
          option-label="label"
          emit-value
          map-options
          readonly
        >
        </q-select>
        <q-input
          v-model="inputData.license_c"
          class="col-12 col-sm-6 q-py-sm"
          label="Licencia"
          outlined
          dense
          readonly
        >
        </q-input>
        <!--<q-select
          class="col-12 col-sm-6 q-py-sm"
          outlined
          dense
          v-model="inputData.idamercado_c"
          :options="amercadoList"
          type="text"
          label="Área de mercado"
          option-value="cod_amercado"
          option-label="label"
          emit-value
          map-options
        >
        </q-select>-->
      </div>
    </template>
  </view-card-component>
</template>
