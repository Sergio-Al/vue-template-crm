<script lang="ts" setup>
import { ref } from 'vue';
import { CertificationDB, User } from '../../utils/types';
import { getUsers } from '../../services/useCertificationsService';

interface Props {
  id: string;
}

const inputData = ref({} as CertificationDB);
const users = ref<User[] | undefined>(undefined);

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

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

const removeSolicitante = () => {
  inputData.value.user_id_c = '';
};

const props = defineProps<Props>();
</script>
<template>
  <view-card-component
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    v-bind="$attrs"
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
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Participación como"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Razón social"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Dirección"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Resolución ministerial"
          outlined
          dense
          readonly
        >
        </q-input>

        <q-input
          v-model="inputData.user_id1_c"
          class="col-12 col-sm-6"
          label="Personal acreditado"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.user_id1_c"
          class="col-12 col-sm-6"
          label="Nro de matrícula"
          outlined
          dense
          readonly
        >
        </q-input>
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
        <q-input
          v-model="inputData.date_entered"
          class="col-12 col-sm-6"
          label="Fecha"
          outlined
          dense
          type="date"
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Participación como"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Razón social"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Dirección"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.hance_empresa_id_c"
          class="col-12 col-sm-6"
          label="Resolución ministerial"
          outlined
          dense
          readonly
        >
        </q-input>

        <q-input
          v-model="inputData.user_id1_c"
          class="col-12 col-sm-6"
          label="Personal acreditado"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.user_id1_c"
          class="col-12 col-sm-6"
          label="Nro de matrícula"
          outlined
          dense
          readonly
        >
        </q-input>
      </div>
    </template>
  </view-card-component>
</template>
