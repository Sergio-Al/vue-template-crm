<template>
    <div>
      <dialog-component
        v-model="showFilter"
        :sizeDialog="isFiltering ? 'dialog-md' : 'dialog-sm'"
        :headerDisabled="false"
        :footerDisabled="false"
        :loading="loading"
        :persistent="persistent"
      >
        <template #header>
          <!-- <pre>{{ persistent ? 'is persistent!' : 'is not persistent' }}</pre> -->
          <q-card class="my-card no-border-radius">
            <q-card-section class="bg-primary text-white q-pa-sm">
              <div class="text-h6">
                <slot name="header-button"> </slot>
                {{ title }}
                <q-btn
                  v-if="!persistent"
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
                    <div class="text-h6 q-mb-sm flex flex-center text-primary">
                      Lista de solicitudes
                    </div>
                    <template v-if="filteredRequests.length > 0">
                      <q-list bordered>
                        <q-virtual-scroll
                          style="max-height: 90vh"
                          :items="filteredRequests"
                          separator
                          v-slot="{ item, index }"
                        >
                          <q-item :key="index" clickable>
                            <q-item-section
                              avatar
                              class="cursor-pointer"
                              @click="$emit('selectItem', item)"
                            >
                              <q-avatar
                                color="green-7"
                                text-color="text-dark"
                                icon="work"
                                font-size="20px"
                              />
                            </q-item-section>
                            <q-item-section
                              class="cursor-pointer"
                              @click="$emit('selectItem', item)"
                            >
                              <q-item-label>{{ item.nro }}</q-item-label>
                              <q-item-label caption lines="1"
                                ><span class="text-primary">Referencia Prod: </span
                                >{{ item.producto_c }}
                              </q-item-label>
                              <span class="text-primary">Solicitante {{item.solicitante}}</span>
                            </q-item-section>
                            <q-item-section>
                              <q-btn
                                outline
                                color="primary"
                                label="Ver"
                                @click="verDialogItem(item.id)"
                              />
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
                  <!--<div class="col-12 flex flex-center">
                    <q-btn
                      color="primary"
                      icon="add_box"
                      label="Crear una nueva Oportunidad"
                      @click="openDialogNewOpo"
                      v-if="!$q.screen.xs"
                    />
                  </div>-->
                  <span class="text-h6 q-mb-sm flex flex-center text-primary"
                    >Solicitudes de Certificación</span
                  >
                  <template v-for="(element, index) in formInputs" :key="index">
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
                      :debounde="element.debounce"
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
                    @click="show_more_field = !show_more_field"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>
          <!-- <pre>{{ dataFilter }}</pre> -->
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
            color="orange"
            icon="refresh"
            label="LIMPIAR"
            @click="onReset"
            :disable="loading"
          />
        </template>
      </dialog-component>
      <q-dialog v-model="show_more_field">
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
    <CertificationRequestDialog ref="requestDialogRef" />
  </template>
  <script lang="ts">
  export default {
    name: 'RelacionadoSol',
  };
  </script>
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useBusquedaSol } from '../../../../../composables/Activity/useBusquedaSol';
  //import OpportunityDialog from 'src/modules/Opportunities/components/Dialogs/OpportunityDialog.vue';
  import CertificationRequestDialog from 'src/modules/Certifications/components/Dialogs/CertificationRequestDialog.vue';
  
  const props = withDefaults(
    defineProps<{
      account_id: string;
      persistent?: boolean;
      title?: string;
    }>(),
    {
      persistent: false,
      title: 'Búsqueda avanzada',
    }
  );
  
  const {
    loading,
    isFiltering,
    showFilter,
    show_more_field,
    formInputs,
    dataFilter,
    HANSACRM3_URL,
    listPros,
    submitFilter,
    clearFilter,
    onClose,
  } = useBusquedaSol();

  // const opportunityDialogRef = ref<InstanceType<typeof OpportunityDialog> | null>(
  //   null
  // );

  const requestDialogRef = ref<InstanceType<typeof CertificationRequestDialog> | null>(
    null
  );
  
  const filteredRequests = computed(() => {
    return listPros.value.filter((contact:any) => contact.id !== props.account_id);
  });
  
  const onSubmit = () => {
    //console.log(dataFilter.value);
    submitFilter(dataFilter.value);
  };
  
  const openDialog = () => {
    showFilter.value = !showFilter.value;
  };
  
  const verDialogItem = async (id: string) => {
    await requestDialogRef.value?.openDialogTab(id)
  };
  
  const onReset = () => {
    clearFilter();
  };
  // // para crear====================================================================>
  // const openDialogNewOpo = async () => {
  //   await opportunityDialogRef.value?.openDialogAccountTab('');
  // };
  // ===========================================================================>
  defineEmits(['selectItem', 'showAccount']);
  defineExpose({
    openDialog,
    onClose,
  });
  </script>
  
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
  