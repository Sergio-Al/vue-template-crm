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
  deleteMassiveDataRequest,
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
    const state_tab = ref('');
    const pagination = ref({
      page: 1,
      sortBy: 'date_entered',
      descending: true,
      rowsPerPage: 15,
      rowsNumber: 10,
    });
    const data_filter = ref({
      name: '',
      assigned_user_id: '',
      division: userCRM.iddivision,
      idamercado_c: '',
      idregional_c: '',
      producto_c: '',
      fabricante_c: '',
      solicitante:'',
      state_aprobacion: '',
      nro_certificacion: '',
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
          label: 'Nro. Solicitud',
          field: 'name',
          sortable: true,
          visible: true,
        },
        {
          name: 'date_entered',
          align: 'left',
          label: 'Fecha',
          field: 'date_entered',
          sortable: true,
          visible: true,
        },
        {
          name: 'assigned_user_id',
          align: 'center',
          label: 'Solicitante',
          field: 'assigned_user_id',
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
          name: 'division',
          align: 'center',
          label: 'División',
          field: 'division',
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
          name: 'nro_certificacion',
          align: 'center',
          label: 'Nro. Reg. Certificación',
          field: 'nro_certificacion',
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
      'solicitante',
      'division',
      'producto_c',
      'fabricante_c',
      'state_aprobacion',
    ]);
    const visible_columns = ref([
      'name',
      'date_entered',
      'assigned_user_id',
      'state_aprobacion',
      'solicitante',
      'division',
      'idamercado_c',
      'idregional_c',
      'producto_c',
      'fabricante_c',
      'nro_certificacion',
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

    async function getListCertificationRequest(props: {
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
        const data = await getCertificationRequests(params);
        //console.log('peticion de lista de solicitantes');
        //console.log(data);
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
      // if(!!data_filter.value.state_aprobacion){
      //   data_filter.value.state_aprobacion = state_tab.value;
      // }

      //data_filter.value.state_aprobacion = state_tab.value;
      // console.log(userCRM);
      // console.log(data_filter);
      // return;

      await getListCertificationRequest({
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
        await deleteMassiveDataRequest(dataSend);
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
        assigned_user_id: '',
        division: userCRM.iddivision,
        idamercado_c: '',
        idregional_c: '',
        producto_c: '',
        fabricante_c: '',
        state_aprobacion: '',
        nro_certificacion: '',
        referencia_prods: '',
        solicitante:'',
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
      state_tab,

      // actions
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
    };
  }
);
