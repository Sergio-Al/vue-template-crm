<script setup lang="ts">
import { ref } from 'vue';

import {
  useCertificationsTableStore,
  userCRM,
} from '../store/useCertificationTableStore';
import AdvancedFilter from '../components/AdvancedFilter/AdvancedFilter.vue';

import { HANSACRM3_URL } from 'src/conections/api_conectors';
import CertificationDialog from '../components/Dialogs/CertificationDialog.vue';
import moment from 'moment';
import { CertificacionBody } from '../utils/types';

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

const onClearDataFilter = async () => {
  try {
    // filterAdvancedRef.value?.clearFilter();
    await table.clearFilterData();
    await table.setFilterData();
    await table.reloadList();
  } catch (error) {
    throw error;
  }
};

const setEtapaColor = (etapa: string): string => {
  const colorMap: { [key: string]: string } = {
    Nueva: 'orange',
    Revisión: 'blue',
    'Enviada a Misa': 'info',
    Finalizada: 'green',
  };

  return colorMap[etapa] || 'blue';
};

const setTipoColor = (tipo: string): string => {
  const colorMap: { [key: string]: string } = {
    dispositivo: 'blue',
    equipo: 'purple',
    medicamento: 'green',
    cosmetico: 'black',
  };

  return colorMap[tipo] || 'grey';
};

const openDialog = () => {
  // certificationDialogRef.value?.openDialogTab(undefined, undefined, {
  //   solicitudId: '33', // id de prueba
  // });
  certificationDialogRef.value?.openDialogTab();
};

const openItemSelected = (id: string, title: string) => {
  console.log(id)
  console.log(title)
  certificationDialogRef.value?.openDialogTab(id, {
    iddivision_c: userCRM.iddivision, title
  });
};
</script>

<template>
  <div :class="$q.platform.is.desktop ? 'q-pa-md' : 'q-pa-sm'">
    <q-card>
      <q-tabs
        v-model="table.state_tab"
        align="justify"
        dense
        class="text-grey-7"
        active-color="primary"
        indicator-color="orange"
        @click="reloadList()"
      >
        <q-tab name="" label="TODAS" />
        <q-tab name="revision" label="REVISIÓN" />
        <q-tab name="enviadamisa" label="ENVIADA A MISA" />
        <q-tab name="finalizada" label="FINALIZADA" />
      </q-tabs>
    </q-card>

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
          <q-td key="name" :props="propsTable" :style="'width: 100px;'">
            <span
              class="text-primary text-weight-bold text-break cursor-pointer"
              @click="openItemSelected(propsTable.row.id, propsTable.row.name)"
            >
              {{ propsTable.row.name }}
            </span>
          </q-td>
          <q-td key="tipo_tramite_c" :props="propsTable">
            <span>{{ propsTable.row.tipo_tramite_c }}</span>
          </q-td>
          <q-td key="solicitante" :props="propsTable">
            <div
              style="
                max-width: 150px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              class="row"
            >
              <div class="col-3">
                <q-avatar
                  class="q-mr-sm"
                  size="sm"
                  color="primary"
                  text-color="white"
                  icon="person"
                />
              </div>
              <div class="col-9">
                <span>{{ propsTable.row.solicitante }}</span>
                <br />
                <span class="text-caption text-grey">{{
                  propsTable.row.cargo
                }}</span>
              </div>
            </div>
          </q-td>
          <q-td key="tipo_producto_c" :props="propsTable">
            <div class="row flex-center" v-if="propsTable.row.tipo_producto_c">
              <q-chip
                dense
                square
                outline
                :color="setTipoColor(propsTable.row.tipo_producto_c)"
              >
                {{ propsTable.row.tipo_producto_c.toUpperCase() }}
              </q-chip>
              <span class="text-caption"
                >Cant. de Requisitos
                <span class="text-weight-bold">10</span></span
              >
            </div>
          </q-td>
          <q-td key="etapa_c" :props="propsTable">
            <div class="row flex-center">
              <q-chip
                v-if="propsTable.row.etapa_c"
                dense
                square
                outline
                :color="setEtapaColor(propsTable.row.etapa_c)"
                text-color="white"
              >
                {{ propsTable.row.etapa_c.toUpperCase() }}
              </q-chip>
            </div>
          </q-td>
          <q-td key="estado_c" :props="propsTable">
            <span>{{ propsTable.row.estado_c }}</span>
            <div class="text-caption">
              <span class="text-weight-bold">Fecha de Actualización:</span
              >{{ propsTable.row.fecha_actualizacion_estado }}
            </div>
          </q-td>
          <q-td
            v-if="propsTable.row.fecha_creacion"
            key="fecha_creacion"
            :props="propsTable"
          >
            <span>{{ propsTable.row.fecha_creacion }}</span>
          </q-td>
          <q-td key="cumplimiento_req" :props="propsTable">
            <q-linear-progress rounded size="15px" :value="0.6">
              <div class="absolute-full flex flex-center">
                <span class="text-white text-caption">60%</span>
              </div>
            </q-linear-progress>
          </q-td>
          <q-td key="producto_c" :props="propsTable">
            <div class="row flex-center">
              <span>{{ propsTable.row.producto_c }}</span>
              <div class="text-caption">
                <span class="text-bold">Fabricante: </span>
                {{ propsTable.row.proveedor }}
              </div>
            </div>
          </q-td>
          <q-td key="nro_solicitud" :props="propsTable">
            <span
              v-if="propsTable.row.nro_solicitud"
              class="text-primary text-weight-bold"
              >{{ propsTable.row.nro_solicitud }}</span
            >
            <span v-else class="text-grey">En espera</span>
          </q-td>
          <q-td key="certificacion" :props="propsTable">
            <div class="row flex-center">
              <q-badge
                v-if="propsTable.row.nro_cert_c"
                rounded
                color="info"
                class="q-py-sm q-px-md cursor"
              >
                <q-icon class="q-mr-sm text-h6" name="text_snippet"></q-icon>
                {{ propsTable.row.nro_cert_c }}
              </q-badge>
              <span v-else class="text-grey">En espera</span>
            </div>
          </q-td>
          <q-td key="options" :props="propsTable">
            <q-btn color="primary" icon="more_vert" round outline size="sm">
              <q-menu auto-close :offset="[110, 0]">
                <q-list dense>
                  <q-item clickable>
                    <div class="row items-center">
                      <q-icon name="remove" class="q-mr-sm" />
                      <q-item-section>Eliminar</q-item-section>
                    </div>
                  </q-item>
                  <q-item clickable>
                    <div class="row items-center">
                      <q-icon name="info" class="q-mr-sm" />
                      <q-item-section>Ver</q-item-section>
                    </div>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
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
              @click="openDialog(propsTable.row.id)"
            >
              {{ propsTable.row.name }}
            </span>
            <q-space />
            <!-- <q-btn icon="more_vert" dense flat size="sm" /> -->
          </q-card-section>
          <q-separator />
          <!--<q-card-section horizontal>
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
              </q-circular-progress>-->

          <!--<q-circular-progress
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
          <!--</q-card-section>
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
          </q-card-section>-->
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

.text-break {
  width: 300px;
  line-break: auto;
  white-space: normal;
  font-size: 1.1em;
}
</style>
