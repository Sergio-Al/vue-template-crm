<script lang="ts" setup>
import CardGeneralData from '../components/Cards/CardGeneralData.vue';
import CardProcedureType from '../components/Cards/CardProcedureType.vue';
import CardProductType from '../components/Cards/CardProductType.vue';

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
      <div class="row q-gutter-y-md">
        <CardProcedureType class="col-12" />
        <CardProductType class="col-12" /> 
      </div>
    </div>
  </div>
</template>
