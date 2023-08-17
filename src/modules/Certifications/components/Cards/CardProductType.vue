<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CertificacionBody } from '../../utils/types';
//import { useCertificationStore } from '../../store/certificationStore';

interface Props {
  data: CertificacionBody;
}

interface Emits {
  (e: 'change', value: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const productTypes = [
  {
    tag: 'label',
    class: 'col-6 col-sm-3',
    imgSrc: '/img/certifications/medic-pills.png',
    label: 'Medicamento',
    value: 'medicamento',
    color: 'primary',
    disabled: true,
  },
  {
    tag: 'label',
    class: 'col-6 col-sm-3',
    imgSrc: '/img/certifications/medic-bag.png',
    label: 'Dispositivo',
    value: 'dispositivo',
    color: 'primary',
    disabled: false,
  },
  {
    tag: 'label',
    class: 'col-6 col-sm-3',
    imgSrc: '/img/certifications/medic-equipment.png',
    label: 'Equipo',
    value: 'equipo',
    color: 'primary',
    disabled: false,
  },
  {
    tag: 'label',
    class: 'col-6 col-sm-3',
    imgSrc: '/img/certifications/medic-supplements.png',
    label: 'Cosmético',
    value: 'cosmetico',
    color: 'primary',
    disabled: true,
  },
];

const value = ref<string>(props.data.tipo_tramite_c || 'dispositivo');

const changeValue = () => {
  console.log(value.value);
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
    <q-card-section> Tipo de Producto </q-card-section>
    <q-separator spaced inset />
    <q-card-section class="row">
      <q-item
        v-for="(product, index) in productTypes"
        :key="index"
        :tag="product.tag"
        v-ripple
        :class="product.class"
        :disable="product.disabled"
      >
        <q-item-section top avatar>
          <img :src="product.imgSrc" style="height: 50px; max-width: 720px" />
          <span>{{ product.label }}</span>
        </q-item-section>
        <div>
          <q-radio
            v-model="value"
            :val="product.value"
            :color="product.color"
            :disable="product.disabled"
            @click="changeValue"
          />
        </div>
      </q-item>
    </q-card-section>
  </q-card>
</template>
