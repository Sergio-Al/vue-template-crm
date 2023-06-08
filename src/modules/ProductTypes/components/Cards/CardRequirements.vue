<script lang="ts" setup>
import { ref } from 'vue';

import type { ProductRequirement } from '../../utils/types';

interface Props {
  data?: ProductRequirement[];
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [] as ProductRequirement[],
  id: '',
});

const localRequirements = ref<ProductRequirement[]>(props.data);

// methods
const addRequirement = () => {
  localRequirements.value.push({ nombre: '' });
};

const deleteRequirement = (index: number) => {
  localRequirements.value.splice(index, 1);
};

defineExpose({
  exposeData: (): ProductRequirement[] => localRequirements.value,
});
</script>

<template>
  <view-card-component
    v-bind="$attrs"
    :controls="false"
    :initial-status="'edit'"
    icon-name="summarize"
    ref="baseCardRef"
    title="Requerimientos"
    @cancel-change="() => {}"
    @edit-change="() => {}"
  >
    <template #edit>
      <div
        v-if="localRequirements.length === 0"
        class="full-width row flex-center text-accent q-gutter-sm q-my-sm"
      >
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span> No existen requerimientos </span>
      </div>
      <div class="col">
        <div
          v-for="(item, index) in localRequirements"
          :key="item.id_requerimiento"
        >
          <div class="row items-center q-my-sm">
            <div class="col-1 text-center">
              <q-btn
                class="q-mx-auto"
                color="negative"
                size="xs"
                round
                icon="remove"
                @click="deleteRequirement(index)"
              />
            </div>
            <q-input
              class="col-11"
              v-model.trim="item.nombre"
              type="text"
              outlined
              dense
              autofocus
              label="Nombre"
              @keyup.enter="addRequirement()"
            />
          </div>
        </div>
        <q-btn
          class="q-my-sm q-px-sm"
          dense
          color="primary"
          icon="add"
          label="Nuevo requerimiento"
          @click="addRequirement"
        />
      </div>
    </template>
    <template #read>
      <div>array to show here...</div>
    </template>
  </view-card-component>
</template>
