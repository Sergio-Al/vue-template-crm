<script lang="ts" setup>
import { computed, ref } from 'vue';
import ViewCard from 'src/components/MainCard/ViewCard.vue';
import type { ChildCompany } from '../../../utils/types';

interface Props {
  id: string;
  data: ChildCompany;
}

const props = defineProps<Props>();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const inputData = ref({ ...props.data });
const restoreValues = () => {
  if (props.data) inputData.value = { ...props.data };
};

defineExpose({
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): ChildCompany => ({ ...inputData.value }),
  exposeUpdateData: () =>
    ({
      website: inputData.value.website,
      email1: inputData.value.email1,
      phone_office: inputData.value.phone_office,
      phone_alternate: inputData.value.phone_alternate,
    } as ChildCompany),
});
</script>

<template>
  <view-card-component
    v-bind="$attrs"
    :controls="!!props.id"
    :initial-status="props.id ? 'read' : 'edit'"
    icon-name="summarize"
    ref="baseCardRef"
    title="Información de Contacto"
    @cancel-change="() => {}"
    @edit-change="() => {}"
  >
    <template #edit>
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          v-model="inputData.website"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Sitio Web"
          outlined
          dense
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          v-model="inputData.email1"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Correo Electrónico"
          outlined
          dense
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          v-model="inputData.phone_office"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Teléfono Principal"
          outlined
          dense
        />
        <q-input
          v-model="inputData.phone_alternate"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Teléfono Alternativo"
          outlined
          dense
        />
      </div>
    </template>

    <template #read>
      <div class="row q-col-gutter-xs q-px-md q-py-md">
        <q-input
          v-model="inputData.website"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Sitio Web"
          outlined
          dense
          readonly
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          v-model="inputData.email1"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Correo Electrónico"
          outlined
          dense
          readonly
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          v-model="inputData.phone_office"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Teléfono Principal"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputData.phone_alternate"
          type="text"
          class="col-12 col-sm-6 q-py-sm"
          label="Teléfono Alternativo"
          outlined
          dense
          readonly
        />
      </div>
    </template>
  </view-card-component>
</template>
