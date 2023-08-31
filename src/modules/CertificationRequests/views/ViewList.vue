<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useCertificationRequestTableStore } from '../store/useCertificationRequestTableStore';
import AdvancedFilter from '../components/AdvancedFilter/AdvancedFilter.vue';

import CertificationRequestDialog from '../components/Dialogs/CertificationRequestDialog.vue';
import CertificationDialog from 'src/modules/Certifications/components/Dialogs/CertificationDialog.vue';

interface Props {
  nameModule: string;
  idUser?: string;
  menu?: boolean;
}

const props = defineProps<Props>();

const certificationRequestTableStore = useCertificationRequestTableStore();
const {
  data_filter,
  data_table,
  loading,
  pagination,
  visible_columns,
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
  await setPagination(val.pagination);
  await getListCertificationRequest(val);
};

const onClearDataFilter = () => {
  try {
    //advancedFilterRef.value?.clearFilter();
    clearFilterData();
    setFilterData();
    reloadList();
  } catch (error) {
    throw error;
  }
};

const setEstadoColor = (estado: string): string => {
  const colorEstado: { [key: string]: string } = {
    Pendiente: 'orange',
    Aprobada: 'green',
    Rechazada: 'red',
    Observada: 'red',
    Corregida: 'info'
  };

  return colorEstado[estado] || 'blue';
};

const openDialog = () => {
  certificationRequestDialogRef.value?.openDialogTab();
};

const openItemSelected = (id: string, title: string) => {
  certificationRequestDialogRef.value?.openDialogTab(id);
};

const filterState = ()=>{
  reloadList();
}
</script>

<template>
  
  <div :class="$q.platform.is.desktop ? 'q-pa-md q-pt-lg' : 'q-pa-sm q-pt-lg'">
        <q-card>
          <q-tabs
          v-model="data_filter.state_aprobacion"
          align="justify"
          dense
          class="text-grey-7"
          active-color="primary"
          indicator-color="orange"
          @click="reloadList()"
          >
            <q-tab name="" label="TODAS" />
            <q-tab name="pending" label="PENDIENTES" />
            <q-tab name="approved" label="APROBADAS" />
            <q-tab name="amend" label="CORREGIDAS" />
            <q-tab name="kept" label="OBSERVADAS" />
            <q-tab name="rejected" label="RECHAZADAS" />
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
              class="text-primary text-weight-bold cursor-pointer"
              @click="openItemSelected(propsTable.row.id, propsTable.row.name)"
            >
             {{ propsTable.row.name || 'Sin Número' }}
            </span>
          </q-td>
          <q-td key="name_request_c" :props="propsTable" class="text-break">
            <span>{{ propsTable.row.name_request_c }}</span>
          </q-td>
          <q-td key="date_entered" :props="propsTable">
            <span>{{ propsTable.row.date_entered }}</span>
          </q-td>
          <q-td key="assigned_user_id" :props="propsTable" class="text-break">
            <div
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
            <div class="row">
              <div class="col-3">
                <q-avatar
                  class="q-mr-sm"
                  size="sm"
                  color="primary"
                  text-color="white"
                  icon="person"
                />
              </div>
              <div class="col-9 text-left">
                <span>{{ propsTable.row.solicitante }}</span>
                <br>
                <span class="text-caption text-grey">
                  <q-tooltip>
                    Cargo
                  </q-tooltip>
                  {{propsTable.row.cargo}}</span>
              </div>
            </div>
              
            </div>
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
          <q-td key="division" :props="propsTable">
            <span>{{ propsTable.row.division }}</span>
            <br />
            <span class="text-caption text-grey">
              <q-tooltip>
                Área de Mercado
              </q-tooltip>
              {{ propsTable.row.amercado }}
            </span>
          </q-td>
          <q-td key="producto_c" :props="propsTable">
            <span>{{ propsTable.row.producto_c }}</span>
            <br />
            <span class="text-caption text-grey">
              <q-tooltip>
                Fabricante
              </q-tooltip>
              {{ propsTable.row.fabricante_c }}
            </span>
          </q-td>
          <q-td key="nro_certificacion" :props="propsTable">
            <span v-if="propsTable.row.nro_certificacion" class="text-weight-bold text-primary">{{ propsTable.row.nro_certificacion }}</span>
            <span v-else-if="propsTable.row.state_aprobacion == 'Rechazada'" class="text-grey">No corresponde</span>
            <span v-else class="text-grey"> En espera</span>
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
          ref="advancedFilterRef"
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
  min-width:150px;
  //width: 900px;
  word-wrap: break-word;
  //line-break:auto;
  white-space: normal;
}
</style>