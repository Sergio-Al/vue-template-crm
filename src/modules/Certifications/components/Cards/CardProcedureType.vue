<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CertificacionBody } from '../../utils/types';

interface Props {
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

const value = ref<string>(props.data.tipo_tramite_c || 'inscripcion');

const changeValue = () => {
  emits('change', value.value);
};

onMounted(() => {
  emits('change', value.value);
});

defineExpose({
  exposeData: (): string => value.value,
});
</script>

<template>
  <q-card class="my-card">
    <q-card-section> Tipo de Trámite </q-card-section>
    <q-separator spaced inset />
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
  </q-card>
</template>
