<script lang="ts">
import { AlertComponent } from 'src/components';
import { Notification } from 'src/composables';
import { useDialogTabs } from 'src/composables/Dialog/useDialog';
import { computed, ref, watch, onMounted } from 'vue';
import { useCertificationsTableStore } from '../../store/useCertificationTableStore';
import { useCertificationStore } from '../../store/certificationStore';
import ViewGeneral from '../../views/ViewGeneral.vue';
import ViewGeneralData from '../../views/ViewGeneralData.vue';
import ViewDataManufacturer from '../../views/ViewDataManufacturer.vue';
import ViewGeneralSkeleton from 'src/components/Skeletons/ViewGeneralSkeleton.vue';
import { Certification } from '../../utils/types';
import { getCertificationRequest } from '../../services/useCertificationsService';
</script>

<script lang="ts" setup>
//* variables
const tabsDefinition = [
  {
    name: 'dataGeneral',
    component: ViewGeneralData,
    label: 'Información General',
    enabledForCreation: true,
  },
  {
    name: 'dataManufacturer',
    component: ViewDataManufacturer,
    label: 'Fabricante',
    enabledForCreation: false,
  },
];

const showCloseAlert = ref(false);
const activeTab = ref('dataGeneral');
const certificationStore = useCertificationStore();
const certificationTableStore = useCertificationsTableStore();

//* Composable values
const {
  id,
  open,
  titleDialog,
  iconDialog,
  activeTabName,
  activeTabComponent,
  swapCurrentTab,
  openDialogTab,
  resetValues,
} = useDialogTabs(tabsDefinition, {
  titleDialog: 'Solicitud de Certificación',
  iconDialog: 'pen',
});

const certificationData = ref({} as Certification);
const loadingInfo = ref(false);
const currentView = ref('');
//* reference variables
const generalFormRef = ref<InstanceType<typeof ViewGeneral> | null>(null);
//* computed variables
const isEditing = computed(() => !!generalFormRef.value?.isSomeCardEditing);
//* methods
const clearData = () => {
  console.log('cleaning data');
  id.value = '';
  certificationStore.clearData();
  resetValues();
};

const saveCurrentForm = async () => {
  try {
    await generalFormRef.value?.onSubmit();
  } catch (error) {
    Notification('negative', 'Error al guardar', '');
  }
};

const onCloseDialog = () => {
  console.log('On close dialog');
  open.value = false;
};

const updateData = (idValue: string) => {
  certificationTableStore.reloadList();
  id.value = idValue;
  titleDialog.value = 'Detalles';
};

const assignCurrentView = (page: string) => {
  currentView.value = page;
};

watch(id, async (id: string) => {
  if (!id) {
    try {
      loadingInfo.value = true;
      const response = await getCertificationRequest(id);
      console.log(response);
      certificationData.value = response;
    } catch (error) {
    } finally {
      loadingInfo.value = false;
    }
  }
});

onMounted(async () => {
  if (!id.value) {
    try {
      loadingInfo.value = true;
      const response = await getCertificationRequest(id.value);
      console.log(response);
      certificationData.value = response;
    } catch (error) {
    } finally {
      loadingInfo.value = false;
    }
  }
});

defineExpose({
  clearData,
  openDialogTab,
});
</script>

<template>
  <dialog-component
    size-dialog="dialog-xl"
    v-model="open"
    :footerDisabled="true"
    :headerDisabled="false"
    :iconDialog="iconDialog"
    :persistent="false"
    @before-hide="clearData"
  >
    <template #header>
      <!-- <q-card class="bg-primary" flat>
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card> -->
      <q-toolbar
        class="header-dialog"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
      >
        <q-icon name="shield" class="q-ml-md" color="white" size="md"></q-icon>

        <q-toolbar-title
          class="header-dialog"
          :class="$q.dark.isActive ? 'text-red' : 'text-white'"
        >
          <div class="flex">
            <span>{{ `${titleDialog}` }}</span>
          </div>
        </q-toolbar-title>
        <q-btn
          class="q-ml-md"
          dense
          flat
          color="white"
          :icon="!$q.screen.xs ? 'close' : 'arrow_forward'"
          @click="onCloseDialog"
        >
          <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-tabs
        v-model="activeTab"
        @update:modelValue="swapCurrentTab"
        inline-label
        mobile-arrows
        :class="
          $q.dark.isActive ? 'bg-dark' : 'bg-primary text-grey-6 text-bold'
        "
        indicator-color="deep-orange-4"
        active-color="white"
        align="justify"
        dense
        narrow-indicator
        v-if="tabsDefinition.length > 1"
      >
        <q-tab
          v-for="(tab, index) in tabsDefinition"
          :key="index"
          :name="tab.name"
          :label="tab.label"
        >
        </q-tab>
      </q-tabs>
    </template>
    <template #body>
      <q-toolbar
        class="header-dialog"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
      ></q-toolbar>

      <q-page
        :class="$q.platform.is.mobile ? 'q-pa-none' : 'q-pa-none'"
        style="margin-top: -50px"
      >
        <!-- <ViewGeneralSkeleton /> -->
        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="dataGeneral">
            <ViewGeneralData
              @submitComplete="updateData"
              @update-view="assignCurrentView"
              ref="generalFormRef"
            />
          </q-tab-panel>
          <q-tab-panel name="dataManufacturer">
            <ViewDataManufacturer />
          </q-tab-panel>
        </q-tab-panels>
        <!-- <component
          :is="activeTabComponent"
          :id="id"
          @submitComplete="updateData"
          @update-view="assignCurrentView"
          ref="generalFormRef"
        /> -->
      </q-page>
    </template>
  </dialog-component>

  <!-- ******alert antes de cerrar -->
  <AlertComponent
    title="¿Cerrar Formulario?"
    icon="warning"
    iconColor="warning"
    iconSize="50px"
    btn-color="primary"
    btn-text="Si, salir"
    v-model="showCloseAlert"
    @confirm="onCloseDialog"
    @denegate="showCloseAlert = false"
  >
    <template #body>
      <span class="q-py-sm">
        Si cierra la edición se perderán los datos no guardados
      </span>
    </template>
  </AlertComponent>
</template>
