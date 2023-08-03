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
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="row q-col-gutter-lg q-pa-md">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <div class="row q-gutter-y-md">
            <CardManufacturerData :id="props.id" class="col-12" />
            <direction-card-component
              ref="directionCardComponentRef"
              hide-extra-banner
              :id-local="props.id"
              :data="{}"
              :options="[]"
              class="col-12"
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <CardManufacturerDocs />
        </div>
      </div>
    </q-page-container>

    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <q-footer
        v-if="true"
        elevated
        reveal
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-4'"
      >
        <q-toolbar class="justify-center">
          <q-btn color="primary" class="q-mr-md" @click="() => {}">
            Finalizar
          </q-btn>
        </q-toolbar>
      </q-footer>
    </transition>
  </q-layout>
</template>
