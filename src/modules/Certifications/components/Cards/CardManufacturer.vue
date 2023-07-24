<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref, onMounted } from 'vue';

import ViewCard from 'src/components/MainCard/ViewCard.vue';
import CardRelationManufacturer from './CardRelationManufacturer.vue';
import ContactRelationCard from 'src/modules/Leads/components/Cards/ContactRelationCard.vue';
import CardRelationManufacturerAlt from './CardRelationManufacturerAlt.vue';

import {
  Certification,
  CertificationDB,
  Manufacturer,
} from '../../utils/types';
import {
  getManufacturer,
  getManufacturerContact,
} from '../../services/useCertificationsService';

// eliminar dummyData al capturar del backend
import { manufacturers, manufacturerContactsData } from '../../utils/dummyData';
import CardRelationContact from './CardRelationContact.vue';

interface Props {
  id: string;
  data: Partial<CertificationDB>;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({ hance_empresa_id_c: '' }),
});

const $q = useQuasar();
//const { userCRM, getCompany } = useCompany();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const cardRelationManufacturerRef = ref<InstanceType<
  typeof CardRelationManufacturer
> | null>(null);
const cardRelationContactRef = ref<InstanceType<
  typeof CardRelationContact
> | null>(null);

const inputData = ref({ ...props.data });
const test = ref('');

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
  inputData.value.correo_fabricante_c = manufacturer?.email || '';
  inputData.value.telefono_fabricante_c = manufacturer?.phone || '';
  // en otro caso buscar por servicio
  manufacturerContacts.value = manufacturerContactsData.filter(
    (contact) => contact.parentId === id
  );
};

const removeManufacturer = () => {
  inputData.value.fabricante_c = '';
};

const restoreValues = () => {
  if (props.data) inputData.value = { ...props.data };
};

const manufacturerSelected = (data: Manufacturer) => {
  inputData.value.correo_fabricante_c = data.email1;
  inputData.value.telefono_fabricante_c = data.phone_office;
};

const reset = () => {
  // cardRelationManufacturerRef.value?.reset();
};

onMounted(async () => {
  if (!!props.id) {
    if (!!inputData.value.hance_empresa_id_c) {
      const manufacturerSelected = await getManufacturer(
        inputData.value.hance_empresa_id_c
      );
      manufacturersList.value = [manufacturerSelected];
    }
    if (!!inputData.value.user_id1_c) {
      const contact = await getManufacturerContact(inputData.value.user_id1_c);
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
        <div class="col-12">
          <CardRelationManufacturer
            ref="cardRelationManufacturerRef"
            v-model:id="inputData.hance_empresa_id_c"
            module-name="Fabricante"
            edit-mode
            error-message="Se necesita un fabricante"
            @assigned="manufacturerSelected"
          />
        </div>
        <div class="col-12">
          <CardRelationContact
            ref="cardRelationContactRef"
            v-model:id="inputData.contact_fabricante_c"
            module-name="Contacto"
            edit-mode
            @update:id="reset"
            error-message="Se necesita un contacto"
          />
        </div>
        <!-- <q-select
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
          v-model="inputData.id_fabricante_c"
          @update:model-value="assignManufacturerInfo"
        >
          <template #append>
            <q-btn
              v-if="!!inputData.id_fabricante_c"
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
        </q-select> -->
        <!-- <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          v-model="inputData.id_contacto_fabricante_c"
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
        </q-select> -->
        <q-input
          v-model="inputData.correo_fabricante_c"
          type="text"
          class="col-12 col-sm-6"
          label="Correo"
          outlined
          dense
        >
        </q-input>
        <q-input
          v-model="inputData.telefono_fabricante_c"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
        >
        </q-input>
      </div>
    </template>
    <template #read>
      <!-- Modo lectura -->
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <div class="col-12">
          <CardRelationManufacturer
            ref="cardRelationManufacturerRef"
            v-model:id="inputData.hance_empresa_id_c"
            module-name="Fabricante"
            error-message="Se necesita un fabricante"
            @assigned="manufacturerSelected"
          />
        </div>
        <div class="col-12">
          <CardRelationContact
            ref="cardRelationContactRef"
            v-model:id="inputData.contact_fabricante_c"
            module-name="Contacto"
            @update:id="reset"
            error-message="Se necesita un contacto"
          />
        </div>
        <q-input
          v-model="inputData.correo_fabricante_c"
          type="text"
          class="col-12 col-sm-6"
          label="Correo"
          outlined
          dense
          readonly
        >
        </q-input>
        <q-input
          v-model="inputData.telefono_fabricante_c"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono"
          outlined
          dense
          readonly
        >
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
