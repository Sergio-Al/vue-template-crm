<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuasar, QPopupProxy } from 'quasar';
import moment from 'moment';

import ViewCard from 'src/components/MainCard/ViewCard.vue';
import { getUsers, getUser } from '../../services/useCertificationsService';

import { Certification, User } from '../../utils/types';

// obtener data del repositorio de mongoDB y borrar este import
import {
  useDivAreaMercado,
  useDivision,
  useGrupoCliente,
  useRegionales,
} from 'src/composables/useLanguage';
//import { amercado, divisions, regional } from '../../utils/dummyData';

interface Props {
  id: string;
  data: Certification;
}

const { getListDivisiones, listDivisiones } = useDivision();
const { getRegionales, listRegionales } = useRegionales();

const props = defineProps<Props>();
const $q = useQuasar();

//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const dateRef = ref<InstanceType<typeof QPopupProxy> | null>(null);

const inputData = ref({ ...props.data });
  inputData.value.iddivision_c = '04';

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
      const term = val;
      const response = await getUsers(term);
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

const listDivision = ref([]);
const listAreaMercado = ref([]);
const listRegional = ref([]);

onMounted(async () => {
  // buscar solicitante y asignar a users[] (options)
  if (!!inputData.value.user_id_c) {
    if (!!props.id) {
      const response = await getUser(inputData.value.user_id_c);
      console.log(response);
      users.value = [response];
    }
  }
  await getListDivisiones();
  listDivision.value = listDivisiones.value;
  listAreaMercado.value = await useDivAreaMercado(inputData.value.iddivision_c);
  await getRegionales();
  const aux = await listRegionales.value.find(
    (element: any) => element.cod_pais == 'BO'
  );
  listRegional.value = aux.regiones;
  console.log(listRegional.value);
});

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Certification => ({ ...inputData.value }),
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
          :options="listDivision"
          type="text"
          label="División"
          option-value="value"
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
          :options="listAreaMercado"
          type="text"
          label="Área de mercado"
          option-value="value"
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
          option-value="value"
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
          :options="listAreaMercado"
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
          :options="listDivision"
          type="text"
          label="División"
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
          v-model="inputData.idregional_c"
          :options="listRegional"
          type="text"
          label="Regional"
          option-value="value"
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
