<script lang="ts" setup>
import { onMounted } from 'vue';
import CardManufacturerData from '../components/Cards/CardManufacturerData.vue';
import CardManufacturerDocs from '../components/Cards/CardManufacturerDocs.vue';

interface Props {
  id?: string;
}

interface Emits {
  (e: 'updateView', value: string): void;
}

const props = withDefaults(defineProps<Props>(), { id: '' });
const emits = defineEmits<Emits>();

onMounted(() => {
  emits('updateView', 'ManufacturerData');
});
</script>
<template>
  <div class="row q-col-gutter-lg q-pa-md">
    <div class="col-xs-12 col-sm-12 col-md-6">
      <div class="row q-gutter-y-md">
        <CardManufacturerData :id="props.id" class="col-12" />
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="col-12">
        <CardManufacturerDocs />
      </div>
    </div>
  </div>
</template>
