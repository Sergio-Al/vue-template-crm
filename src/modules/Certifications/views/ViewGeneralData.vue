<script lang="ts" setup>
import { onMounted } from 'vue';
import CardGeneralData from '../components/Cards/CardGeneralData.vue';
import CardProcedureType from '../components/Cards/CardProcedureType.vue';
import CardProductType from '../components/Cards/CardProductType.vue';

import AssignedSingleUser2 from 'src/components/AssignedUsers/AssignedSingleUser2.vue';

interface Props {
  id?: string;
}

interface Emits {
  (e: 'updateView', value: string): void;
}

const props = withDefaults(defineProps<Props>(), { id: '' });
const emits = defineEmits<Emits>();

onMounted(() => {
  emits('updateView', 'GeneralData');
});
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="row q-col-gutter-lg q-pa-md">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <div class="row q-gutter-y-md">
            <CardGeneralData :id="props.id" class="col-12" />
            <CardProcedureType class="col-12" />
            <CardProductType class="col-12" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <AssignedSingleUser2
            ref="assignedSingleUserRef"
            :module="'HANCE_Certificaciones'"
            :module-id="''"
            :withList="false"
            @changeUser="() => {}"
          />
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
            Continuar
          </q-btn>
        </q-toolbar>
      </q-footer>
    </transition>
  </q-layout>
</template>
