<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useQuasar } from 'quasar';

import ActivitiesComponent from 'src/components/Activities/ActivitiesComponent.vue';
import ViewGeneralSkeleton from 'src/components/Skeletons/ViewGeneralSkeleton.vue';
import CommentsList from 'src/components/Comments/CommentsList.vue';

import CardApplicant from '../components/Cards/CardApplicant.vue';
import CardManufacture from '../components/Cards/CardManufacturer.vue';
import CardProduct from '../components/Cards/CardProduct.vue';
import { useCertificationStore } from '../store/certificationStore';

import type { Certification } from '../utils/types';

interface Props {
  id?: string;
}

interface Emits {
  (e: 'submitComplete', id: string): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const $q = useQuasar();
const certificationStore = useCertificationStore();
const tab = ref(props.id ? 'Activities' : 'comentarios');
const localId = ref(props.id ?? '');
const commentCreate = ref('');

const cardAplicantRef = ref<InstanceType<typeof CardApplicant> | null>(null);
const cardManufactureRef = ref<InstanceType<typeof CardManufacture> | null>(
  null
);
const cardProductRef = ref<InstanceType<typeof CardProduct> | null>(null);

const onSubmit = async () => {
  const cardApplicant = cardAplicantRef.value.exposeData();
  const cardManufacture = cardManufactureRef.value.exposeData();
  const cardProduct = cardProductRef.value.exposeData();
  if (!!localId.value) {
    // update
    if (!!cardApplicant || !!cardManufacture || !!cardProduct) {
      try {
        const body = { ...cardApplicant, ...cardManufacture, ...cardProduct };
        const newCertification =
          await certificationStore.onUpdateCertificationRequest(
            localId.value,
            body
          );
        emits('submitComplete', localId.value);
        execute();
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    // create
    if (!!cardApplicant || !!cardManufacture || !!cardProduct) {
      try {
        const body = {
          ...cardApplicant,
          ...cardManufacture,
          ...cardProduct,
          comentario_creacion: commentCreate.value,
        } as Certification;
        const newCertification =
          await certificationStore.onCreateCertificationRequest(body);
        localId.value = newCertification.id;
        emits('submitComplete', localId.value);
        $q.notify({
          message: 'Se ha guardado correctamente',
          color: 'positive',
        });
        execute();
      } catch (error) {
        $q.notify({
          message: 'Ha ocurrido un error al guardar',
          color: 'negative',
        });
        console.log(error);
      }
    }
  }
};

const { isLoading, execute } = useAsyncState(async () => {
  if (!!localId.value) {
    console.log('here!!!');
    return await certificationStore.onGetCertificationRequest(localId.value);
  }
}, {});

defineExpose({
  isSomeCardEditing: computed(() => {
    return [
      cardAplicantRef.value?.isEditing,
      cardManufactureRef.value?.isEditing,
      cardProductRef.value?.isEditing,
    ].some((value) => !!value);
  }),
  onSubmit,
});
</script>
<template>
  <ViewGeneralSkeleton v-if="isLoading" />
  <div v-else class="row q-col-gutter-lg q-pa-md">
    <div class="col-xs-12 col-sm-12 col-md-6">
      <div class="row q-gutter-y-md">
        <CardApplicant
          :id="localId"
          :data="certificationStore.cardApplicant"
          class="col-12"
          ref="cardAplicantRef"
        />
        <CardManufacture
          :id="localId"
          :data="certificationStore.cardManufacturer"
          class="col-12"
          ref="cardManufactureRef"
        />
        <CardProduct
          :id="localId"
          :data="certificationStore.cardProduct"
          class="col-12"
          ref="cardProductRef"
        />
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="row">
        <div class="q-gutter-y-md col-12">
          <q-card>
            <q-card-section style="padding: 0px">
              <q-tabs
                class="q-ma-none"
                v-model="tab"
                indicator-color="primary"
                :inline-label="!$q.screen.xs"
                :active-color="$q.dark.isActive ? 'orange' : 'primary'"
                align="justify"
                :no-caps="$q.screen.xs ? true : false"
              >
                <q-tab
                  name="Activities"
                  icon="person"
                  label="Actividades"
                  :disable="!localId"
                />
                <q-tab name="comentarios" icon="comment" label="Comentarios" />

                <q-tab
                  name="historychanges"
                  icon="history"
                  label="Historial"
                  :disable="!localId"
                />
              </q-tabs>
              <q-separator />
              <q-tab-panels
                v-model="tab"
                animated
                style="min-height: fit-content"
              >
                <q-tab-panel
                  name="comentarios"
                  style="min-height: 500px"
                  class="q-py-sm"
                  v-if="!!localId"
                >
                  <CommentsList
                    :id="localId"
                    :descCRM3="'comentario prueba empresa'"
                    :modulo="'HANCE_Certficaciones'"
                  >
                  </CommentsList>
                  <!-- <CardComment /> -->
                </q-tab-panel>
                <q-tab-panel
                  name="comentarios"
                  style="min-height: 500px"
                  class="q-pd-sm"
                  v-else
                >
                  <q-input
                    autogrow
                    outlined
                    bottom-slots
                    v-model="commentCreate"
                    placeholder="Escriba su comentario"
                    dense
                    color="primary"
                    ref="commentRef"
                    :rules="[(val) => !!val || 'El campo es requerido']"
                  >
                    <template v-slot:before> </template>
                  </q-input>
                </q-tab-panel>
                <q-tab-panel name="Activities">
                  <!-- <ActivitiesComponent
                    :id="localId"
                    :idUser="'1'"
                    module="HANCE_Certificaciones"
                  ></ActivitiesComponent> -->
                </q-tab-panel>
                <q-tab-panel name="historychanges">
                  <q-card class="my-card">
                    <q-card-section>
                      <div class="text-h6">Historial de cambios</div>
                      <div class="text-subtitle2">Empresa</div>
                    </q-card-section>
                    <q-card-section>
                      Se mostrara el historial de cambios
                    </q-card-section>
                  </q-card>
                </q-tab-panel>
              </q-tab-panels>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6">
      <!-- <AssignedSingleUser2
        ref="assignedSingleUserRef"
        :module="'HANCE_Empresa'"
        :module-id="localId"
        :withList="false"
        @changeUser="onChangeUserAssigned"
      /> -->

      <q-separator inset></q-separator>
    </div>
  </div>
</template>
