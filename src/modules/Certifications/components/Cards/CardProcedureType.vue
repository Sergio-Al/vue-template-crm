<script setup lang="ts">
import { ViewCard } from 'src/modules/Accounts/components';
import { ref, onMounted, computed } from 'vue';
import { CertificacionBody } from '../../utils/types';

interface Props {
  id: string;
  data: CertificacionBody;
}

interface Emits {
  (e: 'change', value: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const procedureTypes = [
  {
    tag: 'label',
    class: 'col-6 col-sm-3',
    imgSrc: '/img/certifications/medic-documents-2.png',
    label: 'Inscripción',
    value: 'inscripcion',
    color: 'primary',
    disabled: false,
  },
  {
    tag: 'label',
    class: 'col-6 col-sm-3',
    imgSrc: '/img/certifications/medic-documents-4.png',
    label: 'Reinscripción',
    value: 'reinscripcion',
    color: 'primary',
    disabled: false,
  },
  {
    tag: 'label',
    class: 'col-6 col-sm-3',
    imgSrc: '/img/certifications/medic-documents-3.png',
    label: 'Rectificación',
    value: 'rectificacion',
    color: 'primary',
    disabled: false,
  },
  {
    tag: 'label',
    class: 'col-6 col-sm-3',
    imgSrc: '/img/certifications/medic-documents-7.png',
    label: 'Corrección',
    value: 'correccion',
    color: 'primary',
    disabled: false,
  },
];

const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

const value = ref<string>(props.data.tipo_tramite_c || 'inscripcion');

const changeValue = () => {
  emits('change', value.value);
};

onMounted(() => {
  emits('change', value.value);
});

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): string => value.value,
});

const restoreValues = () => {
  if (props.data) {
    value.value = props.data.tipo_tramite_c || 'inscripcion';
  }
};

</script>

<template>
  <view-card-component
    v-bind="$attrs"
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    icon-name="folder"
    ref="baseCardRef"
    title="Tipo de Trámite"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
    >
    <template #edit>
    <q-card-section class="row">
      <q-item
        v-for="(procedure, index) in procedureTypes"
        :key="index"
        :tag="procedure.tag"
        v-ripple
        :class="procedure.class"
        :disable="procedure.disabled"
      >
        <q-item-section top avatar>
          <img :src="procedure.imgSrc" style="height: 50px; max-width: 720px" />
          <span>{{ procedure.label }}</span>
        </q-item-section>
        <div>
          <q-radio
            v-model="value"
            :val="procedure.value"
            :color="procedure.color"
            :disable="procedure.disabled"
            @click="changeValue"
          />
        </div>
      </q-item>
    </q-card-section>
    </template>
    <template #read>
      <q-card-section class="row">
      <q-item
        v-for="(procedure, index) in procedureTypes"
        :key="index"
        :tag="procedure.tag"
        v-ripple
        :class="procedure.class"
      >
        <q-item-section top avatar>
          <img :src="procedure.imgSrc" style="height: 50px; max-width: 720px" />
          <span>{{ procedure.label }}</span>
        </q-item-section>
        <div>
          <q-radio
            v-model="value"
            :val="procedure.value"
            :color="procedure.color"
            disable
          />
        </div>
      </q-item>
    </q-card-section>
    </template>
  </view-card-component>
</template>
