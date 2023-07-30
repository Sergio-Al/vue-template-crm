import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  Filter,
  Pagination,
  PaginationTable,
  UpdateMassiveModel,
} from '../utils/types';
import {
  updateMassiveData,
  deleteMassiveData,
  getTableData,
  getTablePreferences,
  saveTablePreferences,
  updateTablePreferences,
  getCertificationRequests,
} from '../services/useCertificationsService';
import { axios_PREFERENCES } from 'src/conections/axiosCRM';
import { Notification } from 'src/composables';
import { userStore } from 'src/modules/Users/store/UserStore';

const { userCRM } = userStore();

export const useCertificationRequestTableStore = defineStore(
  'certification_request_table',
  () => {
    const loading = ref(false);
    const mongo_id = ref('');
    const pagination = ref({
      page: 1,
      sortBy: 'fecha_creacion',
      descending: true,
      rowsPerPage: 15,
      rowsNumber: 10,
    });
    const data_filter = ref({
      name: '',
      user_id_c: '',
      iddivision_c: '',
      idamercado_c: '',
      idregional_c: '',
      producto_c: '',
      fabricante_c: '',
      state_aprobacion: '',
      hance_certificacion_id_c: '',
      referencia_prods: '',
      created_by: [],
      modified_by: [],
      assigned_to: [],
      creation_date: { from: '', to: '', operator: '', option: '' },
    });
    const data_table = ref({
      rows: [],
      columns: [
        {
          name: 'name',
          align: 'left',
          label: 'Nro',
          field: 'name',
          sortable: true,
          visible: true,
        },
        {
          name: 'date_entered_c',
          align: 'left',
          label: 'Fecha',
          field: 'date_entered_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'user_id_c',
          align: 'center',
          label: 'Solicitante',
          field: 'user_id_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'iddivision_c',
          align: 'center',
          label: 'División',
          field: 'iddivision_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'producto_c',
          align: 'center',
          label: 'Ref Producto',
          field: 'producto_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'fabricante_c',
          align: 'center',
          label: 'Fabricante',
          field: 'fabricante_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'state_aprobacion',
          align: 'center',
          label: 'Estado',
          field: 'state_aprobacion',
          sortable: true,
          visible: true,
        },
        {
          name: 'hance_certificacion_id_c',
          align: 'center',
          label: 'Certificacion',
          field: 'hance_certificacion_id_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'options',
          align: 'center',
          label: 'Acciones',
          field: 'options',
          sortable: true,
        },
      ],
    });
    const visible_fields = ref([
      'name',
      'date_entered_c',
      'user_id_c',
      'iddivision_c',
      'idamercado_c',
      'idregional_c',
      'producto_c',
      'fabricante_c',
      'state_aprobacion',
      'hance_certificacion_id_c',
    ]);
    const visible_columns = ref([
      'name',
      'date_entered_c',
      'user_id_c',
      'iddivision_c',
      'idamercado_c',
      'idregional_c',
      'producto_c',
      'fabricante_c',
      'state_aprobacion',
      'hance_certificacion_id_c',
      'options',
    ]);

    async function getUserConfig() {
      const configuration = await getTablePreferences();
      if (configuration) {
        mongo_id.value = configuration._id;
        pagination.value.rowsPerPage = configuration.pagination.rowsPerPage;
        pagination.value.sortBy = configuration.pagination.sortBy;
        pagination.value.descending = configuration.pagination.descending;

        visible_columns.value = configuration.visible_columns;
        data_filter.value = configuration.data_filter;
        visible_fields.value = configuration.visible_fields;
      } else {
        mongo_id.value = await saveTablePreferences({
          pagination: pagination,
          visible_columns: visible_columns,
          data_filter: data_filter,
          visible_fields: visible_fields,
        });
      }
    }

    async function getListCertifications(props: {
      pagination: Pagination;
      filter: Filter;
    }) {
      try {
        loading.value = true;
        const { pagination: paginationParam, filter } = props;
        const { page, rowsPerPage, sortBy, descending } = paginationParam;
        const params = {
          page: page,
          rowsPerPage: rowsPerPage,
          sortBy: sortBy,
          order: descending ? 'desc' : 'asc',
          filter: filter,
        };
        // const data = await getCertificationRequests(params);
        const data = await getCertificationRequests();
        console.log(data);
        data_table.value.rows = data;
        // pagination.value = data.length;
        pagination.value.rowsNumber = data.length;
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    }

    async function reloadList() {
      await getListCertifications({
        pagination: pagination.value,
        filter: data_filter.value,
      });
    }

    async function setPagination(paginationParam: PaginationTable) {
      if (
        mongo_id.value &&
        (paginationParam.rowsPerPage !== pagination.value.rowsPerPage ||
          paginationParam.sortBy !== pagination.value.sortBy ||
          paginationParam.descending !== pagination.value.descending)
      ) {
        await updateTablePreferences(mongo_id.value ?? '', {
          pagination: {
            sortBy: paginationParam.sortBy,
            descending: paginationParam.descending,
            rowsPerPage: paginationParam.rowsPerPage,
          },
        });
        pagination.value.sortBy = paginationParam.sortBy;
        pagination.value.rowsPerPage = paginationParam.rowsPerPage;
        pagination.value.descending = paginationParam.descending;
      }
    }

    async function setVisibleColumn(columns: string[]) {
      await updateTablePreferences(mongo_id.value ?? '', {
        visible_columns: columns,
      });
      visible_columns.value = columns;
    }

    async function setVisibleField(columns: string[]) {
      await updateTablePreferences(mongo_id.value ?? '', {
        visible_fields: columns,
      });
      visible_fields.value = columns;
    }

    async function setFilterData() {
      try {
        await axios_PREFERENCES.patch(
          `/tables-users-preferences/${mongo_id.value}`,
          {
            data_filter: data_filter.value,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    async function deleteMultiple(selectItems: { id: string }[]) {
      loading.value = true;

      try {
        const dataSend = {
          user_id: userCRM.id,
          items: selectItems,
        };
        await deleteMassiveData(dataSend);
        await reloadList();
        Notification(
          'positive',
          'check_circle',
          `<strong> Acción exitosa¡ </strong> <br/> ${
            selectItems.length > 1
              ? `Se eliminaron ${selectItems.length} registros de la tabla.`
              : 'Se eliminó un registro de la tabla.'
          }`
        );
      } catch (error) {
        Notification(
          'negative',
          'warning',
          '<strong> Ops! algo salió mal </strong> <br/>Ocurrió un error al eliminar los datos.'
        );
        throw error;
      } finally {
        loading.value = false;
      }
    }

    async function updateMultiple(
      data: UpdateMassiveModel,
      selectItems: { id: string }[]
    ) {
      loading.value = true;

      try {
        const dataSend = {
          items: selectItems,
          data_update: {
            ...data,
            user_id: userCRM.id,
          },
        };
        await updateMassiveData(dataSend);
        await reloadList();
        Notification(
          'positive',
          'check_circle',
          `<strong> Acción exitosa¡ </strong> <br/> ${
            selectItems.length > 1
              ? `Se actualizaron ${selectItems.length} registros de la tabla.`
              : 'Se actualizó un registro de la tabla.'
          }`
        );
      } catch (error) {
        Notification(
          'negative',
          'warning',
          '<strong> Ops! algo salió mal </strong> <br/>Ocurrió un error al eliminar los datos.'
        );
        throw error;
      } finally {
        loading.value = false;
      }
    }

    async function clearFilterData() {
      data_filter.value = {
        name: '',
        user_id_c: '',
        iddivision_c: '',
        idamercado_c: '',
        idregional_c: '',
        producto_c: '',
        fabricante_c: '',
        state_aprobacion: '',
        hance_certificacion_id_c: '',
        referencia_prods: '',
        created_by: [],
        modified_by: [],
        assigned_to: [],
        creation_date: { from: '', to: '', operator: '', option: '' },
      };
      try {
        await axios_PREFERENCES.patch(
          `/tables-users-preferences/${mongo_id.value}`,
          {
            data_filter: data_filter.value,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    return {
      // State
      data_filter,
      data_table,
      loading,
      mongo_id,
      pagination,
      visible_columns,
      visible_fields,

      // actions
      clearFilterData,
      deleteMultiple,
      getListCertifications,
      getUserConfig,
      reloadList,
      setFilterData,
      setPagination,
      setVisibleColumn,
      setVisibleField,
      updateMultiple,
    };
  }
);