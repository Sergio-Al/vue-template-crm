<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();
</script>
<template>
  <view-card-component
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    v-bind="$attrs"
    icon-name="info"
    title="Información"
  >
    <template #edit>
      <div>Edit values</div>
    </template>
    <template #read>
      <div>Read values</div>
    </template>
  </view-card-component>
</template>
