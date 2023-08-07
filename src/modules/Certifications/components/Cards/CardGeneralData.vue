<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import {
  CertificacionBody,
  EmpresaParticipacion,
  User,
} from '../../utils/types';
import {
  getUsers,
  getParticipants,
} from '../../services/useCertificationsService';

import { useDivision } from 'src/composables/useLanguage';
import { ViewCard } from 'src/modules/Accounts/components';

interface Props {
  id: string;
  data: CertificacionBody;
}

const { getListDivisiones, listDivisiones } = useDivision();

const props = defineProps<Props>();

const inputData = ref({ ...props.data } as CertificacionBody);
const inputParticipant = ref({} as EmpresaParticipacion);
const users = ref<User[] | undefined>(undefined);
const participants = ref<EmpresaParticipacion[] | undefined>(undefined);
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

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

const filterParticipante = async (
  val: string,
  update: (callback: () => void) => void,
  abort: () => void
) => {
  update(async () => {
    console.log('here');
    if (val === '') {
      if (!!participants.value && participants.value.length > 0) return;
      participants.value = [];
    } else {
      const term = val;
      const response = await getParticipants(term);
      participants.value = response;
    }
  });
};

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

onMounted(async () => {
  await getListDivisiones();
});

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Partial<CertificacionBody> => ({
    user_id_c: inputData.value.user_id_c,
    date_entered: inputData.value.date_entered,
    hance_empresa_id_c: inputData.value.hance_empresa_id_c,
    iddivision_c: inputData.value.iddivision_c,
    idamercado_c: inputData.value.idamercado_c,
  }),
});
</script>
<template>
  <view-card-component
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    v-bind="$attrs"
    ref="baseCardRef"
    icon-name="info"
    title="Información"
  >
    <template #edit>
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-select
          :hint="!!inputData.user_id_c ? 'usuario Seleccionado' : ''"
          :options="users"
          @filter-abort="abortFilterFn"
          @filter="filterFn"
          class="col-12 col-sm-6"
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
          type="date"
        >
        </q-input>
        <q-select
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
        </q-select>
        <q-input
          v-model="inputParticipant.razon_social_c"
          class="col-12 col-sm-6"
          label="Razón social"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputParticipant.direccion_c"
          class="col-12 col-sm-6"
          label="Dirección"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputParticipant.resolucion_ministerial_c"
          class="col-12 col-sm-6"
          label="Resolución ministerial"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-select
          class="col-12 col-sm-6"
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
      </div>
    </template>
    <template #read>
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-select
          :hint="!!inputData.user_id_c ? 'usuario Seleccionado' : ''"
          :options="users"
          @filter-abort="abortFilterFn"
          @filter="filterFn"
          class="col-12 col-sm-6"
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
        <q-select
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
          readonly
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
        </q-select>
        <q-input
          v-model="inputParticipant.razon_social_c"
          class="col-12 col-sm-6"
          label="Razón social"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputParticipant.direccion_c"
          class="col-12 col-sm-6"
          label="Dirección"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputParticipant.resolucion_ministerial_c"
          class="col-12 col-sm-6"
          label="Resolución ministerial"
          outlined
          dense
          readonly
        >
        </q-input>

        <q-select
          class="col-12 col-sm-6"
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
      </div>
    </template>
  </view-card-component>
</template>
