<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuasar, QPopupProxy } from 'quasar';

import ViewCard from 'src/components/MainCard/ViewCard.vue';
import { getUsers } from '../../services/useCertificationsService';

import { Certification, User } from '../../utils/types';

// obtener data del repositorio de mongoDB y borrar este import
import { amercado, divisions, regional } from '../../utils/dummyData';

interface Props {
  id: string;
  data: Certification;
}

const props = defineProps<Props>();
const $q = useQuasar();
//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const dateRef = ref<InstanceType<typeof QPopupProxy> | null>(null);

const inputData = ref({ ...props.data });

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
      // const response = await getUsers(term);
      // users.value = response;
      users.value = [{ id: '1', fullname: 'Dan dd' }];
      console.log(users.value);
    }
  });
};

const closeDate = () => {
  dateRef.value?.hide();
};

const removeSolicitante = () => {
  inputData.value.id_solicitante = '';
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

onMounted(() => {
  // buscar solicitante y asignar a users[]
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
          :hint="!!inputData.id_solicitante ? 'usuario Seleccionado' : ''"
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
          v-model="inputData.id_solicitante"
        >
          <template #prepend>
            <q-icon name="person" />
          </template>
          <template #append>
            <q-btn
              v-if="!!inputData.id_solicitante"
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
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
                ref="dateRef"
              >
                <q-date
                  @update:model-value="closeDate"
                  v-model="inputData.date_entered"
                  mask="DD/MM/YYYY"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          v-model="inputData.idamercado_c"
          :options="amercado"
          type="text"
          label="Área de mercado"
          option-value="value"
          option-label="label"
          emit-value
          map-options
        >
          <template v-slot:prepend>
            <q-icon name="storefront" />
          </template>
        </q-select>
        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          v-model="inputData.iddivision_c"
          :options="divisions"
          type="text"
          label="División"
          option-value="value"
          option-label="label"
          emit-value
          map-options
        >
          <template v-slot:prepend>
            <q-icon name="store" />
          </template>
        </q-select>
        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          v-model="inputData.idregional_c"
          :options="regional"
          type="text"
          label="Regional"
          option-value="value"
          option-label="label"
          emit-value
          map-options
        >
          <template v-slot:prepend>
            <q-icon name="flag" />
          </template>
        </q-select>
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.id_solicitante"
          type="text"
          class="col-12 col-sm-12"
          label="Solicitante"
          outlined
          dense
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.date_entered"
          type="text"
          class="col-12 col-sm-6"
          label="Fecha"
          outlined
          dense
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.idamercado_c"
          type="text"
          class="col-12 col-sm-6"
          label="Área de mercado"
          outlined
          dense
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="storefront" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.iddivision_c"
          type="text"
          class="col-12 col-sm-6"
          label="División"
          outlined
          dense
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="store" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.idregional_c"
          type="text"
          class="col-12 col-sm-6"
          label="Regional"
          outlined
          dense
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="flag" />
          </template>
        </q-input>
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
