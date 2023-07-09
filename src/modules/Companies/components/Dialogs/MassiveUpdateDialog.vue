<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserDivision } from 'src/composables/useLanguage';
import { userStore } from 'src/modules/Users/store/UserStore';
import { HANSACRM3_URL } from 'src/conections/api_conectors';

const { listUsers, getListUsers, filterUsers } = useUserDivision();

const user = userStore();

const data = ref({
  asignado: '',
});

onMounted(async () => {
  await getListUsers(user.userCRM.iddivision);
});

defineExpose({ data });
</script>

<template>
  <div class="row q-col-gutter-sm">
    <q-select
      v-model="data.asignado"
      :options="listUsers"
      label="Representante"
      transition-show="scale"
      transition-hide="scale"
      outlined
      dense
      class="col-md-12 col-sm-12 col-xs-12"
      @filter="filterUsers"
      option-value="id"
      option-label="user_name"
      options-dense
      :map-options="true"
      :emit-value="true"
      use-input
      clearable
    >
      <template v-slot:selected-item="scope">
        <q-item>
          <q-item-section avatar>
            <img
              :src="`${HANSACRM3_URL}/${scope.opt.avatar}`"
              style="width: 20px"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.user_name }}</q-item-label>
            <q-item-label caption>{{ scope.opt.a_mercado }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <img
              :src="`${HANSACRM3_URL}/${scope.opt.avatar}`"
              style="width: 20px"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.user_name }}</q-item-label>
            <q-item-label caption>{{ scope.opt.a_mercado }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <!-- <q-select
      v-model="data.division"
      :options="listDivision"
      label="Division"
      transition-show="flip-up"
      transition-hide="flip-down"
      outlined
      dense
      class="col-md-6 col-sm-12 col-xs-12"
      options-dense
      option-label="label"
      option-value="cod_div"
      :map-options="true"
      :emit-value="true"
    />
    <q-select
      v-model="data.areamercado"
      :options="listMercado"
      label="Area de Mercado"
      transition-show="flip-up"
      transition-hide="flip-down"
      outlined
      dense
      class="col-md-6 col-sm-12 col-xs-12"
      option-value="cod_amercado"
      option-label="label"
      :map-options="true"
      :emit-value="true"
      options-dense
      :disable="data.division == ''"
    />

    <q-select
      v-model="data.estado"
      :options="listEstado"
      label="Estado"
      transition-show="flip-up"
      transition-hide="flip-down"
      outlined
      dense
      class="col-md-6 col-sm-12 col-xs-12"
      option-value="value"
      option-label="label"
      :map-options="true"
      :emit-value="true"
      options-dense
    />

    <q-select
      v-model="data.origen"
      :options="listOrigen"
      label="Origen"
      transition-show="flip-up"
      transition-hide="flip-down"
      outlined
      dense
      class="col-md-6 col-sm-12 col-xs-12"
      option-value="value"
      option-label="label"
      :map-options="true"
      :emit-value="true"
      options-dense
    /> -->
  </div>
  <!-- <pre>{{ data }}</pre> -->
</template>
