<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuasar, QPopupProxy } from 'quasar';
import moment from 'moment';

import ViewCard from 'src/components/MainCard/ViewCard.vue';
import { getUsers, getUser } from '../../services/useCertificationsService';

import { CertificationDB, CertificationRequest, User } from '../../utils/types';
import { userStore } from 'src/modules/Users/store/UserStore';

// obtener data del repositorio de mongoDB y borrar este import
import {
  useDivAreaMercado,
  useDivision,
  useRegionales,
} from 'src/composables/useLanguage';
//import { user } from '../../utils/dummyData';
//import { amercado, divisions, regional } from '../../utils/dummyData';

interface Props {
  id: string;
  data: Partial<CertificationRequest>;
}

const { getListDivisiones, listDivisiones } = useDivision();
const { getRegionales, listRegionales } = useRegionales();
const { userCRM } = userStore();

const props = defineProps<Props>();
const $q = useQuasar();

//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const dateRef = ref<InstanceType<typeof QPopupProxy> | null>(null);

const inputData = ref({ ...props.data });
//inputData.value.iddivision_c = '';
//inputData.value.user_id_c = '5c19df6d-0cf0-6e23-7c01-629fb9d01588';

let users = ref<any[] | undefined>(undefined);

//* Methods
const restoreValues = async () => {
  if (props.data) inputData.value = { ...props.data };
  await formatData();
};

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
      const response = await getUsers(val);
      console.log(response);
      users.value = response;
      //users.value = [{ id: '1', fullname: 'Dan dd' }];
      //console.log(users.value);
    }
  });
};

const formatData = async () => {
  if (!!inputData.value.date_entered) {
    inputData.value.date_entered = moment(inputData.value.date_entered).format(
      'YYYY-MM-DD'
    );
  }
}

onMounted(async () => {
  await getListDivisiones();
  await getRegionales();
  divisionList.value = listDivisiones.value;

  //console.log(divisionList.value);

  if (!!props.id) {
    inputData.value.date_entered = inputData.value.date_entered?.substring(0,10);
  } else {
    if (userCRM) {
      //console.log(userCRM);
      const { id, nombres, apellidos, iddivision, idamercado, idregional } =
        userCRM;
      inputData.value.user_id_c = id;
      inputData.value.user_id = id;
      users.value = [{ id, fullname: `${nombres} ${apellidos}` }];
      //valores por defecto aqui
      inputData.value.idamercado_c = idamercado;
      inputData.value.iddivision_c = iddivision;
      //inputData.value.idregional_c=idregional;
      inputData.value.idregional_c = '';
      inputData.value.date_entered = new Date().toISOString().substring(0, 10);
    }
  }

  // buscar solicitante y asignar a users[] (options)
  // if (!!inputData.value.user_id_c) {
  //   if (!!props.id) {
  //     const response:any = await getUser(inputData.value.user_id_c);
  //     users.value = [response[0]];
  //   }
  //   // const response = await getUser(inputData.value.user_id_c);
  //   //   console.log(response);
  //   //   users.value = [response];
  // }

  //listAreaMercado.value = await useDivAreaMercado(inputData.value.iddivision_c);

  const aux:any = listRegionales.value.find(
    (element: any) => element.cod_pais == 'BO'
  );

  listRegional.value = aux.regiones;
  // console.log(listRegional.value);
});

const closeDate = () => {
  dateRef.value?.hide();
};

const removeSolicitante = () => {
  inputData.value.user_id_c = '';
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

const divisionList = ref([]);
//let listAreaMercado = ref({});
const listRegional = ref([]);

onMounted(async () => {
  await getListDivisiones();
  await getRegionales();
  await formatData();

  console.log(props);
});

const amercadoList = computed(() => {

  const result: any = divisionList.value.filter(
    (element: any) => element.cod_div == inputData.value.iddivision_c
  );
  const aux = { ...result[0] };
  return aux.amercado;
});

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Partial<CertificationRequest> => ({
    user_id_c: inputData.value.user_id_c,
    user_id : userCRM.id,
    date_entered: inputData.value.date_entered,
    iddivision_c: inputData.value.iddivision_c,
    idamercado_c: inputData.value.idamercado_c,
    idregional_c: inputData.value.idregional_c,
  }),
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
      <!-- Modo edicion -->
      <div class="row q-col-gutter-md q-px-sm q-py-sm">
        <!--<q-select
          :hint="!!inputData.user_id_c ? 'usuario Seleccionado' : ''"
          :options="users"
          @filter-abort="abortFilterFn"
          @filter="filterFn"
          class="col-12 col-sm-12"
          dense
          emit-value
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="500"
          label="Solicitante"
          map-options
          option-label="fullname"
          option-value="id"
          outlined
          use-chips
          use-input
          v-model="inputData.user_id_c"
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
                  >Email: {{ scope.opt.email_address }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>-->

        <q-input
          v-model="inputData.date_entered"
          class="col-12 col-sm-6 q-py-md"
          label="Fecha"
          outlined
          dense
          :rules="[(value: string) => !!value || 'Campo requerido']"
          type="date"
        >
        </q-input>
        <q-select
          class="col-12 col-sm-6 q-py-md"
          outlined
          dense
          v-model="inputData.iddivision_c"
          :options="divisionList"
          type="text"
          label="División"
          option-value="cod_div"
          option-label="label"
          emit-value
          map-options
        >
        </q-select>
        <q-select
          class="col-12 col-sm-6 q-py-xs"
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
        </q-select>
        <q-select
          class="col-12 col-sm-6 q-py-xs"
          outlined
          dense
          v-model="inputData.idregional_c"
          :options="listRegional"
          type="text"
          label="Regional"
          option-value="cod_region"
          option-label="label"
          emit-value
          map-options
        >
        </q-select>
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <!--<q-select
          :hint="!!inputData.user_id_c ? 'usuario Seleccionado' : ''"
          :options="users"
          @filter-abort="abortFilterFn"
          @filter="filterFn"
          class="col-12 col-sm-12"
          dense
          emit-value
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="500"
          label="Solicitante"
          map-options
          option-label="fullname"
          option-value="id"
          outlined
          use-chips
          use-input
          v-model="inputData.user_id_c"
          readonly
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
                <q-item-label>{{ scope.opt.fullname }}</q-item-label>
                <q-item-label caption
                  >Email: {{ scope.opt.email_address }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      -->
        <q-input
          v-model="inputData.date_entered"
          class="col-12 col-sm-6"
          label="Fecha"
          outlined
          dense
          readonly
          type="date"
        >
        </q-input>        
        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          v-model="inputData.iddivision_c"
          :options="divisionList"
          type="text"
          label="División"
          option-value="cod_div"
          option-label="label"
          emit-value
          map-options
          readonly
        >
        </q-select>
        <q-select
          class="col-12 col-sm-6"
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
          readonly
        >
        </q-select>

        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          v-model="inputData.idregional_c"
          :options="listRegional"
          type="text"
          label="Regional"
          option-value="cod_region"
          option-label="label"
          emit-value
          map-options
          readonly
        >
        </q-select>
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
