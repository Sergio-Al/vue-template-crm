<script lang="ts" setup>
import moment from 'moment';
import { ref } from 'vue';

import { rowsDocsProveedor } from '../../utils/dummyData';

interface DocumentInfo {
  name: string;
  fileName: string;
  expiration_date: string;
  size: string;
}

const date = ref(moment().format('DD/MM/YYYY'));
const currentDate = moment();

//const documents = ref<DocumentInfo[]>(manufacturerDocuments);

const columns = [
  {
    name: 'index',
    label: '#',
    field: 'index'
  },
  { name: 'name', align: 'left', label: 'Nombre', field: 'name', sortable: true },
  { name: 'category', align: 'center', label: 'Categoría', field: 'category', sortable: true },
  { name: 'division', align: 'center', label: 'División', field: 'division', sortable: true },
  { name: 'validity', align: 'center', label: 'Validéz', field: 'validity', sortable: true },
  { name: 'state', align: 'center', label: 'Estado', field: 'state', sortable: true }
]

const isDateExpired = (date: string) => {
  if (!!date) {
    const dateFormatted = moment(date, 'DD/MM/YYYY');

    return dateFormatted.isBefore(currentDate);
  }
  return true;
};
</script>
<template>
  <!-- <div class="row q-gutter-y-md col-12"> -->
  <q-card>
    <q-card-section>
      <q-icon size="sm" color="primary" name="insert_drive_file" />
      Documentación del Fabricante
    </q-card-section>
    <q-separator spaced inset />
    <q-card-section class="q-pt-xs">
      <div class="row justify-end q-pt-xs">
        <q-btn color="primary" label="SUBIR DOCUMENTO" icon="cloud_upload" />
      </div>
      <div class="q-pa-sm">
            <q-table
                style="height: 400px"
                flat bordered
                :rows="rowsDocsProveedor"
                :columns="columns"
                row-key="index"
                :rows-per-page-options="[5,10,20]"
                >
            <template>
            </template>
            <template #body="propsTable">
                <q-tr :props="propsTable">
                    <q-td key="index" :props="propsTable">
                        {{propsTable.row.index}}
                    </q-td>
                    <q-td key="name" :props="propsTable">
                      <span class="text-break">
                        {{propsTable.row.name}}
                      </span>
                    </q-td>
                    <q-td key="category" :props="propsTable">
                        {{propsTable.row.category}}
                    </q-td>
                    <q-td key="division" :props="propsTable">
                        {{propsTable.row.division}}
                        <br />
                        <span class="text-caption"><span class="text-grey">Área de Mercado: </span>{{propsTable.row.amercado}}</span>
                    </q-td>
                    <q-td key="validity" :props="propsTable">
                        <span class="text-caption"><span class="text-grey">F. Inicio: </span>{{propsTable.row.date_start}}</span>
                        <br />
                        <span class="text-caption"><span class="text-grey">F. Fin: </span>{{propsTable.row.date_end}}</span>
                    </q-td>
                    <q-td key="state" :props="propsTable">
                      <q-badge outline color="primary">
                        {{propsTable.row.state}}
                      </q-badge>
                    </q-td>
                </q-tr>
            </template>

            </q-table>
        </div>
    </q-card-section>
    

    <!--
    <div v-for="(document, index) in documents" :key="index" class="q-pa-sm">
      <q-card
        :class="
          isDateExpired(document.expiration_date)
            ? 'bg-red-2'
            : 'bg-light-blue-2'
        "
      >
        <q-card-section>
          <div class="row items-center no-wrap text-bold text-grey-8">
            <div class="col">{{ document.name }}</div>
            <div class="col-auto">
              <q-btn
                color="primary"
                icon="edit"
                flat
                round
                size="sm"
                @click="() => {}"
              />
            </div>
          </div>
        </q-card-section>
        <div class="q-px-md">
          <div class="row">
            <div class="col-auto items-center">
              <q-avatar
                class="q-mr-sm"
                size="md"
                :color="
                  isDateExpired(document.expiration_date)
                    ? 'negative'
                    : 'primary'
                "
                text-color="white"
                icon="description"
              />
            </div>
            <div class="col">
              <div>{{ document.fileName }}</div>
              <div>{{ document.size }}</div>
            </div>
          </div>
        </div>
        <div class="q-pa-md text-right">
          Fecha de expiración:
          <span class="text-bold">{{ document.expiration_date }}</span>
        </div>
      </q-card>
    </div>-->

  </q-card>

  <!-- </div> -->
</template>
<style scoped>
  .text-break {
    width:500px;
    line-break: auto;
    white-space: normal;
    font-size: 1.1em;
  }
</style>
