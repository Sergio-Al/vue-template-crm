<script lang="ts" setup>
import { ref } from 'vue';
import { QTableColumn } from 'quasar';

import { useCompaniesStore } from '../store/companyStore';
import { useAsyncState } from '@vueuse/core';

interface Props {
  id: string;
  child?: boolean;
}

const props = withDefaults(defineProps<Props>(), { child: false });
const companyStore = useCompaniesStore();

const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Documento',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories',
    align: 'center',
    label: 'Descripcion',
    field: 'calories',
    sortable: true,
  },
  { name: 'fat', label: 'Fecha Inicio Vigencia', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Fecha Fin Vigencia', field: 'carbs' },
  {
    name: 'calcium',
    label: 'Versión',
    field: 'calcium',
    sortable: true,
  },
];

//se dispara cuando carga el componente
const { state: documents, isLoading } = useAsyncState(async () => {
  return await companyStore.onGetCompanyDocuments(props.id);
}, []);

const comment = ref<string>();
const tab = ref('resp');
const showAlert = ref(false);
const alertAttrs = ref<any>({});
</script>

<template>
  <q-card v-if="isLoading">
    <q-item>
      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" />
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-skeleton height="200px" square />

    <q-card-actions align="right" class="q-gutter-md">
      <q-skeleton type="QBtn" />
      <q-skeleton type="QBtn" />
    </q-card-actions>
  </q-card>

  <div class="row" v-else>
    <div class="col-6">
      <q-card class="q-ma-sm">
        <q-card-section class="q-pa-none">
          <q-toolbar class="q-pa-sm">
            <q-btn flat round dense icon="task" color="primary" />
            <q-toolbar-title class="text-subtitle1">
              Información
            </q-toolbar-title>
          </q-toolbar>
        </q-card-section>
        <q-separator />
        <q-card-section horizontal class="shadow-2 q-ma-sm">
          <q-card-section class="text-dark q-gutter-xs">
            <div>Código:</div>
            <div>Área:</div>
            <div>Fecha inicio:</div>
            <div>Fecha fin:</div>
            <div>Fecha carga inicio:</div>
            <div>Fecha carga fin:</div>
          </q-card-section>
          <q-card-section class="text-dark q-gutter-xs">
            <div>
              <span class="text-primary"> 'codigo'</span>
            </div>
            <div>
              <span class="text-primary"> objectives-1-2-2 </span>
            </div>
            <div>
              <span class="text-primary"> 12/12/2022 </span>
            </div>
            <div>
              <span class="text-primary"> 23/12/2022 </span>
            </div>
            <div>
              <span class="text-primary"> fecha carga inicio </span>
            </div>
            <div>
              <span class="text-primary"> fecha carga fin </span>
            </div>
          </q-card-section>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card-section class="bg-primary text-white">
            Avance real
          </q-card-section>
          <q-scroll-area style="height: 38dvh">
            <q-list bordered separator>
              <q-item v-for="(item, index) in []" :key="index" clickable>
                <q-item-section top avatar>
                  <q-circular-progress
                    :value="40"
                    size="40px"
                    :thickness="0.1"
                    color="blue"
                    center-color="white"
                    track-color="grey-4"
                    rounded
                    show-value
                  >
                    40%
                  </q-circular-progress>
                </q-item-section>
                <q-item-section style="width: 50%">
                  <q-item-label lines="2" style="font-size: 1.1em">
                    <span class="text-dark"> 33&nbsp;tarea </span>
                  </q-item-label>
                </q-item-section>
                <q-item-section side style="width: 50%" class="text-primary">
                  real/ asignado cantidad unidad
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6">
      <q-card class="q-ma-sm">
        <q-card-section class="q-pa-none">
          <q-tabs
            v-model="tab"
            align="justify"
            active-color="primary"
            indicator-color="white"
            inline-label
            outside-arrows
            mobile-arrows
          >
            <q-tab name="resp" icon="find_in_page" label="Respaldos" />
            <q-tab name="comm" icon="chat" label="Comentarios" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="resp">
              <q-scroll-area style="height: 70dvh">
                <q-list bordered>
                  <q-item
                    clickable
                    v-ripple
                    v-for="n in []"
                    :key="n"
                    :href="`${HANSACRM3_URL}/upload/${n.name}`"
                    target="_blank"
                  >
                    <q-item-section avatar>
                      <img
                        :src="`${HANSACRM3_URL}/upload/${n.name}`"
                        v-if="n.ext == 'jpg' || n.ext == 'png'"
                        style="width: 50px; object-fit: cover"
                      />
                      <img
                        :src="`/assets/folder.png`"
                        v-else
                        style="width: 30px"
                      />
                    </q-item-section>
                    <q-item-section class="text-primary">
                      {{ n.description }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </q-tab-panel>
            <q-tab-panel name="comm">
              <CommentsComponent
                module="HANY_CabeceraReporte"
                :module-id="'1'"
                description-crm3=""
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
        <q-separator />
      </q-card>
    </div>
  </div>
  <alert-component v-model="showAlert" v-bind="alertAttrs" @confirm="() => {}">
    <template #body v-if="alertAttrs.type === 'Rejected'">
      <div class="q-my-sm">
        Deje un comentario del porque se rechazo el RDO.
      </div>
      <q-input
        v-model="comment"
        type="textarea"
        label="Motivo del rechazo"
        class="col-12"
        outlined
        :rows="2"
      />
    </template>
  </alert-component>
  <!-- <div class="q-pa-md q-py-lg flex fixed-height">
    <q-table
      style="flex-grow: 1; width: inherit"
      flat
      bordered
      :rows="documents"
      :columns="columns"
      :loading="isLoading"
      row-key="name"
    >
      <template #top>
        <div class="column">
          <span class="text-h6">Documentos de la empresa</span>
          <span v-if="props.child" class="text-caption"
            >Empresa partipante</span
          >
        </div>
        <q-space />
        <q-btn color="primary" icon="add" label="Adicionar" @click="() => {}" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.name }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div> -->
</template>

<style lang="scss">
.fixed-height {
  min-height: inherit;
}
</style>
