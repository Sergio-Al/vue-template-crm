<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CardManufacturerData from '../components/Cards/CardManufacturerData.vue';
import CardManufacturerDocs from '../components/Cards/CardManufacturerDocs.vue';
import DirectionCard from 'src/components/MainCard/DirectionCard.vue';
import AssignedUser from 'src/components/AssignedUsers/AssignedUser.vue';
import ActivitiesComponent from 'src/components/Activities/ActivitiesComponent.vue';
import CommentsList from 'src/components/Comments/CommentsList.vue';
import { userStore } from 'src/modules/Users/store/UserStore';


import { CertificacionBody } from '../utils/types';

interface Props {
  idManufacturer?: string;
  idCertification?:string;
}

interface Emits {
  (e: 'updateView', value: string): void;
  (e: 'create'): void;
}

const { userCRM } = userStore();

const props = withDefaults(defineProps<Props>(), { idCertification: '', idManufacturer:'' });
const emits = defineEmits<Emits>();

const tab = ref(props.idManufacturer ? 'Activities' : 'comentarios');
const commentCreate = ref<string>('');

const cardManufacturerDataRef = ref<InstanceType<
  typeof CardManufacturerData
> | null>(null);
const directionCardComponentRef = ref<InstanceType<
  typeof DirectionCard
> | null>(null);

onMounted(() => {
  emits('updateView', 'ManufacturerData');
});

defineExpose({
  exposeData: (): Partial<CertificacionBody> => ({
    ...cardManufacturerDataRef.value?.exposeData(),
    billing_address_street:
      directionCardComponentRef.value?.captureCurrentData()
        .address_street_generated_c,
  }),
});
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="row q-col-gutter-lg q-pa-md">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <div class="row q-gutter-y-md">
            <CardManufacturerData
              ref="cardManufacturerDataRef"
              :id="props.idManufacturer"
              class="col-12"
            />
            <CardManufacturerDocs
            class="col-12"
            :id="props.idManufacturer"
            />
            <!--<direction-card-component
              ref="directionCardComponentRef"
              hide-extra-banner
              :id-local="props.id"
              :data="{}"
              :options="[]"
              class="col-12"
            />-->
          </div>
        </div>
        <div class="col-12 col-md-6">
          <AssignedUser
            title="Usuario Asignado"
            hide-chip
            ref="assignedSingleUserRef"
            :module="'HANP_Proveedores'"
            :module-id="''"
            @changeUser="() => {}"
            class="col-12"
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
                      :disable="!props.idManufacturer"
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
                      :disable="!props.idManufacturer"
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
                      v-if="!!props.idManufacturer"
                    >
                      <CommentsList
                        :id="props.idManufacturer"
                        :descCRM3="'comentario prueba proveedor'"
                        :modulo="'HANP_Proveedores'"
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
                        :id="props.idManufacturer || ''"
                        :idUser="userCRM.id"
                        module="HANP_Proveedores"
                      ></ActivitiesComponent>
                    </q-tab-panel>
                    <q-tab-panel name="historychanges">
                      <q-card class="my-card">
                        <q-card-section>
                          <div class="text-h6">Historial de cambios</div>
                          <div class="text-subtitle2">Fabricante</div>
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
        v-if="true"
        elevated
        reveal
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-4'"
      >
        <q-toolbar class="justify-center">
          <q-btn color="primary" class="q-mr-md" @click="emits('create')">
            Finalizar
          </q-btn>
        </q-toolbar>
      </q-footer>
    </transition>
  </q-layout>
</template>
