<script lang="ts" setup>
import CardGeneralData from '../components/Cards/CardGeneralData.vue';

interface Props {
  id?: string;
}

const props = withDefaults(defineProps<Props>(), { id: '' });
</script>
<template>
  <div class="row q-col-gutter-lg q-pa-md">
    <div class="col-xs-12 col-sm-12 col-md-6">
      <div class="row q-gutter-y-md">
        <CardGeneralData :id="props.id" class="col-12" />
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="row">
        <div class="q-gutter-y-md col-12">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
