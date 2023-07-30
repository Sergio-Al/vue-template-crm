<script lang="ts">
import moment from 'moment';
import { QInput } from 'quasar';
import { onMounted, ref } from 'vue';


import { useActivityStore } from 'src/stores/ActivityStore';
import DurationDate from '../../../GlobalComponent/DurationDate.vue';
import RelacionGlobal from '../../../GlobalComponent/RelacionGlobal.vue';
import ContactPhones from '../Dialog/ContactPhones.vue';
</script>
<script lang="ts" setup>

const props = defineProps<{
  idModule: string;
  ModuleTypeC: string;
  AccountId?:string;
  idCardread?: string;
  idActivityC?: string;
  NameRegMod?: string;
}>();

const storeCall = useActivityStore();

const listNumeros = ref();
const listStatus = ref();
const listType = ref();
const duracionCall = ref();
const duracionCallRead = ref();
const relacionCall = ref();
const recuperandoCall = ref();
const bloqueado = ref(true);
const bloqueadoRela = ref(true);
const ContactPhonesDi = ref(false);
const manualEntry = ref(false)
const edit = ref(false);
const data = ref({
  asunto: props.NameRegMod,
  telefono: '',
  tipollamada: 'Saliente',
  estadollamada: 'Planificada',
  dateestartCall: '',
  duracionhoraCall: '',
  duracionminutoCall: '',
  dateendCall: '',
  descripcion: '',
  modulorela: props.ModuleTypeC,
  relaUserCall: '',
  idrelaUserCall: '',
  prioridad: 'Short',
});

const dataread = ref({
  id: '',
  asunto: '',
  telefono: '',
  tipollamada: '',
  estadollamada: '',
  dateestartCall: '',
  duracionhoraCall: '',
  duracionminutoCall: '',
  dateendCall: '',
  descripcion: '',
  modulorela: '',
  relaUserCall: '',
  idrelaUserCall: '',
  prioridad: '',
});



const subjectInputRef = ref<InstanceType<typeof QInput> | null>(null);
const durationInput = ref<InstanceType<typeof DurationDate> | null>(null);
const relacionadoglobalInput = ref<InstanceType<typeof RelacionGlobal> | null>(
  null
);


onMounted(async () => {
  // listNumeros.value = await storeCall.getPhonesPro(
  //   props.ModuleTypeC,
  //   props.idModule
  // );

  listNumeros.value = await storeCall.getPhones(props.AccountId || '')
  listStatus.value = await storeCall.getCallStatusPro();
  listType.value = await storeCall.getCallTypePro();
  const aux1 = await <any>storeCall.getCallTypePro();
  const aux2 = await <any>storeCall.getCallStatusPro();
  data.value.estadollamada = 'Planificada';
  data.value.tipollamada = 'Saliente';
 // selects();
  if (props.idCardread != '') {
    recuperandoCall.value = await storeCall.getCallsPro(props.idCardread || '');
    dataread.value.id = recuperandoCall.value.id;
    dataread.value.asunto = recuperandoCall.value.attributes.name;
    dataread.value.telefono = recuperandoCall.value.attributes.phone_c;
    dataread.value.dateestartCall = moment(
      recuperandoCall.value.attributes.date_start
    )
      .add(4, 'h')
      .format('YYYY-MM-DD HH:mm:ss');

    dataread.value.duracionhoraCall =
      recuperandoCall.value.attributes.duration_hours;

    dataread.value.duracionminutoCall =
      recuperandoCall.value.attributes.duration_minutes;

    dataread.value.dateendCall = moment(
      recuperandoCall.value.attributes.date_end
    )
      .add(4, 'h')
      .format('YYYY-MM-DD HH:mm:ss');

    dataread.value.descripcion = recuperandoCall.value.attributes.description;
    dataread.value.modulorela = recuperandoCall.value.attributes.parent_type;
    dataread.value.idrelaUserCall = recuperandoCall.value.attributes.parent_id;
    dataread.value.prioridad = recuperandoCall.value.attributes.prioridad_c;
    dataread.value.tipollamada = aux1.find((el:{name_en:string})=> el.name_en === recuperandoCall.value.attributes.direction).name_es;
    dataread.value.estadollamada = aux2.find((el:{name_en:string})=> el.name_en === recuperandoCall.value.attributes.status).name_es;

  }
});


const changeDateC = (val: any) => {
  // console.log(val);
  duracionCall.value = val;
  data.value.dateestartCall = moment(duracionCall.value.datestart).format(
    'YYYY-MM-DD HH:mm:ss'
  );
  data.value.dateendCall = moment(duracionCall.value.dateend).format(
    'YYYY-MM-DD HH:mm:ss'
  );
  data.value.duracionhoraCall = duracionCall.value.duracionhora;
  data.value.duracionminutoCall = duracionCall.value.duracionminuto;
};

const changeDateRead = (val: any) => {
  duracionCallRead.value = val;
  dataread.value.dateestartCall = moment(
    duracionCallRead.value.datestart
  ).format('YYYY-MM-DD HH:mm:ss');
  dataread.value.dateendCall = moment(duracionCallRead.value.dateend).format(
    'YYYY-MM-DD HH:mm:ss'
  );
  dataread.value.duracionhoraCall = duracionCallRead.value.duracionhora;
  dataread.value.duracionminutoCall = duracionCallRead.value.duracionminuto;
};

const enviandoteleC = (val: any) => {
  relacionCall.value = val;
  data.value.telefono = val;
  ContactPhonesDi.value = false;
};

const changeRelaC = (val: any) => {
  relacionCall.value = val;
  data.value.relaUserCall = relacionCall.value.relaUser;
  data.value.idrelaUserCall = relacionCall.value.idrelaUser;
};

const rulesInput = async (): Promise<boolean | undefined> =>
  (await Promise.all([subjectInputRef.value?.validate()])).every(
    (input) => !!input
  );

const editList = () => {
  edit.value = true;
  bloqueado.value = false;
  emit('edit-card', edit.value);
};

const cancelEdit = () => {
  edit.value = false;
  bloqueado.value = true;
  emit('cancel-edit', edit.value);
};

const exposeData = () => {
  if (props.idCardread != '') {
    return dataread.value;
  } else {
    return data.value;
  }
};

// const openAdvancedContact = () => {
//   ContactPhonesDi.value = !ContactPhonesDi.value;
// };

// const sortList = computed(()=> {
//   return listNumeros.value.sort((el1:any, el2:any) => (el1.type > el2.type) ? 1 : 0);
// })

const emit = defineEmits<{
  (event: 'edit-card', editcar: boolean): void;
  (event: 'cancel-edit', cancelcar: boolean): void;
}>();

defineExpose({
  exposeData,
  rulesInput,
});
</script>
<template>
  <q-card class="my-card" v-if="!props.idCardread">
    <q-card-section class="row justify-between">
      <span>
        <q-icon name="call" size="sm" color="primary" /> Informacion de la
        llamada
      </span>
      <span
        ><q-checkbox
          left-label
          v-model="data.prioridad"
          size="xs"
          label="Prioridad Alta"
          color="primary"
          true-value="High"
          false-value="Short" />
        <q-icon
          name="local_fire_department"
          :color="data.prioridad == 'High' ? 'red' : 'grey-5'"
        ></q-icon
      ></span>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="row q-col-gutter-sm">
        <!-- <q-checkbox
          left-label  v-if="props.idCardread === ''"
          v-model="data.prioridad"
          label="Prioridad Alta"
          true-value="High"
        /> -->
        <!-- <pre>{{ props }}</pre>
        <pre>{{ idCardread }}</pre> -->
        <div class="col-xs-12">
          <q-input
            v-model="data.asunto"
            ref="subjectInputRef"
            type="text"
            label="Asunto"
            outlined
            dense
            color="primary"
            :rules="[(val) => !!val || 'El campo es requerido']"
          >
            <template #before>
              <q-icon name="contact_phone" />
            </template>
          </q-input>
        </div>
        <div class="col-md-12 col-xs-12">
          <q-select
            v-model="data.telefono"
            :options="listNumeros"
            label="Número"
            outlined
            dense
            options-dense
            option-value="phone"
            option-label="phone"
            transition-show="flip-up"
            transition-hide="flip-down"
            map-options
            emit-value
            color="primary"
            v-if="!manualEntry"
          >
            <template #before>
              <!-- <q-icon name="add_ic_call" /> -->
              <q-checkbox  v-model="manualEntry" dense @update:model-value="data.telefono = ''" >
                <q-tooltip>
                  Ingreso manual
                </q-tooltip>
              </q-checkbox>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" class="q-pa-sm" >
                <q-item-section avatar>
                  <q-icon name="phone_forwarded" color="primary" size="sm" />
                </q-item-section>
                <q-item-section>
                  <!-- <q-separator /> -->
                  <q-item-label >
                    <span v-if="scope.opt.country_code"> ({{ scope.opt.country_code }}) </span>
                    {{ scope.opt.phone }}
                  </q-item-label>
                  <q-item-label caption lines="2">
                   Tipo: {{ scope.opt.type }} | Nombre: {{ scope.opt.name }}
                  </q-item-label>

                </q-item-section>
                <q-item-section side >
                  <q-icon name="mobile_friendly" color="positive" v-if="scope.opt.primary_item == '1'" />
                  <q-icon name="fa-brands fa-whatsapp" color="positive"  v-if="scope.opt.whatsapp == '1'"/>
                </q-item-section>
              </q-item>
            </template>

          </q-select>
          <q-input v-model="data.telefono" type="text" label="Número"  dense outlined v-else >
            <template #before>
              <q-checkbox  v-model="manualEntry" dense  @update:model-value="data.telefono = ''">
                <q-tooltip>
                  Ingreso manual
                </q-tooltip>
              </q-checkbox>
            </template>
          </q-input>
        </div>
        <!-- <div class="col-xs-12">
          <q-input
            v-model="data.numeroContact"
            label="Numero de Contacto"
            type="text"
            outlined
            dense
            color="primary"
            readonly
            visible="false"
            v-if="!data.numeroContact"
          >
            <template #before>
              <q-icon name="phone_forwarded" />
            </template>
          </q-input>
        </div> -->
        <div class="col-md-6 col-xs-12">
          <q-select
            v-model="data.tipollamada"
            :options="listType"
            label="Tipo de llamada"
            outlined
            dense
            options-dense
            option-value="value"
            option-label="name_es"
            transition-show="flip-up"
            transition-hide="flip-down"
            color="primary"
          >
            <template #before>
              <q-icon name="settings_phone" />
            </template>
          </q-select>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-select
            v-model="data.estadollamada"
            :options="listStatus"
            label="Estado"
            dateinpu
            outlined
            dense
            options-dense
            option-value="value"
            option-label="name_es"
            transition-show="flip-up"
            transition-hide="flip-down"
            color="primary"
          >
            <!-- <template #before>
              <q-icon name="manage_accounts" />
            </template> -->
          </q-select>
        </div>

        <component
          :is="DurationDate"
          ref="durationInput"
          @changeDate="changeDateC"
          durationselect
        >
        </component>
        <component
          :is="RelacionGlobal"
          ref="relacionadoglobalInput"
          :idModuleC="idModule"
          :ModuleTypeR="props.ModuleTypeC"
          :bloquear="bloqueadoRela"
          @changeRela="changeRelaC"
        >
        </component>

        <div class="col-xs-12">
          <q-input
            v-model="data.descripcion"
            type="textarea"
            label="Descripción"
            outlined
            color="primary"
            dense
          >
            <template #before>
              <q-icon name="description" />
            </template>
          </q-input>
        </div>
        <!-- <pre>{{ data }}</pre> -->
      </div>
    </q-card-section>
    <q-separator inset />
  </q-card>
  <!-- -------------------------------PARA LA LEER LOS DATOS ----------------------------------->
  <q-card class="my-card" v-else>
    <q-card-section class="row justify-between">
      <span>
        <q-icon name="call" size="sm" color="primary" /> Información de la
        llamada
      </span>
      <!-- <q-label> {{ id_pro }}</q-label> -->
      <!-- <span
        ><q-checkbox
          left-label
          v-model="dataread.prioridad"
          size="xs"
          label="Prioridad Alta"
          color="primary"
          true-value="High"
          false-value="Low" />
        <q-icon
          name="local_fire_department"
          :color="data.prioridad == 'High' ? 'red' : 'grey-5'"
        ></q-icon
      ></span> -->
      <q-btn
        size="10px"
        flat
        dense
        icon="mode_edit"
        class="float-right"
        :color="!$q.dark.isActive ? 'grey-8' : 'white'"
        @click="editList"
        v-if="!edit"
      >
        <q-tooltip>Editar</q-tooltip>
      </q-btn>
      <q-btn
        v-else
        size="10px"
        flat
        dense
        icon="cancel"
        class="float-right"
        :color="!$q.dark.isActive ? 'grey-8' : 'white'"
        @click="cancelEdit"
      >
        <q-tooltip>Cancelar</q-tooltip>
      </q-btn>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="row q-col-gutter-sm">
        <span
          ><q-checkbox
            left-label
            v-model="dataread.prioridad"
            size="xs"
            label="Prioridad Alta"
            color="primary"
            true-value="High"
            false-value="Short"
            :disable="bloqueado" />
          <q-icon
            name="local_fire_department"
            :color="data.prioridad == 'High' ? 'red' : 'grey-5'"
          ></q-icon
        ></span>
        <!-- <q-checkbox
          left-label
          v-model="data.prioridad"
          label="Prioridad Alta"
          true-value="High"
        /> -->

        <div class="col-xs-12">
          <q-input
            v-model="dataread.asunto"
            ref="subjectInputRef"
            type="text"
            label="Asunto"
            outlined
            dense
            color="primary"
            :rules="[(val) => !!val || 'El campo es requerido']"
            :readonly="bloqueado"
          >
            <template #before>
              <q-icon name="contact_phone" />
            </template>
          </q-input>
        </div>
        <div class="col-md-12 col-xs-12">
          <q-select
            v-model="dataread.telefono"
            :options="listNumeros"
            label="Número"
            outlined
            dense
            option-value="phone"
            option-label="phone"
            transition-show="flip-up"
            transition-hide="flip-down"
            map-options
            emit-value
            color="primary"
            :readonly="bloqueado"
          >
            <template #before>
              <q-icon name="add_ic_call" />
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" class="q-pa-sm" >
                <q-item-section avatar>
                  <q-icon name="phone_forwarded" color="primary" size="sm" />
                </q-item-section>
                <q-item-section>
                  <!-- <q-separator /> -->
                  <q-item-label >
                    <span v-if="scope.opt.country_code"> ({{ scope.opt.country_code }}) </span>
                    {{ scope.opt.phone }}
                  </q-item-label>
                  <q-item-label caption lines="2">
                   Tipo: {{ scope.opt.type }} | Nombre: {{ scope.opt.name }}
                  </q-item-label>

                </q-item-section>
                <q-item-section side >
                  <q-icon name="mobile_friendly" color="positive" v-if="scope.opt.primary_item == '1'" />
                  <q-icon name="fa-brands fa-whatsapp" color="positive"  v-if="scope.opt.whatsapp == '1'"/>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-select
            v-model="dataread.tipollamada"
            :options="listType"
            label="Tipo de llamada"
            outlined
            dense
            options-dense
            option-value="value"
            option-label="name_es"
            transition-show="flip-up"
            transition-hide="flip-down"
            color="primary"
            :readonly="bloqueado"
          >
            <template #before>
              <q-icon name="settings_phone" />
            </template>
          </q-select>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-select
            v-model="dataread.estadollamada"
            :options="listStatus"
            label="Estado"
            dateinpu
            outlined
            dense
            options-dense
            option-value="value"
            option-label="name_es"
            transition-show="flip-up"
            transition-hide="flip-down"
            color="primary"
            :readonly="bloqueado"
          >
            <!-- <template #before>
              <q-icon name="manage_accounts" />
            </template> -->
          </q-select>
        </div>
        <component
          :is="DurationDate"
          ref="durationInput"
          @changeDateR="changeDateRead"
          durationselect
          :data="dataread"
          :bloquear="bloqueado"
          :idCard="props.idCardread"
        >
        </component>
        <component
          :is="RelacionGlobal"
          ref="relacionadoglobalInput"
          :idModuleC="idModule"
          :ModuleTypeR="props.ModuleTypeC"
          @changeRela="changeRelaC"
          :bloquear="bloqueadoRela"
        >
        </component>

        <div class="col-xs-12">
          <q-input
            v-model="dataread.descripcion"
            type="textarea"
            label="Descripción"
            outlined
            color="primary"
            dense
            :readonly="bloqueado"
          >
            <template #before>
              <q-icon name="description" />
            </template>
          </q-input>
        </div>
        <!-- <pre>{{ dataread }}</pre> -->
      </div>
    </q-card-section>
    <q-separator inset />
  </q-card>
  <ContactPhones
    v-model="ContactPhonesDi"
    :idCall="props.idModule"
    :buscarConta="ContactPhonesDi"
    :selected="[]"
    @enviandotele="enviandoteleC"
  />
</template>

<style lang="scss" scoped></style>
