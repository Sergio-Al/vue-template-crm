<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useCertificationRequestTableStore } from '../store/useCertificationRequestTableStore';
import AdvancedFilter from '../components/AdvancedFilter/AdvancedFilter.vue';

import { HANSACRM3_URL } from 'src/conections/api_conectors';
import CertificationRequestDialog from '../components/Dialogs/CertificationRequestDialog.vue';
import CertificationDialog from '../components/Dialogs/CertificationDialog.vue';

interface Props {
  nameModule: string;
  idUser?: string;
  menu?: boolean;
}

const props = defineProps<Props>();

const tab = ref('');
const state = ref('');

// const table = useCertificationRequestTableStore();
// const { setVisibleColumn, getListCertifications, reloadList, setPagination } =
//   useCertificationsTableStore();

const certificationRequestTableStore = useCertificationRequestTableStore();
const {
  data_filter,
  data_table,
  loading,
  mongo_id,
  pagination,
  visible_columns,
  visible_fields,
} = storeToRefs(certificationRequestTableStore);
const {
  clearFilterData,
  deleteMultiple,
  getListCertificationRequest,
  getUserConfig,
  reloadList,
  setFilterData,
  setPagination,
  setVisibleColumn,
  setVisibleField,
  updateMultiple,
} = certificationRequestTableStore;

const onSubmitDataFilter = () => {
  try {
    if (!advancedFilterRef.value?.dataFilter) {
      console.log('no data on dataFilter', advancedFilterRef.value?.dataFilter);
      return;
    }
    data_filter.value = advancedFilterRef.value?.dataFilter;
    setFilterData();
    reloadList();
  } catch (error) {
    throw error;
  }
};

const advancedFilterRef = ref<InstanceType<typeof AdvancedFilter> | null>(null);
const certificationDialogRef = ref<InstanceType<
  typeof CertificationDialog
> | null>(null);

const certificationRequestDialogRef = ref<InstanceType<
  typeof CertificationRequestDialog
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
  await deleteMultiple(items);
  reloadList();
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
  await getListCertificationRequest(val);
};

const onClearDataFilter = () => {
  try {
    // filterAdvancedRef.value?.clearFilter();
    clearFilterData();
    setFilterData();
    reloadList();
  } catch (error) {
    throw error;
  }
};

const setEtapaColor = (etapa: string): string => {
  const colorMap: { [key: string]: string } = {
    Nueva: 'orange',
    Revisión: 'blue',
    Finalizada: 'green',
  };

  return colorMap[etapa] || 'blue';
};

const setEstadoColor = (estado: string): string => {
  const colorEstado: { [key: string]: string } = {
    Pendiente: 'amber',
    Aprobado: 'green',
    Rechazado: 'red',
  };

  return colorEstado[estado] || 'blue';
};

const setTipoColor = (tipo: string): string => {
  const colorMap: { [key: string]: string } = {
    DISPOSITIVO: 'green',
    EQUIPO: 'blue',
    MEDICAMENTO: 'orange',
    COSMÉTICO: 'purple',
  };

  return colorMap[tipo] || 'grey';
};

const openDialog = (id?: string) => {
  certificationRequestDialogRef.value?.openDialogTab(id);
};

const openItemSelected = (id: string, title: string) => {
  certificationDialogRef.value?.openDialogTab(id, title);
};
</script>

<template>
  
  <div :class="$q.platform.is.desktop ? 'q-pa-md q-pt-lg' : 'q-pa-sm q-pt-lg'">
        <q-card>
          <q-tabs
          v-model="tab"
          align="justify"
          dense
          class="text-grey-7"
          active-color="primary"
          indicator-color="orange"
          >
            <q-tab name="" label="TODAS" />
            <q-tab name="pending" label="PENDIENTE" />
            <q-tab name="approved" label="APROBADA" />
            <q-tab name="observed" label="OBSERVADA" />
            <q-tab name="rejected" label="RECHAZADA" />
          </q-tabs>
        </q-card>

    <table-component
      :rows="data_table.rows"
      :columns="data_table.columns"
      :total="pagination.rowsNumber"
      :rowsPerPage="pagination.rowsPerPage"
      :sortBy="pagination.sortBy"
      :descending="pagination.descending"
      :visible="visible_columns"
      :dataFilter="data_filter"
      :loading="loading"
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
              @click="openDialog(propsTable.row.id)"
            >
             {{ propsTable.row.name || 'Sin Número' }}
            </span>
          </q-td>
          <q-td key="date_entered" :props="propsTable">
            <span>{{ propsTable.row.date_entered }}</span>
          </q-td>
          <q-td key="user_id_c" :props="propsTable">
            <div
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              <q-avatar
                class="q-mr-sm"
                size="xs"
                color="primary"
                text-color="white"
                icon="person"
              />
              <span>{{ propsTable.row.solicitante }}</span>
              <br />
              <span class="text-caption text-grey">{{propsTable.row.cargo}}</span>
            </div>
          </q-td>
          <q-td key="division" :props="propsTable">
            <span>{{ propsTable.row.division }}</span>
          </q-td>
          <q-td key="idamercado_c" :props="propsTable">
            <span>{{ propsTable.row.idamercado_c }}</span>
          </q-td>
          <q-td key="idregional_c" :props="propsTable">
            <span>{{ propsTable.row.idregional_c }}</span>
          </q-td>
          <q-td key="producto_c" :props="propsTable">
            <span>{{ propsTable.row.producto_c }}</span>
          </q-td>
          <q-td key="fabricante_c" :props="propsTable">
            <span>{{ propsTable.row.fabricante_c }}</span>
          </q-td>
          <q-td key="state_aprobacion" :props="propsTable">
            <q-chip
              outline
              square
              :color="setEstadoColor(propsTable.row.state_aprobacion)"
              dense
              size="md"
              text-color="white"
            >
              {{ propsTable.row.state_aprobacion.toUpperCase() }}
            </q-chip>
          </q-td>
          <q-td key="nro_certificacion" :props="propsTable">
            <span v-if="propsTable.row.nro_certificacion" class="text-weight-bold text-primary">{{ propsTable.row.nro_certificacion }}</span>
            <span v-else class="text-grey">En espera</span>
          </q-td>
          <q-td key="options" :props="propsTable">
            <q-btn color="primary" icon="more_vert" round outline size="sm">
              <q-menu auto-close :offset="[110, 0]">
                <q-list dense>
                  <q-item clickable>
                    <div class="row items-center">
                      <q-icon name="check" class="q-mr-sm" />
                      <q-item-section>Aprobar</q-item-section>
                    </div>
                  </q-item>
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

          <!-- <q-td key="etapa_c" :props="propsTable">
            <div class="column">
              <div>
                <q-badge
                  :color="setEtapaColor(propsTable.row.etapa_c)"
                  :label="propsTable.row.etapa_c"
                />
              </div>
              <span class="text-caption">
                <span class="text-weight-bold">Estado:</span>
                {{ propsTable.row.estado_c }}
              </span>
              <span class="text-caption">{{
                (propsTable.row.fecha_creacion &&
                  propsTable.row.fecha_creacion.substring(0, 10)) ||
                propsTable.row?.date_added
              }}</span>
            </div>
          </q-td>

          <q-td key="tipo_tramite_c" :props="propsTable">
            {{ propsTable.row.tipo_tramite_c }}
          </q-td>
          <q-td key="solicitante" :props="propsTable">
            <div class="row items-center">
              <div class="col-1">
                <q-avatar
                  size="24px"
                  font-size="24px"
                  color="primary"
                  text-color="white"
                  icon="person"
                />
              </div>
              <div class="column q-pl-sm ellipsis col-11">
                <span class="ellipsis-item">
                  {{ propsTable.row.solicitante }}
                </span>
                <span class="ellipsis-item text-grey">
                  {{ propsTable.row.cargo }}
                </span>
              </div>
            </div>
          </q-td>
          <q-td key="producto_c" :props="propsTable">
            <div class="column">
              <span>
                {{ propsTable.row.producto_c }}
              </span>
              <span class="text-caption"
                ><span class="text-weight-bold">Fabricante</span>
                {{ propsTable.row.fabricante_c }}</span
              >
            </div>
          </q-td>
          <q-td key="tipo_producto_c" :props="propsTable">
            <q-badge
              outline
              :color="setTipoColor(propsTable.row.tipo_producto_c)"
              >{{ propsTable.row.tipo_producto_c }}</q-badge
            >
            <br />
            <span class="text-caption"
              ><span class="text-weight-bold">Cant. de requisitos:</span>
              10</span
            >
          </q-td>
          <q-td key="cumplimiento_req" :props="propsTable">
            <span class="text-weight-bold">100 %</span>
          </q-td>
          <q-td key="id" :props="propsTable">
            <div class="column">
              <span>
                <span class="text-weight-bold">Cod Misa:</span>
                {{ propsTable.row.cod_misa_c }}
              </span>
              <span>
                <span class="text-weight-bold">Nro de Ruta:</span>
                {{ propsTable.row.nro_ruta_c }}
              </span>
            </div>
            <q-badge dark color="green" class="q-px-md"
              ><span class="text-weight-bold q-mr-sm">Nro. Cert.</span
              >{{ propsTable.row.nro_cert }}</q-badge
            >
          </q-td> -->
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
              @click="openItemSelected(propsTable.row.id, propsTable.row.name)"
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
  <CertificationRequestDialog
    ref="certificationRequestDialogRef"
    @update="
      () => {
        reloadList();
      }
    "
  />
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
