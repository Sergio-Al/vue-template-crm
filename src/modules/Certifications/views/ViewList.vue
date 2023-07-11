<script setup lang="ts">
import { ref } from 'vue';

import { useCertificationsTableStore } from '../store/useCertificationTableStore';
import AdvancedFilter from '../components/AdvancedFilter/AdvancedFilter.vue';

import { HANSACRM3_URL } from 'src/conections/api_conectors';
import CertificationDialog from '../components/Dialogs/CertificationDialog.vue';

const table = useCertificationsTableStore();
const { setVisibleColumn, getListCertifications, reloadList, setPagination } =
  useCertificationsTableStore();

const onSubmitDataFilter = () => {
  try {
    table.data_filter = advancedFilterRef.value?.dataFilter;
    table.setFilterData();
    table.reloadList();
  } catch (error) {
    throw error;
  }
};

const advancedFilterRef = ref<InstanceType<typeof AdvancedFilter> | null>(null);
const certificationDialogRef = ref<InstanceType<
  typeof CertificationDialog
> | null>(null);

// const updateMassiveRef = ref<InstanceType<
//   typeof UpdateMassiveComponent
// > | null>(null);

const onUpdateMultiple = (selected: { [key: string]: string }[]) => {
  const items = selected.map((el: { [key: string]: string }) => {
    return { id: el.id };
  });
  // const data = <UpdateMassiveModel>updateMassiveRef.value?.getData();
  // table.updateMultiple(data, items);
};

const onDeleteMultiple = async (selected: { [key: string]: string }[]) => {
  const items = selected.map((el: { [key: string]: string }) => {
    return { id: el.id };
  });
  await table.deleteMultiple(items);
  table.reloadList();
};

const onUpdateDataTable = async () => {
  try {
    await reloadList();
  } catch (error) {
    throw error;
  }
};

const onRequestTable = async (val: { pagination: any; filter: any }) => {
  //console.log('request data table');
  await setPagination(val.pagination);
  await getListCertifications(val);
};

const onClearDataFilter = () => {
  try {
    // filterAdvancedRef.value?.clearFilter();
    console.log('here!!!');
    table.clearFilterData();
    table.setFilterData();
    table.reloadList();
  } catch (error) {
    throw error;
  }
};

const setEtapaColor = (etapa: string): string => {
  const colorMap: { [key: string]: string } = {
    Nueva: 'orange',
    Revision: 'blue',
    Finalizada: 'green',
  };

  return colorMap[etapa] || 'grey';
};

const openDialog = () => {
  certificationDialogRef.value?.openDialogTab();
};

const openItemSelected = (id: string, title: string) => {
  certificationDialogRef.value?.openDialogTab(id, title);
};
</script>

<template>
  <div :class="$q.platform.is.desktop ? 'q-pa-md' : 'q-pa-sm'">
    <table-component
      :rows="table.data_table.rows"
      :columns="table.data_table.columns"
      :total="table.pagination.rowsNumber"
      :rowsPerPage="table.pagination.rowsPerPage"
      :sortBy="table.pagination.sortBy"
      :descending="table.pagination.descending"
      :visible="table.visible_columns"
      :dataFilter="table.data_filter"
      :loading="table.loading"
      :defaultRows="false"
      :style="'height: 95dvh'"
      searchPlaceholder="Busqueda por: Nro. de solicitud"
      @visibleColumns="setVisibleColumn"
      @submitFilter="onSubmitDataFilter"
      @updateMultiple="onUpdateMultiple"
      @deleteMultiple="onDeleteMultiple"
      @updateData="onUpdateDataTable"
      @update:props="onRequestTable"
      @clearFilter="onClearDataFilter"
      @openDialog="openDialog"
      v-if="true"
    >
      <template #rows="{ propsTable }">
        <q-tr :props="propsTable">
          <q-td class="text-left">
            <q-checkbox v-model="propsTable.selected" flat dense />
          </q-td>
          <q-td
            key="nro_solicitud"
            :props="propsTable"
            :style="'width: 100px;'"
          >
            <span
              class="text-blue-9 cursor-pointer"
              @click="
                openItemSelected(
                  propsTable.row.id,
                  propsTable.row.name
                )
              "
            >
              {{ propsTable.row.name }}
            </span>
          </q-td>
          <q-td key="etapa" :props="propsTable">
            <div class="column">
              <div>
                <q-badge
                  :color="setEtapaColor(propsTable.row.etapa_c)"
                  :label="propsTable.row.etapa_c"
                />
              </div>
              <span class="text-caption">{{
                propsTable.row.fecha_creacion
              }}</span>
              <span class="text-caption"
                >Estado: {{ propsTable.row.estado_c }}</span
              >
            </div>
          </q-td>

          <q-td key="tipo_tramite" :props="propsTable">
            {{ propsTable.row.tipo_tramite_c }}
          </q-td>
          <q-td key="delegate" :props="propsTable">
            <div class="row items-center">
              <div class="col-2">
                <q-avatar
                  size="24px"
                  font-size="24px"
                  color="primary"
                  text-color="white"
                  icon="person"
                />
              </div>
              <div class="column q-pl-sm ellipsis col-10">
                <span class="ellipsis-item">
                  NOMBRE RESP{{ propsTable.row.solicitante }}
                </span>
                <span class="ellipsis-item text-caption">
                  CARGO{{
                    propsTable.row.solicitante
                  }}
                </span>
              </div>
            </div>
          </q-td>
          <q-td key="id_producto" :props="propsTable">
            <div class="column">
              <span>
                {{ propsTable.row.product_c }}
              </span>
              <span class="text-caption">Fabricante 0</span>
            </div>
          </q-td>
          <q-td key="id_tipo_producto" :props="propsTable">
            <div class="column">
              <span>
                {{ propsTable.row.id_tipo_producto_c }}
              </span>
              <span class="text-caption">Cantidad de requisitos: 0</span>
            </div>
          </q-td>
          <q-td key="aprobacion" :props="propsTable">
            <div class="column">
              <span> {{ propsTable.row.aprobacion }}% </span>
            </div>
          </q-td>
          <q-td key="id" :props="propsTable">
            <div class="column">
              <span> Cod Misa: {{ propsTable.row.id }} </span>
              <span> Nro de Ruta: {{ propsTable.row.id }} </span>
              <span v-if="true" class="text-green">
                Nro Cert: {{ propsTable.row.id }}
              </span>
            </div>
          </q-td>
        </q-tr>
      </template>

      <template #item-rows="{ propsTable }">
        <q-card
          :class="propsTable.selected ? 'bg-grey-2' : ''"
          class="q-ma-sm border-rounded q-pa-md"
        >
          <q-card-section class="flex items-center q-pa-sm">
            <q-checkbox flat v-model="propsTable.selected" dense />
            <span
              class="q-ml-md text-ellipsis text-blue-10 cursor-pointer"
              @click="
                openItemSelected(
                  propsTable.row.id,
                  propsTable.row.name
                )
              "
            >
              {{ propsTable.row.name }}
            </span>
            <q-space />
            <!-- <q-btn icon="more_vert" dense flat size="sm" /> -->
          </q-card-section>
          <q-separator />
          <q-card-section horizontal>
            <q-card-section class="card-info row q-pa-sm">
              <div class="text-grey-9 col-12">
                <small class="text-grey-6"> Cuenta</small> <br />
                <span class="text-blue-10" v-if="propsTable.row.account_id_c">
                  {{ propsTable.row.account_name }}
                </span>
                <span class="text-blue-10" v-else>
                  {{ '< Ninguno >' }}
                </span>
              </div>
              <div class="text-grey-9 col-12">
                <small class="text-grey-6">Monto de contrato</small> <br />
                {{ propsTable.row.monto_contrato_c ?? 0 }} $
              </div>
            </q-card-section>

            <q-card-section class="q-pa-sm text-center">
              <q-circular-progress
                show-value
                font-size="15px"
                :value="0"
                size="90px"
                :thickness="0.2"
                color="blue-8"
                track-color="grey-3"
                class="q-ma-sm text-bold"
                rounded
                v-if="propsTable.row.status == 'Draft'"
              >
                <span>
                  <q-icon name="priority_high" size="50px" color="grey-5" />
                </span>
              </q-circular-progress>
              <!-- <q-circular-progress
                show-value
                font-size="15px"
                :value="propsTable.row.salud ?? 0"
                size="90px"
                :thickness="0.2"
                color="blue-8"
                track-color="grey-3"
                class="q-ma-sm text-bold"
                rounded
                @click="onGetIndicators(propsTable.row.id)"
                v-else
              >
                <span> {{ propsTable.row.salud ?? 0 }}% </span>
              </q-circular-progress>
              <div class="q-mt-sm col-12">
                <q-badge
                  class="q-pa-sm text-bold"
                  v-bind="setStatusColor(propsTable.row.status)"
                >
                  <q-icon :name="setStatusColor(propsTable.row.status)?.icon" />

                  <small class="q-ml-xs">
                    {{ propsTable.row.estado }}
                  </small>
                </q-badge>
              </div> -->
            </q-card-section>
          </q-card-section>
          <q-card-section class="flex justify-between q-pa-sm">
            <span class="text-grey-7">
              <small>Fecha inicio</small> <br />
              <q-icon name="event" size="sm" color="grey-7" />
              {{ propsTable.row.fecha_inicio }}
            </span>
            <span class="text-grey-7">
              <small>Fecha cierre</small> <br />
              <q-icon name="event" size="sm" color="grey-7" />
              {{ propsTable.row.fecha_cierre }}
            </span>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:buttons>
        <q-btn
          color="primary"
          label="Nuevo"
          v-if="!$q.screen.xs"
          @click="openDialog()"
        >
        </q-btn>
        <q-page-sticky :offset="[18, 0]" position="bottom-right" v-else>
          <q-btn fab color="primary" icon="add" @click="openDialog()" />
        </q-page-sticky>
      </template>
      <template #updateContent>
        <UpdateMassiveComponent ref="updateMassiveRef" />
      </template>
      <template #filterContent>
        <AdvancedFilter
          ref="filterAdvancedRef"
          @submitFilter="onSubmitDataFilter"
        />
      </template>
    </table-component>
    <TableSkeleton v-else />
  </div>
  <CertificationDialog ref="certificationDialogRef" />
</template>

<style lang="scss" scoped>
.ellipsis-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
