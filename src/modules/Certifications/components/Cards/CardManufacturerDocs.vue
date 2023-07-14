<script lang="ts" setup>
import moment from 'moment';
import { ref } from 'vue';

import { manufacturerDocuments } from '../../utils/dummyData';

interface DocumentInfo {
  name: string;
  fileName: string;
  expiration_date: string;
  size: string;
}

const date = ref(moment().format('DD/MM/YYYY'));
const currentDate = moment();

const documents = ref<DocumentInfo[]>(manufacturerDocuments);

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
    <q-card-section>Documentacion del fabricante</q-card-section>
    <q-separator spaced inset />
    <div v-if="documents.length === 0" class="q-pa-md text-grey-8">
      Sin documentos
    </div>
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
    </div>
    <!-- <div class="q-pa-sm">
      <q-card class="bg-red-2">
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
    </div> -->
  </q-card>

  <!-- </div> -->
</template>
