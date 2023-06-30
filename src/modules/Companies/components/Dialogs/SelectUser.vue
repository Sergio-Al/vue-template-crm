<script lang="ts" setup>
import { ref } from 'vue';
import { QTableColumn } from 'quasar';

import { availableUsers } from '../../utils/dummyData';
import { getUsers } from '../../services/useCompanyService';

import type { User } from '../../utils/types';

const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row) => `${row.first_name} ${row.last_name}`,
    sortable: true,
  },
  {
    name: 'division',
    required: true,
    label: 'División',
    align: 'left',
    field: 'iddivision_c',
    sortable: true,
  },
  {
    name: 'regional',
    required: true,
    label: 'Regional',
    align: 'left',
    field: 'idregional_c',
    sortable: true,
  },
  {
    name: 'amercado',
    required: true,
    label: 'Área de mercado',
    align: 'left',
    field: 'idamercado_c',
    sortable: true,
  },
];

const selectedUser = ref<string>('');
const userFiltered = ref<string>('');
const selected = ref<User[]>([]);
const users = ref(availableUsers);

const isLoading = ref(false);

const searchUser = async () => {
  // llamar a servicio para buscar usuarios
  users.value = await getUsers(userFiltered.value);
  return;
};

const emits = defineEmits<{
  (e: 'selectUser', id: User[]): void;
}>();
</script>

<template>
  <q-dialog :maximized="$q.screen.lt.sm">
    <q-layout
      view="lHh LpR lff"
      container
      :style="{ 'max-height': $q.screen.lt.sm ? '100vh' : '95vh' }"
      style="height: 900px; width: 70rem; max-width: 100vw"
      class="bg-grey-3"
    >
      <q-header class="bg-primary text-white">
        <q-toolbar class="q-pa-lg">
          <q-btn
            v-if="$q.screen.lt.sm"
            color="primary"
            flat
            text-color="white"
            icon="arrow_back_ios"
            v-close-popup
          />
          <q-icon
            :class="$q.screen.lt.sm ? '' : 'q-ml-sm'"
            size="lg"
            name="group"
          />

          <q-toolbar-title>Seleccionar usuario</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-separator />
      </q-header>

      <q-footer bordered class="bg-white text-primary q-pa-sm" align="right">
        <q-btn
          color="primary"
          icon="group_add"
          label="Confirmar"
          v-close-popup
          @click="
            () => {
              emits('selectUser', selected);
            }
          "
        />
      </q-footer>

      <q-page-container>
        <q-page class="q-pa-none">
          <q-card
            style="min-height: inherit"
            flat
            class="xl-dialog row justify-between q-pa-sm"
          >
            <q-card-section class="col-12 q-pa-none">
              <div class="row q-col-gutter-md">
                <div>
                  <q-form
                    @submit="() => searchUser()"
                    class="q-gutter-md row items-center justify-between"
                  >
                    <q-input
                      outlined
                      v-model="userFiltered"
                      dense
                      clearable
                      type="text"
                      label="Nombre de usuario"
                    ></q-input>

                    <div>
                      <q-btn
                        label="Buscar"
                        color="primary"
                        icon="search"
                        type="submit"
                        size="sm"
                      />
                    </div>
                  </q-form>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="col-12 q-px-none" v-if="users.length > 0">
              <q-table
                flat
                dense
                class="customScroll sticky-header-table"
                :rows="users"
                :columns="columns"
                v-model:selected="selected"
                row-key="id_usuario"
                selection="multiple"
                :rows-per-page-options="[0]"
                @selection="() => {}"
              >
                <template #body-cell-fullname="slotProps">
                  <q-td>
                    <span text-color="primary">{{ slotProps.value }}</span>
                  </q-td>
                </template>
                <template #body-cell-module="slotProps">
                  <q-td>
                    <q-chip
                      color="primary"
                      text-color="white"
                      class="no-select"
                      icon="badge"
                      :label="slotProps.value"
                      size="sm"
                  /></q-td>
                </template>
                <template #body-cell-email_address="slotProps">
                  <q-td>
                    <span
                      v-if="
                        slotProps.value === 'null' ||
                        slotProps.value === 'undefined' ||
                        !slotProps.value
                      "
                      class="text-grey-6"
                      >Sin Correo</span
                    >
                    <span v-else text-color="primary">
                      {{ slotProps.value }}
                    </span>
                  </q-td>
                </template>
                <template #body-cell-title="slotProps">
                  <q-td>
                    <span
                      v-if="slotProps.value === 'null' || !slotProps.value"
                      class="text-grey-6"
                      >No asignado</span
                    >
                    <span v-else text-color="primary">
                      {{ slotProps.value }}</span
                    >
                  </q-td>
                </template>
                <template #no-data>
                  <q-card class="my-card" flat>
                    <q-card-section>
                      <q-icon color="grey-6" size="lg" />
                      <span class="text-grey-6" style="font-size: medium"
                        >No se encontraron datos en la busqueda...</span
                      >
                    </q-card-section>
                  </q-card>
                </template></q-table
              >
            </q-card-section>

            <q-card-section class="col-12 q-px-none" v-else>
              <!-- <span class="text-grey-6" style="font-size: medium"
          >No se encontraron datos en la busqueda...</span
        > -->

              <q-carousel-slide name="style" class="column no-wrap flex-center">
                <div class="q-mt-md text-center text-grey-6">
                  No se encontraron datos en la busqueda...
                </div>
              </q-carousel-slide>
            </q-card-section>

            <q-inner-loading
              :showing="isLoading"
              label="Obteniendo datos..."
              label-class="text-primary"
              label-style="font-size: 1.1em"
            />
          </q-card>
        </q-page>

        <q-page-scroller position="bottom">
          <q-btn fab icon="keyboard_arrow_up" color="red" />
        </q-page-scroller>
      </q-page-container>
    </q-layout>
  </q-dialog>

  <!-- <q-dialog persistent>
    <q-card>
      <q-card-section
        style="min-width: 300px; max-width: 80%"
        class="row items-center"
      >
        <div class="row" style="width: inherit">
          <q-select
            class="col-12 col-sm-6"
            outlined
            dense
            v-model="selectedUser"
            :options="availableUsers"
            type="text"
            label="Seleccionar usuario"
            option-value="id_usuario"
            :option-label="(item) => `${item.first_name} ${item.last_name}`"
            emit-value
            map-options
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Select"
          @click="emits('selectUser', '1234')"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
</template>