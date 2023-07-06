<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref, onMounted } from 'vue';

import ViewCard from 'src/components/MainCard/ViewCard.vue';

import { Certification } from '../../utils/types';
import {
  getManufacturer,
  getManufacturerContact,
} from '../../services/useCertificationsService';

// eliminar dummyData al capturar del backend
import { manufacturers, manufacturerContactsData } from '../../utils/dummyData';

interface Props {
  id: string;
  data: Partial<Certification>;
}

const props = defineProps<Props>();
const $q = useQuasar();
//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

const inputData = ref({ ...props.data });

const manufacturersList = ref([]);
const manufacturerContacts = ref([]);

//* Methods
const filterFn = async (
  val: string,
  update: (callback: () => void) => void,
  abort: () => void
) => {
  update(async () => {
    if (val === '') {
      if (!!manufacturersList.value && manufacturersList.value.length > 0)
        return;
      manufacturersList.value = [];
    } else {
      const term = val;
      // const response = await getUsers(term);
      // users.value = response;
      manufacturersList.value = manufacturers;
      console.log(manufacturersList.value);
    }
  });
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
};

const assignManufacturerInfo = (id: string) => {
  const manufacturer = manufacturers.find((m) => m.id === id);
  inputData.value.empresa_email = manufacturer?.email || '';
  inputData.value.empresa_phone = manufacturer?.phone || '';
  // en otro caso buscar por servicio
  manufacturerContacts.value = manufacturerContactsData.filter(
    (contact) => contact.parentId === id
  );
};

const removeManufacturer = () => {
  inputData.value.id_empresa = '';
};

const restoreValues = () => {
  if (props.data) inputData.value = { ...props.data };
};

onMounted(async () => {
  if (!!props.id) {
    if (!!inputData.value.id_empresa) {
      const manufacturerSelected = await getManufacturer(
        inputData.value.id_empresa
      );
      manufacturersList.value = [manufacturerSelected];
    }
    if (!!inputData.value.id_profesional_acreditado) {
      const contact = await getManufacturerContact(
        inputData.value.id_profesional_acreditado
      );
      manufacturerContacts.value = [contact];
    }
  }
});

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Partial<Certification> => ({ ...inputData.value }),
});
</script>

<template>
  <view-card-component
    v-bind="$attrs"
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    icon-name="precision_manufacturing"
    ref="baseCardRef"
    title="Fabricante"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
  >
    <template #edit>
      <!-- Modo edicion -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-select
          :hint="!!inputData.id_empresa ? 'Empresa seleccionada' : ''"
          :options="manufacturersList"
          @filter-abort="abortFilterFn"
          @filter="filterFn"
          class="col-12 col-sm-6"
          dense
          emit-value
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="500"
          label="Nombre"
          map-options
          option-label="name"
          option-value="id"
          outlined
          use-chips
          use-input
          v-model="inputData.id_empresa"
          @update:model-value="assignManufacturerInfo"
        >
          <template #prepend>
            <q-icon name="work" />
          </template>
          <template #append>
            <q-btn
              v-if="!!inputData.id_empresa"
              color="primary"
              size="sm"
              rounded
              icon="remove"
              flat
              dense
              @click="removeManufacturer"
            />
          </template>

          <template #no-option>
            <span class="text-grey-8 q-pa-lg">Sin opciones</span>
          </template>

          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon name="work" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label caption
                  >Email: {{ scope.opt.email }}</q-item-label
                >
                <q-item-label caption
                  >Teléfono: {{ scope.opt.phone }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          v-model="inputData.id_profesional_acreditado"
          :options="manufacturerContacts"
          type="text"
          label="Contacto"
          option-value="id"
          option-label="name"
          emit-value
          map-options
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-select>
        <q-input
          v-model="inputData.empresa_email"
          type="text"
          class="col-12 col-sm-6"
          label="Correo"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.empresa_phone"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="call" />
          </template>
        </q-input>
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-select
          :hint="!!inputData.id_empresa ? 'Empresa seleccionada' : ''"
          :options="manufacturersList"
          class="col-12 col-sm-6"
          dense
          emit-value
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="500"
          label="Nombre"
          map-options
          option-label="name"
          option-value="id"
          outlined
          use-chips
          use-input
          v-model="inputData.id_empresa"
          readonly
        >
          <template #prepend>
            <q-icon name="work" />
          </template>

          <template #no-option>
            <span class="text-grey-8 q-pa-lg">Sin opciones</span>
          </template>

          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon name="work" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label caption
                  >Email: {{ scope.opt.email }}</q-item-label
                >
                <q-item-label caption
                  >Teléfono: {{ scope.opt.phone }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          v-model="inputData.id_profesional_acreditado"
          :options="manufacturerContacts"
          type="text"
          label="Contacto"
          option-value="id"
          option-label="name"
          emit-value
          map-options
          hide-dropdown-icon
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-select>
        <q-input
          v-model="inputData.empresa_email"
          type="text"
          class="col-12 col-sm-6"
          label="Correo"
          outlined
          dense
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          v-model="inputData.empresa_phone"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="call" />
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
