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
} from '../services/useCertificationsService';
import { axios_PREFERENCES } from 'src/conections/axiosCRM';
import { Notification } from 'src/composables';
import { userStore } from 'src/modules/Users/store/UserStore';
import { ref } from 'vue';

export const { userCRM } = userStore();

export const useCertificationsTableStore = defineStore('certification_table', {
  state: () => ({
    loading: false,
    mongo_id: '',
    state_tab: '',
    pagination: {
      page: 1,
      sortBy: 'fecha_creacion',
      descending: true,
      rowsPerPage: 15,
      rowsNumber: 10,
    },
    data_filter: {
      name: '',
      etapa_c: '',
      tipo_tramite_c: '',
      producto_c: '',
      aprobacion_c: '',
      id_empresa: '',
      created_by: [],
      modified_by: [],
      assigned_to: [],
      creation_date: { from: '', to: '', operator: '', option: '' },
    },
    data_table: {
      rows: [],
      columns: [
        {
          name: 'name',
          align: 'left',
          label: 'Nro de Registro',
          field: 'name',
          sortable: true,
          visible: true,
        },
        {
          name: 'tipo_tramite_c',
          align: 'left',
          label: 'Tipo de tramite',
          field: 'tipo_tramite_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'solicitante',
          align: 'left',
          label: 'Solicitante',
          field: 'solicitante',
          sortable: true,
          visible: true,
        },
        {
          name: 'tipo_producto_c',
          align: 'left',
          label: 'Tipo de Producto',
          field: 'tipo_producto_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'etapa_c',
          align: 'left',
          label: 'Etapa',
          field: 'etapa_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'estado_c',
          align: 'center',
          label: 'Estado',
          field: 'estado_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'fecha_creacion',
          align: 'center',
          label: 'Fecha de Creación',
          field: 'fecha_creacion',
          sortable: true,
          visible: true,
        },
        {
          name: 'cumplimiento_req',
          align: 'center',
          label: 'Cumplimiento de requisitos',
          field: 'cumplimiento_req',
          sortable: true,
          visible: true,
        },
        {
          name: 'producto_c',
          align: 'center',
          label: 'Producto',
          field: 'producto_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'proveedor',
          align: 'center',
          label: 'Producto',
          field: 'proveedor',
          sortable: true,
          visible: true,
        },
        {
          name: 'nro_solicitud',
          align: 'center',
          label: 'Nro. solicitud',
          field: 'nro_solicitud',
          sortable: true,
          visible: true,
        },
        {
          name: 'certificacion',
          align: 'center',
          label: 'Certificación Emitida',
          field: 'certificacion',
          sortable: true,
          visible: true,
        },
        {
          name: 'options',
          align: 'center',
          label: 'Acciones',
          field: 'options',
          sortable: true,
          visible: true,
        },
      ],
    },
    visible_fields: [
      'id',
      'name',
      'tipo_tramite_c',
      'solicitante',
      'tipo_producto_c',
      'etapa_c',
      'estado_c',
      'fecha_creacion',
      'cumplimiento_req',
      'producto_c',
      'nro_solicitud',
      'id_solicitud',
      'proveedor'
    ],
    visible_columns: [
      'name',
      'tipo_tramite_c',
      'solicitante',
      'tipo_producto_c',
      'etapa_c',
      'estado_c',
      'producto_c',
      'fecha_creacion',
      'nro_solicitud',
      'cumplimiento_req',
      'nro_solicitud',
      'certificacion',
      'options',
    ],
  }),
  actions: {
    async getUserConfig() {
      const configuration = await getTablePreferences();
      if (configuration) {
        this.mongo_id = configuration._id;
        this.pagination.rowsPerPage = configuration.pagination.rowsPerPage;
        this.pagination.sortBy = configuration.pagination.sortBy;
        this.pagination.descending = configuration.pagination.descending;

        this.visible_columns = configuration.visible_columns;
        this.data_filter = configuration.data_filter;
        this.visible_fields = configuration.visible_fields;
      } else {
        this.mongo_id = await saveTablePreferences({
          pagination: this.pagination,
          visible_columns: this.visible_columns,
          data_filter: this.data_filter,
          visible_fields: this.visible_fields,
        });
      }
    },

    async getListCertifications(props: {
      pagination: Pagination;
      filter: Filter;
    }) {
      try {
        //this.loading = true;
        const { pagination, filter } = props;
        const { page, rowsPerPage, sortBy, descending } = pagination;
        const params = {
          page: page,
          rowsPerPage: rowsPerPage,
          sortBy: sortBy,
          order: descending ? 'desc' : 'asc',
          filter: filter,
        };
        const data = await getTableData(params);
        console.log(data);
        this.data_table.rows = data;
        this.pagination.rowsNumber = data.length;
        //this.loading = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async reloadList() {
      this.data_filter.etapa_c = this.state_tab;

      await this.getListCertifications({
        pagination: this.pagination,
        filter: this.data_filter,
      });
    },

    async setPagination(pagination: PaginationTable) {
      if (
        this.mongo_id &&
        (pagination.rowsPerPage !== this.pagination.rowsPerPage ||
          pagination.sortBy !== this.pagination.sortBy ||
          pagination.descending !== this.pagination.descending)
      ) {
        await updateTablePreferences(this.mongo_id ?? '', {
          pagination: {
            sortBy: pagination.sortBy,
            descending: pagination.descending,
            rowsPerPage: pagination.rowsPerPage,
          },
        });
        this.pagination.sortBy = pagination.sortBy;
        this.pagination.rowsPerPage = pagination.rowsPerPage;
        this.pagination.descending = pagination.descending;
      }
    },

    async setVisibleColumn(columns: string[]) {
      await updateTablePreferences(this.mongo_id ?? '', {
        visible_columns: columns,
      });
      this.visible_columns = columns;
    },

    async setVisibleField(columns: string[]) {
      await updateTablePreferences(this.mongo_id ?? '', {
        visible_fields: columns,
      });
      this.visible_fields = columns;
    },

    async setFilterData() {
      try {
        await axios_PREFERENCES.patch(
          `/tables-users-preferences/${this.mongo_id}`,
          {
            data_filter: this.data_filter,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },

    async deleteMultiple(selectItems: { id: string }[]) {
      this.loading = true;

      try {
        const dataSend = {
          user_id: userCRM.id,
          items: selectItems,
        };
        await deleteMassiveData(dataSend);
        await this.reloadList();
        Notification(
          'positive',
          'check_circle',
          `<strong> Acción exitosa¡ </strong> <br/> ${selectItems.length > 1
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
        this.loading = false;
      }
    },

    async updateMultiple(
      data: UpdateMassiveModel,
      selectItems: { id: string }[]
    ) {
      this.loading = true;

      try {
        const dataSend = {
          items: selectItems,
          data_update: {
            ...data,
            user_id: userCRM.id,
          },
        };
        await updateMassiveData(dataSend);
        await this.reloadList();
        Notification(
          'positive',
          'check_circle',
          `<strong> Acción exitosa¡ </strong> <br/> ${selectItems.length > 1
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
        this.loading = false;
      }
    },

    async clearFilterData() {
      this.state_tab = '';
      this.data_filter = {
        name: '',
        etapa_c: '',
        tipo_tramite_c: '',
        producto_c: '',
        aprobacion_c: '',
        id_empresa: '',
        created_by: [],
        modified_by: [],
        assigned_to: [],
        creation_date: { from: '', to: '', operator: '', option: '' },
      };
      try {
        await axios_PREFERENCES.patch(
          `/tables-users-preferences/${this.mongo_id}`,
          {
            data_filter: this.data_filter,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
});
