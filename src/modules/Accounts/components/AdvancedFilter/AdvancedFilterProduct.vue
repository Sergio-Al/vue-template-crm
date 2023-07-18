<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { useQuasar } from 'quasar';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
import { getRecordModuleInfo } from 'src/services/GlobalService';

import { getProducts } from 'src/modules/Certifications/services/useCertificationsService';

import { Product } from 'src/modules/Certifications/utils/types';

const $q = useQuasar();

// const props = defineProps(['account_id']);
const props = withDefaults(
  defineProps<{
    persistent?: boolean;
    title?: string;
    altAccountId?: string;
  }>(),
  {
    persistent: false,
    title: 'Búsqueda avanzada',
    altAccountId: '',
  }
);

const showFilter = ref(false);
const isFiltering = ref(false);
const loading = ref(false);
const showFieldSelectorDialog = ref(false);
const productFiltered = ref([] as Product[]);

const dataFilter = ref({} as Product);

const formInputs = ref([
  // {
  //   with_avatar: false,
  //   input: 'q-select',
  //   label: 'Cuenta',
  //   field: 'account',
  //   option_value: 'id',
  //   option_label: 'nombre',
  //   selected_class: 'text-deep-primary text-bold',
  //   clearable: true,
  //   visible: true,
  //   use_chips: false,
  //   multiple: false,
  //   options: listAccount,
  //   use_input: true,
  //   debounce: 200,
  //   emit_value: true,
  //   map_options: true,
  //   filter_function: filterAccount,
  // },
  {
    input: 'q-input',
    label: 'Nombre(s)',
    clearable: true,
    field: 'name',
    visible: true,
  },
  {
    input: 'q-input',
    label: 'Marca',
    clearable: true,
    field: 'marca_c',
    visible: true,
  },
  {
    input: 'q-input',
    label: 'Descripción',
    type: 'tel',
    clearable: true,
    field: 'descripcion_basica_html_c',
    visible: true,
  },

  // {
  //   with_avatar: true,
  //   input: 'q-select',
  //   label: 'Asignado a',
  //   field: 'assigned_to',
  //   option_value: 'id',
  //   option_label: 'user_name',
  //   selected_class: 'text-deep-primary text-bold',
  //   clearable: false,
  //   visible: true,
  //   use_chips: true,
  //   multiple: true,
  //   options: listUsers,
  //   use_input: true,
  //   debounce: 0,
  //   emit_value: true,
  //   map_options: true,
  //   filter_function: filterUsers,
  // },
  // {
  //   with_avatar: true,
  //   input: 'q-select',
  //   label: 'Creado por',
  //   field: 'created_by',
  //   option_value: 'id',
  //   option_label: 'user_name',
  //   selected_class: 'text-deep-primary text-bold',
  //   clearable: false,
  //   visible: true,
  //   use_chips: true,
  //   multiple: true,
  //   options: listUsers,
  //   use_input: true,
  //   debounce: 0,
  //   emit_value: true,
  //   map_options: true,
  //   filter_function: filterUsers,
  // },
  // {
  //   input: 'q-select',
  //   label: 'Pais',
  //   clearable: true,
  //   field: 'country',
  //   option_label: 'label',
  //   option_value: 'cod_pais',
  //   options_dense: true,
  //   visible: true,
  //   emit_value: true,
  //   map_options: true,
  //   options: listPais,
  // },

  // {
  //   input: 'q-select',
  //   label: 'Departamento',
  //   clearable: true,
  //   option_label: 'label',
  //   option_value: 'cod_region',
  //   field: 'state',
  //   options_dense: true,
  //   visible: true,
  //   emit_value: true,
  //   map_options: true,
  //   options: listRegion,
  //   dependence: 'country',
  // },
]);

//* Reference Variables

const onSubmit = async () => {
  console.log('submitting');
  try {
    loading.value = true;
    const response = await getProducts(dataFilter.value);
    productFiltered.value = response;
    isFiltering.value = true;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const openDialog = async () => {
  showFilter.value = !showFilter.value;
  // if (!!props.altAccountId) {
  //   dataFilter.value['account'] = props.altAccountId;

  //   const account = await getRecordModuleInfo<{ name: string }>(
  //     'Accounts',
  //     props.altAccountId,
  //     {
  //       allData: false,
  //       fields: ['name'],
  //     }
  //   );
  //   onSubmit();
  //   accountOptions.value = [
  //     {
  //       label: typeof account.name === 'string' ? account.name : '',
  //       value: props.altAccountId,
  //     },
  //   ];
  // }
};

const clearFilter = () => {
  isFiltering.value = false;
  productFiltered.value = [];
  dataFilter.value = {} as Product;
  console.log('clearing filter');
};

const onReset = () => {
  clearFilter();
};

const onClose = () => {
  clearFilter();
  showFilter.value = false;
  console.log('closed ');
};

// const openDetail = async (id: any) => {
//   documentRelation.value = await getRelationAll('Contacts', id);
// };

defineEmits(['selectItem', 'showAccount']);
defineExpose({
  openDialog,
  onClose,
});
</script>

<template>
  <div>
    <dialog-component
      v-model="showFilter"
      :sizeDialog="isFiltering ? 'dialog-md' : 'dialog-sm'"
      :headerDisabled="false"
      :footerDisabled="false"
      :loading="loading"
      :persistent="props.persistent"
    >
      <template #header>
        <q-card class="my-card no-border-radius">
          <q-card-section class="bg-primary text-white q-pa-sm">
            <div class="text-h6">
              <slot name="header-button"> </slot>
              {{ props.title }}
              <q-btn
                v-if="!props.persistent"
                flat
                icon="close"
                dense
                class="float-right"
                @click="onClose"
              />
            </div>
          </q-card-section>
        </q-card>
      </template>
      <template #body>
        <div class="row bg-white">
          <Transition enter-active-class="animated lightSpeedInRight">
            <div class="col-md-6 col-sm-12" v-if="isFiltering">
              <q-card class="no-border-radius bg-none" flat>
                <q-card-section>
                  <div class="text-h7 q-mb-sm">Lista de coincidencias</div>
                  <template v-if="productFiltered.length > 0">
                    <q-list bordered>
                      <q-virtual-scroll
                        style="max-height: 90vh"
                        :items="productFiltered"
                        separator
                        v-slot="{ item, index }"
                      >
                        <q-item
                          :key="index"
                          clickable
                          @click="$emit('selectItem', item)"
                        >
                          <q-item-section avatar>
                            <q-avatar
                              color="blue-3"
                              text-color="text-dark"
                              icon="person_pin"
                              font-size="20px"
                            />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ item.name }}</q-item-label>

                            <q-item-label caption>
                              <div>
                                NIT/CI:
                                <span class="text-blue">{{
                                  item.nit_ci_c
                                }}</span>
                              </div>
                              <div>Teléfono: {{ item.phone_office }}</div>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-virtual-scroll>
                    </q-list>
                  </template>
                  <template v-else>
                    <div class="text-h7 text-grey-6 q-py-md text-center">
                      <img
                        src="empty_list.png"
                        alt="lista vacia"
                        style="width: 150px; height: 100px"
                      />
                      <span class="block"
                        >No se encontraron coincidencias.</span
                      >
                      <slot name="no-data"></slot>
                    </div>
                  </template>
                </q-card-section>
              </q-card>
            </div>
          </Transition>
          <div
            class="col-sm-12"
            :class="isFiltering ? 'col-md-6' : 'col-md-12'"
          >
            <q-card class="no-border-radius" flat bordered>
              <q-card-section class="row q-col-gutter-sm">
                <template v-for="(element, index) in formInputs" :key="index">
                  <!-- <q-select
                    v-model="dataFilter[element.field]"
                    :options="accountOptions"
                    v-if="
                      element.field === 'account' && element.visible === true
                    "
                    label="Cuenta"
                    hide-dropdown-icon
                    option-value="value"
                    option-label="label"
                    emit-value
                    map-options
                    class="col-12"
                    outlined
                    readonly
                    dense
                    label-slot
                  >
                    <template v-slot:after>
                      <q-btn
                        dense
                        icon="north_west"
                        color="primary"
                        @click="openAccountFilter"
                      />
                    </template>
                  </q-select> -->
                  <component
                    :is="element.input"
                    v-model="dataFilter[element.field]"
                    :label="element.label"
                    :options="element.options"
                    :option-value="element.option_value"
                    :option-label="element.option_label"
                    :options-selected-class="element.selected_class"
                    :emit-value="element.emit_value"
                    :map-options="element.map_options"
                    :multiple="element.multiple"
                    :debounce="element.debounce"
                    @keydown.enter="onSubmit"
                    @filter="element.filter_function"
                    @clear="
                      element.multiple
                        ? (dataFilter[element.field] = [])
                        : (dataFilter[element.field] = '')
                    "
                    :use-input="element.use_input"
                    option-dense
                    :clearable="element.clearable"
                    class="col-12"
                    dense
                    outlined
                    v-if="
                      element.input === 'q-select' &&
                      element.visible &&
                      dataFilter[element.dependence ?? ''] !== ''
                    "
                  >
                    <template
                      v-slot:selected-item="scope"
                      v-if="element.with_avatar"
                    >
                      <q-chip
                        removable
                        dense
                        @remove="scope.removeAtIndex(scope.index)"
                        :tabindex="scope.tabindex"
                        color="grey-4"
                        size="md"
                      >
                        <q-avatar>
                          <img :src="`${HANSACRM3_URL}/${scope.opt.avatar}`" />
                        </q-avatar>
                        <div class="ellipsis">
                          {{ scope.opt.user_name }}
                          <q-tooltip class="bg-primary">
                            <div>{{ scope.opt.user_name }}</div>
                          </q-tooltip>
                        </div>
                      </q-chip>
                    </template>
                    <template v-slot:option="scope" v-if="element.with_avatar">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section avatar>
                          <img
                            :src="`${HANSACRM3_URL}/${scope.opt.avatar}`"
                            style="width: 30px"
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ scope.opt.user_name }}</q-item-label>
                          <q-item-label caption>{{
                            scope.opt.a_mercado
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </component>
                  <component
                    :is="element.input"
                    v-model.trim="dataFilter[element.field as string]"
                    type="text"
                    :label="element.label"
                    class="col-12"
                    dense
                    outlined
                    @keydown.enter="onSubmit"
                    v-if="element.input === 'q-input' && element.visible"
                  >
                  </component>
                  <q-toggle
                    v-model="dataFilter[element.field]"
                    color="primary"
                    :label="element.label"
                    indeterminate-value="''"
                    false-value="0"
                    true-value="1"
                    v-if="element.input === 'q-toggle' && element.visible"
                  />
                </template>
              </q-card-section>
              <q-card-section>
                <q-btn
                  color="primary"
                  icon="check"
                  label="Mostrar más campos"
                  class="full-width"
                  outline
                  @click="showFieldSelectorDialog = !showFieldSelectorDialog"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </template>
      <template #footer>
        <q-btn
          color="primary"
          icon="search"
          label="BUSCAR"
          class="q-mr-sm"
          @click="onSubmit"
          :disable="loading"
        />
        <q-btn
          color="primary"
          outline
          icon="filter_alt_off"
          label="LIMPIAR"
          @click="onReset"
          :disable="loading"
        />
      </template>
    </dialog-component>
    <q-dialog v-model="showFieldSelectorDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 q-pt-none">
            Campos de búsqueda
            <q-btn icon="close" flat dense class="float-right" v-close-popup />
          </div>
          <hr />
          <div class="q-col-gutter-sm">
            <q-checkbox
              v-for="(item, index) in formInputs"
              :key="index"
              keep-color
              v-model="item['visible']"
              :label="item['label']"
              color="primary"
              style="width: 33.3%"
              :val="item['visible']"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <!-- <AdvancedFilterAccount
    ref="accountAdvancedFilterRef"
    title="Búsqueda de Cuentas"
    @select-item="assignAccount"
  /> -->
  <!-- <AccountDialog ref="accountDialogRef" />
  <ContactDialog ref="contactDialogRef" /> -->
</template>

<style scoped>
.q-chip {
  max-width: 140px;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90px;
  font-size: 0.8rem;
  text-align: right;
}
</style>
