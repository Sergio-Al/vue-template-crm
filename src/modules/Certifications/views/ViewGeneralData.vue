<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CardGeneralData from '../components/Cards/CardGeneralData.vue';
import CardProcedureType from '../components/Cards/CardProcedureType.vue';
import CardProductType from '../components/Cards/CardProductType.vue';

import AssignedUser from 'src/components/AssignedUsers/AssignedUser.vue';
import { CertificacionBody } from '../utils/types';

interface Props {
  id?: string;
  data: CertificacionBody;
}

interface Emits {
  (e: 'create', value: Partial<CertificacionBody>): void;
  (e: 'update', value: Partial<CertificacionBody>): void;
}

const cardGeneralDataRef = ref<InstanceType<typeof CardGeneralData> | null>(
  null
);
const cardProcedureTypeRef = ref<InstanceType<typeof CardProcedureType> | null>(
  null
);
const cardProductTypeRef = ref<InstanceType<typeof CardProductType> | null>(
  null
);
const assignedSingleUserRef = ref<InstanceType<typeof AssignedUser> | null>(
  null
);

const props = withDefaults(defineProps<Props>(), { id: '' });
const emits = defineEmits<Emits>();

// onMounted(() => {});

defineExpose({
  exposeData: (): Partial<CertificacionBody> => ({
    ...cardGeneralDataRef.value?.exposeData(),
    tipo_tramite_c: cardProcedureTypeRef.value?.exposeData(),
    tipo_producto_c: cardProductTypeRef.value?.exposeData(),
    assigned_user_id: assignedSingleUserRef.value?.assignedUser.id || '',
  }),
});
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="row q-col-gutter-lg q-pa-md">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <div class="row q-gutter-y-md">
            <CardGeneralData
              ref="cardGeneralDataRef"
              :id="props.id"
              :data="props.data"
              class="col-12"
            />
            <CardProcedureType
              ref="cardProcedureTypeRef"
              class="col-12"
              :data="props.data"
            />
            <CardProductType
              ref="cardProductTypeRef"
              class="col-12"
              :data="props.data"
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <!--<AssignedSingleUser2
            ref="assignedSingleUserRef"
            :module="'HANCE_Certificacion'"
            :module-id="''"
            :withList="false"
            @changeUser="() => {}"
          />-->
          <AssignedUser
            title="Profesional Acreditado"
            hide-chip
            ref="assignedSingleUserRef"
            :module="'HANCE_Certificacion'"
            :module-id="''"
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
