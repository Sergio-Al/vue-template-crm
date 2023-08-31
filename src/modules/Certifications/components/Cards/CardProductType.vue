<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { CertificacionBody } from '../../utils/types';
//import { useCertificationStore } from '../../store/certificationStore';

interface Props {
  id:string;
  data: CertificacionBody;
}

interface Emits {
  (e: 'change', value: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const inputData = ref({...props.data} as CertificacionBody);

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
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);

const value = ref<string>(props.data.tipo_producto_c || 'dispositivo');

const watch_change = ref(0);

const changeValue = () => {
  //console.log(value.value);
  watch_change.value = 1;
  emits('change', value.value);
};

const restoreValues = () => {
  if (props.data) {
    value.value = props.data.tipo_producto_c || 'dispositivo';
  }
};

onMounted(() => {
  emits('change', value.value);
});

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): string => value.value,
});
</script>

<template>
<view-card-component
    v-bind="$attrs"
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    icon-name="production_quantity_limits"
    ref="baseCardRef"
    title="Tipo de Producto"
    @cancel-change="restoreValues"
    @edit-change="restoreValues"
    >
    <template #edit>
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
    </template>
    <template #read>
      <q-card-section class="row">
        <q-item
          v-for="(product, index) in productTypes"
          :key="index"
          :tag="product.tag"
          v-ripple
          :class="product.class"
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
              disable
            />
          </div>
        </q-item>
      </q-card-section>
    </template> 

</view-card-component>
</template>
