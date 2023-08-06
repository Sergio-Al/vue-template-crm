<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CardManufacturerData from '../components/Cards/CardManufacturerData.vue';
import CardManufacturerDocs from '../components/Cards/CardManufacturerDocs.vue';
import DirectionCard from 'src/components/MainCard/DirectionCard.vue';
import { CertificacionBody } from '../utils/types';

interface Props {
  id?: string;
}

interface Emits {
  (e: 'updateView', value: string): void;
  (e: 'create'): void;
}

const props = withDefaults(defineProps<Props>(), { id: '' });
const emits = defineEmits<Emits>();

const cardManufacturerDataRef = ref<InstanceType<
  typeof CardManufacturerData
> | null>(null);
const directionCardComponentRef = ref<InstanceType<
  typeof DirectionCard
> | null>(null);

onMounted(() => {
  emits('updateView', 'ManufacturerData');
});

defineExpose({
  exposeData: (): Partial<CertificacionBody> => ({
    ...cardManufacturerDataRef.value?.exposeData(),
    billing_address_street:
      directionCardComponentRef.value?.captureCurrentData()
        .address_street_generated_c,
  }),
});
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="row q-col-gutter-lg q-pa-md">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <div class="row q-gutter-y-md">
            <CardManufacturerData
              ref="cardManufacturerDataRef"
              :id="props.id"
              class="col-12"
            />
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
          <q-btn color="primary" class="q-mr-md" @click="emits('create')">
            Finalizar
          </q-btn>
        </q-toolbar>
      </q-footer>
    </transition>
  </q-layout>
</template>
