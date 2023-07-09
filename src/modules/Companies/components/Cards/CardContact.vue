<script lang="ts" setup>
import { computed, ref } from 'vue';
import ViewCard from 'src/components/MainCard/ViewCard.vue';
import type { ChildCompany, Company, Contact } from '../../utils/types';
import { QInput } from 'quasar';

interface Props {
  id: string;
  data: Contact;
}

const props = defineProps<Props>();
const baseCardRef = ref<InstanceType<typeof ViewCard> | null>(null);
const websiteInputRef = ref<InstanceType<typeof QInput> | null>(null);
const email1InputRef = ref<InstanceType<typeof QInput> | null>(null);

const inputData = ref({ ...props.data });

// methods
const restoreValues = () => {
  if (props.data) inputData.value = { ...props.data };
};

const validateInputs = async () => {
  const validatedFields = await Promise.all([
    websiteInputRef.value?.validate(),
    email1InputRef.value?.validate(),
  ]);
  return validatedFields.every((field) => !!field);
};

const isValidEmail = (val: string) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || 'El email no es valido';
};

defineExpose({
  validateInputs,
  isEditing: computed(() => baseCardRef.value?.isEditing === 'edit'),
  exposeData: (): Contact => ({ ...inputData.value }),
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
    @cancel-change="restoreValues"
    @edit-change="() => {}"
  >
    <template #edit>
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <q-input
          ref="websiteInputRef"
          v-model="inputData.website"
          type="text"
          class="col-12 col-sm-6"
          label="Sitio Web"
          outlined
          dense
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          ref="email1InputRef"
          v-model="inputData.email1"
          type="text"
          class="col-12 col-sm-6"
          label="Correo Electrónico"
          outlined
          dense
          :rules="[(val) => !!val || 'Campo requerido', isValidEmail]"
        />
        <q-input
          v-model="inputData.phone_office"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono Principal"
          outlined
          dense
        />
        <q-input
          v-model="inputData.phone_alternate"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono Alternativo"
          outlined
          dense
        />

        <div class="col-12">
          <q-separator dark color="grey-4" />
        </div>
      </div>
    </template>

    <template #read>
      <div class="row q-col-gutter-xs q-px-md q-py-md">
        <q-input
          v-model="inputData.website"
          type="text"
          class="col-12 col-sm-6"
          label="Sitio Web"
          outlined
          dense
          readonly
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          v-model="inputData.email1"
          type="text"
          class="col-12 col-sm-6"
          label="Correo Electrónico"
          outlined
          dense
          readonly
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          v-model="inputData.phone_office"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono Principal"
          outlined
          dense
          readonly
        />
        <q-input
          v-model="inputData.phone_alternate"
          type="text"
          class="col-12 col-sm-6"
          label="Teléfono Alternativo"
          outlined
          dense
          readonly
        />
      </div>
    </template>
  </view-card-component>
</template>
