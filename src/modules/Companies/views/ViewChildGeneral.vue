<script lang="ts">
// vue-quasar-libraries
import { Loading, QInput } from 'quasar';
import { computed, ref } from 'vue';

// global-components

import { useChildCompaniesStore } from '../store/childCompanyStore';
import CommentsList from 'src/components/Comments/CommentsList.vue';
import ViewGeneralSkeleton from 'src/components/Skeletons/ViewGeneralSkeleton.vue';
import ActivitiesComponent from 'src/components/Activities/ActivitiesComponent.vue';

// module-components
import CardDocuments from '../components/Cards/CardDocuments.vue';
import CardInfo from '../components/Cards/ChildCompany/CardInfo.vue';
import CardContact from '../components/Cards/ChildCompany/CardContact.vue';

// module-files
import { useAsyncState } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ChildCompany, Company } from '../utils/types';
import DirectionCard from 'src/components/MainCard/DirectionCard.vue';
import CardDelegate from '../components/Cards/CardDelegate.vue';
</script>
<script lang="ts" setup>
const props = defineProps<{
  id?: string;
}>();

const childCompanyStore = useChildCompaniesStore();
const { childPayload, cardInfo, cardContact } = storeToRefs(childCompanyStore);

const tab = ref(props.id ? 'Activities' : 'comentarios');
const localId = ref(props.id ?? '');
const commentCreate = ref('');

const cardInfoRef = ref<InstanceType<typeof CardInfo> | null>(null);
const cardContactRef = ref<InstanceType<typeof CardContact> | null>(null);
const cardDocumentsRef = ref<InstanceType<typeof CardDocuments> | null>(null);
const directionCardComponentRef = ref<InstanceType<
  typeof DirectionCard
> | null>(null);
const cardDelegateRef = ref<InstanceType<typeof CardDelegate> | null>(null);

const commentRef = ref<InstanceType<typeof QInput> | null>(null);

const isSomeCardEditing = computed(() => {
  return [
    // infoCardRef.value?.isEditing,
    // leadRelationsRef.value?.isEditing
    cardContactRef.value?.isEditing,
    cardInfoRef.value?.isEditing,
    directionCardComponentRef.value?.isEditing,
    cardDelegateRef.value?.isEditing,
  ].some((value) => !!value);
});

const { isLoading, execute } = useAsyncState(async () => {
  if (!!localId.value) {
    return await childCompanyStore.onGetChildCompany(localId.value);
  }
}, {} as ChildCompany);

// const validateCards = async () => {
//   const validCards: (boolean | undefined)[] = [];
//   if (infoCardRef.value?.isEditing) {
//     const infoCardValidation = await infoCardRef.value.validateInputs();
//     validCards.push(infoCardValidation);
//   }
//   if (!localId.value) {
//     const firstCommentValidation = await commentRef.value?.validate();
//     validCards.push(firstCommentValidation);
//   }
//   return validCards.every((card) => !!card);
// };

const onSubmit = async (parentId: string) => {
  // Validar datos...
  // const areCardsValid = await validateCards();
  // if (!areCardsValid) {
  //   $q.notify({
  //     type: 'warning',
  //     message: 'Error de validación',
  //     caption: 'Algunos campos necesitan ser llenados',
  //   });
  //   return;
  // }

  // Verificar si existe un id por localId
  if (!!localId.value) {
    // actualizar datos si existe localId
    const cardInfoData = cardInfoRef.value?.exposeUpdateData();
    const cardContactData = cardContactRef.value?.exposeUpdateData();
    const directionData = directionCardComponentRef.value?.captureCurrentData();
    const user_id_c = cardDelegateRef.value?.exposeData();

    if (!!cardInfoData || !!cardContactData) {
      try {
        const body = {
          ...cardInfoData,
          ...cardContactData,
          direccion_c: directionData?.address_street_generated_c,
          user_id_c: user_id_c || '',
        } as ChildCompany;

        await childCompanyStore.onUpdateChildCompany(localId.value, body);
        emits('submitComplete', localId.value);
        await execute();
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    const cardInfoData = cardInfoRef.value?.exposeData();
    const cardContactData = cardContactRef.value?.exposeData();
    const directionData = directionCardComponentRef.value?.captureCurrentData();
    const user_id_c = cardDelegateRef.value?.exposeData();

    if (!!cardInfoData || !!cardContactData) {
      try {
        Loading.show({
          message: 'Guardando Información',
        });

        const body = {
          ...cardInfoData,
          ...cardContactData,
          direccion_c: directionData?.address_street_generated_c || '',
          user_id_c: user_id_c || '',
          comment: commentCreate.value,
        } as ChildCompany;

        const newCompany = await childCompanyStore.onCreateChildCompany(
          parentId,
          body
        );

        localId.value = newCompany.id;
        emits('submitComplete', localId.value);
        await execute();
      } catch (error) {
        console.log(error);
      }
    }
  }
};

const updateAssigned = async (id: string | null) => {
  try {
    console.log(id);
    if (!!id) {
      await childCompanyStore.onUpdateChildCompany(localId.value, {
        user_id_c: id,
      });
      await execute();
    }
  } catch (error) {
    console.log(error);
  }
};

// Funciones que se podran usar al declarar una referencia de este componente
defineExpose({
  onSubmit,
  isSomeCardEditing,
});

const emits = defineEmits<{
  (event: 'submitComplete', values: string): void;
  (event: 'pruebaRefrescar'): void;
  (event: 'submitFail', values: string, options?: object): void;
}>();
</script>
<template>
  <ViewGeneralSkeleton v-if="isLoading" />
  <div v-else class="row q-col-gutter-lg q-pa-md">
    <div class="col-xs-12 col-sm-12 col-md-6">
      <div class="row q-gutter-y-md">
        <CardInfo
          :data="cardInfo"
          :id="localId"
          class="col-12"
          ref="cardInfoRef"
        />
        <CardContact
          :data="cardContact"
          :id="localId"
          class="col-12"
          ref="cardContactRef"
        />

        <direction-card-component
          ref="directionCardComponentRef"
          :id-local="localId"
          :data="{
            address_street_generated_c: !!childPayload
              ? childPayload.direccion_c
              : '',
            latitude: 0,
            longitude: 0,
          }"
          hide-extra-banner
          :options="[]"
          class="col-12"
        />
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="row q-gutter-y-md">
        <CardDelegate
          class="col-12"
          ref="cardDelegateRef"
          child
          :id="localId"
          :show-controls="!!localId"
          :user-id="childPayload ? childPayload.assigned_user_id : ''"
          @update="updateAssigned"
        />
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
                    :descCRM3="'comentario prueba empresa participación'"
                    :modulo="'HANCE_EmpresaParticipacion'"
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
                  <ActivitiesComponent
                    :id="localId"
                    :idUser="cardInfo.user_id"
                    module="HANCE_EmpresaParticipacion"
                  ></ActivitiesComponent>
                </q-tab-panel>
                <q-tab-panel name="historychanges">
                  <q-card class="my-card">
                    <q-card-section>
                      <div class="text-h6">Historial de cambios</div>
                      <div class="text-subtitle2">Sub Empresa</div>
                    </q-card-section>
                    <q-card-section>
                      Se mostrara el historial de cambios
                    </q-card-section>
                  </q-card>
                </q-tab-panel>
                <q-tab-panel name="historychanges" v-if="!!localId">
                  <ViewChangecontrol :id="localId"></ViewChangecontrol>
                </q-tab-panel>
                <q-tab-panel name="historychanges" v-else>
                  <ViewChangecontrol :id="'0'"></ViewChangecontrol>
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
