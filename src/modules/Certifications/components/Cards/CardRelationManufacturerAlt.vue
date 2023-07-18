<script lang="ts" setup>
import { ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import RelationDetailCard from 'src/modules/Leads/components/Cards/RelationDetailCard.vue';

import { manufacturerPromise } from '../../utils/dummyData';

interface Props {
  id: string;
  moduleName: string;
  editMode?: boolean;
  errorMessage?: string;
}

interface Emits {
  (e: 'update:id', id: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  moduleName: 'Name Module',
  editMode: false,
  errorMessage: 'Error',
});
const emits = defineEmits<Emits>();

const defaultData = {
  title: '',
  subtitle1: '',
  description: '',
  phone_mobile: '',
  email1: '',
};
const validated = ref(false);

const getContactDetail = async (id: string) => {
  // const response = await getRecordModuleInfo<{
  //   name: string;
  //   assigned_user_name: string;
  //   phone_mobile: string;
  //   email1: string;
  // }>('HANP_Proveedores', id, {
  //   allData: false,
  //   fields: ['name', 'assigned_user_name', 'phone_mobile', 'website'],
  // });
  const response = await manufacturerPromise();

  const contact = {
    title: response.name as string,
    description: response.name as string,
    phone_mobile: response.phone_office,
  };

  return contact;
};

const assignManufacturer = async () => {
  await emits('update:id', '1');
  console.log('here??');

  await execute();
};

const { state, isLoading, execute } = useAsyncState(async () => {
  console.log(props.id);
  if (props.id) {
    const response = await getContactDetail(props.id);
    console.log(response);
    return response;
  }
  return defaultData;
}, defaultData);
</script>

<template>
  <q-card v-if="isLoading" bordered flat>
    <q-list bordered>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="80%" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
  <RelationDetailCard
    v-else-if="!props.id"
    :module-name="moduleName"
    title="No Seleccionado"
    icon="perm_contact_calendar"
    no-data
    :error="!props.id"
    :error-message="props.errorMessage"
  >
    <template v-if="editMode" #options>
      <q-btn
        @click="() => {}"
        class="q-my-xs"
        color="primary"
        icon="open_in_new"
        round
        size="xs"
      />
    </template>
  </RelationDetailCard>
  <!-- <div v-else-if="!props.id">no funciona el relations... :| {{ props }}</div> -->
  <div v-else>con id</div>
  <q-btn
    color="primary"
    icon="check"
    label="asignar id"
    @click="assignManufacturer()"
  />
</template>
