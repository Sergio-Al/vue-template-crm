<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

onMounted(() => {
  console.log(props.id);
  console.log('ddd');
});
</script>
<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
      <span class="q-ml-sm"
        >You are currently not connected to any network.</span
      >
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
