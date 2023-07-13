<script setup lang="ts">
import { ref } from 'vue';

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

const value = ref<string>('cyan');
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
          />
        </div>
      </q-item>
    </q-card-section>
  </q-card>
</template>
