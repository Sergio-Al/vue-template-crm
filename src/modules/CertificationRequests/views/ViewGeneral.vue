<script lang="ts" setup>
import { ref, computed } from 'vue';

import type { CertificationRequest } from '../utils/types';
import CardApplicant from '../components/Cards/CardApplicant.vue';
import CardProduct from '../components/Cards/CardProduct.vue';
import AssignedUser from 'src/components/AssignedUsers/AssignedUser.vue';
import { userStore } from 'src/modules/Users/store/UserStore';
import ActivitiesComponent from 'src/components/Activities/ActivitiesComponent.vue';
import CommentsList from 'src/components/Comments/CommentsList.vue';
import { useQuasar } from 'quasar';

interface Props {
  data?: CertificationRequest;
}

interface Emits {
  (e: 'create', value: Partial<CertificationRequest>): void;
  (e: 'update', value: Partial<CertificationRequest>): void;
  (e: 'update-state'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const $q = useQuasar();

// variables
const { userCRM } = userStore();
//const showFooter = ref(false);
const tab = ref(props.data?.id ? 'Activities' : 'comentarios');
const commentCreate = ref<string>('');

const cardApplicantRef = ref<InstanceType<typeof CardApplicant> | null>(null);
const cardProductRef = ref<InstanceType<typeof CardProduct> | null>(null);
const assignedSingleUserRef = ref<InstanceType<
  typeof AssignedUser
> | null>(null);

// computed variables
const isSomeCardEditing = computed(() => {
  const a = [
    cardApplicantRef.value?.isEditing,
    cardProductRef.value?.isEditing,
  ].some((value) => !!value);
  console.log(a);
  console.log('causa');
  if(a){
    emits('update-state')
  }
  return a;
});

const applicantData = computed(() => {
  if (props.data) {
    return { ...props.data };
  }
  return {} as CertificationRequest;
});

const productData = computed(() => {
  if (props.data) {
    return { ...props.data };
  }
  return {} as CertificationRequest;
});

// methods
const onChangeUserAssigned = (id: string) => {
  console.log(id);
};

const validateCards = async () => {
  const validCards: (boolean | undefined)[] = [];

  if (cardApplicantRef.value?.isEditing) {
    const cardApplicantValidation = await cardApplicantRef.value.validateInputs();
    validCards.push(cardApplicantValidation);
  }
  
  if (cardProductRef.value?.isEditing) {
    const cardProductValidation = await cardProductRef.value.validateInputs();
    validCards.push(cardProductValidation);
  }

  return validCards.every((card) => !!card);
};

const onSubmit = async () => {
  const cardApplicantData = cardApplicantRef.value?.exposeData();
  const cardProductData = cardProductRef.value?.exposeData();

  // validation...
  const areCardsValid = await validateCards();
  if (!areCardsValid) {
    $q.notify({
      type: 'warning',
      message: 'Error de validación',
      caption: 'Algunos campos necesitan ser llenados',
    });
    return;
  }
  else if(!cardProductData?.referencia_prods){
    $q.notify({
      type: 'warning',
      message: 'Error de validación',
      caption: 'Debe adicionar al menos un item',
    });
    return;
  }

  const body: Partial<CertificationRequest> = {
    ...props.data,
    ...cardApplicantData,
    ...cardProductData,
    assigned_user_id: assignedSingleUserRef.value?.assignedUser.id || '1',
  };

  // send data
  if (!!props.data?.id) {
    emits('update', body);
  } else {
    body.description = commentCreate.value;
    body.date_entered = new Date().toISOString();
    emits('create', body);
  }

  defineExpose({
    isSomeCardEditing,
});
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="row q-col-gutter-lg q-pb-sm q-pl-sm q-pr-sm">
        <div class="col-xs-12 col-sm-12 col-md-6 q-pt-sm">
          <div class="row q-gutter-y-md">
            <CardApplicant
              class="col-12"
              :id="data?.id || ''"
              :data="applicantData"
              ref="cardApplicantRef"
            />
            <CardProduct
              class="col-12"
              :id="data?.id || ''"
              :data="productData"
              ref="cardProductRef"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 q-pt-sm">
          <AssignedUser
            :title="'Solicitante'"
             ref="assignedSingleUserRef"
            :module="'HANCE_SolicitudCertificacion'"
            :module-id="props.data?.id || ''"
            @changeUser="onChangeUserAssigned"
          />
          <q-separator inset></q-separator>
          <div class="row q-mt-md">
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
                      :disable="!props.data?.id"
                    />
                    <q-tab
                      name="comentarios"
                      icon="comment"
                      label="Comentarios"
                    />

                    <q-tab
                      name="historychanges"
                      icon="history"
                      label="Historial"
                      :disable="!props.data?.id"
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
                      v-if="!!props.data?.id"
                    >
                      <CommentsList
                        :id="props.data?.id"
                        :descCRM3="'comentario prueba certificacion'"
                        :modulo="'HANCE_SolicitudCertificacion'"
                      >
                      </CommentsList>
                      <!-- <CardComment /> -->
                    </q-tab-panel>
                    <q-tab-panel
                      name="comentarios"
                      style="min-height: 300px"
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
                      />
                    </q-tab-panel>
                    <q-tab-panel name="Activities">
                      <ActivitiesComponent
                        :id="props.data?.id || ''"
                        :idUser="userCRM.id"
                        :module="'HANCE_SolicitudCertificacion'"
                      ></ActivitiesComponent>
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
      </div>
    </q-page-container>

    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <q-footer
        v-if="isSomeCardEditing"
        elevated
        reveal
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-4'"
      >
        <q-toolbar class="justify-center">
          <q-btn color="primary" class="q-mr-md" @click="onSubmit">
            Guardar
          </q-btn>
          <q-btn color="negative" v-close-popup>Cancelar</q-btn>
        </q-toolbar>
      </q-footer>
    </transition>
  </q-layout>
</template>
