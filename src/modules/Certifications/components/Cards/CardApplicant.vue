<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuasar, QPopupProxy } from 'quasar';
import moment from 'moment';

import ViewCard from 'src/components/MainCard/ViewCard.vue';
import { getUsers, getUser } from '../../services/useCertificationsService';

import { Certification, CertificationDB, User } from '../../utils/types';
import { userStore } from 'src/modules/Users/store/UserStore';


// obtener data del repositorio de mongoDB y borrar este import
import {
  useDivAreaMercado,
  useDivision,
  useGrupoCliente,
  useRegionales,
} from 'src/composables/useLanguage';
import { user } from '../../utils/dummyData';
//import { amercado, divisions, regional } from '../../utils/dummyData';

interface Props {
  id: string;
  data: Partial<CertificationDB>;
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
inputData.value.iddivision_c = '04';
//inputData.value.user_id_c = '5c19df6d-0cf0-6e23-7c01-629fb9d01588';

const users = ref<User[] | undefined>(undefined);

//* Methods
const restoreValues = () => {
  if (props.data) inputData.value = { ...props.data };
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
      users.value = response;
      //users.value = [{ id: '1', fullname: 'Dan dd' }];
      console.log(users.value);
    }
  });
};

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
  divisionList.value = listDivisiones.value;

  //console.log(divisionList.value);

  if(!!props.id){

  }
  else{
    if(userCRM){
      console.log(userCRM);
      const {id, nombres, apellidos, iddivision, idamercado, idregional} = userCRM;
      inputData.value.user_id_c = id;
      users.value = 
        [
          {id, fullname:`${nombres} ${apellidos}`}
        ]
      ;
      //valores por defecto aqui
      inputData.value.idamercado_c=idamercado;
      inputData.value.iddivision_c=iddivision;
      //inputData.value.idregional_c=idregional;
      inputData.value.idregional_c='';
    }
     inputData.value.date_entered = new Date().toISOString().substring(0,10);
  }

  console.log(inputData.value);

  
  // buscar solicitante y asignar a users[] (options)
  // if (!!inputData.value.user_id_c) {
  //   if (!!props.id) {
  //     const response = await getUser(inputData.value.user_id_c);
  //     console.log(response);
  //     users.value = [response];
  //   }
  //   // const response = await getUser(inputData.value.user_id_c);
  //   //   console.log(response);
  //   //   users.value = [response];
  // }


  //listAreaMercado.value = await useDivAreaMercado(inputData.value.iddivision_c);
  await getRegionales();
  const aux = await listRegionales.value.find(
    (element: any) => element.cod_pais == 'BO'
  );
  listRegional.value = aux.regiones;
  console.log(listRegional.value);
});

const amercadoList = computed(() => {
  // if (types_doc.value.length === 0) return [];
  // return types_doc.value.filter((r: any) =>
  //   r.value.toLowerCase().includes(dataConcat.toLowerCase())
  // );
  // divisionList
  //console.log('division seleccionada' +inputData.value.iddivision_c);
  //console.log('listado de divisiones' +divisionList.value);
  //inputData.value.idamercado_c = '';
  const result: any = divisionList.value.filter(
    (element: any) => element.cod_div == inputData.value.iddivision_c
  );
  const aux = { ...result[0] };
  //console.log(a.value[0].amercado);
  return aux.amercado;
  //return a;
});

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Partial<CertificationDB> => ({ ...inputData.value }),
});
</script>

<template>
  <view-card-component
    v-bind="$attrs"
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    icon-name="info"
    ref="baseCardRef"
    title="Solicitante"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
  >
    <template #edit>
      <!-- Modo edicion -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-select
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
                  >Email: {{ scope.opt.email_address }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          v-model="inputData.date_entered"
          class="col-12 col-sm-6"
          label="Fecha"
          outlined
          dense
          :rules="[(value: string) => !!value || 'Campo requerido']"
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
        >
        </q-select>
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-select
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
        <q-input
          v-model="inputData.date_entered"
          class="col-12 col-sm-6"
          label="Fecha"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          v-model="inputData.idamercado_c"
          :options="amercadoList"
          type="text"
          label="Área de mercado"
          option-value="value"
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
